import { Store } from 'effector';
import { useUnit } from 'effector-react';

import { Category } from '@/generated/customer_hub/entities/category.v1';
import { FiltersScheme } from '@/shared/catalog';

import { filtersCodes } from '@/constants/hardcode';

import { useLocalFilters } from '../Filters/ControllProvider';
import { getKeyFromCategory } from '../Filters/helpers';
import { CategoryToggle, CategoryFormFilterToggle } from '../Filters/Toggle';
import { useMobileCategoriesFilters } from '../Filters/useFilters';

import { CategoryPane } from './Category';
import { FilterPane } from './Filter';

import st from './styles.module.scss';

type Props = {
  $categories: Store<Category[]>;
  $scheme: Store<FiltersScheme>;
};

export function MobileCategoriesList({ $categories, $scheme }: Props) {
  const { categories, scheme } = useUnit({ categories: $categories, scheme: $scheme });
  const { categorySortMap, categoryFromFilterSortMap } = useLocalFilters(filtersCodes.collections);
  const { listFromFilter, categoryFromMenuList } = useMobileCategoriesFilters({
    categories,
    categorySortMap,
    scheme,
    categoryFromFilterSortMap,
  });

  const listFromFiltersAreToggles = listFromFilter.every(it => it.children.length === 0);

  if (categoryFromMenuList.length > 0) {
    return (
      <div className={st.wrapper}>
        {categoryFromMenuList.map(item => {
          if (item.type === 'collections') {
            const filterElement =
              item.filter.categories?.length > 0 ? (
                <CategoryPane category={item.filter} key={`${getKeyFromCategory(item.filter)}/pane`} />
              ) : (
                <CategoryToggle category={item.filter} key={`${getKeyFromCategory(item.filter)}/toggle`} />
              );

            return filterElement;
          }

          return null;
        })}
      </div>
    );
  }

  return (
    <div className={st.wrapper}>
      {listFromFilter.map(it =>
        it.children.length > 0 ? (
          <FilterPane key={it.code} filter={it} />
        ) : (
          <CategoryFormFilterToggle key={it.code} filter={it} allFiltersAreToggles={listFromFiltersAreToggles} />
        ),
      )}
    </div>
  );
}
