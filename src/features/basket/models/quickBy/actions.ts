import { createStore, sample } from 'effector';
import { v4 as uuidv4 } from 'uuid';

import { CheckoutData } from '@/generated/customer_hub/entities/checkout_data.v1';
import { CheckoutType } from '@/generated/customer_hub/enums/checkout_type';
import { $temporaryCartCode, $temporaryQuickBySeateld } from '@/shared/configs';

import { logged } from '@/features/auth';

import { analytics, bridge } from '@/lib/bridge';
import { createMutation, FxParams } from '@/lib/createMutation';
import { keepFresh } from '@/lib/keepFresh';

import { calculateDeliveryMutation, checkoutReset } from '../../checkout';
import { isQuickByCheckoutData, needToResolveDelivery } from '../../helpers';
import { AddedToCartParams } from '../../types';
import { basketAnalytics } from '../analytics';
import { checkout } from '../checkout';
import { cardPayment } from '../payment';

import { quickByRequest } from './api';

export const $quickByResult = createStore<CheckoutData | null>(null);

export const quickByMutation = createMutation({
  handler: async ([{ offerCodes }]: FxParams<AddedToCartParams>) => {
    const code = uuidv4();

    const rs = await quickByRequest({
      body: {
        offerCodes,
        cartCode: code,
        type: CheckoutType.CHECKOUT_TYPE_ONE_CLICK,
      },
    });

    return rs;
  },
});

$temporaryCartCode.on(quickByMutation.fx.done, (_, { result }) => ({
  type: CheckoutType.CHECKOUT_TYPE_ONE_CLICK,
  code: result.meta?.code ?? '',
}));

sample({
  clock: checkoutReset,
  target: $temporaryCartCode.reinit!,
});

sample({
  clock: quickByMutation.fx.doneData,
  target: checkout.cartQuery.$result,
});

sample({
  clock: quickByMutation.fx.doneData,
  filter: needToResolveDelivery,
  fn: cart => ({ address: { id: 'test', data: cart.deliveryData?.destination } }), // TODO: better id
  target: calculateDeliveryMutation.start,
});

sample({
  clock: cardPayment.paymentSuccess,
  filter: data => !!data.orderCode && isQuickByCheckoutData(data.data),
  fn: data => data.data,
  target: $quickByResult,
});

// Обновить чисто для виджета быстрая покупка
bridge(() => {
  keepFresh(checkout.cartQuery, {
    if: $temporaryQuickBySeateld,
    source: createStore({}),
    triggers: [logged],
  });
});

analytics(() => {
  sample({
    clock: quickByMutation.fx.doneData,
    fn: data => data.cartData?.items[0] ?? null,
    target: basketAnalytics.beginQuickBy,
  });

  sample({
    source: checkout.cartQuery.$result,
    clock: cardPayment.paymentSuccess,
    filter: data => !!data && isQuickByCheckoutData(data),
    fn: (cart, { orderCode }) => ({ data: cart, orderCode: orderCode ?? '', isQuickBy: true }),
    target: basketAnalytics.typLoaded,
  });
});
