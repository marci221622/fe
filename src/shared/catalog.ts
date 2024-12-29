import { createEffect } from 'effector';
import { Params } from 'react-router-dom';

import { GrpcWebError } from '@/generated/customer_hub/customer-hub-service';
import {
  CatalogFilter,
  CatalogFilter_Type,
  CatalogFilter_Value,
} from '@/generated/customer_hub/entities/catalog_filter.v1';
import { CatalogSort } from '@/generated/customer_hub/entities/catalog_sort.v1';
import { SearchFilter } from '@/generated/customer_hub/entities/search_filter.v1';
import { SearchParams } from '@/generated/customer_hub/entities/search_params.v1';
import { Slug } from '@/generated/customer_hub/entities/slug.v1';
import { SearchFilterType } from '@/generated/customer_hub/enums/search_filter_type';
import { Section } from '@/generated/customer_hub/enums/section';
import { Sort } from '@/generated/customer_hub/enums/sort';
import { GetItemsResponse } from '@/generated/customer_hub/methods/catalog/get_items.v1';
import { RequestParams, RequestReturn } from '@/shared/request';
import { authRequestFx } from '@/shared/session';

import { filtersCodes, filterCodeToReaddableCode, CATALOG_SIZE, PRICE_SEPARATOR } from '@/constants/hardcode';

// Оказывается каталоги можно использовать в любой фиче
// Что бы не было связей - вынес это в shared

export type ClientCatalogFilter = Omit<CatalogFilter, 'type'> & {
  type: CatalogFilter_Type | 'sort';
};

export type FiltersScheme = Record<string, ClientCatalogFilter>;

export type CatalogWithFiltersResponse = Omit<GetItemsResponse, 'filters'> & {
  filters: FiltersScheme;
};

type FilterToReqResult = {
  filters: SearchFilter[];
  sort?: Sort;
  menuCodes: string[];
  collections: string[];
  fulltext?: string;
};

export function sortsToCatalogFilter(sorts?: CatalogSort[]): ClientCatalogFilter {
  return {
    code: 'sort' as const,
    values: (sorts ?? []).reduce(
      (acc, it) => [
        ...acc,
        {
          code: String(it.code),
          label: it.title,
          properties: [],
          selected: it.selected,
          priority: 0,
          itemsCount: '0',
          children: [],
        },
      ],
      [] as CatalogFilter_Value[],
    ),
    type: 'sort',
    priority: 0,
    title: 'Сортировка',
  };
}

export function queryToRequest(query: Record<string, string> = {}) {
  return Object.keys(query).reduce(
    (acc, filter) => {
      if (query[filter]) {
        switch (filter) {
          case filtersCodes.sort:
            if (query[filter]) {
              acc.sort = Number(query[filter]);
            }
            break;

          case filtersCodes.price: {
            const [min, max] = (query[filter] ?? '').split(PRICE_SEPARATOR);

            if (min && max) {
              acc.filters.push({
                code: filter,
                values: [],
                rangeValue: { min, max },
                type: SearchFilterType.SEARCH_FILTER_TYPE_RANGE,
              });
            }
            break;
          }

          case filtersCodes.collections:
            query[filter].split(',').forEach(it => {
              const [col, menu] = it.split('+');

              if (col) {
                acc.collections.push(col);
              }

              if (menu) {
                acc.menuCodes.push(menu);
              }
            });
            break;

          case filtersCodes.search:
            acc.fulltext = String(query[filter]);
            break;

          case filtersCodes.toggles:
            query[filter].split(',').forEach(code => {
              acc.filters.push({
                code,
                values: [code],
                type: SearchFilterType.SEARCH_FILTER_TYPE_SWITCHABLE,
              });
            });

            break;

          default:
            if (filter.toLocaleLowerCase().startsWith('filter-')) {
              // @ts-ignore
              acc.filters.push({
                code: filter,
                values: query[filter].split(','),
              });
            }
        }
      }

      return acc;
    },
    { filters: [], collections: [], menuCodes: [], fulltext: undefined } as FilterToReqResult,
  );
}

export function convertQueriesToRequest({
  query,
  params,
  gender,
  slug,
}: {
  query?: Record<string, string>;
  params?: Readonly<Params<string>>;
  gender: Section;
  slug?: Slug;
}) {
  const { sort, filters, collections, menuCodes, fulltext } = queryToRequest(query);

  const collByParams = collections?.length > 0 ? collections : [params?.collection ?? ''].filter(Boolean);

  return {
    pageToken: query?.page ?? '',
    searchParams: {
      sort,
      ...(!slug
        ? {
            rootMenuCode: params?.menuCode,
          }
        : {}),
      collections: collByParams,
      currentMenuCodes: menuCodes,
      filters,
      brands: [params?.brandCode].filter(Boolean) as string[],
      sections: [gender],
      pageSize: CATALOG_SIZE,
      fulltext,
      slug,
    } as SearchParams,
  };
}

export const fetchCatalogWithFilters = createEffect<
  Omit<RequestParams<'GetItems'>, 'method'>,
  CatalogWithFiltersResponse,
  GrpcWebError
>(async params => {
  const rs = (await authRequestFx({
    method: 'GetItems',
    body: params.body,
    signal: params.signal,
    mock: params.mock,
  })) as Await<RequestReturn<'GetItems'>>;

  const acc = {} as FiltersScheme;

  if (rs.filters.length > 0 && +rs.itemsCount > 1) {
    acc.sort = sortsToCatalogFilter(rs.sorts);
  }

  const isAloneSidebarItems = rs.menuItems.length === 1 && rs.menuItems[0].categories.length === 0;
  const filters = rs.filters.reduce((acc, filter) => {
    if (filter.type === CatalogFilter_Type.CATEGORY && filter.title) {
      return {
        ...acc,
        [filtersCodes.categoryFilter]: filter,
      };
    }

    if (filter.type === CatalogFilter_Type.SWITCHABLE && filter.title) {
      return {
        ...acc,
        [filter.code]: filter,
      };
    }

    return filter.title
      ? {
          ...acc,
          [filterCodeToReaddableCode[filter.code] ?? filter.code]: filter,
        }
      : acc;
  }, acc);

  return {
    ...rs,
    menuItems: isAloneSidebarItems ? [] : rs.menuItems,
    filters,
  };
});
