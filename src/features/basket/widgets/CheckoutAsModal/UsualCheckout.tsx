import { useLingui } from '@lingui/react';
import { useUnit } from 'effector-react';
import { useMemo } from 'react';

import { Place } from '@/generated/customer_hub/enums/place';
import { $mappedStrings } from '@/shared/configs';
import { OrderAgreement, ChatBadge } from '@/shared/ui';
import { hasStickyLoyalty, LoyaltySticky } from '@/shared/ui/LoyaltyBanners';
import { useLoyalty } from '@/shared/ui/StickyBanner';

import { useMount, useViewport } from '@/lib/hooks';

import { Button, Space } from '@/ui/index';

import { paymentIcons } from '@/ui/assets/icons';

import {
  Delivery,
  DeliveryDetails,
  Recipient,
  AddressSuggests,
  $deliveriesAreAvailable,
  $deliveryNotAvailableDisclamer,
  $grouppedDeliveries,
  selectProductByDeliveries,
  calculateDeliveryMutation,
} from '../../checkout';
import { needToResolveDelivery } from '../../helpers';
import { checkout, $someChekoutActionInProgress, initiatePayment } from '../../models';
import { Summary } from '../../Summary';

import { ProductsCard } from './ProductsCard';

import st from './styles.module.scss';

export function UsualCheckout() {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();
  const viewport = useViewport();
  const paymentRun = useUnit(initiatePayment);
  const pending = useUnit($someChekoutActionInProgress);
  const hasDeliveries = useUnit($deliveriesAreAvailable);
  const deliveryNotAvailableDisclamer = useUnit($deliveryNotAvailableDisclamer);
  const deliveries = useUnit($grouppedDeliveries);
  const existedItems = useUnit(checkout.$existedProducts);
  const loyalty = useLoyalty({
    place: Place.PLACE_CHECKOUT,
    itemCodes: useMemo(
      () => existedItems.map(product => product.item?.code).filter(Boolean) as string[],
      [existedItems],
    ),
  });
  const cart = useUnit(checkout.cartQuery.$result);
  const calculateMutation = useUnit(calculateDeliveryMutation);

  const device: Device = viewport.isDesktop ? 'desktop' : 'mobile';

  useMount(() => {
    if (cart && needToResolveDelivery(cart)) {
      calculateMutation.start({ address: { id: 'test', data: cart.deliveryData?.destination } });
    }
  });

  return (
    <Space className={st.space}>
      {hasStickyLoyalty(loyalty?.loyalty) && (
        <div className={st.loyaltyWrapper}>
          <LoyaltySticky loyalty={loyalty?.loyalty} />
        </div>
      )}

      <div className={st.form}>
        <AddressSuggests device={device} isRelativePosition />
        {device === 'mobile'
          ? [<Recipient device={device} key="recipient" />, <Delivery device={device} key="delivery" />]
          : [<Delivery device={device} key="delivery" />, <Recipient device={device} key="recipient" />]}
        <DeliveryDetails
          checkout={checkout}
          deliveryNotAvailableDescription={deliveryNotAvailableDisclamer}
          withEmptyStub
          className={st.deliveryDetails}
        />

        {device === 'mobile' && deliveries.groups.length > 1 && (
          <Space direction="vertical" size="large">
            {deliveries.groups.map(delivery => {
              const products = selectProductByDeliveries({ products: existedItems, delivery: delivery[0] });

              if (products.length === 0) {
                return null;
              }

              return <ProductsCard key={delivery[0].title} items={products} delivery={delivery[0]} />;
            })}
          </Space>
        )}
      </div>

      <div className={st.actions}>
        {device === 'mobile' && <ChatBadge context="custom" className={st.chatBadge} />}

        <Summary checkout={checkout} loyalty={loyalty?.loyalty} />
        <Button
          colored
          stretch
          size="L"
          disabled={!hasDeliveries && existedItems.length > 0}
          pending={pending}
          onClick={() => paymentRun({ guarded: true })}
        >
          <paymentIcons.DefaultIcon /> {texts.web.payByCard}
        </Button>

        <OrderAgreement />
      </div>
    </Space>
  );
}
