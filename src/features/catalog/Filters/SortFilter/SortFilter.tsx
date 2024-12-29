import { useLingui } from '@lingui/react';
import { FC, useMemo } from 'react';

import { Category } from '@/generated/customer_hub/entities/category.v1';
import { Sort, sortFromJSON } from '@/generated/customer_hub/enums/sort';
import { ClientCatalogFilter } from '@/shared/catalog';

import { usePopupState } from '@/lib/hooks';

import { Tag } from '@/ui/index';

import { useOpenedEvent } from '../analytics';
import { useLocalFilters } from '../ControllProvider';
import { Popup } from '../Pane';
import { pickAllSelected } from '../tree';

import { Content } from './Content';

import st from './styles.module.scss';

export const SortFilter: FC<ClientCatalogFilter & { categories: Category[] }> = ({ categories, ...filter }) => {
  const { i18n } = useLingui();
  const { isOpen, closePopup, openPopup } = usePopupState();
  const { draftFilters } = useLocalFilters(filter.code);

  const prevTitles = useMemo(() => pickAllSelected(categories)?.map(it => it.title) ?? ([] as string[]), [categories]);

  const activeValue = draftFilters[0];

  const sortType = activeValue ? sortFromJSON(Number(activeValue.code)) : Sort.SORT_PRESORTED;
  const defaultF = filter.values.find(it => Number(it.code) === Sort.SORT_PRESORTED);
  const sortLabel = activeValue?.label ?? defaultF?.label;
  const active = sortType !== Sort.SORT_PRESORTED;

  const { open } = useOpenedEvent({ title: sortLabel ?? '', prevTitles, isSorting: true, openPopup });

  return (
    <Popup
      tag={<Tag title={sortLabel} onClick={open} isSortable={filter.type === 'sort'} active={active} />}
      isOpen={isOpen}
      closePopup={closePopup}
      menuClassName={st.menu}
      hasFilters={false}
      label={filter.title}
      type={filter.type}
    >
      <Content {...filter} closePopup={closePopup} prevTitles={prevTitles} />
    </Popup>
  );
};
