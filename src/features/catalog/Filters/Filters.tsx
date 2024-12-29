import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { Store } from 'effector';
import { useUnit } from 'effector-react';
import { ReactNode, useEffect, useMemo, useRef } from 'react';

import { CatalogFilter_Type } from '@/generated/customer_hub/entities/catalog_filter.v1';
import { Category } from '@/generated/customer_hub/entities/category.v1';
import { Slug } from '@/generated/customer_hub/entities/slug.v1';
import { Sort } from '@/generated/customer_hub/enums/sort';
import { headerSearchField, headerStuckedField } from '@/shared/animations';
import { ClientCatalogFilter, FiltersScheme } from '@/shared/catalog';
import { $appIsShort } from '@/shared/configs';

import { EXPECTED_FILTERS_GROUP_SEPARATOR, filterCodeToReaddableCode, filtersCodes } from '@/constants/hardcode';

import { Button, Responsive } from '@/ui/index';

import { SearchIcon } from '@/ui/assets/icons';

import { BrandsFilter } from './BrandsFilter';
import { ControlProvider, useLocalFilters } from './ControllProvider';
import { MultiSelect } from './MultiSelect';
import { Price } from './Price';
import { SortFilter } from './SortFilter';
import { SwitchableFilter } from './Switchable';
import { useFilters } from './useFilters';

import st from './styles.module.scss';

type Props<T> = {
  filters: Store<T>;
  baseCounter: number;
  categoriesList: React.JSX.Element;
  slug?: Slug;
  collection?: string;
};

function ResetFiltersButton({ device }: { device: string }) {
  const { i18n } = useLingui();
  const { allFilters, actions } = useLocalFilters('sort');
  const appIsShort = useUnit($appIsShort);

  const hasSomeFilters = useMemo(() => {
    const keys = Object.keys(allFilters);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const values = allFilters[key];

      const needToOmitFilterCode =
        device === 'desktop' && [filtersCodes.collections, filtersCodes.categoryFilter].includes(key);

      // Пропускаем фильтр который по новинкам
      // Если это свичаблы и он один (!)
      if (key === filtersCodes.toggles && values.length === 1 && appIsShort) {
        return values[0].code !== filtersCodes.filterNovetly;
      }

      if (key === 'sort' && Number(values[0]?.code) !== Sort.SORT_PRESORTED) {
        return true;
      }

      if (key !== 'sort' && values.length > 0 && !needToOmitFilterCode) {
        return true;
      }
    }

    return false;
  }, [allFilters, device, appIsShort]);

  const handleResetAllFilter = () => {
    actions.resetAll(
      device === 'desktop'
        ? ([
            filtersCodes.collections,
            filtersCodes.categoryFilter,
            // Только для корткой версии
            appIsShort && `${filtersCodes.toggles}${EXPECTED_FILTERS_GROUP_SEPARATOR}${filtersCodes.filterNovetly}`,
          ].filter(Boolean) as string[])
        : undefined,
    );
  };

  return (
    <Button
      asText
      disabled={!hasSomeFilters}
      className={cn(st.resetBtn, {
        [st.hasFilters]: hasSomeFilters,
      })}
      onClick={handleResetAllFilter}
    >{t`Сбросить`}</Button>
  );
}

function getFilter(filter: ClientCatalogFilter, categories: Category[]) {
  switch (filter.type) {
    case 'sort':
      if (filter.values.length > 0) {
        return <SortFilter {...filter} key="sort" categories={categories} />;
      }

      return null;
    case CatalogFilter_Type.BRAND:
      return <BrandsFilter {...filter} key="brands" />;
    case CatalogFilter_Type.PRICE:
      return <Price {...filter} key="price" />;
    case CatalogFilter_Type.SWITCHABLE:
      return <SwitchableFilter {...filter} key={`switch/${filter.code}`} />;
    default:
      if (filterCodeToReaddableCode[filter.code]) {
        return <MultiSelect {...filter} key={`${filter.code}/select`} />;
      }

      return null;
  }
}

function Wrapper({ children, className }: { children: ReactNode; className: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { filtersFromServer } = useLocalFilters(filtersCodes.sort);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [filtersFromServer]);

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
}

function MainFiltersList({
  filters,
  categories,
  categoriesList,
}: {
  filters: FiltersScheme;
  categories: Category[];
  categoriesList: React.JSX.Element;
}) {
  // Что обойти проблему одного фильтра на беке
  const categoryFilterIsFull =
    filters[filtersCodes.categoryFilter] &&
    (filters[filtersCodes.categoryFilter].values.length === 1
      ? filters[filtersCodes.categoryFilter].values[0].children.length > 0
      : filters[filtersCodes.categoryFilter].values.length > 1);

  const { additionalSortMap } = useLocalFilters(filtersCodes.collections);
  const transformedFilters = useFilters({
    filters,
    additionalSortMap,
    hasCategories: categories.length > 0,
    hasCategoryFromFilters: categoryFilterIsFull,
  });

  return (
    <div className={st.wrapper}>
      <Responsive.TabletAndBelow className={st.row}>
        <Wrapper className={cn(st.filters, st.categories)}>
          {transformedFilters.main.mobileFilters.map(({ type, filter }) => {
            if (type === 'common') {
              const filterElement = getFilter(filter, categories);

              return filterElement;
            }

            return null;
          })}
          {categoriesList}
          <ResetFiltersButton device="mobile" />
        </Wrapper>

        {transformedFilters.needToShowAdditionals && (
          <Wrapper className={cn(st.filters)}>
            {transformedFilters.additional.map(it => {
              if (it.type === 'common') {
                const filterElement = getFilter(it.filter, categories);

                return filterElement;
              }

              return null;
            })}
          </Wrapper>
        )}
      </Responsive.TabletAndBelow>

      <Responsive.Desktop>
        <Wrapper className={st.filters}>
          {transformedFilters.main.desktopFilters.map(({ filter, type }) => {
            if (type === 'common') {
              const filterElement = getFilter(filter, categories);

              return filterElement;
            }

            return null;
          })}

          <ResetFiltersButton device="desktop" />
        </Wrapper>
      </Responsive.Desktop>
    </div>
  );
}

// По сути эти фильтры обьеденяют общие фильтры + мобильные категории
// На десктопе сайдбар работающий по своим правилам
export function Filters<T extends { filters: Record<string, ClientCatalogFilter>; mobileCategories: Category[] }>({
  categoriesList,
  slug,
  collection,
  ...props
}: Props<T>) {
  const { filters, mobileCategories } = useUnit(props.filters);
  const search = useUnit(headerSearchField);
  const stucked = useUnit(headerStuckedField);

  return (
    <ControlProvider
      currentFilters={filters}
      categories={mobileCategories}
      baseCounter={props.baseCounter}
      slug={slug}
      collection={collection}
    >
      <MainFiltersList filters={filters} categories={mobileCategories} categoriesList={categoriesList} />
      <SearchIcon
        className={cn(st.search, {
          [st.stucked]: stucked.value,
        })}
        onClick={() => {
          stucked.onChange(false);
          search.onChange(true);
        }}
      />
    </ControlProvider>
  );
}
