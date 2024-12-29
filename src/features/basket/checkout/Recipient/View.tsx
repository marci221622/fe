import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';

import { $mappedStrings } from '@/shared/configs';

import { Input, MaskedInput } from '@/ui/index';

import { PhoneIcon, ProfileIcon } from '@/ui/assets/icons';

import { phoneField, nameField } from '../models';

import st from './styles.module.scss';

type Props = {
  device: Device;
};

export function Recipient({ device }: Props) {
  const { i18n } = useLingui();
  const phone = useUnit(phoneField);
  const name = useUnit(nameField);
  const texts = useUnit($mappedStrings);

  const isMobile = device === 'mobile';

  return (
    <div className={cn(st.wrapper, st[device])}>
      <MaskedInput
        isTelInput
        withShadow
        simple={isMobile}
        maskProps={{
          mask: '+7 999 999-99-99',
        }}
        placeholder={texts.checkout.user.phone.placeholder}
        value={phone.value}
        onChange={e => phone.onChange(e.target.value)}
        Prefix={isMobile ? <PhoneIcon /> : null}
      />

      <Input
        withShadow
        simple={isMobile}
        placeholder={texts.checkout.user.name.placeholder}
        value={name.value}
        onChange={e => name.onChange(e.target.value)}
        Prefix={isMobile ? <ProfileIcon /> : null}
        className={st.lastInput}
      />
    </div>
  );
}
