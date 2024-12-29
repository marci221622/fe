import { useLingui } from '@lingui/react';
import { useUnit } from 'effector-react';

import { $mappedStrings } from '@/shared/configs';
import { $isAuthorized } from '@/shared/session';
import { Modal } from '@/shared/ui';

import { modal } from '@/features/auth';

import { $clickAndCollectDetailsError, checkout, checkoutPopupField } from '../../models';
import { ClickAndCollectResults, ClickAndCollectHeader } from '../ClickAndCollectResults';

import { MultyClickAndCollect } from './MultyClickAndCollect';
import { UsualCheckout } from './UsualCheckout';

import st from './styles.module.scss';

export default function CheckoutAsModalWidget() {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();
  const isAuth = useUnit($isAuthorized);
  const modalField = useUnit(modal);
  const popup = useUnit(checkoutPopupField);
  const clickAndCollectDetailsError = useUnit($clickAndCollectDetailsError);
  const existedItems = useUnit(checkout.$existedProducts);

  const modalHeader = (
    <div className={st.header}>
      <span>{texts.checkout.title}</span>
      {isAuth || (
        <div className={st.shortLogin} onClick={() => modalField.onChange('any')}>
          {texts.navBar.login}
        </div>
      )}
    </div>
  );

  const header = popup.value === 'checkout' ? modalHeader : <ClickAndCollectHeader />;

  const closePopup = () => popup.onChange(null);

  let content = null;

  if (popup.value === 'checkout') {
    content = <UsualCheckout />;
  }

  if (popup.value === 'multyClickAndCollect') {
    content = (
      <ClickAndCollectResults closePopup={closePopup} products={existedItems} isOneClick={false}>
        <MultyClickAndCollect />
      </ClickAndCollectResults>
    );
  }

  return (
    <Modal
      mobileFullScreen
      onlyDesktop={popup.value === 'multyClickAndCollect' && !!clickAndCollectDetailsError}
      open={!!popup.value}
      onChange={closePopup}
      onActionClick={closePopup}
      header={header}
      className={st.mobileCheckout}
      modalSwipeableProps={{
        fullScreenHeight: 100,
        withBorderRadius: false,
      }}
    >
      {content}
    </Modal>
  );
}
