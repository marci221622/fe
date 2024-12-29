import { useMemo } from 'react';

import { CatalogFilter_Value } from '@/generated/customer_hub/entities/catalog_filter.v1';
import { Category } from '@/generated/customer_hub/entities/category.v1';
import { ClientCatalogFilter, FiltersScheme } from '@/shared/catalog';

import { TITLE_TO_REMOVALE, filtersCodes } from '@/constants/hardcode';

import { AdditionalFiltersSorting } from './ControllProvider/sorting';
import { getKeyFromCategory } from './helpers';

type CommonFilter = { type: 'common'; filter: ClientCatalogFilter };
type CollectionFilter = { type: 'collections'; filter: Category };

export function useFilters({
  filters,
  additionalSortMap,
  hasCategories,
  hasCategoryFromFilters,
}: {
  filters: FiltersScheme;
  additionalSortMap: AdditionalFiltersSorting;
  hasCategories?: boolean;
  hasCategoryFromFilters?: boolean;
}) {
  const { color, size, sort, brands, state, [filtersCodes.categoryFilter]: categoryFilter, ...toggles } = filters;

  const main = useMemo(() => {
    const mobileFilters: CommonFilter[] = [{ type: 'common', filter: Array.isArray(sort) ? sort[0] : sort }];
    const desktopFilters: CommonFilter[] = [{ type: 'common', filter: Array.isArray(sort) ? sort[0] : sort }];

    if (brands && brands.values.length > 0) {
      desktopFilters.push({ type: 'common', filter: Array.isArray(brands) ? brands[0] : brands });
      mobileFilters.push({ type: 'common', filter: Array.isArray(brands) ? brands[0] : brands });
    }

    return {
      mobileFilters: mobileFilters.filter(it => !!it.filter),
      desktopFilters: desktopFilters.filter(it => !!it.filter),
    };
  }, [brands, sort]);

  const additional = useMemo(() => {
    const filters: CommonFilter[] = [];
    const togglesKeys = Object.keys(toggles);

    if (color?.values?.length > 0) {
      filters.push({ type: 'common', filter: color });
    }

    if (size?.values?.length > 0) {
      filters.push({ type: 'common', filter: size });
    }

    if (state?.values?.length > 0) {
      filters.push({ type: 'common', filter: state });
    }

    if (togglesKeys.length > 0) {
      togglesKeys.forEach(key => {
        filters.push({ type: 'common', filter: toggles[key] });
      });
    }

    return (
      filters
        .sort((x, y) => Number(x.filter.priority) - Number(y.filter.priority))
        // доп фильтры из урла не просортировать
        // по этому сделал через доп мапу
        // Которая синхронизируется с контекстом фильтров
        .sort(
          (x, y) =>
            (additionalSortMap.map[x.filter.code] ?? Infinity) - (additionalSortMap.map[y.filter.code] ?? Infinity),
        )
    );
  }, [additionalSortMap.map, color, size, state, toggles]);

  const nextDesktopFilters = [...main.desktopFilters, ...(additional ?? [])];
  let nextMobileFilters = main.mobileFilters;

  if (!hasCategories && !hasCategoryFromFilters) {
    nextMobileFilters = [...main.mobileFilters, ...(additional ?? [])];
  }

  return {
    main: { desktopFilters: nextDesktopFilters, mobileFilters: nextMobileFilters },
    additional,
    needToShowAdditionals: hasCategories || hasCategoryFromFilters,
  };
}

export function useMobileCategoriesFilters({
  categories,
  scheme,
  categorySortMap,
  categoryFromFilterSortMap,
}: {
  categories: Category[];
  categorySortMap: Record<string, number>;
  categoryFromFilterSortMap: Record<string, number>;
  scheme: FiltersScheme;
}) {
  const openedCategories = categories.length === 1 ? categories[0].categories : categories;
  const { [filtersCodes.categoryFilter]: categoriesFromScheme } = scheme;

  const main = useMemo(() => {
    const mobileFilters: CollectionFilter[] = [];
    const hasCategories = openedCategories.length > 0;

    if (hasCategories) {
      const isToogles = openedCategories.every(it => it.categories.length === 0);

      [...openedCategories]
        .filter(it => +it.itemsCount > 0 && it.title !== TITLE_TO_REMOVALE)
        .sort((x, y) => Number(x.position) - Number(y.position))
        .sort((x, y) => {
          if (!isToogles) {
            return Number(y.selected) - Number(x.selected);
          }

          return (
            (categorySortMap[getKeyFromCategory(x)] ?? Infinity) - (categorySortMap[getKeyFromCategory(y)] ?? Infinity)
          );
        })
        .forEach(filter => mobileFilters.push({ type: filtersCodes.collections, filter }));
    }

    return mobileFilters.filter(it => !!it.filter);
  }, [categorySortMap, openedCategories]);

  const listFromFilter = useMemo(() => {
    const mobileFilters: CatalogFilter_Value[] = [];

    if (
      categoriesFromScheme &&
      (categoriesFromScheme.values.length === 1
        ? categoriesFromScheme.values[0].children.length > 0
        : categoriesFromScheme.values.length > 0)
    ) {
      const { values } = categoriesFromScheme;

      const isToogles = values.every(it => it.children.length === 0);

      values
        .sort((x, y) => +x.priority - +y.priority)
        .sort((x, y) => {
          if (!isToogles) {
            return Number(y.selected) - Number(x.selected);
          }

          return (categoryFromFilterSortMap[x.code] ?? Infinity) - (categoryFromFilterSortMap[y.code] ?? Infinity);
        })
        .forEach(filter => mobileFilters.push(filter));
    }

    return mobileFilters;
  }, [categoriesFromScheme, categoryFromFilterSortMap]);

  return { categoryFromMenuList: main, listFromFilter };
}

// Для десктопа заменя в сайдбар через фильтры
export function useSidebar({ scheme, categories }: { scheme: FiltersScheme; categories: Category[] }) {
  const { [filtersCodes.categoryFilter]: categoryFilter } = scheme;

  return {
    categoryFilter: categories.length === 0 ? categoryFilter : null,
    categories: categories.length > 0 ? categories : null,
  };
}
