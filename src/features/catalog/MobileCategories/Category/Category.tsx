import { useUnit } from 'effector-react';
import React, { FC, useMemo } from 'react';

import { Category } from '@/generated/customer_hub/entities/category.v1';

import { filtersCodes } from '@/constants/hardcode';

import { usePopupState } from '@/lib/hooks';

import { Tag } from '@/ui/index';

import { useOpenedEvent } from '../../Filters/analytics';
import { useLocalFilters } from '../../Filters/ControllProvider';
import { getKeyFromCategory } from '../../Filters/helpers';
import { Popup } from '../../Filters/Pane';
import { pickAllSelected, restoreParent } from '../../Filters/tree';
import { catalogAnalytics } from '../../models';

import { Content } from './Content';

function CategoryNested({
  category,
  defaultPrev,
  root,
}: {
  category: Category;
  defaultPrev?: Category;
  root: Category;
}) {
  const { isOpen, closePopup, openPopup } = usePopupState();
  const { actions } = useLocalFilters(filtersCodes.collections);
  const onResetSingle = useUnit(catalogAnalytics.resetSingleFilter);

  const prevTitles = useMemo(() => restoreParent(root, category), [category, root]);

  const { open } = useOpenedEvent({ title: category.title, openPopup, prevTitles });

  const needResetToPrevCategory = category.categories.length === 0;

  const onTagClicked = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();

    if (needResetToPrevCategory && defaultPrev) {
      actions.apply([getKeyFromCategory(defaultPrev)], filtersCodes.collections);
      onResetSingle({
        ctx: 'toggle',
        content: category.title,
      });
    } else {
      open();
    }
  };

  return (
    <Popup
      tag={
        <Tag
          title={category.title}
          onClick={onTagClicked}
          isToggle={needResetToPrevCategory}
          active={category.selected}
        />
      }
      isOpen={isOpen}
      closePopup={closePopup}
      label={category.title}
      type="collections"
      withHeader={false}
      hasFilters={false}
    >
      <Content category={category} closePopup={closePopup} />
    </Popup>
  );
}

export const CategoryPane: FC<{ category: Category }> = ({ category }) => {
  const transformed = useMemo(() => {
    const selected = pickAllSelected(category.categories);

    return {
      selected,
      prevCategoriesMap: [category, ...selected],
    };
  }, [category]);

  return (
    <>
      <CategoryNested category={category} root={category} />

      {transformed.selected.map((sibiling, idx) => (
        <CategoryNested
          key={sibiling.collectionCode}
          root={category}
          category={sibiling}
          defaultPrev={transformed.prevCategoriesMap[idx]}
        />
      ))}
    </>
  );
};
