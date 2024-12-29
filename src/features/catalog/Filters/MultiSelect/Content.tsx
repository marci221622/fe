import { plural, t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { useEffect, useMemo } from 'react';

import { CatalogFilter_Value } from '@/generated/customer_hub/entities/catalog_filter.v1';
import { ClientCatalogFilter } from '@/shared/catalog';

import { filtersCodes } from '@/constants/hardcode';

import { LOADING_STATUS } from '@/lib/useRequest';

import { Button } from '@/ui/index';

import { Checked } from '@/ui/assets/icons';

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
  title,
}: ClientCatalogFilter & {
  closePopup: () => void;
  setFilters: (values: CatalogFilter_Value[]) => void;
  filters: CatalogFilter_Value[];
}) => {
  const { i18n } = useLingui();
  const { actions, draftFilters, filtersFromServer, baseCounter } = useLocalFilters(code);
  const { counter, status } = useCounter({
    code,
    filters: useMemo(() => ({ ...filtersFromServer, [code]: filters }), [code, filters, filtersFromServer]),
  });
  const onApplyFiltersGtm = useUnit(catalogAnalytics.applyFilters);

  const productsCounter = counter ?? baseCounter;
  const disabledAction = status === LOADING_STATUS.loading || productsCounter === 0;

  const onApply = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!disabledAction) {
      e.stopPropagation();

      actions.apply(filters, code);
      closePopup();
      onApplyFiltersGtm({
        title,
        code,
        ctx: 'column',
        values: filters.map(brand => brand.label).join('|'),
      });
    }
  };

  useEffect(() => {
    return () => {
      setFilters(draftFilters);
    };
  }, [draftFilters, setFilters]);

  return (
    <div className={st.wrapper}>
      <div className={st.list}>
        {values
          .filter(it => it.label)
          .map(filter => {
            const checked = !!filters.find(it => it.code === filter.code);

            return (
              <div
                key={filter.code}
                className={st.row}
                onClick={() => {
                  setFilters(checked ? filters.filter(it => it.code !== filter.code) : [...filters, filter]);
                }}
              >
                <div
                  className={cn(st.title, {
                    [st.sizeFilter]: code === filtersCodes.size,
                  })}
                >
                  {filter.label}
                </div>
                {checked && <Checked className={st.checked} />}
              </div>
            );
          })}
      </div>

      <div className={st.footer}>
        <Button className={st.counterButton} onClick={onApply} stretch disabled={disabledAction} bold>
          {t`Показать`}{' '}
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
