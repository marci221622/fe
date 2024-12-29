import cn from 'classnames';

import { moneyToPrice } from '@/lib/string';

import st from './styles.module.scss';

// FROM_TSUM_APP
type Props = {
  original?: number;
  withDiscount?: number;
  className?: string;
  revert?: boolean;
  currency?: string;
  direction?: 'horizontal' | 'vertical';
  discountPercent?: number;
  discountBelow?: boolean;
  discountBelowOnMobile?: boolean;
  size?: 'large' | 'normal';
  priceAlign?: 'center' | 'right';
  bold?: boolean;
  byRequestDescription?: string;
  withLineThrought?: boolean;
  verticalPriceAlignment?: boolean;
};

export function Price({
  original = 0,
  withDiscount = 0,
  className,
  revert,
  currency,
  direction = 'horizontal',
  discountPercent,
  discountBelow,
  discountBelowOnMobile,
  size = 'normal',
  bold = true,
  withLineThrought = false,
  byRequestDescription,
  verticalPriceAlignment = false,
  priceAlign = 'center',
  ...rest
}: Props) {
  const prices = {
    original: !revert ? original : withDiscount,
    withDiscount: !revert ? withDiscount : original,
  };
  const hasDiscount = !!prices.withDiscount && prices.original > prices.withDiscount;
  const priceToShow = prices.original || original;

  return (
    <span
      className={cn(st.price, className, {
        [st.discountBelow]: discountBelow,
        [st.discountBelowOnMobile]: discountBelowOnMobile,
        [st.boldWeight]: bold,
        [st.alignRight]: priceAlign === 'right',
      })}
      {...rest}
    >
      {typeof byRequestDescription === 'undefined' ? (
        <>
          <span
            className={cn(st.price, st[direction], st[size], {
              [st.verticalPriceAlignmentContainer]: verticalPriceAlignment,
              [st.boldWeight]: bold,
              [st.withLineThrought]: withLineThrought,
            })}
          >
            <span
              className={cn({
                [st.hasDiscount]: hasDiscount,
              })}
            >
              {moneyToPrice(priceToShow, currency)}
            </span>

            {hasDiscount && (
              <span className={cn(st.discount, { [st.verticalPriceAlignmentDiscountPrice]: verticalPriceAlignment })}>
                {!!prices.withDiscount && moneyToPrice(prices.withDiscount, currency)}
              </span>
            )}
          </span>

          {!!discountPercent && (
            <span data-discount className={st.discountPercent}>
              &nbsp;-{discountPercent}%
            </span>
          )}
        </>
      ) : (
        byRequestDescription
      )}
    </span>
  );
}
