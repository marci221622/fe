import { grpc } from '@improbable-eng/grpc-web';
import { Action } from 'history';

import { CatalogWithFiltersResponse } from '@/shared/catalog';
import { RequestParams } from '@/shared/request';

import { TITLE_TO_REMOVALE, filtersCodes } from '@/constants/hardcode';

import { FxParams, Query } from '@/lib/createQuery';

export type CatalogRequestParams = FxParams<
  RequestParams<'GetItems'>['body'] & {
    loadMore?: boolean;
    additionalPath?: string;
    navType?: Action;
    query?: Record<string, string>;
  }
>;

export function createStatesFromCatalog(
  query: Query<
    CatalogRequestParams[0],
    {
      fromCache: boolean;
      result: CatalogWithFiltersResponse;
    }
  >,
) {
  const $productsCounter = query.$result.map(it => (it?.result?.itemsCount ? Number(it.result?.itemsCount) : 0));
  const $title = query.$result.map(
    it => it?.result?.header?.brand?.title ?? it?.result?.header?.collection?.title ?? '',
  );
  const $collectionCodes = query.$result.map(it =>
    it?.result?.header?.collection?.code ? [it.result.header.collection.code] : [],
  );
  const $header = query.$result.map(it => it?.result?.header ?? null);
  const $products = query.$result.map(it => it?.result?.items ?? []);
  const $filters = query.$result.map(it => {
    return {
      filters: it?.result?.filters ?? {},
      sidebar: (it?.result?.allMenuItems ?? []).filter(it => it.title !== TITLE_TO_REMOVALE),
      mobileCategories: it?.result?.menuItems ?? [],
    };
  });
  const $nextPage = query.$result.map(it => it?.result?.nextPageToken ?? null);

  const $hasSidebar = $filters.map(it => {
    const hasMenuitems = it.sidebar.length > 0;
    const hasCatalogFilter = (it.filters[filtersCodes.categoryFilter]?.values?.length || 0) > 0;

    return hasMenuitems || hasCatalogFilter;
  });

  const $hasFilters = $filters.map(it => {
    const hasCommonFilters = Object.keys(it.filters).length > 0;
    const hasMobileCategories = it.mobileCategories.length > 0;

    return { desktop: hasCommonFilters, mobile: hasMobileCategories || hasCommonFilters };
  });

  const $mobileCategoryFilters = $filters.map(it => it.mobileCategories);
  const $filtersScheme = $filters.map(it => it.filters);
  const $catalogNotFound = query.$error.map(
    err => err?.code === grpc.Code.NotFound || err?.code === grpc.Code.InvalidArgument,
  );

  return {
    $nextPage,
    $filters,
    $hasFilters,
    $mobileCategoryFilters,
    $filtersScheme,
    $productsCounter,
    $products,
    $title,
    $header,
    $catalogNotFound,
    $hasSidebar,
    $collectionCodes,
  };
}