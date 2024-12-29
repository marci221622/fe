import { useLingui } from '@lingui/react';
import { useUnit } from 'effector-react';
import { FC, useEffect, useRef, useState } from 'react';

import { CatalogFilter_Value } from '@/generated/customer_hub/entities/catalog_filter.v1';
import { ClientCatalogFilter } from '@/shared/catalog';

import { usePopupState, useScrollIntoView } from '@/lib/hooks';

import { Tag } from '@/ui/index';

import { catalogAnalytics } from '../../models';
import { useOpenedEvent } from '../analytics';
import { useLocalFilters } from '../ControllProvider';
import { Popup } from '../Pane';

import { Content } from './Content';

export const BrandsFilter: FC<ClientCatalogFilter> = filter => {
  const { i18n } = useLingui();
  const popupRef = useRef(null);
  const { isOpen, closePopup, openPopup } = usePopupState();
  const { draftFilters } = useLocalFilters(filter.code);
  const [filters, setFilters] = useState<CatalogFilter_Value[]>(draftFilters);
  const onSignleReset = useUnit(catalogAnalytics.resetSingleFilter);
  const { open } = useOpenedEvent({ title: filter.title, openPopup });

  const draftActiveCounter = draftFilters.length;
  const activeFiltersCounter = filters.length;
  const label = draftActiveCounter > 0 ? `${filter.title} (${draftActiveCounter})` : filter.title;
  const handleReset = () => {
    setFilters([]);
    onSignleReset({
      ctx: 'popup',
      content: filters.map(it => it.label).join('|'),
    });
  };

  useEffect(() => {
    setFilters(draftFilters);
  }, [draftFilters]);

  useScrollIntoView(popupRef, isOpen);

  return (
    <Popup
      fullScreen
      tag={<Tag title={label} onClick={open} isSortable={filter.type === 'sort'} active={draftActiveCounter > 0} />}
      isOpen={isOpen}
      closePopup={closePopup}
      hasFilters={activeFiltersCounter > 0}
      label={filter.title}
      type={filter.type}
      onReset={handleReset}
      ref={popupRef}
    >
      <Content {...filter} closePopup={closePopup} setFilters={setFilters} filters={filters} />
    </Popup>
  );
};
