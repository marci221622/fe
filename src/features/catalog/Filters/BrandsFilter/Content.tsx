import { plural, t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useUnit } from 'effector-react';
import { useEffect, useMemo, useState } from 'react';

import { CatalogFilter_Value } from '@/generated/customer_hub/entities/catalog_filter.v1';
import { ClientCatalogFilter } from '@/shared/catalog';
import { $mappedStrings, OnlyFullVariant } from '@/shared/configs';

import { BrandsList } from '@/features/brands';

import { searchByWord, filtersToAlphabetList, sortAlphabet } from '@/lib/string';
import { LOADING_STATUS } from '@/lib/useRequest';

import { Button, Input, Tag, Typography } from '@/ui/index';

import { SearchIcon } from '@/ui/assets/icons';

import { catalogAnalytics } from '../../models';
import { useLocalFilters } from '../ControllProvider';
import { useCounter } from '../useCounter';

import { FavoriteBrands } from './FavoriteBrands';
import { TopBrands } from './TopBrands';

import st from './styles.module.scss';

export const Content = ({
  closePopup,
  values,
  setFilters,
  filters,
  code,
}: ClientCatalogFilter & {
  closePopup: () => void;
  setFilters: (filters: CatalogFilter_Value[]) => void;
  filters: CatalogFilter_Value[];
}) => {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();
  const [search, setSearch] = useState<string>('');
  const { actions, draftFilters, baseCounter, filtersFromServer, collection } = useLocalFilters(code);
  const { status, counter } = useCounter({
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
      onApplyFiltersGtm({
        title: texts.tabs.brands,
        code,
        ctx: 'column',
        values: filters.map(brand => brand.label).join('|'),
      });
      closePopup();
    }
  };

  const alphabetList = useMemo(
    () =>
      filtersToAlphabetList(
        searchByWord({ list: values, textExtractor: brand => brand.label, search }).map(it => ({
          ...it,
          code: it.code,
          title: it.label,
        })),
      ),
    [values, search],
  );

  const alphabetGroup = useMemo(() => Object.keys(alphabetList).sort(sortAlphabet), [alphabetList]);

  const onChangeBrand = (brandItem: CatalogFilter_Value, checked: boolean) => {
    setFilters(checked ? filters.filter(it => it.code !== brandItem.code) : [...filters, brandItem]);
  };

  useEffect(() => {
    return () => {
      setFilters(draftFilters);
    };
  }, [draftFilters, setFilters]);

  return (
    <div className={st.wrapper}>
      <div className={st.header}>
        <Input
          placeholder={texts.brandsTab.searchBar.placeholder}
          Prefix={<SearchIcon />}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={st.input}
        />

        {filters.length > 0 && (
          <div className={st.selected}>
            {filters.map(brand => (
              <Tag
                key={brand.code}
                title={brand.label}
                active
                isToggle
                onClick={e => {
                  e.stopPropagation();
                  onChangeBrand(brand, true);
                }}
              />
            ))}
          </div>
        )}
      </div>

      <BrandsList<CatalogFilter_Value & { title: string }>
        brandsGroup={alphabetList}
        alphabetGroup={alphabetGroup}
        getChecked={brand => !!filters.find(it => it.code === brand.code)}
        onChange={onChangeBrand}
        rowBordered
        additionalElement={
          !search ? (
            <>
              <OnlyFullVariant>
                <FavoriteBrands
                  values={values}
                  onChangeBrand={onChangeBrand}
                  filters={filters}
                  setFilters={setFilters}
                />
              </OnlyFullVariant>
              <TopBrands
                values={values}
                onChangeBrand={onChangeBrand}
                filters={filters}
                setFilters={setFilters}
                collection={collection}
              />

              <div className={st.brandsHeader}>
                <Typography.Title className={st.brandTitle}>{texts.brandsTab.allBrands}</Typography.Title>
              </div>
            </>
          ) : null
        }
      />

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
