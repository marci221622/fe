import { createEvent, sample } from 'effector';

import { RequestParams } from '@/shared/request';

import { createQuery, FxParams } from '@/lib/createQuery';

import { fetchFavoriteItems } from '../api';

import { toggleFavoritesMutation } from './updater';

const FAVORITE_PAGE_SIZE = '36';

type Props = {
  inStock: boolean;
};

export function createProductsList({ inStock }: Props) {
  const loadMore = createEvent<{ listId: string; nextPageToken?: string }>();

  const query = createQuery({
    initialData: null,
    stateUpdater: ({ loadMore }, { prev, result }) =>
      loadMore
        ? {
            ...prev,
            ...result,
            items: [...(prev?.items ?? []), ...result.items],
          }
        : result,
    handler: async ([{ pageToken, favoriteListId }, ctrl]: FxParams<
      RequestParams<'GetFavoriteItemsList'>['body'] & { loadMore?: boolean }
    >) => {
      const rs = await fetchFavoriteItems({
        signal: ctrl.signal,
        body: {
          pageToken,
          pageSize: FAVORITE_PAGE_SIZE,
          favoriteListId,
          inStock,
        },
      });

      return {
        ...rs,
        items: rs.items,
      };
    },
  });

  query.$result.on(toggleFavoritesMutation.start, (result, params) => {
    if (result && params.isActive) {
      const nextItems = result.items.filter(item => item.code !== params.id);

      const nextPageToken =
        nextItems.length !== result.items.length
          ? String(Math.max((+result.nextPageToken || 0) - 1, 0))
          : result.nextPageToken;

      const nextItemsCount =
        nextItems.length !== result.items.length
          ? String(Math.max((+result.itemsCount || 0) - 1, 0))
          : result.itemsCount;

      return {
        ...result,
        items: nextItems,
        itemsCount: nextItemsCount,
        nextPageToken: nextPageToken === '0' ? '' : nextPageToken,
      };
    }

    return result;
  });

  // По клику показать еще
  sample({
    clock: loadMore,
    fn: ({ listId, nextPageToken }) => ({ loadMore: true, favoriteListId: listId, pageToken: nextPageToken }),
    target: query.start,
  });

  return {
    query,
    loadMore,
  };
}
