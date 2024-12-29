import cn from 'classnames';
import { useUnit } from 'effector-react';

import { $mappedStrings } from '@/shared/configs';

import { FieldResult } from '@/lib/createField';

import { Input } from '@/ui/index';

import { applyCode, createBaseCart } from '../models';

import st from './styles.module.scss';

type Props = {
  popup: FieldResult<boolean>;
  checkout: ReturnType<typeof createBaseCart>;
};

export function MobileCode({ popup, checkout }: Props) {
  const activePromocode = useUnit(checkout.$cartActivePromocode);
  const onApply = useUnit(applyCode);
  const texts = useUnit($mappedStrings);

  return (
    <Input
      outline
      showStab
      placeholder={texts.cart.promoCodeButton}
      className={cn(st.input, {
        [st.hasPromocode]: !!activePromocode,
      })}
      stubClassName={st.stub}
      value={activePromocode}
      onCloseClick={() => onApply('')}
      onStubClick={() => popup.onChange(true)}
      closable={activePromocode.length > 0}
    />
  );
}
