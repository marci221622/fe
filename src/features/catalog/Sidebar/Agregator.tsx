import { Store } from 'effector';
import { useUnit } from 'effector-react';

import { Category } from '@/generated/customer_hub/entities/category.v1';
import { FiltersScheme } from '@/shared/catalog';

import { useSidebar } from '../Filters/useFilters';

import { CategoryFilterSidebar } from './Filters';
import { MenuitemsSidebar } from './MenuItems/Sidebar';

type Props<T> = {
  filters: Store<T>;
};

export function Sidebar<T extends { sidebar: Category[]; filters: FiltersScheme }>({ filters }: Props<T>) {
  const state = useUnit(filters);

  const { categories, categoryFilter } = useSidebar({ scheme: state.filters, categories: state.sidebar });

  if (categories && categories.length > 0) {
    return <MenuitemsSidebar categories={categories} />;
  }

  if (categoryFilter) {
    return <CategoryFilterSidebar categoryFilter={categoryFilter} />;
  }

  return null;
}
