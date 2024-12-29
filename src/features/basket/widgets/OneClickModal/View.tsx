import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';

import { $mappedStrings } from '@/shared/configs';
import { DescriptionModals, useDescriptionModals } from '@/shared/description-modals';
import { Modal, OrderAgreement, ChatBadge } from '@/shared/ui';
import { isPriceByRequest } from '@/shared/watches';

import { Button, Responsive, Space, Typography } from '@/ui/index';

import { $addressSettled, AddressStub, DeliveryDetails, Recipient } from '../../checkout';
import {
  fullReset,
  clickCollectCheckout,
  $someClickCollectInProgress,
  collectStepField,
  initiateCollect,
  $collectedResult,
  $clickAndCollectDetailsError,
} from '../../models';
import { Summary } from '../../Summary';
import { ClickAndCollectHeader, ClickAndCollectResults } from '../ClickAndCollectResults';
import CollectRequiredFieldsModal from '../RequiredFieldsModal/ClickAndCollect';

import st from './styles.module.scss';

export default function OneClickModal() {
  const { i18n } = useLingui();
  const texts = useUnit($mappedStrings);
  const checkout = useUnit(clickCollectCheckout.cartQuery);
  const reset = useUnit(fullReset);
  const someClickCollectInProgress = useUnit($someClickCollectInProgress);
  const initiateCollectHandler = useUnit(initiateCollect);
  const clickAndCollectDetailsError = useUnit($clickAndCollectDetailsError);
  const collectedResult = useUnit($collectedResult);

  /*
  Нету возможности как то перейтим на шаг адреса
  если он не пришел по какой то причине (ошибке)
  */

  const addressSettled = useUnit($addressSettled);
  const showrooms = useDescriptionModals();

  const hasError = !!clickAndCollectDetailsError;

  const modalOpened = !!checkout.result || hasError;

  const priceByRequestDescription =
    checkout.result?.cartData?.items?.[0] && isPriceByRequest(checkout.result?.cartData?.items?.[0])
      ? texts.itemDetails.price.hide
      : undefined;

  const roomsAction = (
    <Typography.Paragraph
      center
      className={st.romsAction}
      onClick={() => showrooms.setCurrentModal(DescriptionModals.Room)}
    >
      {texts.clickAndCollectCheckout.aboutShowroom.linkMore.title}
    </Typography.Paragraph>
  );

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (modalOpened) {
      return () => {
        reset();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset, modalOpened]);

  return (
    <>
      <Modal
        headerClassName={cn(st.headerWrapper, {
          [st.hasResult]: !!collectedResult,
        })}
        onlyDesktop={hasError}
        open={modalOpened}
        onChange={reset}
        header={<ClickAndCollectHeader />}
        mobileFullScreen={!hasError}
        modalSwipeableProps={{
          fullScreenHeight: 100,
          withBorderRadius: hasError,
        }}
      >
        <ClickAndCollectResults isOneClick>
          <Space className={st.space} stretch>
            <Responsive.TabletAndBelow className={st.responsive}>
              <div className={st.form}>
                <AddressStub device="mobile" />
                <Recipient device="mobile" />
                <DeliveryDetails checkout={clickCollectCheckout} additionalAction={roomsAction} withEmptyStub />
              </div>

              <div className={st.actions}>
                <ChatBadge context="custom" className={st.chatBadge} />

                <Summary
                  checkout={clickCollectCheckout}
                  isClickAndCollect
                  priceByRequestDescription={priceByRequestDescription}
                />
                <Button
                  colored
                  stretch
                  bold
                  size="L"
                  disabled={!addressSettled}
                  pending={someClickCollectInProgress}
                  onClick={initiateCollectHandler}
                >
                  {texts.clickAndCollectCheckout.reserve}
                </Button>

                <OrderAgreement />
              </div>
            </Responsive.TabletAndBelow>

            <Responsive.Desktop className={st.responsive}>
              <div className={st.form}>
                <AddressStub device="desktop" />
                <Recipient device="desktop" />
                <DeliveryDetails
                  checkout={clickCollectCheckout}
                  className={st.deliveryDesclamer}
                  additionalAction={roomsAction}
                />
              </div>

              <div className={st.actions}>
                <Summary
                  checkout={clickCollectCheckout}
                  isClickAndCollect
                  priceByRequestDescription={priceByRequestDescription}
                />
                <Button
                  colored
                  stretch
                  bold
                  size="L"
                  disabled={!addressSettled || !checkout.result?.deliveryData}
                  pending={someClickCollectInProgress}
                  onClick={initiateCollectHandler}
                >
                  {texts.clickAndCollectCheckout.reserve}
                </Button>

                <OrderAgreement />
              </div>
            </Responsive.Desktop>
          </Space>
        </ClickAndCollectResults>
      </Modal>

      {modalOpened && (
        <CollectRequiredFieldsModal
          stepField={collectStepField}
          initiator={initiateCollectHandler}
          $pending={$someClickCollectInProgress}
        />
      )}
    </>
  );
}
