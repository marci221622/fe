import { useUnit } from 'effector-react';

import { ClientCatalogFilter } from '@/shared/catalog';
import { $appIsShort } from '@/shared/configs';

import { filtersCodes } from '@/constants/hardcode';

import { Tag } from '@/ui/index';

import { catalogAnalytics } from '../../models';
import { useLocalFilters } from '../ControllProvider';

export const SwitchableFilter = ({ title, values, code }: ClientCatalogFilter) => {
  const { actions, draftFilters } = useLocalFilters(filtersCodes.toggles);
  const selected = !!draftFilters.find(it => it.code === code);
  const onResetSingle = useUnit(catalogAnalytics.resetSingleFilter);
  const onApplyFiltersGtm = useUnit(catalogAnalytics.applyFilters);
  const appIsShort = useUnit($appIsShort);

  if (code === filtersCodes.filterNovetly && appIsShort) {
    return null;
  }

  return (
    <Tag
      active={selected}
      title={title}
      isToggle
      onClick={event => {
        event.preventDefault();

        actions.apply(
          selected ? draftFilters.filter(it => it.code !== code) : [...draftFilters, values[0]],
          filtersCodes.toggles,
        );

        if (selected) {
          onResetSingle({
            ctx: 'toggle',
            content: title,
          });
        } else {
          onApplyFiltersGtm({
            title,
            code,
            ctx: 'column',
            values: title,
          });
        }
      }}
    />
  );
};
