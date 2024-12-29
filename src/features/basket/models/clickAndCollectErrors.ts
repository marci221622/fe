import { combine, createStore, sample } from 'effector';

import { CheckoutData } from '@/generated/customer_hub/entities/checkout_data.v1';
import * as errorDetails from '@/lib/services/grpc-web-details';

import { checkoutReset } from '../checkout';
import { TypedErros, clickAndCollectErrors, parseGrpcErrors } from '../helpers';

import { oneClickMutation, clickAndCollectConfirmMutation } from './clickAndCollect';
import { switchCheckoutTypeMutation, checkoutPopupField } from './clickAndCollectTypeSwitcher';

export const $clickAndCollectDetailsError = combine(
  clickAndCollectConfirmMutation.$error,
  oneClickMutation.$error,
  switchCheckoutTypeMutation.$error,
).map(errors => {
  const parsedErrors = errors
    .filter(Boolean)
    .reduce((acc, error) => [...acc, ...parseGrpcErrors(errorDetails.statusFromError(error))], [] as TypedErros[]);

  return parsedErrors.length > 0 ? clickAndCollectErrors.parse(parsedErrors) : null;
});

export const $collectedResult = createStore<CheckoutData | null>(null);

sample({
  clock: clickAndCollectConfirmMutation.fx.doneData,
  filter: it => !!it.checkoutState,
  fn: it => it.checkoutState!,
  target: $collectedResult,
});

sample({
  clock: $clickAndCollectDetailsError,
  filter: Boolean,
  fn: () => 'multyClickAndCollect' as const,
  target: checkoutPopupField.change,
});

sample({
  clock: checkoutReset,
  target: [$collectedResult.reinit, switchCheckoutTypeMutation.reset],
});
