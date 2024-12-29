import { createEffect, createEvent, sample } from 'effector';

import { appStartedOnClient } from '@/shared/start';

import { createField } from '@/lib/createField';

const MAX_PERSISTED_VALUES_LEN = 10;

type Props = {
  maxLen?: number;
  key: string;
};

export function createRecentlyUsed({ maxLen = MAX_PERSISTED_VALUES_LEN, key }: Props) {
  const persist = createEvent<string>();
  const clearRecentlyUsed = createEvent<void>();
  const recentlyUsedField = createField([] as string[]);

  const persistFx = createEffect<string[], void>(values => {
    localStorage.setItem(key, JSON.stringify(Array.from(new Set(values))));
  });

  const clearFx = createEffect<void, string[]>(() => {
    localStorage.removeItem(key);

    return [];
  });

  const restoreFx = createEffect<void, string[]>(() => JSON.parse(localStorage.getItem(key) ?? '[]') as string[]);

  sample({
    clock: persist,
    source: recentlyUsedField.$value,
    filter: (_, data) => !!data,
    fn: (values, value) => Array.from(new Set([value, ...values])).slice(0, maxLen),
    target: [persistFx, recentlyUsedField.$value],
  });

  sample({
    clock: appStartedOnClient,
    target: restoreFx,
  });

  sample({
    clock: clearRecentlyUsed,
    target: clearFx,
  });

  sample({
    clock: [restoreFx.doneData, clearFx.doneData],
    target: recentlyUsedField.$value,
  });

  return {
    field: recentlyUsedField,
    clear: clearRecentlyUsed,
    persist,
    '@@unitShape': () => ({
      list: recentlyUsedField.$value,
      clear: clearRecentlyUsed,
      persist,
    }),
  };
}
