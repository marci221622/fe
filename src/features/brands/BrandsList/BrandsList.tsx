import cn from 'classnames';
import { useUnit } from 'effector-react';
import { memo } from 'react';

import { $brandsListByTitleScheme, toggleFavoriteBrands, useInFavoriteBrand } from '@/shared/brands';
import { OnlyFullVariant } from '@/shared/configs';
import { $currentGender } from '@/shared/session';

import { CheckedWithContainer, StarIcon } from '@/ui/assets/icons';

import st from './BrandsList.module.scss';

type BrandSlice = {
  title: string;
  code: string;
};

type Props<T> = {
  brandsGroup: Record<string, T[]>;
  alphabetGroup: string[];
  rowBordered?: boolean;
  symbolCentered?: boolean;
  desktopRowReversed?: boolean;
  onChange?: (brand: T, checked: boolean) => void;
  getChecked?: (brand: BrandSlice) => boolean;
  additionalElement?: React.JSX.Element | null;
};

type BrandRow = {
  onChange?: (brand: any, checked: boolean) => void;
  brand: BrandSlice;
  checked?: boolean;
  inFavorite: boolean;
  originalCode?: string;
  rowBordered?: boolean;
  desktopRowReversed?: boolean;
};

const BrandRow = memo<BrandRow>(
  ({ brand, onChange, checked, inFavorite, originalCode, rowBordered, desktopRowReversed }) => {
    const gender = useUnit($currentGender);
    const toggleBrand = useUnit(toggleFavoriteBrands);

    return (
      <div
        key={brand.code}
        className={cn(st.row, {
          [st.bordered]: rowBordered,
          [st.desktopRowReversed]: desktopRowReversed,
        })}
        onClick={() => onChange?.(brand, !!checked)}
      >
        {onChange && (
          <CheckedWithContainer
            className={cn(st.checked, {
              [st.selected]: checked,
            })}
          />
        )}

        <div
          className={cn(st.title, {
            [st.needChecked]: !!onChange,
          })}
        >
          <span>{brand.title}</span>

          <OnlyFullVariant>
            <StarIcon
              active={inFavorite}
              className={st.star}
              onClick={e => {
                if (originalCode) {
                  e.stopPropagation();
                  toggleBrand({
                    brandCode: originalCode,
                    isActive: inFavorite,
                    section: gender,
                    brandName: brand.title,
                    brandId: brand.code,
                  });
                }
              }}
            />
          </OnlyFullVariant>
        </div>
      </div>
    );
  },
);

export function BrandsList<T extends BrandSlice>({
  brandsGroup,
  alphabetGroup,
  rowBordered,
  symbolCentered,
  desktopRowReversed,
  onChange,
  getChecked,
  additionalElement,
}: Props<T>) {
  const getInFavorite = useInFavoriteBrand();
  const brands = useUnit($brandsListByTitleScheme);

  return (
    <div
      data-scroll="allow"
      className={cn(st.list, {
        [st.needLeftGap]: rowBordered,
      })}
    >
      {additionalElement}

      {alphabetGroup.map(brandSymbol => {
        const list = brandsGroup[brandSymbol];

        if (list.length === 0) return null;

        return (
          <div
            key={brandSymbol}
            className={cn(st.groupWrapper, {
              [st.inColumn]: desktopRowReversed,
            })}
          >
            <div
              className={cn(st.brandListTitle, {
                [st.centered]: symbolCentered,
              })}
              id={`symbol${brandSymbol}`}
            >
              {brandSymbol}
            </div>

            {list.map(brand => {
              const originalCode = brands[brand.title]?.code;

              return (
                <BrandRow
                  checked={getChecked?.(brand)}
                  onChange={onChange}
                  originalCode={originalCode}
                  desktopRowReversed={desktopRowReversed}
                  inFavorite={getInFavorite(originalCode)}
                  key={brand.code}
                  brand={brand}
                  rowBordered={rowBordered}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
