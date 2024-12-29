import { createEvent, sample } from 'effector';

import { GetFavoriteItemsListResponse } from '@/generated/customer_hub/methods/favorite/get_favorite_items_list.v1';
import { itemToGTM, DYEvent, sendAnalytic } from '@/shared/analytics';

import { ANALYTICS_PRODUCT_LEN_SSR } from '@/constants/analytics';
import { COIN_WEIGHT } from '@/constants/hardcode';

import { ToggleFavoritesParams } from '../types';

const toggleFavorite = createEvent<ToggleFavoritesParams & { isFailed?: boolean }>();
const favoritesLoaded = createEvent<{
  in: GetFavoriteItemsListResponse | null;
  out: GetFavoriteItemsListResponse | null;
}>();

export const favoriteAnalytics = {
  toggleFavorite,
  favoritesLoaded,
};

sample({
  clock: toggleFavorite,
  fn: params => {
    const data = {
      dy: undefined,
      mindbox: [
        {
          operation: !params.isActive ? 'WebsiteCollect.AddToWishList' : 'WebsiteCollect.RemoveFromWishList',
          data: {
            addProductToList: {
              product: {
                ids: {
                  website: params.id,
                },
              },
              pricePerItem: +(params?.price?.units ?? '0') / COIN_WEIGHT,
            },
          },
        },
      ],
      gtm: [
        {
          event: 'OWOX',
          eventCategory: 'Conversions',
          eventAction: !params.isActive ? 'add' : 'remove',
          eventLabel: 'wishList', // константа (тип конверсии)
          eventContent: !params.isFailed ? 'success' : 'fail',
          eventLocation: params.place, // pageType с которого добавили в Избранное
          eventProductId: params.id, // код товара item_code
          eventProductName: params.title, // название товара
          eventProductPrice: +(params?.price?.units ?? '0') / 100, // цена товара (со скидками и бонусами)
        },
      ],
    };

    if (!params.isActive) {
      // @ts-ignore
      data.dy = {
        type: 'event',
        payload: {
          name: 'Add to Wishlist',
          properties: {
            eventType: 'add-to-wishlist-v1',
            productId: params.offerId,
            size: params.size,
          },
        },
      } as DYEvent;
    }

    return data;
  },
  target: sendAnalytic,
});

sample({
  clock: favoritesLoaded,
  fn: ({ in: inStock, out }) => ({
    gtm: [
      {
        event: 'Spa_pageview',
        pageType: 'wishList', // тип страницы
        ecommerce: {
          impressions: [...(inStock?.items ?? []), ...(out?.items ?? [])]
            .slice(0, ANALYTICS_PRODUCT_LEN_SSR)
            .map((item, index) => itemToGTM(item, index + 1)),
          promoView: {
            promotions: [],
          },
        },
      },
    ],
  }),
  target: sendAnalytic,
});
