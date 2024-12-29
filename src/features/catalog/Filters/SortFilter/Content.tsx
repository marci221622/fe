import { useLingui } from '@lingui/react';
import { useUnit } from 'effector-react';
import { MouseEvent } from 'react';

import { CatalogFilter_Value } from '@/generated/customer_hub/entities/catalog_filter.v1';
import { ClientCatalogFilter } from '@/shared/catalog';

import { Checked } from '@/ui/assets/icons';

import { catalogAnalytics } from '../../models';
import { useLocalFilters } from '../ControllProvider';

import st from './styles.module.scss';

export function Content({
  closePopup,
  values,
  code,
  prevTitles,
}: ClientCatalogFilter & { closePopup: () => void; prevTitles: string[] }) {
  const { i18n } = useLingui();
  const { draftFilters, actions } = useLocalFilters(code);
  const onApplyGtm = useUnit(catalogAnalytics.applySortingFilters);

  const onFilterClick = (filter: CatalogFilter_Value) => (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    closePopup();
    actions.apply([filter], code);
    onApplyGtm({ sortType: filter.label, categories: prevTitles.join('|') });
  };

  return (
    <div className={st.wrapper}>
      <div className={st.list}>
        {values.map(value => {
          const selected = draftFilters[0]?.code === value.code;

          return (
            <div key={`${value.code}/sort`} className={st.row} onClick={onFilterClick(value)}>
              {selected && <Checked className={st.checked} />}
              <div className={st.title}>{value.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
