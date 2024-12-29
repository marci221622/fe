import { sample } from 'effector';

import { BaseCartFactoryResult } from '@/features/basket/cart';
import { CheckoutData } from '@/generated/customer_hub/entities/checkout_data.v1';

import { Mutation } from '@/lib/createMutation';

import { AddedToCartParams, RemoveFromCartParams, ToggleSelectParams } from '../types';

type Props = {
  cart: BaseCartFactoryResult;
  mutations: {
    removeFromCart: Mutation<RemoveFromCartParams, CheckoutData>;
    addToCart: Mutation<AddedToCartParams, CheckoutData>;
    toggleSelection: Mutation<ToggleSelectParams, CheckoutData>;
  };
};

// Обновления всех сущностей по какому то признаку
// На пример обновление temp states
export function optimistic({ cart, mutations }: Props) {
  sample({
    source: cart.$temporaryState,
    clock: mutations.removeFromCart.fx,
    fn: (statuses, params) => ({
      ...statuses,
      removed: [...statuses.removed, ...params[0].items.map(it => it.id)],
    }),
    target: cart.$temporaryState,
  });

  sample({
    source: cart.$temporaryState,
    clock: mutations.removeFromCart.fx.fail,
    fn: (statuses, { params }) => ({
      ...statuses,
      removed: statuses.removed.filter(removed => !params[0].items.find(it => it.id === removed)),
    }),
    target: cart.$temporaryState,
  });

  sample({
    source: cart.$temporaryState,
    clock: mutations.toggleSelection.fx,
    fn: (statuses, params) => ({
      ...statuses,
      selectedInProgress: [...statuses.selectedInProgress, ...params[0].items.map(item => item.id)],
      selected: [
        ...statuses.selected.filter(it => !params[0].items.find(item => item.id === it.id)),
        ...params[0].items.reduce(
          (acc, item) => [...acc, { id: item.id, selected: !params[0].selected }],
          [] as { id: string; selected: boolean }[],
        ),
      ],
    }),
    target: cart.$temporaryState,
  });

  sample({
    source: cart.$temporaryState,
    clock: mutations.toggleSelection.fx.finally,
    fn: (statuses, { params }) => ({
      ...statuses,
      selectedInProgress: statuses.selectedInProgress.filter(id => !params[0].items.find(item => item.id === id)),
      selected: statuses.selected.filter(it => !params[0].items.filter(item => item.id === it.id)),
    }),
    target: cart.$temporaryState,
  });

  sample({
    source: cart.$temporaryState,
    clock: mutations.toggleSelection.fx.fail,
    fn: (statuses, { params }) => ({
      ...statuses,
      selected: statuses.selected.filter(it => !params[0].items.filter(item => item.id === it.id)),
    }),
    target: cart.$temporaryState,
  });
}
