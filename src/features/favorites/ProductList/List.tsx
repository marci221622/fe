import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { ReactNode, useCallback, useMemo } from 'react';

import { Money } from '@/generated/common/money.v1';
import { Item } from '@/generated/customer_hub/entities/item.v1';
import { $mappedStrings } from '@/shared/configs';
import { ProductCard } from '@/shared/ui';
import { isPriceByRequest } from '@/shared/watches';

import { useViewport } from '@/lib/hooks';
import { createRowScheme } from '@/lib/product';

import { toggleFavorites } from '../models';

import st from './styles.module.scss';

const PRODUCTS_IN_ROW = 4;
const PRODUCTS_IN_ROW_MOBILE = 2;

type Props = {
  products: Item[];
  action: (product: Item) => (params: { className: string }) => ReactNode;
  priceVisibility?: boolean;
  className?: string;
  nosidebar?: boolean;
};

export function ProductList({ products, action, priceVisibility, className, nosidebar = true }: Props) {
  const { i18n } = useLingui();
  const favoriteAction = useUnit(toggleFavorites);
  const texts = useUnit($mappedStrings);
  const { isTabletAndBelow } = useViewport();

  const onFavorite = useCallback(
    (params: { id: string; isActive: boolean; price?: Money | undefined; title: string }) => {
      favoriteAction({
        place: 'wishList',
        title: params.title,
        id: params.id,
        isActive: true,
        price: params.price,
      });
    },
    [favoriteAction],
  );

  const scheme = useMemo(() => createRowScheme({ items: products, needToFullListPreparation: false }), [products]);
  const schemeVariant = isTabletAndBelow ? 'perRow2' : nosidebar ? 'perRow4' : 'perRow3';

  return (
    <div
      className={cn(
        st.productList,
        {
          [st.nosidebar]: nosidebar,
          [st[`centered_${products.length}`]]: products.length < PRODUCTS_IN_ROW,
          [st.centeredMobile]: products.length < PRODUCTS_IN_ROW_MOBILE,
        },
        className,
      )}
    >
      {products.map(product => {
        return (
          <ProductCard
            priceVisibility={priceVisibility}
            priceByRequestDescription={isPriceByRequest(product) ? texts.favorite.price.hide : undefined}
            className={st.card}
            key={product.code}
            product={product}
            handleFavorite={onFavorite}
            hasItem={+product.quantity > 0}
            isCollected={product.isCollected}
            action={action(product)}
            titleOnlyOneRow={scheme[schemeVariant][product.code].titleOnlyOneRow}
            tagsVisibility={scheme[schemeVariant][product.code].tagsVisibility}
            sizeVisibility={scheme[schemeVariant][product.code].sizeVisibility}
            hasComments={scheme[schemeVariant][product.code].hasComments}
            hasDiscountInRow={scheme[schemeVariant][product.code].hasDiscountInRow}
            priceDirection={scheme[schemeVariant][product.code].priceVertical ? 'vertical' : 'horizontal'}
          />
        );
      })}
    </div>
  );
}
