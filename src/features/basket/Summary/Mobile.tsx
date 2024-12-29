import { plural } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useUnit } from 'effector-react';

import { Loyalty } from '@/generated/customer_hub/entities/loyalty.v1';
import { $mappedStrings, $promocodeSettings } from '@/shared/configs';
import { LoyaltyBody } from '@/shared/ui/LoyaltyBanners';

import { moneyToPrice } from '@/lib/string';

import { Price, Space, Typography } from '@/ui/index';

import { createBaseCart } from '../cart';

import st from './styles.module.scss';

type Props = {
  shortVarriant?: boolean;
  checkout: ReturnType<typeof createBaseCart>;
  isClickAndCollect?: boolean;
  isQuickBy?: boolean;
  priceByRequestDescription?: string;
  loyalty?: Loyalty | null;
};

export function MobileSummary({
  shortVarriant,
  checkout,
  isClickAndCollect,
  priceByRequestDescription,
  isQuickBy,
  loyalty,
}: Props) {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();
  const deliveryData = useUnit(checkout.$deliveryData);
  const prices = useUnit(checkout.$cartPrice);
  const discount = useUnit(checkout.$discount);
  const totalPrice = useUnit(checkout.$totalPayable);
  const currency = useUnit(checkout.$currency);
  const selectedProductsCounter = useUnit(checkout.$cartBySelectedCounter);
  const cartActivePromocode = !!useUnit(checkout.$cartActivePromocode);
  const promocodeSettings = useUnit($promocodeSettings);

  const service = deliveryData?.selectedDeliveries[0]?.serviceItem;
  const isFreeDelivery = (service?.price?.units ?? '0') === '0';

  const hasDiscount = discount.sum > 0;

  const needDiscountRow = cartActivePromocode ? promocodeSettings.enabled && hasDiscount : hasDiscount;

  if (totalPrice === 0) {
    return null;
  }

  return (
    <div className={st.wrapper}>
      {shortVarriant && <LoyaltyBody place="cart" loyalty={loyalty} />}

      {!isQuickBy && shortVarriant && (
        <Space stretch align="between">
          <Typography.Paragraph>
            {selectedProductsCounter}{' '}
            {plural(selectedProductsCounter, {
              one: 'вещь',
              few: 'вещи',
              other: 'вещей',
            })}
          </Typography.Paragraph>

          <Typography.Paragraph>
            <Price
              currency={prices.currency}
              original={prices.original}
              bold={!isClickAndCollect}
              byRequestDescription={priceByRequestDescription}
            />
          </Typography.Paragraph>
        </Space>
      )}

      {needDiscountRow && !isClickAndCollect && (
        <Space stretch align="between" className={st.discount}>
          <Typography.Paragraph>{texts.cart.cartInfo.discount}</Typography.Paragraph>

          <Typography.Paragraph>
            <Price currency={discount.currency} revert original={discount.sum} />
          </Typography.Paragraph>
        </Space>
      )}

      {!shortVarriant && service && !isClickAndCollect && (
        <Space stretch align="between">
          <Typography.Paragraph>{texts.checkout.delivery.delivery}</Typography.Paragraph>
          <Typography.Paragraph>
            {!isFreeDelivery ? moneyToPrice(service?.price?.units ?? '0', currency) : texts.checkout.delivery.free}
          </Typography.Paragraph>
        </Space>
      )}

      {!isClickAndCollect && !shortVarriant && (
        <Space stretch align="between">
          <Typography.Paragraph bold>{texts.checkout.total}</Typography.Paragraph>
          <Typography.Paragraph bold>{moneyToPrice(totalPrice, currency)}</Typography.Paragraph>
        </Space>
      )}
    </div>
  );
}
