import { useUnit } from 'effector-react';

import { Item } from '@/generated/customer_hub/entities/item.v1';
import { AvailableAction } from '@/generated/customer_hub/enums/item';
import { $mappedStrings } from '@/shared/configs';
import { SimilarProductsButton } from '@/shared/widgets/SimilarProductsModal';

import { addToCardMutation, oneClickMutation, useInCart } from '@/features/basket';

import { Button } from '@/ui/Button';
import { Responsive } from '@/ui/Responsive';
import { Typography } from '@/ui/Typography';

import { BasketIconV2, Checked } from '@/ui/assets/icons';

import st from './styles.module.scss';

type Props = {
  className: string;
  product: Item;
};

export function Actions({ className, product }: Props) {
  const texts = useUnit($mappedStrings);
  const inCart = useInCart();
  const onAddedToCart = useUnit(addToCardMutation.start);
  const clickAndCollect = useUnit(oneClickMutation);
  const lastParamsClickAndCollect = useUnit(oneClickMutation.__.$lastParams);

  const productInCart = inCart(product.code);
  const price = product.itemOffers[0]?.finalPrice ?? product.itemOffers[0]?.price;

  const isShowGoToCartButton = product.availableActions.includes(AvailableAction.AVAILABLE_ACTION_BUY);
  const isShowClickCollectButton = product.availableActions.includes(AvailableAction.AVAILABLE_ACTION_COLLECT);
  const isShowSimilarProductsButton = !+product.quantity;

  const addToCartParams = {
    discountPercent: product.discountPercent,
    itemCode: product.code,
    place: 'wishList',
    offerCodes: product.itemOffers.map(it => it.offerCode),
    title: product.title,
    brand: product.brand,
    tsumPrice: product.tsumPrice,
    size: product.size,
    finalPrice: price && {
      units: price.units,
      currencyCode: price.currencyCode,
    },
  };

  if (isShowSimilarProductsButton) {
    return <SimilarProductsButton codes={product.relevantItemCodes} className={className} />;
  }

  if (isShowGoToCartButton) {
    return (
      <Button
        size="XS"
        colored
        className={className}
        onClick={e => {
          e.stopPropagation();
          e.preventDefault();

          if (!productInCart) {
            onAddedToCart(addToCartParams);
          }
        }}
      >
        {productInCart ? (
          <>
            <Checked className={st.checkedIcon} />
            <Typography.Paragraph className={st.cartButtonText}> {texts.web.inCart}</Typography.Paragraph>
          </>
        ) : (
          <>
            <BasketIconV2 />
            <Responsive.Desktop className={st.cartButtonText}>
              {texts.itemDetails.addToClickAndCollectPopup.addToCartButton.title}
            </Responsive.Desktop>
            <Responsive.TabletAndBelow>{texts.itemDetails.purchasePanel.addToCart}</Responsive.TabletAndBelow>
          </>
        )}
      </Button>
    );
  }

  if (isShowClickCollectButton) {
    return (
      <Button
        size="XS"
        colored
        pending={clickAndCollect.pending && lastParamsClickAndCollect?.itemCode === product.code}
        className={className}
        onClick={e => {
          e.stopPropagation();
          e.preventDefault();
          clickAndCollect.start(addToCartParams);
        }}
      >
        {texts.itemDetails.purchasePanel.showroom}
      </Button>
    );
  }

  return null;
}
