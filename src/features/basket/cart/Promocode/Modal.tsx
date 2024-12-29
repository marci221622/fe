import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { useRef, useState } from 'react';
import { useIsomorphicLayoutEffect } from 'react-spring';

import { GrpcWebError } from '@/generated/customer_hub/customer-hub-service';
import { $mappedStrings } from '@/shared/configs';

import { Button, Input, Space, Typography } from '@/ui/index';

import { createBaseCart, promocodeMutation, applyCode } from '../models';

import st from './styles.module.scss';

type Props = {
  checkout: ReturnType<typeof createBaseCart>;
  error: GrpcWebError | null;
};

export function ModalPromocode({ checkout, error }: Props) {
  const { i18n } = useLingui();
  const activePromocode = useUnit(checkout.$cartActivePromocode);
  const onApply = useUnit(applyCode);
  const promocodePending = useUnit(promocodeMutation.$pending);
  const texts = useUnit($mappedStrings);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const lastWindowPosition = useRef(0);

  const [promocode, changeCode] = useState(activePromocode ?? '');

  const canCancelCode = !!activePromocode && activePromocode === promocode;

  const onAction = () => {
    if (canCancelCode) {
      onApply('');
    } else {
      onApply(promocode);
    }
  };

  useIsomorphicLayoutEffect(() => {
    lastWindowPosition.current = window.scrollY;
    inputRef.current?.focus({ preventScroll: false });

    return () => {
      lastWindowPosition.current = 0;
    };
  }, []);

  return (
    <Space direction="vertical" stretch size="large" style={{ marginBottom: 8 }}>
      <Input
        withShadow
        ref={inputRef}
        value={promocode}
        onBlur={() => window.scrollTo({ top: lastWindowPosition.current, behavior: 'smooth' })}
        placeholder={texts.cart.promoCodeButton}
        onChange={e => changeCode(e.target.value.toUpperCase())}
        closable={promocode.length > 0}
        onKeyUp={event => {
          if (event.code === 'Enter' && promocode.length > 0) {
            onAction();
          }
        }}
      />

      {texts.promoCode.description && !error && (
        <Typography.Paragraph center className={st.notice}>
          {texts.promoCode.description}
        </Typography.Paragraph>
      )}

      {error && (
        <Typography.Paragraph center className={cn(st.notice, st.error)}>
          {texts.promoCode.badPromoCode}
        </Typography.Paragraph>
      )}

      <Button
        size="L"
        stretch
        disabled={!promocode}
        onClick={onAction}
        reverse={canCancelCode}
        pending={promocodePending}
      >
        {canCancelCode ? texts.web.cancelPromoCode : texts.web.applyPromoCode}
      </Button>
    </Space>
  );
}
