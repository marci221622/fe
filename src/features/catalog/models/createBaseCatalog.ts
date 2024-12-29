import { attach, createEffect, createEvent, createStore, sample, Store } from 'effector';
import { Action } from 'history';
import { omit } from 'lodash';

import { GrpcWebError } from '@/generated/customer_hub/customer-hub-service';
import { Slug, SlugType } from '@/generated/customer_hub/entities/slug.v1';
import { Section } from '@/generated/customer_hub/enums/section';
import { CatalogWithFiltersResponse, convertQueriesToRequest, fetchCatalogWithFilters } from '@/shared/catalog';
import { $appIsShort } from '@/shared/configs';
import { $pathAdditional, createHooks, StartParams } from '@/shared/pageRouting';
import { wasLogouted } from '@/shared/session';

import { RedirectError } from '@/constants/errors';

import { logged } from '@/features/auth';

import { analytics } from '@/lib/bridge';
import { createQuery } from '@/lib/createQuery';
import { keepFresh } from '@/lib/keepFresh';
import { createRowScheme, mergeSchemes, DEFAUTL_EMPTY_SCHEME } from '@/lib/product';
import { pageStatus } from '@/lib/status';

import { catalogAnalytics } from './analytics';
import { createStatesFromCatalog, CatalogRequestParams } from './createStatesFromCatalog';
import { createInMemoryCache } from './memoryCache';

type CatalogFactoryParams = {
  $params: Store<ReturnType<typeof prepareParamsToRequest>>;
  hooks: ReturnType<typeof createHooks>;
  path?: (arg0: { slug?: string }) => string;
  getKey: (params?: { slug?: { type?: SlugType; slug?: string }; query?: Record<string, string> }) => string;
};

export function prepareParamsToRequest(
  { ctrl, params, query, nextPage, slug }: StartParams & { nextPage?: string; slug?: Slug },
  { gender, collections }: { gender: Section; collections?: string[] },
) {
  const body = convertQueriesToRequest({ query, params, gender, slug });

  return {
    ctrl,
    loadMore: false,
    additionalPath: gender === Section.SECTION_FEMALE ? '/women' : '/men',
    nextPage,
    query,
    ...body,
    searchParams: {
      ...body.searchParams,
      collections: collections ?? body.searchParams.collections,
    },
  };
}

export function buildKey(params?: { slug?: { type?: SlugType; slug?: string }; query?: Record<string, string> }) {
  let key = '';

  if (params?.slug?.slug) {
    key = params?.slug?.slug;
  }

  if (params?.query) {
    key = `${key}/${Object.values(params.query).join(',')}`;
  }

  return key;
}

export function createBaseCatalog({ $params, hooks, path, getKey }: CatalogFactoryParams) {
  const memory = createInMemoryCache();

  const loadMore = createEvent<{ nextPage?: string }>();

  const fx = attach({
    source: $appIsShort,
    mapParams: (params: CatalogRequestParams, appIsShort) => ({ params, appIsShort }),
    effect: createEffect<
      { params: CatalogRequestParams; appIsShort: boolean },
      { fromCache: boolean; result: CatalogWithFiltersResponse },
      GrpcWebError
    >(async ({ params: [{ pageToken, searchParams, additionalPath = '', query, navType }, ctrl], appIsShort }) => {
      const currentKey = getKey({ slug: searchParams?.slug, query });
      const itemsFromCache = memory.readFromCache(currentKey);

      if (itemsFromCache && navType === Action.Pop) {
        return Promise.resolve({ fromCache: true, result: itemsFromCache });
      }

      const rs = await fetchCatalogWithFilters({ signal: ctrl.signal, body: { pageToken, searchParams } });

      if (rs.currentSlug && path) {
        throw new RedirectError(`${additionalPath}${path({ slug: rs.currentSlug.slug })}`);
      }

      // TODO: временный костыль для сортировки товаров в резерве
      // https://jira.int.tsum.com/browse/POWEB-444
      if (appIsShort) {
        return {
          fromCache: false,
          result: {
            ...rs,
            items: rs.items.sort((productX, productY) => +productX.isCollected - +productY.isCollected),
          },
        };
      }

      return { fromCache: false, result: rs };
    }),
  });

  const query = createQuery({
    initialData: null,
    abort: hooks.leave,
    stateUpdater: ({ loadMore }, { prev, result }) => {
      return loadMore
        ? {
            fromCache: result.fromCache,
            result: {
              ...result?.result,
              items: [...(prev?.result.items ?? []), ...result.result.items],
            },
          }
        : result;
    },
    effect: fx,
  });

  const catalogStates = createStatesFromCatalog(query);

  // Для того что бы сделать выравнивания без
  // Пустого места
  const $rowScheme = createStore(DEFAUTL_EMPTY_SCHEME);

  $rowScheme.reset(hooks.leave);

  keepFresh(query, {
    // @ts-ignore
    source: $params.map(params => ({ ...params, navType: undefined })),
    if: hooks.$onPage,
    triggers: [logged, wasLogouted],
  });

  sample({
    source: { params: $params, additionalPath: $pathAdditional },
    clock: loadMore,
    fn: ({ params, additionalPath }, { nextPage }) => ({
      ...omit(params, 'query'),
      pageToken: nextPage,
      loadMore: true,
      additionalPath,
      navType: undefined,
    }),
    target: query.start,
  });

  sample({
    source: catalogStates.$catalogNotFound,
    clock: query.fx.failData,
    filter: Boolean,
    fn: () => 404,
    target: pageStatus.change,
  });

  sample({
    source: { result: query.$result, catalogParams: $params },
    clock: query.fx.done,
    fn: ({ result, catalogParams }, { params }) => {
      const currentKey = getKey({ slug: params[0]?.searchParams?.slug, query: catalogParams.query });

      return {
        key: currentKey,
        result,
      };
    },
    target: memory.storeInFx,
  });

  sample({
    source: $rowScheme,
    clock: query.fx.done,
    fn: (scheme, { result }) =>
      mergeSchemes(scheme, createRowScheme({ items: result.result.items, needToFullListPreparation: false })),
    target: $rowScheme,
  });

  analytics(() => {
    sample({ clock: loadMore, target: catalogAnalytics.showMoreProducts });
  });

  return {
    query,
    ...catalogStates,
    loadMore,
    $result: query.$result.map(it => it?.result ?? null),
    '@@unitShape': () => ({
      rowScheme: $rowScheme,
      nextPage: catalogStates.$nextPage,
      filters: catalogStates.$filters,
      hasFilters: catalogStates.$hasFilters,
      counter: catalogStates.$productsCounter,
      products: catalogStates.$products,
      title: catalogStates.$title,
      header: catalogStates.$header,
      loadMore,
      hasSidebar: catalogStates.$hasSidebar,
      catalogNotFound: catalogStates.$catalogNotFound,
      collectionCodes: catalogStates.$collectionCodes,
    }),
    __: {
      memory,
    },
  };
}
