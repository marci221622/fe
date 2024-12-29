
import { CatalogFilter_Value } from '@/generated/customer_hub/entities/catalog_filter.v1';
import { Category } from '@/generated/customer_hub/entities/category.v1';
import { Sort } from '@/generated/customer_hub/enums/sort';
import { ClientCatalogFilter } from '@/shared/catalog';

import { PRICE_SEPARATOR, filtersCodes } from '@/constants/hardcode';

import { DraftFilters } from './types';

export const getCodesFromFilters = (filter: ClientCatalogFilter) =>
  filter.values.filter(it => it.selected).map(it => it.code);

export function prepareFiltersToSearch(state: DraftFilters) {
  const rs = Object.keys(state).reduce((acc, key) => {
    if (state[key]) {
      switch (key) {
        case filtersCodes.page: {
          return acc;
        }

        case filtersCodes.price: {
          const [range] = state[key];

          if (range && range.selectedRange?.max && range.selectedRange?.min) {
            return {
              ...acc,
              [key]: `${range.selectedRange.min}${PRICE_SEPARATOR}${range.selectedRange.max}`,
            };
          }

          return acc;
        }

        case filtersCodes.collections: {
          const params = state[key].join(',');

          if (params) {
            return {
              ...acc,
              [key]: params,
            };
          }

          return acc;
        }

        default: {
          const params = state[key].map(it => it.code).join(',');

          if (params) {
            return {
              ...acc,
              [key]: params,
            };
          }

          return acc;
        }
      }
    }

    return acc;
  }, {} as Record<string, string>);

  return rs;
}

export function validateFiltersToSearch(query: Record<string, string | void>) {
  return Object.keys(query).reduce((acc, key) => {
    switch (key) {
      case filtersCodes.page: {
        return acc;
      }

      case filtersCodes.sort: {
        const values = query[key];

        if (values && Number(values) !== Sort.SORT_PRESORTED) {
          return {
            ...acc,
            [key]: values,
          };
        }

        return acc;
      }

      case filtersCodes.price: {
        const values = query[key] ?? '';
        const [min, max] = values.split(PRICE_SEPARATOR);

        if (min && max) {
          return {
            ...acc,
            [key]: values,
          };
        }

        return acc;
      }

      default: {
        const values = query[key];

        if (values && key) {
          return {
            ...acc,
            [key]: values,
          };
        }

        return acc;
      }
    }
  }, {} as Record<string, string>);
}

export function getKeyFromCategory(category: Category) {
  return `${category.collectionCode}+${category.menuCode}`;
}

export function getValuesFromFilters(filter: CatalogFilter_Value[] | string[]) {
  if (filter.length === 0) {
    return null;
  }

  if (typeof filter[0] === 'string') {
    return filter.join(',');
  }

  return (filter as CatalogFilter_Value[]).map(filter => filter.label).join(',');
}
