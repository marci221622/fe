import { useLingui } from '@lingui/react';
import { useUnit } from 'effector-react';

import { $mappedStrings } from '@/shared/configs';
import { DescriptionModals, useDescriptionModals } from '@/shared/description-modals';
import { ChatBadge, OrderAgreement } from '@/shared/ui';
import { isPriceByRequest } from '@/shared/watches';

import { useMount, useViewport } from '@/lib/hooks';

import { Button, Space, Typography } from '@/ui/index';

import { $addressSettled, AddressStub, DeliveryDetails, Recipient } from '../../checkout';
import {
  $someClickCollectInProgress,
  calculateDeliveryClickAndCollectMutation,
  checkout,
  initiateCollect,
} from '../../models';
import { MultyClickAndColectSummary } from '../../Summary/MultyClickAndColectSummary';

import st from './styles.module.scss';

export function MultyClickAndCollect() {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();
  const viewport = useViewport();
  const addressSettled = useUnit($addressSettled);
  const showrooms = useDescriptionModals();
  const device: Device = viewport.isDesktop ? 'desktop' : 'mobile';
  const result = useUnit(checkout.cartQuery.$result);
  const calculateDelivery = useUnit(calculateDeliveryClickAndCollectMutation);
  const someClickCollectInProgress = useUnit($someClickCollectInProgress);
  const initiateCollectHandler = useUnit(initiateCollect);

  const roomsAction = (
    <Typography.Paragraph
      center
      className={st.romsAction}
      onClick={() => showrooms.setCurrentModal(DescriptionModals.Room)}
    >
      {texts.clickAndCollectCheckout.aboutShowroom.linkMore.title}
    </Typography.Paragraph>
  );

  const priceByRequestDescription =
    result?.cartData?.items?.[0] && isPriceByRequest(result?.cartData?.items?.[0])
      ? texts.itemDetails.price.hide
      : undefined;

  useMount(() => {
    calculateDelivery.start({});
  });

  return (
    <Space className={st.space} stretch>
      {device === 'mobile' ? (
        <>
          <div className={st.form}>
            <AddressStub device="mobile" />
            <Recipient device="mobile" />
            <DeliveryDetails checkout={checkout} additionalAction={roomsAction} withEmptyStub />
          </div>

          <div className={st.actions}>
            <ChatBadge context="custom" className={st.chatBadge} />

            <MultyClickAndColectSummary checkout={checkout} priceByRequestDescription={priceByRequestDescription} />
            <Button
              colored
              stretch
              bold
              size="L"
              pending={someClickCollectInProgress}
              disabled={!addressSettled}
              onClick={initiateCollectHandler}
            >
              {texts.clickAndCollectCheckout.reserve}
            </Button>

            <OrderAgreement />
          </div>
        </>
      ) : (
        <div className={st.responsive}>
          <div className={st.form}>
            <AddressStub device="desktop" />
            <Recipient device="desktop" />
            <DeliveryDetails checkout={checkout} className={st.deliveryDesclamer} additionalAction={roomsAction} />
          </div>

          <div className={st.actions}>
            <MultyClickAndColectSummary checkout={checkout} priceByRequestDescription={priceByRequestDescription} />
            <Button
              colored
              stretch
              bold
              size="L"
              pending={someClickCollectInProgress}
              disabled={!addressSettled || !result?.deliveryData}
              onClick={initiateCollectHandler}
            >
              {texts.clickAndCollectCheckout.reserve}
            </Button>

            <OrderAgreement />
          </div>
        </div>
      )}
    </Space>
  );
}
