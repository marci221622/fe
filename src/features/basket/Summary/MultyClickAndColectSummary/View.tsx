import { plural } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useUnit } from 'effector-react';

import { $mappedStrings } from '@/shared/configs';

import { moneyToPrice } from '@/lib/string';

import { Price, Space, Typography } from '@/ui/index';

import { createBaseCart } from '../../cart';

import st from './styles.module.scss';

type Props = {
  checkout: ReturnType<typeof createBaseCart>;
  priceByRequestDescription?: string;
};

export function MultyClickAndColectSummary({ checkout, priceByRequestDescription }: Props) {
  const { i18n } = useLingui();
  const totalPrice = useUnit(checkout.$totalPayable);
  const texts = useUnit($mappedStrings);
  const prices = useUnit(checkout.$cartPrice);
  const discount = useUnit(checkout.$discount);
  const currency = useUnit(checkout.$currency);
  const selectedProductsCounter = useUnit(checkout.$cartBySelectedCounter);

  const hasDiscount = discount.sum > 0;

  if (totalPrice === 0) {
    return null;
  }

  return (
    <div className={st.wrapper}>
      <Space stretch align="between">
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
            byRequestDescription={priceByRequestDescription}
          />
        </Typography.Paragraph>
      </Space>

      {hasDiscount && (
        <Space stretch align="between" className={st.discount}>
          <Typography.Paragraph>{texts.cart.cartInfo.discount}</Typography.Paragraph>

          <Typography.Paragraph>
            <Price currency={discount.currency} revert original={discount.sum} />
          </Typography.Paragraph>
        </Space>
      )}
    </div>
  );
}
