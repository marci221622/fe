import cn from 'classnames';
import { useUnit } from 'effector-react';
import { Link } from 'react-router-dom';

import { CartItem } from '@/generated/customer_hub/entities/cart.v1';
import { AvailableAction } from '@/generated/customer_hub/enums/item';
import { buildDataAttrsFromCartItem } from '@/shared/analytics/diginetics';
import { $mappedStrings } from '@/shared/configs';
import { AB_TESTS, isVariationB } from '@/shared/configs/abTests';
import { BrandLogo, ProductLabels } from '@/shared/ui';
import { SimilarProductsButton } from '@/shared/widgets';

import { paths } from '@/constants/paths';

import { useInFavorite, toggleFavorites } from '@/features/favorites';

import { createReaddableSize } from '@/lib/transformers';

import { Checkbox, Disclamer, Price, Responsive, Space, Typography } from '@/ui/index';

import { CloseIconStroked, StarIcon } from '@/ui/assets/icons';

import { removeFromCartMutation, toggleSelectMutation } from '../cart';
import { getPriceFromCartItem } from '../helpers';
import { checkout } from '../models';

import st from './styles.module.scss';

type Props = {
  className?: string;
  notExisted?: boolean;
  items: CartItem[];
  showAlwaysSelector?: boolean;
  deliveryAvailable?: boolean;
  description?: string;
};

export function ProductsList({
  className,
  notExisted = false,
  showAlwaysSelector = false,
  items,
  deliveryAvailable,
  description,
}: Props) {
  const texts = useUnit($mappedStrings);
  const toggleSelect = useUnit(toggleSelectMutation);
  const removeFromCart = useUnit(removeFromCartMutation);
  const temporaryState = useUnit(checkout.$temporaryState);
  const inFavorite = useInFavorite();
  const favoriteAction = useUnit(toggleFavorites);
  const variant = useUnit(AB_TESTS.$multiClickAndCollect);

  const itemsIds = items.map(it => it.id);
  const needToggler = (itemsIds.length > 1 && !notExisted) || showAlwaysSelector;

  return (
    <ul className={cn(st.list, className)}>
      {items.map(item => {
        const size = createReaddableSize(item.item?.size);
        const inList = inFavorite(item.item?.code ?? '', !!item.item?.favorite);
        const codes = item.item?.relevantItemCodes ?? [];
        const displaySimilarProductsButton = !+(item.item?.quantity ?? '0');
        const availableToCollect = item.item?.availableActions.includes(AvailableAction.AVAILABLE_ACTION_COLLECT);

        const handleFavorite = () => {
          favoriteAction({
            id: item.item?.code ?? '',
            isActive: inList,
            price: item.item?.itemOffers?.[0]?.price,
            title: item.item?.title ?? '',
            place: 'cart',
            size: item.item?.size?.russianSize,
            offerId: item.item?.itemOffers?.[0].offerCode,
          });
        };

        return (
          <li key={item.id} {...buildDataAttrsFromCartItem(item)}>
            {needToggler && (
              <Checkbox
                rounded
                className={cn(st.checkbox)}
                checked={item.selected}
                disabled={temporaryState.selectedInProgress.includes(item.id)}
                onChange={() => {
                  toggleSelect.start({ items: [item], selected: item.selected });
                }}
              />
            )}

            <Responsive.Desktop>
              <Link to={paths.product(item.item?.code)}>
                <img src={item.item?.imagesMiddle?.[0]?.src} alt="" className={st.productImage} />
              </Link>
            </Responsive.Desktop>

            <Space direction="vertical" className={st.space}>
              <Responsive.TabletAndBelow>
                <Link to={paths.product(item.item?.code)}>
                  <img src={item.item?.imagesMiddle?.[0]?.src} alt="" className={st.productImage} />
                </Link>
              </Responsive.TabletAndBelow>
              <BrandLogo brand={item.item?.brand} className={st.brandLogo} />
              <ProductLabels labels={item.item?.labels} className={st.labels} />
              <Link to={paths.product(item.item?.code)}>
                <Typography.Paragraph className={st.title}>
                  {item.item?.title}
                  {size ? `, ${size}` : ''}
                </Typography.Paragraph>
              </Link>

              {isVariationB(variant) && !availableToCollect && !notExisted && (
                <Disclamer variant="dark" className={st.notAvailableToClickDisclamer}>
                  <Typography.Paragraph>{texts.cart.item.clickCollectUnavailable}</Typography.Paragraph>
                </Disclamer>
              )}

              {displaySimilarProductsButton ? (
                <SimilarProductsButton codes={codes} className={st.similarAction} />
              ) : null}

              {description && (
                <Disclamer className={cn(st.descriptionDeisclamer)} variant={!deliveryAvailable ? 'danger' : 'dark'}>
                  {description} <br />
                  {!deliveryAvailable && needToggler && (
                    <span
                      onClick={() => {
                        toggleSelect.start({ items: [item], selected: true });
                      }}
                    >
                      {texts.web.removeFromOrder}
                    </span>
                  )}
                </Disclamer>
              )}
            </Space>

            <Space direction="vertical" className={st.priceSpace}>
              <Price
                {...getPriceFromCartItem(item)}
                className={st.price}
                direction="vertical"
                priceAlign="right"
                discountPercent={item.discountPercent}
                discountBelow
              />
            </Space>

            <StarIcon className={st.starIcon} onClick={handleFavorite} active={inList} />

            <CloseIconStroked
              className={st.CloseIcon}
              onClick={() => {
                removeFromCart.start({ items: [item] });
              }}
            />
          </li>
        );
      })}
    </ul>
  );
}
