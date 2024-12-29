import { useUnit } from 'effector-react';

import { Brand } from '@/generated/customer_hub/entities/brand.v1';
import { CatalogFilter_Value } from '@/generated/customer_hub/entities/catalog_filter.v1';
import { $enrichedFavoriteBrands } from '@/shared/brands';
import { $favoriteBrandsSettins, $mappedStrings } from '@/shared/configs';
import { BrandImage } from '@/shared/ui';

import { useOnboardingByTimes } from '@/lib/hooks';

import { Disclamer } from '@/ui/Disclamer';
import { Typography } from '@/ui/Typography';

import { StarIcon } from '@/ui/assets/icons';

import st from './styles.module.scss';

type Props = {
  values: CatalogFilter_Value[];
  filters: CatalogFilter_Value[];
  setFilters: (values: CatalogFilter_Value[]) => void;
  onChangeBrand: (brandItem: CatalogFilter_Value, checked: boolean) => void;
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

export function FavoriteBrands({ values, onChangeBrand, filters, setFilters }: Props) {
  const texts = useUnit($mappedStrings);
  const brands = useUnit($enrichedFavoriteBrands);
  const favoriteBrandsSettins = useUnit($favoriteBrandsSettins);
  const onboardingVisibled = useOnboardingByTimes({
    key: 'filterOnboarding',
    counter: favoriteBrandsSettins.onboardingInFiltersShowCount,
  });

  const filteredBrands = brands.filter(brand => values.find(value => value.code === brand.title));
  const needSelectAllAction =
    filteredBrands.filter(value => !filters.find(filter => filter.code === value.title)).length > 0;

  if (!texts.brandsFilter.favoriteBrands.title || !texts.brandsFilter.favoriteBrands.onboarding.description) {
    return null;
  }

  const header = (
    <div className={st.brandsHeader}>
      <Typography.Title className={st.brandTitle}>{texts.brandsFilter.favoriteBrands.title}</Typography.Title>
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
          {texts.brandsFilter.favoriteBrands.selectAllButton}
        </span>
      )}
    </div>
  );

  return (
    <div className={st.favoriteBrands}>
      {filteredBrands.length === 0 && onboardingVisibled ? (
        <div className={st.brandsList}>
          {header}

          <Disclamer className={st.disclamer}>
            <StarIcon className={st.starIcon} />

            <Typography.Paragraph>{texts.brandsFilter.favoriteBrands.onboarding.description}</Typography.Paragraph>
          </Disclamer>
        </div>
      ) : (
        filteredBrands.length > 0 && (
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
        )
      )}
    </div>
  );
}
