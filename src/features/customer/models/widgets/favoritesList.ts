import { combine, createEffect, sample } from 'effector';
import { createGate } from 'effector-react';

import { $isAuthorized } from '@/shared/session';

import { createFavorite, createProductsList } from '@/features/favorites';

export const FavoriteListGate = createGate<{ isDesktop: boolean }>();

// Результат есть глобальный
// Но в виджете он и не нужен
// Все локально в его рамках
export const favoriteResults = createFavorite();

const inStockList = createProductsList({ inStock: true });
const outOfStockList = createProductsList({ inStock: false });

const mainFx = createEffect(async () => {
  const scopedCtrl = new AbortController();
  const list = await favoriteResults.query.fx([{}, scopedCtrl]);

  if (list?.favoriteItemsList) {
    const rs = await Promise.all([
      inStockList.query.fx([{ favoriteListId: list.favoriteItemsList.id }, scopedCtrl]),
      outOfStockList.query.fx([{ favoriteListId: list.favoriteItemsList.id }, scopedCtrl]),
    ]);

    return rs;
  }

  return undefined;
});

export const $widgetFavoritePending = mainFx.pending;
export const $widgetFavoriteList = combine([inStockList.query.$result, outOfStockList.query.$result]).map(
  ([listIn, listOut]) => [...(listIn?.items ?? []), ...(listOut?.items ?? [])],
);
export const $widgetFavoriteCounters = combine([inStockList.query.$result, outOfStockList.query.$result]).map(
  ([listIn, listOut]) => ({ instock: +(listIn?.itemsCount ?? '0'), outofstock: +(listOut?.itemsCount ?? '0') }),
);

sample({
  source: $isAuthorized,
  clock: FavoriteListGate.state,
  filter: (isAuthorized, state) => isAuthorized && state.isDesktop,
  fn: () => ({}),
  target: mainFx,
});

sample({
  clock: FavoriteListGate.close,
  target: [inStockList.query.reset, outOfStockList.query.reset],
});
