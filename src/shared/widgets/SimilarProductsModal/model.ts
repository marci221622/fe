import { sample } from 'effector';

import { sharedFetchItemsByCodes } from '@/shared/api';

import { createField } from '@/lib/createField';
import { FxParams, createQuery } from '@/lib/createQuery';

export const modalField = createField<string[]>([]);
export const $isOpenSimilarProductsModal = modalField.$value.map(code => code.length > 0);
export const similarModalQuery = createQuery({
  initialData: [],
  handler: async ([{ codes }, ctrl]: FxParams<{ codes: string[] }>) => {
    const rs = await sharedFetchItemsByCodes({
      signal: ctrl.signal,
      body: {
        codes,
        searchParams: { inStock: true, pageSize: '60' },
      },
    });

    return rs.item;
  },
});

sample({
  clock: modalField.change,
  filter: codes => codes.length > 0,
  fn: codes => ({ codes }),
  target: similarModalQuery.start,
});

sample({
  clock: modalField.change,
  filter: codes => codes.length === 0,
  target: similarModalQuery.reset,
});
