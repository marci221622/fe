import { useLingui } from '@lingui/react';
import { useUnit } from 'effector-react';

import { $mappedStrings, $promocodeSettings } from '@/shared/configs';
import { Modal } from '@/shared/ui';

import { Responsive } from '@/ui/index';

import { createBaseCart, promocodeMutation, promocodePopupField } from '../models';

import { DesktopCode } from './Desktop';
import { MobileCode } from './Mobile';
import { ModalPromocode } from './Modal';

type Props = {
  checkout: ReturnType<typeof createBaseCart>;
};

export function Promocode({ checkout }: Props) {
  const { i18n } = useLingui();
  const texts = useUnit($mappedStrings);
  const popup = useUnit(promocodePopupField);
  const promocodeSettings = useUnit($promocodeSettings);
  const error = useUnit(promocodeMutation.$error);
  const cartBySelectedCounter = useUnit(checkout.$cartBySelectedCounter);

  if (!promocodeSettings.enabled || cartBySelectedCounter === 0) {
    return null;
  }

  return (
    <>
      <Responsive.Desktop>
        <DesktopCode checkout={checkout} popup={popup} />
      </Responsive.Desktop>

      <Responsive.TabletAndBelow>
        <MobileCode popup={popup} checkout={checkout} />
      </Responsive.TabletAndBelow>

      <Modal open={popup.value} onChange={() => popup.onChange(false)} header={texts.cart.promoCodeButton}>
        <ModalPromocode checkout={checkout} error={error} />
      </Modal>
    </>
  );
}
