import { useUnit } from 'effector-react';

import { Brand } from '@/generated/customer_hub/entities/brand.v1';
import { CatalogFilter_Value } from '@/generated/customer_hub/entities/catalog_filter.v1';
import { $brandsListByTitleScheme } from '@/shared/brands';
import { $filtersTopBrands, $mappedStrings } from '@/shared/configs';
import { BrandImage } from '@/shared/ui';

import { Typography } from '@/ui/Typography';

import st from './styles.module.scss';

type Props = {
  values: CatalogFilter_Value[];
  filters: CatalogFilter_Value[];
  setFilters: (values: CatalogFilter_Value[]) => void;
  onChangeBrand: (brandItem: CatalogFilter_Value, checked: boolean) => void;
  collection?: string;
};

function brandToValue(brand: Brand) {
  return {
    code: brand.title,
    label: brand.title,
    properties: [],
    selected: false,
    image: undefined,
    priority: 1,
    itemsCount: '1',
    children: [],
  };
}

export function TopBrands({ values, onChangeBrand, filters, setFilters, collection }: Props) {
  const texts = useUnit($mappedStrings);
  const brands = useUnit($brandsListByTitleScheme);
  const topBrands = useUnit($filtersTopBrands);

  const filteredBrands = topBrands[collection!]
    ? topBrands[collection!]
        .map(brand => brands[brand.filterCode])
        .filter(brand => brand && values.find(value => value && value.code === brand.title))
    : [];

  const needSelectAllAction =
    filteredBrands.filter(value => !filters.find(filter => filter.code === value.title)).length > 0;

  if (filteredBrands.length === 0) {
    return null;
  }

  const header = (
    <div className={st.brandsHeader}>
      <Typography.Title className={st.brandTitle}>Топ бренды</Typography.Title>
      {needSelectAllAction && (
        <span
          className={st.action}
          onClick={e => {
            const asValues = filteredBrands.map(brandToValue);

            e.preventDefault();
            e.stopPropagation();
            setFilters(asValues);
          }}
        >
          {texts.filters.favoriteBrands.select.all}
        </span>
      )}
    </div>
  );

  return (
    <div className={st.favoriteBrands}>
      <div className={st.brandsList}>
        {header}

        <div className={st.images}>
          {filteredBrands.map(brand => (
            <BrandImage
              image={brand.logoLink}
              title={brand.title}
              className={st.brand}
              onClick={() => {
                const checked = !!filters.find(it => it.code === brand.code);

                onChangeBrand(brandToValue(brand), checked);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
