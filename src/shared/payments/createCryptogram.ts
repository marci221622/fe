import { omit } from 'lodash';

import { runtimeConfig } from '@/constants/runtimeConfig';

export function createCryptogram(form: CPCryptogramParams, mode?: string) {
  const checkout: Checkout = new window.cp.Checkout({
    publicId: runtimeConfig.CLOUD_PAYMENT_ID,
    mode,
  });

  return checkout.createPaymentCryptogram(
    mode === 'cvv' ? omit(form, ['expDateMonth', 'expDateYear', 'cardNumber']) : form,
  );
}
