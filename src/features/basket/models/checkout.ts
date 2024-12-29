import { grpc } from '@improbable-eng/grpc-web';
import { combine, sample } from 'effector';
import { debounce, pending, spread } from 'patronum/macro';

import { AB_TESTS, isVariationA } from '@/shared/configs/abTests';

import { analytics, bridge } from '@/lib/bridge';
import { formatDelivery } from '@/lib/formatting';

import { removeFromCartMutation, toggleSelectMutation, promocodeMutation } from '../cart';
import {
  calculateDeliveryMutation,
  intervalsMutation,
  recipientMutation,
  phoneField,
  nameField,
  draftSuggestField,
  addressSelected,
  isValidAddress,
  $deliveries,
  activeIntervalField,
  $savedCardsPanning,
} from '../checkout';
import {
  isMultyClickCheckoutData,
  isOneClickCheckoutData,
  isUsualCheckoutData,
  needToResolveDelivery,
} from '../helpers';

import { basketAnalytics } from './analytics';
import { localCart } from './cart';
import { calculateDeliveryClickAndCollectMutation, clickAndCollectConfirmMutation } from './clickAndCollect';

// aliase
export const checkout = localCart;

export const $someChekoutActionInProgress = combine(
  pending({
    effects: [recipientMutation.fx, intervalsMutation.fx, calculateDeliveryMutation.fx],
  }),
  $savedCardsPanning,
).map(values => values.some(Boolean));

// Файл биндинг для связей чекаута и корзины

// Проблема на беке
// Интервалы протухают
// Нужно перезапросить если вылезла ошибка
sample({
  source: checkout.cartQuery.$result,
  clock: debounce({ source: intervalsMutation.$error, timeout: 300 }),
  filter: (cart, error) =>
    error?.code === grpc.Code.InvalidArgument && !!cart?.deliveryData?.destination && isUsualCheckoutData(cart),
  fn: cart => ({ address: { id: 'test', data: cart?.deliveryData?.destination } }), // TODO: better id
  target: calculateDeliveryMutation.start,
});

// Пересчет доставки
sample({
  source: AB_TESTS.$multiClickAndCollect,
  clock: [
    checkout.cartQuery.fx.doneData,
    removeFromCartMutation.fx.doneData,
    toggleSelectMutation.fx.doneData,
    promocodeMutation.fx.doneData,
  ],
  filter: (variant, cart) => isVariationA(variant) && needToResolveDelivery(cart),
  fn: (_, cart) => ({ address: { id: 'test', data: cart.deliveryData?.destination } }), // TODO: better id
  target: calculateDeliveryMutation.start,
});

// Очистить доставки при любом действии
// Далее пересчет будет
sample({
  clock: [removeFromCartMutation.fx.doneData, toggleSelectMutation.fx.doneData, promocodeMutation.fx.doneData],
  filter: cart => !needToResolveDelivery(cart),
  target: $deliveries.reinit!,
});

sample({
  clock: [intervalsMutation.fx.doneData, recipientMutation.fx.doneData],
  filter: cart => !isOneClickCheckoutData(cart),
  target: checkout.cartQuery.$result,
});

// Обновления состояние по мультиклику
bridge(() => {
  sample({
    clock: calculateDeliveryClickAndCollectMutation.fx.doneData,
    filter: cart => isMultyClickCheckoutData(cart),
    target: checkout.cartQuery.$result,
  });

  sample({
    clock: clickAndCollectConfirmMutation.fx.doneData,
    filter: cart => !!cart?.checkoutState && isMultyClickCheckoutData(cart.checkoutState),
    fn: () => ({}),
    target: localCart.cartQuery.start,
  });
});

// Просто заполняем свежим стейтом поля
spread({
  source: checkout.cartQuery.$result.map(rs => ({
    phone: rs?.deliveryData?.recipient?.phone ?? '',
    name: rs?.deliveryData?.recipient?.personName ?? '',
    suggests: rs?.deliveryData?.destination?.description ?? '',
  })),
  targets: {
    name: nameField.$value,
    phone: phoneField.$value,
    suggests: draftSuggestField.$value,
  },
});

analytics(() => {
  sample({
    clock: addressSelected,
    fn: () => ({}),
    filter: it => isValidAddress(it),
    target: basketAnalytics.addressSelected,
  });

  sample({
    source: { deliveries: $deliveries, interval: activeIntervalField.$value },
    clock: intervalsMutation.fx.finally,
    filter: ({ deliveries, interval }, { params }) =>
      !!deliveries[interval.date] && !!deliveries[interval.date]?.deliveryIntervals[interval.time] && !!params[0].type,
    fn: ({ deliveries, interval }, result) => {
      const {
        day,
        time,
        interval: formattedIntarval,
      } = formatDelivery({
        delivery: deliveries[interval.date]!,
        type: 'asList',
        interval: deliveries[interval.date].deliveryIntervals[interval.time]!,
      });

      return {
        error: result.status === 'fail' ? result.error : undefined,
        interval: `${day}|${time}|${formattedIntarval}`,
        type: result.params[0].type,
        ctx: result.params[0].isDate ? ('date' as const) : ('time' as const),
      };
    },
    target: basketAnalytics.intervalChanged,
  });
});
