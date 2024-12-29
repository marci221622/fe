import { createEvent, createStore, sample } from 'effector';

import { Address } from '@/generated/customer_hub/entities/address.v1';
import { Delivery } from '@/generated/customer_hub/entities/delivery.v1';

import { createField } from '@/lib/createField';
import { createMutation, FxParams } from '@/lib/createMutation';

import { selectInterval, setAddress } from '../api';
import {
  allDeliviriesAreAvailabled,
  getAddressFromAddressData,
  groupDeliveries,
  selectCodesFromDeliviries,
} from '../transformers';

import { checkoutReset } from './actions';
import { suggestsField, suggestsQuery, draftSuggestField } from './suggests';

export function isValidAddress(address: Address) {
  return !!address.data?.house;
}

export const addressSelected = createEvent<Address>();

export const $deliveries = createStore<Delivery[]>([]);

// Групируем доставки по кодам товаров
export const $grouppedDeliveries = $deliveries.map(groupDeliveries);
// Даем продолжить все, если все доставки доступные !
export const $deliveriesAreAvailable = $deliveries.map(allDeliviriesAreAvailabled);
// Костыль что бы показать тайтл про не доступную доставку
// Вместо дисклеймера от findCheckout (который в этот момент будет пустой)
export const $deliveryNotAvailableDisclamer = $deliveries.map(deliveries => {
  const delivery = deliveries.filter(it => !it.available)[0];

  return delivery?.description || delivery?.title || '';
});
// Сервер не дает активных доставок и выбирает по умолчанию первые
// Этот стейт фактически для локальных данных
export const activeIntervalField = createField({ date: 0, time: 0, type: '', isDate: false });

export const calculateDeliveryMutation = createMutation({
  handler: async ([{ address }, ctrl]: FxParams<{ address: Address }>) => {
    const rs = await setAddress({
      body: { address, date: new Date() },
      signal: ctrl.signal,
    });

    return rs;
  },
});

// type - 'dropdown|button'
// isDate - boolean
// Для аналитики
export const intervalsMutation = createMutation({
  handler: async ([{ codes }]: FxParams<{ codes: string[]; type: string; isDate?: boolean }>) => {
    const rs = await selectInterval({
      body: {
        deliveryIntervalCodes: codes,
      },
    });

    return rs;
  },
});

sample({
  clock: calculateDeliveryMutation.fx.doneData,
  fn: result => result.deliveries,
  target: [$deliveries, activeIntervalField.reset],
});

sample({
  source: $deliveries,
  clock: [
    activeIntervalField.reset.map(() => ({ date: 0, time: 0, type: '', isDate: false })),
    activeIntervalField.change,
  ],
  fn: (deliveries, { date, time, type, isDate }) => {
    return {
      codes: selectCodesFromDeliviries({ deliveries, date, time }),
      type,
      isDate,
    };
  },
  filter: (deliveries, { date, time }) =>
    allDeliviriesAreAvailabled(deliveries) && selectCodesFromDeliviries({ deliveries, date, time }).length > 0,
  target: intervalsMutation.start,
});

sample({
  clock: addressSelected,
  filter: isValidAddress,
  target: [
    draftSuggestField.change.prepend((address: Address) => getAddressFromAddressData(address.data)),
    calculateDeliveryMutation.start.prepend((address: Address) => ({ address })),
  ],
});

sample({
  clock: addressSelected,
  filter: address => !isValidAddress(address),
  target: suggestsField.change.prepend((address: Address) => getAddressFromAddressData(address.data)),
});

sample({ clock: calculateDeliveryMutation.start, target: suggestsQuery.reset });

sample({
  clock: checkoutReset,
  target: [
    calculateDeliveryMutation.reset,
    suggestsQuery.reset,
    $deliveries.reinit!,
    activeIntervalField.reset,
    intervalsMutation.reset,
  ],
});
