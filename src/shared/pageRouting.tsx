import { grpc } from '@improbable-eng/grpc-web';
import { createEvent, sample, createStore, Effect, EventCallable } from 'effector';
import { useUnit } from 'effector-react';
import { Action } from 'history';
import { condition } from 'patronum/macro';
import * as React from 'react';
import { useParams, useLocation, Params, Route } from 'react-router';

import { Section } from '@/generated/customer_hub/enums/section';

import { RedirectError } from '@/constants/errors';
import { paths } from '@/constants/paths';

import { setRedirect } from '@/lib/redirect';
import { RemoteFxParams, remotePage } from '@/lib/remotePages';

import { DYEvent, sendAnalytic } from './analytics';
import { $currentGender, $isAuthorized, changedGender, wasLogouted } from './session';
import { $isClient } from './start';

export const START = `☄️/start-event`;
export const END = `☄️/loaded-event`;
export const LEAVE = `☄️/leave-event`;
export const REMOTE = `☄️/remote-event`;

const sections: Record<string, Section> = {
  men: Section.SECTION_MALE,
  women: Section.SECTION_FEMALE,
};

type HookProps = {
  params?: string[];
  authOnly?: boolean;
  guestOnly?: boolean;
  waiting?: boolean;
  pagename?: string;
  needGenderSwitcher?: boolean;
  // Для того что бы на все страницы повесить other ивент для DY
  injectDYOther?: boolean;
};

export type StartParams = {
  navType?: Action;
  ctrl?: AbortController;
  params?: Readonly<Params<string>>;
  query?: Record<string, string>;
  url: string;
  state?: any;
};

export const $pathAdditional = $currentGender.map(gender => (gender === Section.SECTION_FEMALE ? 'women' : 'men'));
export const $activePage = createStore<StartParams | null>(null);

export function createEnd({ params = [], authOnly = false }: { params?: string[]; authOnly?: boolean }) {
  const loaded = createEvent(...params);
  const loadedGuarded = createEvent(...params);

  if (authOnly) {
    condition({
      source: loaded,
      if: $isAuthorized,
      then: loadedGuarded,
    });
  }

  if (!authOnly) {
    sample({ clock: loaded, target: loadedGuarded });
  }

  return { loaded, loadedGuarded };
}

// eslint-disable-next-line no-use-before-define
export function trace(name: string, hooks: ReturnType<typeof createHooks>) {
  if (process?.env?.NODE_ENV === 'development') {
    /* eslint-disable no-console */
    hooks.loaded.watch(() => {
      console.log(`[page-hooks-trace (loaded)]: ${name}`);
    });

    hooks.enterGuarded.watch(params => {
      console.log(`[page-hooks-trace (enterGuarded)]: ${name}`, params.url);
    });

    hooks.leave.watch(() => {
      console.log(`[page-hooks-trace (leave)]: ${name}`);
    });
    /* eslint-enable no-console */
  }
}

export function createHooks({
  params = [],
  authOnly = false,
  guestOnly = false,
  waiting = true,
  pagename = '',
  needGenderSwitcher = false,
  injectDYOther = true,
}: HookProps) {
  const remote = remotePage(pagename);
  // TODO: по переходу параметры реально всегда есть
  // Иначе не нужны
  const $params = createStore<Omit<StartParams, 'ctrl'>>(null!);
  const enter = createEvent<StartParams>(...params);
  const leave = createEvent();
  const enterGuarded = createEvent<StartParams>(...params);
  const $onPage = createStore(false);
  const endEvents = createEnd({ params, authOnly });

  if (authOnly) {
    condition({
      source: enter,
      if: $isAuthorized,
      then: enterGuarded,
      else: setRedirect.prepend((params: StartParams) => `${paths.login()}?backurl=${params.url}`),
    });
  }

  if (guestOnly) {
    condition({
      source: enter,
      if: $isAuthorized,
      then: setRedirect.prepend(() => paths.profile.main()),
      else: enterGuarded,
    });
  }

  if (!guestOnly && !authOnly) {
    sample({ clock: enter, target: enterGuarded });
  }

  // если нету запроса на странице - сразу ее открыть можно
  if (!waiting) {
    sample({ clock: enterGuarded, target: endEvents.loaded, filter: $isClient });
  }

  $onPage.on(endEvents.loadedGuarded, () => true).reset(leave);
  $params.on(enterGuarded, (_, { ctrl, ...params }) => params).reset(leave);
  // Что бы из любого места парамтры достать для текущей страницы
  $activePage.on(enterGuarded, (_, { ctrl, ...params }) => params);

  const hooks = { enter, enterGuarded, leave, ...endEvents, $onPage, $params, remote };

  if (injectDYOther) {
    sample({
      source: $isClient,
      clock: hooks.loadedGuarded,
      fn: isClient => ({
        dy: {
          type: isClient ? 'spa' : 'context',
          ctx: { lng: 'ru', type: 'OTHER' },
        } as DYEvent,
      }),
      target: sendAnalytic,
    });
  }

  if (needGenderSwitcher) {
    genderSwitcher({ hooks });
  }

  if (pagename) {
    trace(pagename, hooks);
  }

  return hooks;
}

// TODO: incorect behavior
// eslint-disable-next-line effector/mandatory-scope-binding
export function useStart(startEvent: EventCallable<StartParams>) {
  const params = useParams();
  const location = useLocation();
  const query = React.useMemo(() => Object.fromEntries(new URLSearchParams(location.search)), [location.search]);
  const enter = useUnit(startEvent);

  React.useEffect(() => {
    enter({ params, query, url: location.pathname });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- намеренно одноразовый эффект
  }, []);
}

// TODO: incorect behavior
// eslint-disable-next-line effector/mandatory-scope-binding
export function useLeave(leaveEvent: EventCallable<void>) {
  const leave = useUnit(leaveEvent);

  React.useEffect(() => {
    return () => leave();
  }, [leave]);
}

export function getStart<T extends { element?: React.ReactNode }>(route: T): undefined | EventCallable<StartParams> {
  // @ts-ignore
  return route.element?.type?.[START];
}

export function getLoaded<T extends { element?: React.ReactNode }>(route: T): undefined | EventCallable<void> {
  // @ts-ignore
  return route.element?.type?.[END];
}

export function getLeaved<T extends { element?: React.ReactNode }>(route: T): undefined | EventCallable<void> {
  // @ts-ignore
  return route.element?.type?.[LEAVE];
}

export function getRemote<T extends { element?: React.ReactNode }>(route: T): undefined | Effect<RemoteFxParams, any> {
  // @ts-ignore
  return route.element?.type?.[REMOTE];
}

export function withEvents<P extends Record<string, unknown>>(
  component: any,
  {
    hooks,
  }: {
    hooks: {
      enter: EventCallable<StartParams>;
      loaded?: EventCallable<void>;
      leave?: EventCallable<void>;
      remote: any;
    };
  },
): React.FC<P> {
  /* eslint-disable no-param-reassign */
  // @ts-ignore
  component[START] = hooks.enter;
  // @ts-ignore
  component[END] = hooks.loaded;
  // @ts-ignore
  component[LEAVE] = hooks.leave;
  // @ts-ignore
  component[REMOTE] = hooks.remote;

  return component;
}

// Что бы на клиенте корректно ловить старт и загрузку страницы
// allSettled работает по принипу ждать все
// что просто не подоходит для навигации
// Теперь на ssr ждем все, а на клиенте ожидаем загрузки и тригерим
// ивент loaded из page хука (при этом пропуская отмену)
export function loaded<Params, Result>({
  effect,
  hooks,
  condition = () => true,
}: {
  effect: Effect<Params, Result>;
  hooks: ReturnType<typeof createHooks>;
  condition?: (params: Params) => boolean;
}) {
  sample({
    source: $isClient,
    clock: effect.finally,
    filter: (isClient, rs) => {
      const isCancelOrRedirect =
        // @ts-ignore
        rs?.status === 'fail' && (rs?.error?.code === grpc.Code.Canceled || rs?.error instanceof RedirectError);

      if (isClient && condition(rs.params) && !isCancelOrRedirect) {
        return true;
      }

      return false;
    },
    target: hooks.loaded,
  });
}

export function getSectionFromUrl(url: string) {
  const paths = url.split('/').filter(Boolean);

  return paths[0];
}

// Если в урле есть секция
// Меняем гендер для приложения
export function genderSwitcher({ hooks }: { hooks: ReturnType<typeof createHooks> }) {
  sample({
    clock: hooks.enterGuarded,
    fn: it => sections[getSectionFromUrl(it.url)],
    filter: it => typeof sections[getSectionFromUrl(it.url)] !== 'undefined',
    target: changedGender,
  });
}

export function createRoutesByGender({
  element,
  needInitial,
  path,
}: {
  element: React.JSX.Element;
  needInitial?: boolean;
  path: string;
}) {
  const paths = {
    initial: path,
    women: `/women${path}`,
    men: `/men${path}`,
  };

  let initialRoute: React.JSX.Element | null = null;

  if (needInitial) {
    initialRoute = <Route path={paths.initial} element={element} />;
  }

  return (
    <>
      {initialRoute}
      <Route path={paths.men} element={element} />
      <Route path={paths.women} element={element} />
    </>
  );
}

export function useLinkBuilder(activeGender?: Section) {
  const pathAdditional = useUnit($pathAdditional);
  const pathByActiveGender = activeGender
    ? Section.SECTION_FEMALE === (activeGender as Section)
      ? 'women'
      : 'men'
    : '';

  return React.useCallback(
    (path: string) => `/${pathByActiveGender || pathAdditional}${path}`,
    [pathAdditional, pathByActiveGender],
  );
}

sample({
  source: $activePage,
  clock: wasLogouted,
  fn: activePage => (activePage ? `${paths.login()}?backurl=${activePage.url}` : paths.login()),
  target: setRedirect,
});
