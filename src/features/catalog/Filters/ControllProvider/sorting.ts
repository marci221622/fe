import { useCallback, useMemo, useState } from 'react';

import { CatalogFilter_Value } from '@/generated/customer_hub/entities/catalog_filter.v1';

import { filtersCodes } from '@/constants/hardcode';

import { DraftFilters } from '../types';

export type AdditionalFiltersSorting = {
  lastid: number;
  map: Record<string, number | undefined>;
};

type Props = {
  filtersFromServer: DraftFilters;
};

const initialSorting: AdditionalFiltersSorting = {
  lastid: 1,
  map: {},
};

// Не нужно сортировать 2 фильтра
// Всегда вначале
const excludedFilters = [filtersCodes.sort, filtersCodes.brands, filtersCodes.collections, filtersCodes.categoryFilter];

function builSortingMapFromFilters(
  filtersFromServer: DraftFilters,
  { prev, id }: { id?: number; prev: AdditionalFiltersSorting },
) {
  let lastid = id ?? initialSorting.lastid;

  return {
    map: Object.keys(filtersFromServer).reduce((acc, key) => {
      if (excludedFilters.includes(key)) {
        return acc;
      }

      if (key === filtersCodes.toggles && filtersFromServer[key].length > 0) {
        filtersFromServer[key].forEach(switchable => {
          acc[switchable.code] = prev.map[switchable.code] ?? ++lastid;
        });
      } else if (filtersFromServer[key].length > 0) {
        acc[key] = prev.map[key] ?? ++lastid;
      }

      return acc;
    }, {} as Record<string, number | undefined>),
    lastid,
  };
}

export function useAdditionalSorting({ filtersFromServer }: Props) {
  const [additionalSortMap, setAdditionalSort] = useState<AdditionalFiltersSorting>(() =>
    builSortingMapFromFilters(filtersFromServer, {
      prev: initialSorting,
    }),
  );

  const onApply = useCallback((filters: CatalogFilter_Value[] | string[], field: string) => {
    if (field === filtersCodes.toggles) {
      const asValues = filters as CatalogFilter_Value[];

      setAdditionalSort(prev => {
        const nextId = prev.lastid + 1;
        const hasFilters = filters.length > 0;

        return asValues.reduce(
          (acc, switchable) => ({
            ...acc,
            map: {
              ...prev.map,
              [switchable.code]: hasFilters ? nextId : undefined,
            },
            lastid: hasFilters ? nextId : prev.lastid,
          }),
          prev,
        );
      });
    } else if (field !== filtersCodes.collections) {
      setAdditionalSort(prev => {
        const nextId = prev.lastid + 1;
        const hasFilters = filters.length > 0;

        return {
          ...prev,
          map: {
            ...prev.map,
            [field]: hasFilters ? nextId : undefined,
          },
          lastid: hasFilters ? nextId : prev.lastid,
        };
      });
    }
  }, []);

  const onReset = useCallback(() => {
    setAdditionalSort(initialSorting);
  }, []);

  const onSyncWithServer = useCallback(() => {
    setAdditionalSort(prev =>
      builSortingMapFromFilters(filtersFromServer, {
        prev,
        id: prev.lastid,
      }),
    );
  }, [filtersFromServer]);

  return {
    additionalSortMap,
    actions: useMemo(
      () => ({
        onApply,
        onReset,
        onSyncWithServer,
      }),
      [onApply, onReset, onSyncWithServer],
    ),
  };
}
