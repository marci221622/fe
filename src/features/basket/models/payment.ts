import { createEvent, sample, split } from 'effector';
import { condition } from 'patronum/macro';

import { ListSavedCardsResponse_SavedCardData } from '@/generated/customer_hub/methods/customer/list_saved_cards.v1';
import { $temporaryCartCode } from '@/shared/configs';
import { createCardPayments } from '@/shared/payments';

import { analytics } from '@/lib/bridge';
import { createField } from '@/lib/createField';

import { suggestOpenedField, addressSelected, savedCardQuery, $allFieldSettled, $requiredFields } from '../checkout';
import { isUsualCheckoutData } from '../helpers';
import { GuardSteps } from '../types';

import { fullReset } from './actions';
import { basketAnalytics } from './analytics';
import { localCart } from './cart';

export const paymentStepField = createField<GuardSteps>(GuardSteps.initial);

// guarded - если тру - открываем модалки для заполнения полей
// Обязательных для завершения платежа
export const initiatePayment = createEvent<{ guarded?: boolean }>();
export const tryRequiredField = createEvent();

const paymentFlows = {
  guarded: createEvent(),
  direct: createEvent(),
};

export const cardPayment = createCardPayments({
  $temporaryCartCode: $temporaryCartCode.map(codes => codes.code),
  $savedCards: savedCardQuery.$result.map(it => it?.savedCards ?? ([] as ListSavedCardsResponse_SavedCardData[])),
});

split({
  source: initiatePayment,
  match: {
    guarded: ({ guarded }) => !!guarded,
    direct: ({ guarded }) => !guarded,
  },
  cases: {
    guarded: paymentFlows.guarded,
    direct: paymentFlows.direct,
  },
});

sample({
  clock: paymentFlows.direct,
  fn: () => true,
  target: [cardPayment.paymentPopup.change, paymentStepField.reset],
});

sample({
  source: $requiredFields,
  clock: tryRequiredField,
  fn: fields => fields.find(it => !it.setted)?.type ?? GuardSteps.initial,
  target: paymentStepField.change,
});

condition({
  source: paymentFlows.guarded,
  if: $allFieldSettled,
  then: paymentFlows.direct,
  else: tryRequiredField,
});

sample({
  clock: paymentStepField.change,
  filter: it => it === GuardSteps.address,
  fn: () => true,
  target: suggestOpenedField.change,
});

sample({
  source: paymentStepField.$value,
  clock: addressSelected,
  filter: it => it === GuardSteps.address,
  target: tryRequiredField,
});

sample({
  clock: fullReset,
  fn: () => GuardSteps.initial,
  target: paymentStepField.change,
});

sample({
  clock: cardPayment.paymentSuccess,
  filter: ({ data }) => isUsualCheckoutData(data),
  fn: () => ({}),
  target: localCart.cartQuery.start,
});

analytics(() => {
  sample({
    clock: cardPayment.initiatePayment,
    target: basketAnalytics.initiateCheckout,
  });
});
