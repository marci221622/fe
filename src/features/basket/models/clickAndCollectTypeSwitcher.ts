import { sample } from 'effector';

import { CheckoutType } from '@/generated/customer_hub/enums/checkout_type';

import { createField } from '@/lib/createField';
import { FxParams, createMutation } from '@/lib/createMutation';

import { checkoutReset, switchCheckoutType } from '../checkout';
import { isUsualCheckoutData } from '../helpers';

import { localCart } from './cart';

type Params = {
  type: CheckoutType;
};

// Открыть модалку чекаута или примерки в корзине
export const checkoutPopupField = createField<'checkout' | 'multyClickAndCollect' | null>(null);

export const switchCheckoutTypeMutation = createMutation({
  handler: ([{ type }]: FxParams<Params>) => switchCheckoutType({ body: { type } }),
});

sample({
  clock: switchCheckoutTypeMutation.fx.doneData,
  fn: result => (isUsualCheckoutData(result) ? 'checkout' : 'multyClickAndCollect'),
  target: checkoutPopupField.change,
});

sample({
  clock: switchCheckoutTypeMutation.fx.doneData,
  target: localCart.cartQuery.$result,
});

sample({
  clock: checkoutReset,
  target: checkoutPopupField.reset,
});
