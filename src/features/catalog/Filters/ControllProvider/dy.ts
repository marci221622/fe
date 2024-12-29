import { useEffect } from 'react';

import { useDYFilters } from '@/shared/analytics';

import { filtersCodes } from '@/constants/hardcode';

import { getValuesFromFilters } from '../helpers';
import { DraftFilters } from '../types';

export function useDySyncWithFilters({ filtersFromServer }: { filtersFromServer: DraftFilters }) {
  const dyFiltersEvent = useDYFilters();

  useEffect(() => {
    const filterList: typeof window.FILTER_DATA = [];

    [
      { type: filtersCodes.collections, filter: filtersFromServer[filtersCodes.collections] },
      { type: filtersCodes.categoryFilter, filter: filtersFromServer[filtersCodes.categoryFilter] },
      { type: filtersCodes.brands, filter: filtersFromServer[filtersCodes.brands] },
      { type: filtersCodes.color, filter: filtersFromServer[filtersCodes.color] },
      { type: filtersCodes.size, filter: filtersFromServer[filtersCodes.size] },
      { type: filtersCodes.sort, filter: filtersFromServer[filtersCodes.sort] },
      { type: filtersCodes.toggles, filter: filtersFromServer[filtersCodes.toggles] },
    ].forEach(({ type, filter }) => {
      if (filter) {
        const filterValue = getValuesFromFilters(filter);

        if (filterValue) {
          filterList.push({ type, value: filterValue.replace('ё', 'е').split(',') });
          dyFiltersEvent({ filterField: type, value: filterValue });
        }
      }
    });

    window.FILTER_DATA = filterList;
  }, [dyFiltersEvent, filtersFromServer]);
}
