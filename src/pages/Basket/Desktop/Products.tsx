import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { Store } from 'effector';
import { useUnit } from 'effector-react';
import { Fragment, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartItem } from '@/generated/customer_hub/entities/cart.v1';
import { $mappedStrings } from '@/shared/configs';

import { paths } from '@/constants/paths';

import {
  removeFromCartMutation,
  ProductsList,
  $grouppedDeliveries,
  selectProductByDeliveries,
} from '@/features/basket';
import { $favoriteCounter } from '@/features/favorites';

import { Button, Typography } from '@/ui/index';

import st from '../styles.module.scss';

type Props = {
  noExistedItems: boolean;
  state: {
    notExistedItems: Store<CartItem[]>;
    existedItems: Store<CartItem[]>;
    notSelectedItems: Store<CartItem[]>;
  };
};

export function Products({ state, noExistedItems }: Props) {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();
  const navigate = useNavigate();
  const removeFromCart = useUnit(removeFromCartMutation);
  const { notExistedItems, existedItems, notSelectedItems } = useUnit(state);
  // Если доставок более 1
  // Нужно иначе вывести товары
  const deliveries = useUnit($grouppedDeliveries);
  const favoriteCounter = useUnit($favoriteCounter);

  const hasFavoriteItems = !!favoriteCounter;
  const needShowAsGroups = deliveries.groups.length > 1;
  // Если групы нету - выводим как есть все товары
  const noNeedGroups = deliveries.groups.length <= 1;

  const handleNoExistedItemsClick = useCallback(
    (arg: 'favorite' | 'catalog') => {
      return () => navigate(arg === 'favorite' ? paths.favorites.main() : paths.categories.root());
    },
    [navigate],
  );

  return (
    <>
      {needShowAsGroups ? (
        deliveries.groups.map(delivery => {
          const products = selectProductByDeliveries({ products: existedItems, delivery: delivery[0] });

          if (products.length === 0) {
            return null;
          }

          return (
            <Fragment key={delivery[0].title}>
              {needShowAsGroups && (
                <Typography.Paragraph
                  className={cn(st.deliveryGroupTitle, {
                    [st.isNotAvialible]: !delivery[0].available,
                  })}
                >
                  {delivery[0].title}
                </Typography.Paragraph>
              )}

              <ProductsList
                deliveryAvailable={delivery[0].available}
                description={delivery[0].description}
                showAlwaysSelector
                className={st.itemsList}
                items={products}
              />
            </Fragment>
          );
        })
      ) : (
        <ProductsList
          className={st.itemsList}
          items={existedItems}
          deliveryAvailable={deliveries.groups[0]?.[0]?.available}
          description={deliveries.groups[0]?.[0]?.description}
        />
      )}

      {noExistedItems && (
        <div className={st.emptyTextContainer}>
          <Typography.Paragraph className={st.emptyText} center>
            {texts.cart.emptyScreen.allOutOfStock}
          </Typography.Paragraph>
          {hasFavoriteItems ? (
            <Button className={st.goToFavoriteButton} size="S" colored onClick={handleNoExistedItemsClick('favorite')}>
              {texts.web.goToFavorite}
            </Button>
          ) : (
            <Button className={st.goToFavoriteButton} size="S" colored onClick={handleNoExistedItemsClick('catalog')}>
              {texts.itemDetails.purchasePanel.showCatalog}
            </Button>
          )}
        </div>
      )}

      {notSelectedItems.length > 0 && !noNeedGroups && (
        <>
          <Typography.Paragraph className={st.deliveryGroupTitle}>{texts.web.notSelectedItems}</Typography.Paragraph>
          <ProductsList className={st.itemsList} items={notSelectedItems} showAlwaysSelector />
        </>
      )}

      {notExistedItems.length > 0 && (
        <>
          <div className={st.separator}>
            <Typography.Paragraph className={st.deliveryGroupTitle}>
              {texts.cart.inStockPicker.outOfStock}
            </Typography.Paragraph>
            <Typography.Paragraph
              className={st.clearAll}
              onClick={() =>
                removeFromCart.start({
                  items: notExistedItems,
                })
              }
            >
              {notExistedItems.length > 1 ? texts.web.deleteAll : texts.title.delete}
            </Typography.Paragraph>
          </div>

          <ProductsList className={cn(st.itemsList, st.notExists)} notExisted items={notExistedItems} />
        </>
      )}
    </>
  );
}
