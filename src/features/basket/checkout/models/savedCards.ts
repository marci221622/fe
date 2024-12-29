import { combine, sample } from 'effector';
import { createGate } from 'effector-react';

import { PaymentMethodCode } from '@/generated/customer_hub/enums/payment';
import { $isAuthorized } from '@/shared/session';

import { logged } from '@/features/auth';

import { createQuery, FxParams } from '@/lib/createQuery';

import { getSavedCards } from '../api';

import { checkoutReset } from './actions';

export const SavedCardsGate = createGate<{ condition?: boolean }>();

export const savedCardQuery = createQuery({
  $isAuthorized,
  initialData: {
    savedCards: [],
  },
  handler: async ([_, ctrl]: FxParams<unknown>) => {
    const rs = await getSavedCards({
      body: {
        paymentMethodCode: PaymentMethodCode.PAYMENT_METHOD_CODE_CLOUD_PAYMENTS,
      },
      signal: ctrl.signal,
    });

    return rs;
  },
});

export const $savedCardsPanning = savedCardQuery.$pending;

sample({
  clock: [SavedCardsGate.state.updates, logged],
  filter: combine({ opened: SavedCardsGate.status, state: SavedCardsGate.state }).map(({ opened, state }) =>
    typeof state.condition !== 'undefined' ? opened && state.condition : opened,
  ),
  fn: () => ({}),
  target: savedCardQuery.start,
});

sample({ clock: checkoutReset, target: savedCardQuery.reset });
