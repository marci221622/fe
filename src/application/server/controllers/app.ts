import { allSettled, createEvent, Event, fork, serialize, EventPayload, sample, Effect } from 'effector';
import { Request, Response } from 'express';
import { createRoutesFromElements, matchRoutes, RouteObject, matchPath } from 'react-router-dom';
import parceUrl from 'url-parse';

import { getRoutes } from '@/pages/pages';
import { $staticAnalytics } from '@/shared/analytics';
import { appVarriant } from '@/shared/configs';
import { AB_TESTS } from '@/shared/configs/abTests';
import { getLoaded, getRemote, getStart } from '@/shared/pageRouting';
import { getPreloadedState, setDefaultCookies } from '@/shared/preloader';
import { $pendingRequest } from '@/shared/session';
import { appStarted } from '@/shared/start';
import { setupABTests } from 'application/setupAbTests';

import { $redirect } from '@/lib/redirect';
import { RemoteFxParams } from '@/lib/remotePages';
import { $baseServices, createBaseServices } from '@/lib/services';
import { pageStatus } from '@/lib/status';
import { escapeChars } from '@/lib/string';

import { createAbort } from '../abort';
import { apmAgent } from '../apmAgent';
import { APM_SPAN_NAMES } from '../constants';
import { grpcClient } from '../grpc';
import { renderApp } from '../renderer';
import { routesTraverse } from '../traverse';
import { setAdditionalUserData } from '../user-resolver';
import { resolveAppVariant } from '../variant-resolver';

type EventParams = {
  req: Request;
  res: Response;
  ctrl: AbortController;
};

const serverStarted = createEvent<EventParams>();
const loaded = createEvent<EventParams>();
const remoteStarted = createEvent<EventParams>();

function transfromReq(mapper: (arg: RouteObject) => boolean | unknown) {
  return ({ req, ctrl }: EventParams) => {
    const url = parceUrl(req.url);
    const entries = Object.fromEntries(new URLSearchParams(url.query));

    return {
      routes: (matchRoutes(createRoutesFromElements(getRoutes()), req.path) ?? []).filter(it => mapper(it.route)),
      query: Object.keys(entries).reduce((acc, key) => {
        acc[key] = escapeChars(entries[key]);

        return acc;
      }, {} as { [k: string]: string }),
      ctrl,
      url: req.originalUrl,
    };
  };
}

const routesMatched = serverStarted.map(transfromReq(getStart));
const remoteRoutesMatched = remoteStarted.map(transfromReq(getRemote));
const routesMatchedResponse = loaded.map(transfromReq(getLoaded));

function getMatchedRoute({ enter, target, path }: { enter: boolean; target: Event<any>; path: string }) {
  return (enter ? routesMatched : routesMatchedResponse).filterMap(({ routes, query, ctrl, url }) => {
    // @ts-ignore
    const route = routes.find(it => (enter ? getStart(it.route) : getLoaded(it.route)) === target);

    if (route && matchPath(path, route?.pathname)) return { route, query, ctrl, url };

    return undefined;
  });
}

function getMatchedRouteForRemoteFx({ target, path }: { target: Effect<RemoteFxParams, any>; path: string }) {
  return remoteRoutesMatched.filterMap(({ routes, query, ctrl, url }) => {
    // @ts-ignore
    const route = routes.find(it => getRemote(it.route) === target);

    if (route && matchPath(path, route?.pathname)) return { route, query, ctrl, url };

    return undefined;
  });
}

function getParamsForPageEvent({ route, ctrl, query, url }: EventPayload<ReturnType<typeof getMatchedRoute>>) {
  return {
    params: route.params,
    query,
    ctrl,
    url,
  };
}

function getParamsForRemotePageFx({ ctrl }: EventPayload<ReturnType<typeof getMatchedRouteForRemoteFx>>) {
  return {
    ctrl,
  };
}

routesTraverse(createRoutesFromElements(getRoutes()), route => {
  const remoteFx = getRemote(route);
  const startPageEvent = getStart(route);
  const endPageEvent = getLoaded(route);

  // На SSR так же
  // Сначала нужно получить страницу
  // Иначе на ивенты и прочее не кому реагировать
  // Модель за кодспличена
  // Иначе - страница есть в бандле и сразу можно старт вызывать
  if (remoteFx) {
    sample({
      clock: getMatchedRouteForRemoteFx({ target: remoteFx, path: route.path ?? '' }).map(getParamsForRemotePageFx),
      target: remoteFx,
    });
  }

  if (startPageEvent) {
    sample({
      clock: getMatchedRoute({ enter: true, target: startPageEvent, path: route.path ?? '' }).map(
        getParamsForPageEvent,
      ),
      target: startPageEvent,
    });

    if (endPageEvent) {
      sample({
        clock: getMatchedRoute({ enter: false, target: endPageEvent, path: route.path ?? '' }).map(
          getParamsForPageEvent,
        ),
        target: endPageEvent,
      });
    }
  }
});

export const appController = async (req: Request, res: Response) => {
  try {
    const { pathname: path, query, hash } = parceUrl(req.url);

    const location = {
      pathname: path ?? '',
      hash: hash ?? '',
      search: query ?? '',
      key: 'default',
      state: {},
    };

    const services = createBaseServices({
      cookies: req.cookies,
      grpc: grpcClient,
    });

    const appVariant = resolveAppVariant(req.headers);
    const abtests = setupABTests(services.cookies);

    const ctrl = createAbort(req);
    const scopeParams = { req, res, ctrl };

    const forkSpan = apmAgent.startSpan(APM_SPAN_NAMES.FORK);

    const scope = fork({
      values: getPreloadedState({ cookies: services.cookies, map: setAdditionalUserData(req.headers, new Map()) })
        .set($baseServices, services)
        .set(appVarriant.$value, appVariant)
        .set(AB_TESTS.$multiClickAndCollect, abtests.multyClickAndCollect),
    });

    forkSpan?.end();

    // Куки заполнят сторы и просетятся (касается только кук вида xid)
    // Куки вида auth/refresh и тд
    // Будут сетится по действию (на пример после авторизации)
    setDefaultCookies({ cookies: services.cookies, scope });

    try {
      const remoteSpan = apmAgent.startSpan(APM_SPAN_NAMES.remotepages);

      await allSettled(remoteStarted, {
        scope,
        params: scopeParams,
      });

      remoteSpan?.end();

      const appSpan = apmAgent.startSpan(APM_SPAN_NAMES.appStart);

      await allSettled(appStarted, {
        scope,
        params: { ctrl },
      });

      appSpan?.end();

      const pageStartSpan = apmAgent.startSpan(APM_SPAN_NAMES.pageStart);

      await allSettled(serverStarted, {
        scope,
        params: scopeParams,
      });

      pageStartSpan?.end();

      const loadedSpan = apmAgent.startSpan(APM_SPAN_NAMES.loaded);

      await allSettled(loaded, {
        scope,
        params: scopeParams,
      });

      loadedSpan?.end();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('allSettled', error);
    }

    // Редирект через прелоадер
    const redirect = scope.getState($redirect);
    const status = scope.getState(pageStatus.$value);
    const saticAnalytics = scope.getState($staticAnalytics);

    if (redirect) {
      return res.redirect(301, redirect.to);
    }

    const renderSpan = apmAgent.startSpan(APM_SPAN_NAMES.RENDER);

    const { html } = renderApp({
      saticAnalytics,
      scope,
      location,
      routes: getRoutes(),
      state: JSON.stringify(
        serialize(scope, {
          ignore: [$baseServices, $staticAnalytics, $redirect, $pendingRequest, pageStatus.$value],
        }),
      ),
    });

    renderSpan?.end();

    return res.status(status).send(html);
  } catch (error: any) {
    if (process?.env?.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    apmAgent.captureError(error);

    return res.status(500).send('Somthing went wrong');
  }
};
