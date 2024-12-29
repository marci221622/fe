import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';

import { $mappedStrings } from '@/shared/configs';

import { FieldResult } from '@/lib/createField';
import { moneyToPrice } from '@/lib/string';

import { Space, Typography } from '@/ui/index';

import { createBaseCart } from '../models';

import st from './styles.module.scss';

type Props = {
  checkout: ReturnType<typeof createBaseCart>;
  popup: FieldResult<boolean>;
};

export function DesktopCode({ checkout, popup }: Props) {
  const { i18n } = useLingui();
  const activePromocode = useUnit(checkout.$cartActivePromocode);
  const discount = useUnit(checkout.$discount);
  const texts = useUnit($mappedStrings);
  const hasDiscount = discount.sum > 0;

  return (
    <Space
      stretch
      align="between"
      className={cn(st.promocode, {
        [st.hasCode]: !!activePromocode,
      })}
    >
      <Typography.Paragraph className={st.text} onClick={() => popup.onChange(true)}>
        {activePromocode ? (
          <>
            {texts.web.promoCode} ({activePromocode})
          </>
        ) : (
          texts.cart.promoCodeButton
        )}
      </Typography.Paragraph>
      {hasDiscount && !!activePromocode && (
        <Typography.Paragraph>- {moneyToPrice(discount.sum, discount.currency)}</Typography.Paragraph>
      )}
    </Space>
  );
}
