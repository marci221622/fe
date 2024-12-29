import { createEvent, sample } from 'effector';

import { analytics } from '@/lib/bridge';
import { createField } from '@/lib/createField';
import { createMutation, FxParams } from '@/lib/createMutation';

import { applyPromocode } from '../api';

import { cartAnalytics } from './analytics';

export const promocodePopupField = createField(false);

export const applyCode = createEvent<string>();

export const promocodeMutation = createMutation({
  handler: ([{ promoCode }, ctrl]: FxParams<{ promoCode: string }>) =>
    applyPromocode({
      body: {
        customerPrivileges: promoCode ? [{ promoCode }] : [],
      },
      signal: ctrl.signal,
    }),
});

sample({
  clock: applyCode,
  fn: promoCode => ({ promoCode }),
  target: promocodeMutation.start,
});

sample({
  clock: promocodeMutation.fx.doneData,
  fn: () => false,
  target: promocodePopupField.change,
});

sample({
  clock: promocodePopupField.change,
  filter: it => !it,
  target: promocodeMutation.reset,
});

analytics(() => {
  sample({
    clock: promocodePopupField.change,
    filter: Boolean,
    target: cartAnalytics.selectPromocode,
  });
});
