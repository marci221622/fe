import { plural } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useUnit } from 'effector-react';
import { useEffect, useMemo } from 'react';
import { useIsomorphicLayoutEffect } from 'react-spring';

import { CatalogFilter_Value } from '@/generated/customer_hub/entities/catalog_filter.v1';
import { ClientCatalogFilter } from '@/shared/catalog';
import { $mappedStrings } from '@/shared/configs';

import { COIN_WEIGHT } from '@/constants/hardcode';

import { useViewport } from '@/lib/hooks';
import { moneyToPrice, toNumber } from '@/lib/string';
import { LOADING_STATUS } from '@/lib/useRequest';

import { Button, MaskedInput } from '@/ui/index';

import { catalogAnalytics } from '../../models';
import { useLocalFilters } from '../ControllProvider';
import { useCounter } from '../useCounter';

import st from './styles.module.scss';

export const Content = ({
  closePopup,
  setFilters,
  filters,
  values,
  code,
}: ClientCatalogFilter & {
  closePopup: () => void;
  setFilters: (values: CatalogFilter_Value[]) => void;
  filters: CatalogFilter_Value[];
}) => {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();
  const { actions, draftFilters, filtersFromServer, baseCounter } = useLocalFilters(code);
  const { isDesktop } = useViewport();

  const onApplyFiltersGtm = useUnit(catalogAnalytics.applyFilters);

  const [priceFromServer] = values;
  const [currentFilter] = filters;

  const initialRange = priceFromServer.range;
  const userSelectedRage = priceFromServer.selectedRange;
  const drafRange = currentFilter?.selectedRange;

  const rangeBoundaries = {
    min: (initialRange?.min && initialRange.min) || '0',
    max: (initialRange?.max && initialRange.max) || '0',
  };

  const clientActiveRange = {
    min: (userSelectedRage?.min && userSelectedRage.min) || '',
    max: (userSelectedRage?.max && userSelectedRage.max) || '',
  };

  const minValue = drafRange?.min ?? '';
  const maxValue = drafRange?.max ?? '';

  // Выбрать значени
  // 1 - макс из инпута + ренж сервера (меньше ввести не даем)
  // 2 - мин из п1 и макс ренжа сервере (больше выбрать не даем)
  const nextMinValue = Math.min(
    Math.max(toNumber(minValue), toNumber(rangeBoundaries.min) / COIN_WEIGHT),
    toNumber(rangeBoundaries.max) / COIN_WEIGHT,
  );
  // с макс все проще
  // тут только мин из инпута + ренж сервера
  const nextMaxValue = Math.min(toNumber(maxValue) || Infinity, toNumber(rangeBoundaries.max) / COIN_WEIGHT);

  const { counter, status } = useCounter({
    code,
    comparator: ([prev], [next]) =>
      prev.selectedRange?.min !== next.selectedRange?.min || prev.selectedRange?.max !== next.selectedRange?.max,
    filters: useMemo(
      () => ({
        ...filtersFromServer,
        [code]: [
          {
            ...filters[0],
            selectedRange: {
              max: (nextMaxValue * COIN_WEIGHT).toString(),
              min: (nextMinValue * COIN_WEIGHT).toString(),
            },
          },
        ],
      }),
      [code, filters, filtersFromServer, nextMaxValue, nextMinValue],
    ),
  });

  const productsCounter = counter ?? baseCounter;

  const disabledAction = status === LOADING_STATUS.loading || productsCounter === 0;

  const changeRange = (value: string, type: 'min' | 'max') => {
    setFilters([
      {
        ...priceFromServer,
        selectedRange: {
          min: type === 'min' ? value : minValue,
          max: type === 'max' ? value : maxValue,
        },
      },
    ]);
  };

  const onApply = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!disabledAction && currentFilter) {
      e.stopPropagation();
      closePopup();

      const pricesAreRangeValues =
        nextMinValue === toNumber(rangeBoundaries.min) / COIN_WEIGHT &&
        nextMaxValue === toNumber(rangeBoundaries.max) / COIN_WEIGHT;

      actions.apply(
        pricesAreRangeValues
          ? []
          : [
              {
                ...currentFilter,
                selectedRange: {
                  min: (nextMinValue * COIN_WEIGHT).toString(),
                  max: (nextMaxValue * COIN_WEIGHT).toString(),
                },
              },
            ],
        code,
      );

      onApplyFiltersGtm({
        title: 'Цена',
        code,
        ctx: 'column',
        values: `${nextMinValue * COIN_WEIGHT}|${nextMaxValue * COIN_WEIGHT}`,
      });
    }
  };

  // Начальный стейт
  useIsomorphicLayoutEffect(() => {
    setFilters([
      {
        ...priceFromServer,
        selectedRange: {
          min: clientActiveRange.min ? `${toNumber(clientActiveRange.min) / COIN_WEIGHT}` : '',
          max: clientActiveRange.max ? `${toNumber(clientActiveRange.max) / COIN_WEIGHT}` : '',
        },
      },
    ]);
  }, [clientActiveRange.max, clientActiveRange.min, priceFromServer, setFilters]);

  useEffect(() => {
    return () => {
      setFilters(draftFilters);
    };
  }, [draftFilters, setFilters]);

  return (
    <div className={st.PriceFilterWrapper}>
      <div className={st.list}>
        <MaskedInput
          Prefix="от"
          maskProps={{ mask: { type: 'currency' } }}
          placeholder={moneyToPrice(rangeBoundaries.min)}
          value={minValue}
          onChange={e => changeRange(e.target.value, 'min')}
          closable={minValue?.length > 0}
        />
        <MaskedInput
          Prefix="до"
          maskProps={{ mask: { type: 'currency' } }}
          placeholder={moneyToPrice(rangeBoundaries.max)}
          value={maxValue}
          onChange={e => changeRange(e.target.value, 'max')}
          closable={maxValue?.length > 0}
        />
      </div>

      <div className={st.footer}>
        <Button
          bold
          stretch
          className={st.counterButton}
          onClick={onApply}
          disabled={disabledAction}
          colored={!isDesktop}
        >
          {texts.web.reveal}{' '}
          {plural(productsCounter, {
            one: '# товар',
            few: '# товара',
            other: '# товаров',
          })}
        </Button>
      </div>
    </div>
  );
};
