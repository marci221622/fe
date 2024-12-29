import { createStore, sample, merge, createEvent } from 'effector';
import { condition, not, pending, spread } from 'patronum/macro';

import { CheckoutData } from '@/generated/customer_hub/entities/checkout_data.v1';
import { ContactType } from '@/generated/customer_hub/enums/contact_type';
import { $temporaryCartCode, $temporaryClickAndCollectSeateld } from '@/shared/configs';
import { $isAuthorized } from '@/shared/session';

import { authCodeMutation, logged } from '@/features/auth';

import { analytics } from '@/lib/bridge';
import { createField } from '@/lib/createField';
import { keepFresh } from '@/lib/keepFresh';
import { digestPhone } from '@/lib/string';

import { createBaseCart } from '../../../cart';
import {
  $allFieldSettled,
  $requiredFields,
  checkoutReset,
  draftSuggestField,
  nameField,
  phoneField,
  recipientMutation,
} from '../../../checkout';
import { isOneClickCheckoutData, recipientValidation } from '../../../helpers';
import { GuardSteps } from '../../../types';
import { basketAnalytics } from '../../analytics';
import { oneClickFindCheckout } from '../api';

import { oneClickMutation, calculateDeliveryClickAndCollectMutation, clickAndCollectConfirmMutation } from './actions';

export const collectStepField = createField<GuardSteps>(GuardSteps.initial);

export const initiateCollect = createEvent<void>();
const tryRequiredField = createEvent();

const collectFlow = {
  direct: createEvent(),
};

// По сути заглушка для стейта
export const clickCollectCheckout = createBaseCart({ fx: oneClickFindCheckout });

export const $someClickCollectInProgress = pending({
  effects: [
    recipientMutation.fx,
    calculateDeliveryClickAndCollectMutation.fx,
    oneClickMutation.fx,
    clickCollectCheckout.cartQuery.fx,
    clickAndCollectConfirmMutation.fx,
  ],
});

// Запускаем резервирование,
// если все поля заполнены
sample({
  clock: collectFlow.direct,
  filter: $isAuthorized,
  fn: () => ({}),
  target: [clickAndCollectConfirmMutation.start, collectStepField.reset],
});

// Если как то обошли авторизацию
// Открываем шаг формы при резервировании
sample({
  clock: collectFlow.direct,
  filter: not($isAuthorized),
  fn: () => GuardSteps.phone,
  target: collectStepField.change,
});

sample({
  source: { requiredFields: $requiredFields, isAuthorized: $isAuthorized },
  clock: tryRequiredField,
  fn: ({ requiredFields, isAuthorized }) => {
    const phone = requiredFields.find(it => it.type === GuardSteps.phone)!;

    if (phone.setted && !isAuthorized) {
      return GuardSteps.phone;
    }

    return requiredFields.find(it => !it.setted)?.type ?? GuardSteps.initial;
  },
  target: collectStepField.change,
});

sample({
  clock: logged,
  filter: $temporaryClickAndCollectSeateld,
  fn: () => GuardSteps.initial,
  target: collectStepField.change,
});

sample({
  clock: clickCollectCheckout.cartQuery.fx.doneData,
  filter: $temporaryClickAndCollectSeateld,
  target: initiateCollect,
});

condition({
  source: initiateCollect,
  if: $allFieldSettled,
  then: collectFlow.direct,
  else: tryRequiredField,
});

sample({
  source: { phone: phoneField.$value, isAuthorized: $isAuthorized },
  clock: collectStepField.change,
  filter: ({ phone, isAuthorized }, step) =>
    !isAuthorized && step === GuardSteps.phone && recipientValidation({ phone }, 'phone'),
  fn: ({ phone }) => ({
    type: ContactType.CONTACT_TYPE_PHONE,
    value: `+${digestPhone(phone)}`,
  }),
  target: authCodeMutation.start,
});

spread({
  source: merge([oneClickMutation.fx.doneData, clickCollectCheckout.cartQuery.fx.doneData]).map(getData),
  targets: getSpread(),
});

sample({
  clock: oneClickMutation.fx.doneData,
  fn: () => ({}),
  target: calculateDeliveryClickAndCollectMutation.start,
});

sample({
  clock: [recipientMutation.fx.doneData, calculateDeliveryClickAndCollectMutation.fx.doneData],
  filter: cart => isOneClickCheckoutData(cart),
  target: clickCollectCheckout.cartQuery.$result,
});

sample({
  clock: checkoutReset,
  target: [
    $temporaryCartCode.reinit!,
    clickCollectCheckout.cartQuery.reset,
    oneClickMutation.reset,
    calculateDeliveryClickAndCollectMutation.reset,
    clickAndCollectConfirmMutation.reset,
    authCodeMutation.reset,
    collectStepField.reinit,
  ],
});

keepFresh(clickCollectCheckout.cartQuery, {
  if: $temporaryClickAndCollectSeateld,
  source: createStore({}),
  triggers: [logged],
});

analytics(() => {
  // Для ошибки брованирования есть 2 места
  // Обрабатываются по разному
  // Для процес - данные есть
  // Для начального клика - данные в ивенте
  sample({
    source: clickCollectCheckout.cartQuery.$result,
    clock: clickAndCollectConfirmMutation.fx.failData,
    fn: data =>
      data
        ? {
            price: data.cartData?.items[0]?.finalPrice,
            title: data.cartData?.items[0]?.item?.title ?? '',
            code: data.cartData?.items[0]?.item?.code ?? '',
          }
        : null,
    target: basketAnalytics.collectedErrorLimit,
  });

  sample({
    clock: oneClickMutation.fx.fail,
    fn: ({ params }) => ({
      price: params[0].finalPrice,
      title: params[0].title,
      code: params[0].itemCode,
    }),
    target: basketAnalytics.collectedErrorLimit,
  });

  sample({
    clock: oneClickMutation.fx.done,
    fn: ({ result }) => result.cartData?.items[0] ?? null,
    target: basketAnalytics.beginClickAndCollect,
  });

  sample({
    clock: oneClickMutation.fx.done,
    fn: ({ result }) => ({
      items: result.cartData?.items ?? [],
      isClickAndCollect: true,
    }),
    target: basketAnalytics.checkoutBegin,
  });

  sample({
    clock: clickAndCollectConfirmMutation.fx.doneData,
    filter: it => !!it.checkoutState && !!it.orderCode,
    fn: ({ checkoutState, orderCode = '' }) => ({ data: checkoutState, orderCode, isClickAndCollect: true }),
    target: basketAnalytics.typLoaded,
  });
});

function getData(rs: CheckoutData) {
  return {
    phone: rs.deliveryData?.recipient?.phone ?? '',
    name: rs.deliveryData?.recipient?.personName ?? '',
    suggests: rs.deliveryData?.destination?.description ?? '',
    fullResult: rs as CheckoutData | null,
  };
}

function getSpread() {
  return {
    name: nameField.$value,
    phone: phoneField.$value,
    suggests: draftSuggestField.$value,
    fullResult: clickCollectCheckout.cartQuery.$result,
  };
}
