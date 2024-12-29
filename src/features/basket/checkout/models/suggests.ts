import { sample } from 'effector';
import { debounce } from 'patronum/macro';

import { createLocation } from '@/shared/location';

import { createField } from '@/lib/createField';
import { createQuery, FxParams } from '@/lib/createQuery';

import { addressSuggests } from '../api';

import { checkoutReset } from './actions';

export const MINIMAL_QUERY_LEN = 3;

export const suggestOpenedField = createField(false);

// TODO: не нужно ?
export const suggestsField = createField('');

// Копия саджеста
// ДЛя того что бы вернуть назад
// Когда юзер что то поменял и не выбрал
export const draftSuggestField = createField('');

const changeFieldDebouced = debounce({ source: suggestsField.change, timeout: 300 });

export const location = createLocation();

export const suggestsQuery = createQuery({
  initialData: [],
  handler: async ([{ query }, ctrl]: FxParams<{ query: string }>) => {
    const rs = await addressSuggests({
      body: { query },
      signal: ctrl.signal,
    });

    return rs.data;
  },
});

sample({
  clock: changeFieldDebouced,
  fn: query => ({ query }),
  filter: query => query.length >= MINIMAL_QUERY_LEN,
  target: suggestsQuery.start,
});

sample({
  clock: draftSuggestField.$value,
  target: suggestsField.$value,
});

sample({
  clock: location.query.fx.doneData,
  target: suggestsQuery.$result,
});

sample({
  clock: suggestsQuery.fx,
  target: location.query.reset,
});

sample({
  clock: checkoutReset,
  target: [suggestOpenedField.reset, suggestsQuery.reset, draftSuggestField.reset, suggestsField.reset],
});
