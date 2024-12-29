import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useGate, useUnit } from 'effector-react';
import { useEffect } from 'react';

import { CheckoutType } from '@/generated/customer_hub/enums/checkout_type';
import { $appIsShort, $mappedStrings, $temporaryCartCode } from '@/shared/configs';
import { $isAuthorized } from '@/shared/session';
import { Modal, OrderAgreement } from '@/shared/ui';

import { modal } from '@/features/auth';

import { useViewport } from '@/lib/hooks';

import { Button, Responsive, Space } from '@/ui/index';

import { paymentIcons } from '@/ui/assets/icons';
import { Logo } from '@/ui/assets/Logo';

import {
  $deliveriesAreAvailable,
  $deliveryNotAvailableDisclamer,
  AddressSuggests,
  Delivery,
  DeliveryDetails,
  Recipient,
  SavedCardsGate,
} from '../../checkout';
import {
  fullReset,
  checkout,
  initiatePayment,
  $someChekoutActionInProgress,
  paymentStepField,
  cardPayment,
  $quickByResult,
} from '../../models';
import { Summary } from '../../Summary';
import CheckoutRequiredFieldsModal from '../RequiredFieldsModal/Checkout';

import { ThanksContent } from './ThanksContent';

import st from './styles.module.scss';

export default function QuickByModal() {
  const { i18n } = useLingui();
  const viewport = useViewport();
  const appIsShort = useUnit($appIsShort);
  const isAuth = useUnit($isAuthorized);
  const quickByCheckout = useUnit(checkout.cartQuery);
  const quickByResult = useUnit($quickByResult);
  const temporaryCartCode = useUnit($temporaryCartCode);
  const existedItems = useUnit(checkout.$existedProducts);
  const modalField = useUnit(modal);
  const reset = useUnit(fullReset);

  const paymentRun = useUnit(initiatePayment);
  const pending = useUnit($someChekoutActionInProgress);
  const hasDeliveries = useUnit($deliveriesAreAvailable);
  const deliveryNotAvailableDisclamer = useUnit($deliveryNotAvailableDisclamer);
  const texts = useUnit($mappedStrings);
  const modalOpened = !!quickByCheckout.result && temporaryCartCode.type === CheckoutType.CHECKOUT_TYPE_ONE_CLICK;

  const modalHeader = (
    <div className={st.header}>
      {quickByResult ? (
        <>
          <Responsive.TabletAndBelow>
            <Logo />
          </Responsive.TabletAndBelow>
          <Responsive.Desktop>
            <span>{texts.successCheckout.title}</span>
          </Responsive.Desktop>
        </>
      ) : (
        <>
          <span>{texts.checkout.title}</span>
          {!isAuth && !appIsShort && (
            <div className={st.shortLogin} onClick={() => modalField.onChange('any')}>
              {texts.navBar.login}
            </div>
          )}
        </>
      )}
    </div>
  );

  const device: Device = viewport.isDesktop ? 'desktop' : 'mobile';

  useGate(SavedCardsGate, { condition: modalOpened });

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (modalOpened) {
      return () => {
        reset();
      };
    }
  }, [reset, modalOpened]);

  return (
    <>
      <Modal
        shouldCloseOnOverlayClick={false}
        mobileFullScreen
        open={modalOpened}
        onChange={reset}
        header={modalHeader}
        headerClassName={cn(st.headerWrapper, {
          [st.hasResult]: !!quickByResult,
        })}
        modalSwipeableProps={{
          fullScreenHeight: 100,
          withBorderRadius: false,
        }}
      >
        {quickByResult ? (
          <ThanksContent deliveryData={quickByResult.deliveryData} />
        ) : (
          <Space className={st.space}>
            <div className={st.form}>
              <AddressSuggests device={device} isRelativePosition shouldCloseOnOverlayClick={false} />
              <Delivery device={device} className={st.deliveryWrapper} />
              <Recipient device={device} />
              <DeliveryDetails
                checkout={checkout}
                deliveryNotAvailableDescription={deliveryNotAvailableDisclamer}
                withEmptyStub
                className={st.deliveryDetails}
              />
            </div>

            <div className={st.actions}>
              <Summary checkout={checkout} isQuickBy />
              <Button
                colored
                bold
                stretch
                size="L"
                disabled={!hasDeliveries && existedItems.length > 0}
                pending={pending}
                onClick={() => paymentRun({ guarded: true })}
              >
                <paymentIcons.DefaultIcon /> Оплатить банковской картой
              </Button>

              <OrderAgreement />
            </div>
          </Space>
        )}
      </Modal>

      {modalOpened && (
        <>
          <cardPayment.Content needOverlay={false} shouldCloseOnOverlayClick={false} />

          <CheckoutRequiredFieldsModal
            stepField={paymentStepField}
            initiator={paymentRun}
            $pending={$someChekoutActionInProgress}
          />
        </>
      )}
    </>
  );
}
