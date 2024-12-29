import { createEvent, createStore, sample } from 'effector';

import { wasLogouted } from '@/shared/session';

import { createQuery, FxParams } from '@/lib/createQuery';

import { fetchFavoritesLists } from '../api';

export function createFavorite() {
  // для того что бы не идти на сервер за данными
  // Которые медленно обновляются
  const increment = createEvent<void>();
  const decrement = createEvent<void>();

  const $counter = createStore(0);

  const query = createQuery({
    initialData: null,
    handler: async ([_, ctrl]: FxParams<object>) => {
      const rs = await fetchFavoritesLists({
        body: {},
        signal: ctrl.signal,
      });

      const defaultList = rs.customerFavoriteItemsLists.find(it => it.isDefault);

      return defaultList ?? null;
    },
  });

  $counter.on(increment, state => state + 1).on(decrement, state => Math.max(state - 1, 0));

  sample({
    clock: query.$result,
    filter: Boolean,
    fn: state => state.favoriteItemsList?.items?.length ?? 0,
    target: $counter,
  });

  sample({
    clock: wasLogouted,
    target: [$counter.reinit!, query.reset],
  });

  return { query, $counter, $dataNotLoaded: query.$result.map(it => !it), increment, decrement };
}
