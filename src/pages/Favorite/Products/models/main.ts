import { invoke } from '@withease/factories';
import { EventPayload, createEffect, sample } from 'effector';
import { condition } from 'patronum/macro';

import { AvailableAction } from '@/generated/customer_hub/enums/item';
import { createHooks, loaded } from '@/shared/pageRouting';

import { clickAndCollectConfirmMutation, isOneClickCheckoutData } from '@/features/basket';
import {
  favoriteResults,
  FavoriteTabs,
  favoriteAnalytics,
  createProductsList,
  lastFavoriteLinkField,
} from '@/features/favorites';
import { additionalTitle } from '@/features/header';

import { attachOperation } from '@/lib/attachOperation';
import { analytics, bridge } from '@/lib/bridge';
import { createField } from '@/lib/createField';

export const pageHooks = createHooks({ pagename: 'FavoriteList', authOnly: true });

export const activeTabField = createField(FavoriteTabs.inStock);

// Для того что бы локальный и глоабльный запросы не перетерлись
const favoriteIdsQuery = invoke(() => attachOperation(favoriteResults.query));

export const inStockList = createProductsList({ inStock: true });
export const outOfStockList = createProductsList({ inStock: false });

const mainFx = createEffect(
  async ({ ctrl, pageToken }: { loadMore?: boolean; ctrl?: AbortController; pageToken?: string }) => {
    const scopedCtrl = ctrl ?? new AbortController();
    const list = await favoriteIdsQuery.fx([{}, scopedCtrl]);

    if (list?.favoriteItemsList) {
      const rs = await Promise.all([
        inStockList.query.fx([{ favoriteListId: list.favoriteItemsList.id, pageToken }, scopedCtrl]),
        outOfStockList.query.fx([{ favoriteListId: list.favoriteItemsList.id, pageToken }, scopedCtrl]),
      ]);

      return rs;
    }

    return undefined;
  },
);

const tabChangedWithListId = sample({
  source: favoriteResults.query.$result,
  clock: activeTabField.change,
  fn: (list, tab) => ({ favoriteListId: list.favoriteItemsList?.id, tab }),
  filter: Boolean,
});

sample({
  clock: pageHooks.enterGuarded,
  fn: ({ ctrl }) => ({ ctrl }),
  target: mainFx,
});

sample({
  clock: pageHooks.enterGuarded,
  fn: () => 'items' as const,
  target: lastFavoriteLinkField.change,
});

sample({
  clock: pageHooks.leave,
  target: [outOfStockList.query.reset, inStockList.query.reset, activeTabField.reinit],
});

condition({
  source: tabChangedWithListId,
  if: ({ tab }) => tab === FavoriteTabs.inStock,
  then: inStockList.query.start.prepend(({ favoriteListId }: EventPayload<typeof tabChangedWithListId>) => ({
    favoriteListId,
  })),
  else: outOfStockList.query.start.prepend(({ favoriteListId }: EventPayload<typeof tabChangedWithListId>) => ({
    favoriteListId,
  })),
});

sample({
  clock: pageHooks.loadedGuarded,
  fn: () => ({ type: 'text' as const, rows: ['Избранное'] }),
  target: additionalTitle.change,
});

loaded({
  effect: mainFx,
  hooks: pageHooks,
  condition: params => !!params.loadMore === false,
});

// Обновление стейта по клику
// Обновить конкретный айтем в списке
bridge(() => {
  sample({
    source: inStockList.query.$result,
    clock: clickAndCollectConfirmMutation.fx.done,
    filter: (source, { result }) => !!source && !!result.checkoutState && isOneClickCheckoutData(result.checkoutState),
    fn: (source, { result }) => {
      const fromCartItem = result.checkoutState?.cartData?.items?.[0]?.item;

      if (!fromCartItem) {
        return source!;
      }

      return {
        ...source!,
        items: source!.items.map(currentItem => {
          if (currentItem.code === fromCartItem.code) {
            return {
              ...currentItem,
              availableActions: currentItem.availableActions.filter(
                action => action !== AvailableAction.AVAILABLE_ACTION_COLLECT,
              ),
            };
          }

          return currentItem;
        }),
      };
    },
    target: inStockList.query.$result,
  });

  // Патчим глобальное состояние
  sample({
    clock: favoriteIdsQuery.$result,
    filter: Boolean,
    target: favoriteResults.query.$result,
  });
});

analytics(() => {
  sample({
    source: { in: inStockList.query.$result, out: outOfStockList.query.$result },
    clock: pageHooks.loadedGuarded,
    target: favoriteAnalytics.favoritesLoaded,
  });
});
