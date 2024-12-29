import { sample } from 'effector';

import { wasLogouted } from '@/shared/session';
import { $isClient, appStarted } from '@/shared/start';

import { logged } from '@/features/auth';

import { analytics } from '@/lib/bridge';

import {
  createBaseCart,
  addToCardMutation,
  removeFromCartMutation,
  toggleSelectMutation,
  promocodeMutation,
  fetchCart,
  cartAnalytics,
} from '../cart';
import { findCheckout } from '../checkout';
import { isQuickByCheckoutData } from '../helpers';

import { basketAnalytics } from './analytics';
import { optimistic } from './optimistic';

// Биндинги для корзины
// На пример вся работа со стейтами
// Реакиця на какие то сущности (на пример прмокод и тд)

// Нужно только фактически для каунтера сверху шапки
// localCart - сущность корзины для экрана чекаут
export const globalCart = createBaseCart({ fx: fetchCart });
export const localCart = createBaseCart({ fx: findCheckout });

export const $hasSomeNotSelected = localCart.$existedProducts.map(items => items.some(it => !it.selected));
export const $everyNotSelected = localCart.$existedProducts.map(items => items.every(it => !it.selected));
export const $hasAloneSelected = localCart.$existedProducts.map(items => {
  const selectedItems = items.filter(it => it.selected);

  return selectedItems.length === 1 && items.length > 1;
});

sample({
  clock: [appStarted, logged],
  filter: $isClient,
  fn: () => ({}),
  target: globalCart.cartQuery.start,
});

// Просто заполняем стейты актуальными данными
sample({
  clock: [
    addToCardMutation.fx.doneData,
    removeFromCartMutation.fx.doneData,
    toggleSelectMutation.fx.doneData,
    promocodeMutation.fx.doneData,
  ],
  target: [localCart.cartQuery.$result, localCart.clearSelected],
});

sample({
  clock: localCart.cartQuery.$result,
  filter: cart => (cart ? !isQuickByCheckoutData(cart) : true),
  target: globalCart.cartQuery.$result,
});

sample({
  clock: wasLogouted,
  target: [localCart.cartQuery.reset, globalCart.cartQuery.reset],
});

// Нужно если последний товар не выбран - выбрать его автоматически
sample({
  clock: localCart.$existedProducts,
  filter: localCart.$lastExistedItemNotSelected,
  fn: items => ({ items: [items[0]], selected: false }),
  target: toggleSelectMutation.start,
});

optimistic({
  cart: localCart,
  mutations: {
    removeFromCart: removeFromCartMutation,
    addToCart: addToCardMutation,
    toggleSelection: toggleSelectMutation,
  },
});

analytics(() => {
  sample({
    clock: addToCardMutation.fx.done,
    fn: ({ params, result }) => ({
      item:
        result.cartData?.items.find(
          it => it.item?.title === params[0].title && it.item?.brand?.id === params[0].brand?.id,
        ) ?? null,
      page: params[0].place,
      type: 'cart' as const,
      originalItems: result.cartData?.items ?? [],
    }),
    target: basketAnalytics.addedToCart,
  });

  sample({
    clock: removeFromCartMutation.fx.done,
    fn: ({ params, result }) => ({
      items: params[0].items,
      page: 'CartPage',
      type: 'cart' as const,
      originalItems: result.cartData?.items ?? [],
    }),
    target: basketAnalytics.removeFromCart,
  });

  sample({
    clock: toggleSelectMutation.fx.done,
    fn: ({ params, result }) => ({
      items: params[0].items,
      selected: params[0].selected,
      originalItems: result.cartData?.items ?? [],
    }),
    target: basketAnalytics.toggleSelection,
  });

  sample({
    clock: cartAnalytics.selectPromocode,
    target: basketAnalytics.selectPromocode,
  });
});
