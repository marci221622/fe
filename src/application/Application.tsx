import { EventCallable, Scope, scopeBind } from 'effector';
import { Provider, useGate, useUnit } from 'effector-react';
import { Action } from 'history';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { HelmetProvider } from 'react-helmet-async';
import {
  matchRoutes,
  Routes,
  useLocation,
  createRoutesFromElements,
  useNavigationType,
  matchPath,
} from 'react-router-dom';

import { LocaleProvider } from '@/i18n/index';
import { useDYReady } from '@/shared/analytics';
import { $mappedStrings } from '@/shared/configs';
import { DescriptionModalsProvider } from '@/shared/description-modals';
import { getLoaded, getLeaved, getStart, getRemote, useLinkBuilder } from '@/shared/pageRouting';
import { Meta } from '@/shared/Seo';
import { useSyncSession } from '@/shared/session';
import { appStarted } from '@/shared/start';
import { SimilarProductsModal } from '@/shared/widgets';

import { paths } from '@/constants/paths';
import { runtimeConfig } from '@/constants/runtimeConfig';

import { ProductList } from '@/features/catalog';

import {
  CATALOG_RESTORATION_KEY,
  ViewportProvider,
  restorationCtx,
  useCopySLCookies,
  useScrollRestoration,
} from '@/lib/hooks';
import { Redirect } from '@/lib/redirect';
import { indexMetaNeeded, needToRemoveCanonical } from '@/lib/seo';
import { CaptchaServiceGate } from '@/lib/services';
import { removeParameterFromUrl } from '@/lib/string';

import { ProgressIndicator } from '@/ui/Indicator';
import { MediaContextProvider } from '@/ui/Responsive';

import { getWebsiteName, getFavicons } from './meta';

const defaultMatches = [] as const;

type Props = {
  routes: React.JSX.Element;
  scope: Scope;
  helmet?: object;
};

const isCatalogRoute = (path: string, buildHandler: (path: string) => string) => {
  return [
    // Свой код поддерживаем
    // eslint-disable-next-line deprecation/deprecation
    buildHandler(paths.catalog.brand({})),
    buildHandler(paths.catalog.withSlug.brand({})),
    buildHandler(paths.catalog.withSlug.collection({})),
    // Свой код поддерживаем
    // eslint-disable-next-line deprecation/deprecation
    buildHandler(paths.catalog.common.withCollAndMenu({})),
    buildHandler(paths.catalog.withSlug.common({})),
    buildHandler(paths.catalog.search({})),
  ].some(it => !!matchPath(it, path));
};

function runInScope<P>(scope: Scope, { event, params }: { event?: EventCallable<P> | null; params: P }) {
  if (event) {
    const fn = scopeBind(event, { scope });

    fn(params);
  }
}

function Session() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const onAppStarted = useUnit(appStarted);

  useCopySLCookies();
  useSyncSession();
  useGate(CaptchaServiceGate, executeRecaptcha);

  useEffect(() => {
    const ctrl = new AbortController();

    onAppStarted({ ctrl });

    return () => {
      ctrl.abort();
    };
  }, [onAppStarted]);

  return null;
}

export function Application({ routes, scope, helmet }: Props) {
  const texts = useUnit($mappedStrings);
  const currentLocation = useLocation();
  const navType = useNavigationType();
  const buildHandler = useLinkBuilder();
  const prevLeavedRef = useRef<EventCallable<void> | null>(null);

  const [prevLocation, setLocation] = useState(currentLocation);
  const [prevNavType, setPrevNavType] = useState(navType);

  const hasNoIndex = indexMetaNeeded(prevLocation.search);
  const canonicalNoneed = needToRemoveCanonical(prevLocation.search);

  const matchedRoutes = useMemo(
    () => matchRoutes(createRoutesFromElements(routes), currentLocation),
    [currentLocation, routes],
  );

  const prevMatchedRoutes = useMemo(
    () => matchRoutes(createRoutesFromElements(routes), prevLocation) ?? defaultMatches,
    [prevLocation, routes],
  );

  const needFetch =
    prevLocation.pathname !== currentLocation.pathname ||
    removeParameterFromUrl(prevLocation.search, 'page') !== removeParameterFromUrl(currentLocation.search, 'page');

  const isCatalog = isCatalogRoute(currentLocation.pathname, buildHandler);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (needFetch) {
      const ctrl = new AbortController();
      const matched = matchedRoutes ?? [];

      const params = {
        ctrl,
        // @ts-ignore
        params: matched.reduce((acc, it) => ({ ...acc, ...it.params }), {}),
        query: Object.fromEntries(new URLSearchParams(currentLocation.search)),
        url: currentLocation.pathname,
        state: currentLocation.state,
        navType,
      };

      const remoteFx = matched.map(it => getRemote(it?.route)).filter(Boolean)[0];

      const startEvent = matched.map(it => getStart(it?.route)).filter(Boolean)[0];
      const loadedEvent = matched.map(it => getLoaded(it?.route)).filter(Boolean)[0];
      const currentLeavedEvent = matched.map(it => getLeaved(it?.route)).filter(Boolean)[0];

      const leavedPrevRouteEvent = prevMatchedRoutes.map(it => getLeaved(it?.route)).filter(Boolean)[0];

      const unsub = loadedEvent?.watch(() => {
        // восстановление скрола на одном сеансе
        // при клике на кт в каталоге
        // сохраняем ид
        // по переходу восстанавливаем скрол если есть ид
        // именно по событию POP
        const id = sessionStorage.getItem(CATALOG_RESTORATION_KEY);
        const needCatalogScrollClear = isCatalog && id ? navType !== Action.Pop : true;

        if (!ctrl.signal.aborted) {
          if (currentLeavedEvent !== leavedPrevRouteEvent) {
            prevLeavedRef.current = leavedPrevRouteEvent ?? null;
          }

          setLocation(currentLocation);
          setPrevNavType(navType);
        }

        if (!currentLocation.state?.noScroll && needCatalogScrollClear) {
          window.scrollTo(0, 0);
        }

        unsub?.();
      });

      // Предзагружаем страничку
      // Иначе не нужно и она в бандле сразу
      // ЗАпускаем старт ивент
      // (!) Если криво будет - нужно будет убрать
      // Сайт не такой большой что бы дробить на чанки модели
      if (remoteFx) {
        // eslint-disable-next-line effector/mandatory-scope-binding
        remoteFx({ ctrl })
          .then(() => {
            // вызываем старт роута
            runInScope(scope, { event: startEvent, params });
          })
          .catch(() => {
            // https://jira.int.tsum.com/browse/POWEB-484
            // Перезагрузить страницу если при переходе
            // Нету чанка
            window.location.reload();
          });
      } else {
        runInScope(scope, { event: startEvent, params });
      }

      return () => {
        if (prevLeavedRef.current) {
          // eslint-disable-next-line effector/mandatory-scope-binding
          runInScope(scope, { event: prevLeavedRef.current, params: undefined });
          prevLeavedRef.current = null;
        }

        ctrl.abort('cancellation from application');

        if (process?.env?.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log('cancellation from application', { params });
        }

        unsub?.();
      };
    }
  }, [currentLocation, isCatalog, matchedRoutes, navType, needFetch, prevMatchedRoutes, scope]);

  useScrollRestoration();
  useDYReady();

  return (
    <Provider value={scope}>
      <HelmetProvider context={helmet}>
        <Meta canonicalUrl={canonicalNoneed ? undefined : `${runtimeConfig.HOSTNAME}${prevLocation.pathname}`}>
          <meta name="yandex-verification" content="9c1a3147bc1df254" />
          <meta name="google-site-verification" content="8nR_mFGvdGfNih3EK-VVhyGQLQpG4EiqAyVLEECqP1k" />
          <meta name="theme-color" content="#1B1B1B" />
          <title>TSUM Collect</title>
          {getFavicons()}
          {hasNoIndex && <meta name="robots" content="noindex" />}
          {getWebsiteName()}
        </Meta>
        <MediaContextProvider>
          <LocaleProvider>
            <ViewportProvider>
              <DescriptionModalsProvider>
                <ProgressIndicator pending={needFetch} />
                <Redirect />
                <Session />
                <restorationCtx.Provider value={prevNavType}>
                  <Routes location={prevLocation} key={prevLocation.pathname}>
                    {routes}
                  </Routes>
                </restorationCtx.Provider>
                <SimilarProductsModal key={`${currentLocation.pathname}/Similar`}>
                  {(items, scheme) => (
                    <ProductList
                      openInNewTab
                      products={items}
                      pageType="Unknown"
                      list={texts.relevantItems.item.button}
                      rowScheme={scheme}
                    />
                  )}
                </SimilarProductsModal>
              </DescriptionModalsProvider>
            </ViewportProvider>
          </LocaleProvider>
        </MediaContextProvider>
      </HelmetProvider>
    </Provider>
  );
}
