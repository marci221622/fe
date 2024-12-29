import { useLingui } from '@lingui/react';
import { useUnit } from 'effector-react';
import { FC, useEffect, useRef, useState } from 'react';

import { ClientCatalogFilter } from '@/shared/catalog';

import { COIN_WEIGHT } from '@/constants/hardcode';

import { usePopupState, useScrollIntoView } from '@/lib/hooks';
import { toNumber, createRangeLabel } from '@/lib/string';

import { Tag } from '@/ui/index';

import { catalogAnalytics } from '../../models';
import { useOpenedEvent } from '../analytics';
import { useLocalFilters } from '../ControllProvider';
import { Popup } from '../Pane';

import { Content } from './Content';

export const Price: FC<ClientCatalogFilter> = filter => {
  const { i18n } = useLingui();
  const popupRef = useRef(null);
  const { isOpen, closePopup, openPopup } = usePopupState();
  const { draftFilters } = useLocalFilters(filter.code);
  // фильтры которые меняем в рамках компонента
  // после применения попадет в драфт
  const [filters, setFilters] = useState(draftFilters);
  const onSignleReset = useUnit(catalogAnalytics.resetSingleFilter);
  const { open } = useOpenedEvent({ title: filter.title, openPopup });

  const rangeBoundaries = {
    min: draftFilters[0]?.range?.min || '0',
    max: draftFilters[0]?.range?.max || '0',
  };

  const clientActiveRange = {
    min: draftFilters[0]?.selectedRange?.min || '0',
    max: draftFilters[0]?.selectedRange?.max || '0',
  };

  const label = createRangeLabel({ title: filter.title, maxRange: rangeBoundaries, selectedRange: clientActiveRange });

  const draftActiveCounter = draftFilters.length;

  const [priceFromServer] = filter.values;

  const hasActiveFilters =
    filters.length > 0 &&
    ((!!filters[0]?.selectedRange?.min &&
      toNumber(filters[0]?.selectedRange?.min) * COIN_WEIGHT !== toNumber(priceFromServer.range?.min)) ||
      (!!filters[0]?.selectedRange?.max &&
        toNumber(filters[0]?.selectedRange?.max) * COIN_WEIGHT !== toNumber(priceFromServer.range?.max)));

  const handleReset = () => {
    const [currentFilter] = filters;

    setFilters([
      {
        ...currentFilter,
        selectedRange: {
          min: '',
          max: '',
        },
      },
    ]);

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
      tag={<Tag title={label} onClick={open} isSortable={filter.type === 'sort'} active={draftActiveCounter > 0} />}
      isOpen={isOpen}
      closePopup={closePopup}
      hasFilters={hasActiveFilters}
      label={filter.title}
      type={filter.type}
      onReset={handleReset}
      ref={popupRef}
    >
      <Content {...filter} closePopup={closePopup} filters={filters} setFilters={setFilters} />
    </Popup>
  );
};
