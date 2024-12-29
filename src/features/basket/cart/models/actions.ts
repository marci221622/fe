import { pending } from 'patronum';

import { CheckoutType } from '@/generated/customer_hub/enums/checkout_type';

import { createMutation, FxParams } from '@/lib/createMutation';

import { AddedToCartParams, RemoveFromCartParams, ToggleSelectParams } from '../../types';
import { addToCart, removeFromCart, selectCartItem, unselectCartItem } from '../api';

import { promocodeMutation } from './promocode';

export const addToCardMutation = createMutation({
  handler: async ([{ offerCodes }, ctrl]: FxParams<AddedToCartParams>) => {
    const rs = await addToCart({
      signal: ctrl.signal,
      body: {
        offerCodes,
        type: CheckoutType.CHECKOUT_TYPE_USUAL_UNSPECIFIED,
      },
    });

    return rs;
  },
});

export const removeFromCartMutation = createMutation({
  handler: async ([{ items }, ctrl]: FxParams<RemoveFromCartParams>) => {
    const rs = await removeFromCart({
      signal: ctrl.signal,
      body: {
        cartItemIds: items.map(it => it.id),
      },
    });

    return rs;
  },
});

export const toggleSelectMutation = createMutation({
  handler: ([{ items, selected }]: FxParams<ToggleSelectParams>) => {
    const ids = items.map(it => it.id);

    if (selected) {
      return unselectCartItem({
        body: {
          cartItemIds: ids,
        },
      });
    }

    return selectCartItem({
      body: {
        cartItemIds: ids,
      },
    });
  },
});

export const $someCartActionInProgress = pending({
  effects: [addToCardMutation.fx, toggleSelectMutation.fx, removeFromCartMutation.fx, promocodeMutation.fx],
});
