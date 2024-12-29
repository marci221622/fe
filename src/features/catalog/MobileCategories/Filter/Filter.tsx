import { useUnit } from 'effector-react';
import React, { FC, useMemo } from 'react';

import { CatalogFilter_Value } from '@/generated/customer_hub/entities/catalog_filter.v1';

import { filtersCodes } from '@/constants/hardcode';

import { usePopupState } from '@/lib/hooks';

import { Tag } from '@/ui/index';

import { useOpenedEvent } from '../../Filters/analytics';
import { useLocalFilters } from '../../Filters/ControllProvider';
import { Popup } from '../../Filters/Pane';
import { pickAllSelectedFromFilter, restoreParentFromFilter } from '../../Filters/tree';
import { catalogAnalytics } from '../../models';

import { Content } from './Content';

function FilterNested({
  value,
  defaultPrev,
  root,
}: {
  value: CatalogFilter_Value;
  defaultPrev?: CatalogFilter_Value;
  root: CatalogFilter_Value;
}) {
  const { isOpen, closePopup, openPopup } = usePopupState();
  const { actions } = useLocalFilters(filtersCodes.categoryFilter);
  const onResetSingle = useUnit(catalogAnalytics.resetSingleFilter);

  const prevTitles = useMemo(() => restoreParentFromFilter(root, value), [value, root]);

  const { open } = useOpenedEvent({ title: value.label, openPopup, prevTitles });

  const needResetToPrevCategory = value.children.length === 0;

  const onTagClicked = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();

    if (needResetToPrevCategory && defaultPrev) {
      actions.apply([defaultPrev], filtersCodes.categoryFilter);
      onResetSingle({
        ctx: 'toggle',
        content: value.label,
      });
    } else {
      open();
    }
  };

  return (
    <Popup
      tag={
        <Tag title={value.label} onClick={onTagClicked} isToggle={needResetToPrevCategory} active={value.selected} />
      }
      isOpen={isOpen}
      closePopup={closePopup}
      label={value.label}
      type="collections"
      withHeader={false}
      hasFilters={false}
    >
      <Content value={value} closePopup={closePopup} />
    </Popup>
  );
}

export const FilterPane: FC<{ filter: CatalogFilter_Value }> = ({ filter }) => {
  const transformed = useMemo(() => {
    const selected = pickAllSelectedFromFilter(filter.children);

    return {
      selected,
      prevCategoriesMap: [filter, ...selected],
    };
  }, [filter]);

  return (
    <>
      <FilterNested value={filter} root={filter} />

      {transformed.selected.map((sibiling, idx) => (
        <FilterNested
          key={sibiling.code}
          root={filter}
          value={sibiling}
          defaultPrev={transformed.prevCategoriesMap[idx]}
        />
      ))}
    </>
  );
};
