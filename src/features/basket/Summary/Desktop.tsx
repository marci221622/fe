import { plural } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';

import { ServiceItem } from '@/generated/customer_hub/entities/delivery.v1';
import { $mappedStrings } from '@/shared/configs';

import { moneyToPrice } from '@/lib/string';

import { Price, Space, Typography } from '@/ui/index';

import { createBaseCart, Promocode } from '../cart';

import st from './styles.module.scss';

type PriceT = { currency: string; withDiscount: number; original: number };

type Discount = {
  currency: string;
  sum: number;
};

type Props = {
  checkout: ReturnType<typeof createBaseCart>;
  isClickAndCollect?: boolean;
  isQuickBy?: boolean;
  priceByRequestDescription?: string;
};

type VariationProps = {
  selectedProductsCounter: number;
  prices: PriceT;
  service?: ServiceItem;
  isFreeDelivery?: boolean;
  discount: Discount;
  hasDiscount?: boolean;
  cartActivePromocode?: boolean;
  currency: string;
  totalPrice: number;
};

function VariationASummary({
  isClickAndCollect,
  checkout,
  totalPrice,
  isQuickBy,
  hasDiscount,
  currency,
  cartActivePromocode,
  priceByRequestDescription,
  selectedProductsCounter,
  discount,
  prices,
  service,
  isFreeDelivery,
}: Props & VariationProps) {
  const { i18n } = useLingui();
  const texts = useUnit($mappedStrings);

  return (
    <div className={cn(st.wrapper)}>
      {!isQuickBy && (
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

      {service && !isClickAndCollect && (
        <Space stretch align="between">
          <Typography.Paragraph>{texts.checkout.delivery.delivery}</Typography.Paragraph>
          <Typography.Paragraph>
            {!isFreeDelivery ? moneyToPrice(service?.price?.units ?? '0', currency) : texts.checkout.delivery.free}
          </Typography.Paragraph>
        </Space>
      )}

      {!isClickAndCollect && hasDiscount && !cartActivePromocode && (
        <Space stretch align="between" className={st.discount}>
          <Typography.Paragraph>{texts.cart.cartInfo.discount}</Typography.Paragraph>

          <Typography.Paragraph>
            <Price currency={discount.currency} revert original={discount.sum} />
          </Typography.Paragraph>
        </Space>
      )}

      {!isClickAndCollect && !isQuickBy && <Promocode checkout={checkout} />}

      {!isClickAndCollect && (
        <Space stretch align="between">
          <Typography.Paragraph bold>{texts.checkout.total}</Typography.Paragraph>
          <Typography.Paragraph bold>{moneyToPrice(totalPrice, currency)}</Typography.Paragraph>
        </Space>
      )}
    </div>
  );
}

function VariationBSummary({
  isClickAndCollect,
  checkout,
  totalPrice,
  isQuickBy,
  hasDiscount,
  currency,
  cartActivePromocode,
  priceByRequestDescription,
  selectedProductsCounter,
  discount,
  prices,
}: Props & Omit<VariationProps, 'service' | 'isFreeDelivery'>) {
  const { i18n } = useLingui();
  const texts = useUnit($mappedStrings);

  return (
    <div className={cn(st.wrapper, st.isVariationB)}>
      <Space stretch align="between" className={st.totalPrice}>
        <Typography.Paragraph bold>{texts.checkout.total}</Typography.Paragraph>
        <Typography.Paragraph bold>{moneyToPrice(totalPrice, currency)}</Typography.Paragraph>
      </Space>

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

      {!isClickAndCollect && hasDiscount && !cartActivePromocode && (
        <Space stretch align="between" className={st.discount}>
          <Typography.Paragraph>{texts.cart.cartInfo.discount}</Typography.Paragraph>

          <Typography.Paragraph>
            <Price currency={discount.currency} revert original={discount.sum} />
          </Typography.Paragraph>
        </Space>
      )}

      {!isClickAndCollect && !isQuickBy && <Promocode checkout={checkout} />}
    </div>
  );
}

export function DesktopSummary({
  checkout,
  isClickAndCollect,
  priceByRequestDescription,
  isQuickBy,

  isVariationB,
}: Props & { isVariationB?: boolean }) {
  const { i18n } = useLingui();

  const deliveryData = useUnit(checkout.$deliveryData);
  const prices = useUnit(checkout.$cartPrice);

  const discount = useUnit(checkout.$discount);
  const totalPrice = useUnit(checkout.$totalPayable);
  const currency = useUnit(checkout.$currency);
  const selectedProductsCounter = useUnit(checkout.$cartBySelectedCounter);

  const cartActivePromocode = !!useUnit(checkout.$cartActivePromocode);

  const service = deliveryData?.selectedDeliveries[0]?.serviceItem;
  const isFreeDelivery = (service?.price?.units ?? '0') === '0';

  const hasDiscount = discount.sum > 0;

  const variationProps = {
    isClickAndCollect,
    checkout,
    totalPrice,
    isQuickBy,
    hasDiscount,
    currency,
    cartActivePromocode,
    priceByRequestDescription,
    selectedProductsCounter,
    discount,
    prices,
  };

  if (totalPrice === 0) {
    return null;
  }

  return isVariationB ? (
    <VariationBSummary {...variationProps} />
  ) : (
    <VariationASummary {...variationProps} service={service} isFreeDelivery={isFreeDelivery} />
  );
}
