import { attach, createEffect } from 'effector';

import { SearchFilter } from '@/generated/customer_hub/entities/search_filter.v1';
import { SearchParams } from '@/generated/customer_hub/entities/search_params.v1';
import { SearchFilterType } from '@/generated/customer_hub/enums/search_filter_type';
import { Section } from '@/generated/customer_hub/enums/section';
import { Sort } from '@/generated/customer_hub/enums/sort';
import { fetchCatalogWithFilters } from '@/shared/catalog';
import { $currentGender } from '@/shared/session';

import { filtersCodes } from '@/constants/hardcode';

import { FxParams, createQuery } from '@/lib/createQuery';

import { fetchItemsByCodes } from '../api';

type Params = { collection: string; menu?: string; brand?: string; size?: string };

export const DEFAULT_PAGE_SIZE = '10';

const createParams = ({ gender, collection, menu, brand, size }: { gender: Section } & Params) => {
  const filterSize = {
    code: filtersCodes.size,
    type: SearchFilterType.SEARCH_FILTER_TYPE_UNSPECIFIED,
    values: [size],
  };

  const filterBrand = {
    code: filtersCodes.brands,
    type: SearchFilterType.SEARCH_FILTER_TYPE_UNSPECIFIED,
    values: [brand],
  };

  const filters = [size && filterSize, brand && filterBrand].filter(Boolean);

  return {
    pageToken: '',
    searchParams: {
      sort: Sort.SORT_PRESORTED,
      collections: [collection],
      filters: filters as SearchFilter[],
      brands: [] as string[],
      sections: [gender],
      pageSize: DEFAULT_PAGE_SIZE,
      fulltext: '',
      ...(menu
        ? {
            rootMenuCode: menu,
            currentMenuCodes: [menu],
          }
        : {}),
    } as SearchParams,
  };
};

export const widgetQuery = createQuery({
  initialData: { items: [], itemsCount: 0 },
  effect: attach({
    source: $currentGender,
    mapParams: (params: FxParams<Params>, gender) => ({ gender, params }),
    effect: createEffect(async ({ gender, params: [params, ctrl] }: { gender: Section; params: FxParams<Params> }) => {
      const result = await fetchCatalogWithFilters({
        signal: ctrl.signal,
        body: createParams({ gender, ...params }),
      });

      return {
        items: result.items,
        itemsCount: +result.itemsCount,
      };
    }),
  }),
});

export const widgetByBrandsQuery = createQuery({
  initialData: { items: [], itemsCount: 0 },
  effect: attach({
    source: $currentGender,
    mapParams: (params: FxParams<Params>, gender) => ({ gender, params }),
    effect: createEffect(async ({ gender, params: [params, ctrl] }: { gender: Section; params: FxParams<Params> }) => {
      const result = await fetchCatalogWithFilters({
        signal: ctrl.signal,
        body: createParams({ gender, ...params }),
      });

      return {
        items: result.items,
        itemsCount: +result.itemsCount,
      };
    }),
  }),
});

export const widgetSimilarQuery = createQuery({
  initialData: [],
  handler: async ([{ codes }, ctrl]: FxParams<{ codes: string[] }>) => {
    const rs = await fetchItemsByCodes({
      signal: ctrl.signal,
      body: {
        codes,
        searchParams: { inStock: true, pageSize: '60' },
      },
    });

    return rs.item;
  },
});
