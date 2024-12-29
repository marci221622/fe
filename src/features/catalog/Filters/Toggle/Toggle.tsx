import { useUnit } from 'effector-react';

import { CatalogFilter_Value } from '@/generated/customer_hub/entities/catalog_filter.v1';
import { Category } from '@/generated/customer_hub/entities/category.v1';

import { filtersCodes } from '@/constants/hardcode';

import { Tag } from '@/ui/index';

import { catalogAnalytics } from '../../models';
import { useLocalFilters } from '../ControllProvider';
import { getKeyFromCategory } from '../helpers';

export const CategoryToggle = ({ category }: { category: Category }) => {
  const { actions, draftFilters } = useLocalFilters(filtersCodes.collections);
  const onResetSingle = useUnit(catalogAnalytics.resetSingleFilter);

  return (
    <Tag
      active={category.selected}
      title={category.title}
      isToggle
      onClick={event => {
        event.preventDefault();

        const key = getKeyFromCategory(category);

        actions.apply(
          category.selected ? draftFilters.filter(it => it !== key) : [...draftFilters, key],
          filtersCodes.collections,
        );

        if (category.selected) {
          onResetSingle({
            ctx: 'toggle',
            content: category.title,
          });
        }
      }}
    />
  );
};

export const CategoryFormFilterToggle = ({
  filter,
  allFiltersAreToggles,
}: {
  filter: CatalogFilter_Value;
  allFiltersAreToggles?: boolean;
}) => {
  const { actions, draftFilters } = useLocalFilters(filtersCodes.categoryFilter);
  const onResetSingle = useUnit(catalogAnalytics.resetSingleFilter);

  const onAction = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();

    const key = filter.code;

    if (allFiltersAreToggles) {
      actions.apply(
        filter.selected ? draftFilters.filter(it => it.code !== key) : [...draftFilters, filter],
        filtersCodes.categoryFilter,
      );
    } else {
      actions.apply(
        filter.selected ? draftFilters.filter(it => it.code !== key) : [filter],
        filtersCodes.categoryFilter,
      );
    }

    if (filter.selected) {
      onResetSingle({
        ctx: 'toggle',
        content: filter.label,
      });
    }
  };

  return <Tag active={filter.selected} title={filter.label} onClick={onAction} isToggle />;
};