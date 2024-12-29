import { v4 as uuidv4 } from 'uuid';

import { CheckoutType } from '@/generated/customer_hub/enums/checkout_type';
import { $temporaryCartCode } from '@/shared/configs';

import { createMutation, FxParams } from '@/lib/createMutation';

import { AddedToCartParams } from '../../../types';
import { oneClickAddToCart, calculateDeliveryClickAndCollect, clickAndCollectConfirmation } from '../api';

export const oneClickMutation = createMutation({
  handler: async ([{ offerCodes }, ctrl]: FxParams<AddedToCartParams>) => {
    const code = uuidv4();

    const rs = await oneClickAddToCart({
      signal: ctrl.signal,
      body: {
        offerCodes,
        cartCode: code,
        type: CheckoutType.CHECKOUT_TYPE_CLICK_AND_COLLECT_ONE_CLICK,
      },
    });

    return rs;
  },
});

export const calculateDeliveryClickAndCollectMutation = createMutation({
  handler: async ([_, ctrl]: FxParams<object>) => {
    const rs = await calculateDeliveryClickAndCollect({
      signal: ctrl.signal,
      body: {
        date: new Date(),
      },
    });

    return rs;
  },
});

// Подтвердить бронирование
export const clickAndCollectConfirmMutation = createMutation({
  handler: async (_: FxParams<object>) => {
    const rs = await clickAndCollectConfirmation({
      body: {},
    });

    return rs;
  },
});

$temporaryCartCode.on(oneClickMutation.fx.done, (_, { result }) => ({
  type: CheckoutType.CHECKOUT_TYPE_CLICK_AND_COLLECT,
  code: result.meta?.code ?? '',
}));
