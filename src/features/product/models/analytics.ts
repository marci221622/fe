import { createEvent, sample } from 'effector';

import { Item } from '@/generated/customer_hub/entities/item.v1';
import { AvailableAction } from '@/generated/customer_hub/enums/item';
import { Section } from '@/generated/customer_hub/enums/section';
import { DYEvent, itemToGTM, sendAnalytic } from '@/shared/analytics';
import { $favoriteBrandsScheme } from '@/shared/brands';
import { $currentGender } from '@/shared/session';
import { $isClient } from '@/shared/start';

const productLoaded = createEvent<Item>();

export const productsAnalytics = {
  productLoaded,
};

sample({
  source: { gender: $currentGender, brandsScheme: $favoriteBrandsScheme, isClient: $isClient },
  clock: productLoaded,
  fn: ({ gender, brandsScheme, isClient }, item) => {
    const clickAvailabled = item.availableActions.includes(AvailableAction.AVAILABLE_ACTION_COLLECT);

    return {
      dy: {
        type: isClient ? 'spa' : 'context',
        ctx: {
          lng: 'ru',
          type: 'PRODUCT',
          data: [item.itemOffers[0]?.offerCode],
        },
      } as DYEvent,
      gtm: [
        {
          click_collect: clickAvailabled ? '1' : '0',
          event: 'Spa_pageview',
          pageType: 'ProductPage', // тип страницы
          // 'categoryId'       : '18676', // ID категории
          // 'categoryName'     : 'Куртки', // Название категории
          productId: item.code, // item_code
          productName: item.title, // название товара
          portalName: gender === Section.SECTION_FEMALE ? 'Женское' : 'Мужское',
          catalogGender: gender === Section.SECTION_FEMALE ? 'male' : 'women', // гендер каталога
          ecommerce: {
            detail: {
              actionField: {
                action: 'detail',
                list: 'ProductPage', // Название списка. Подробнее в сноске Название списка товаров
              },
              products: [itemToGTM(item, 0)],
            },
          },
          isBrandFavorite: !!brandsScheme[item.brand?.code ?? ''],
        },
      ],
      mindbox: [
        {
          operation: 'WebsiteCollect.ViewProduct',
          data: {
            viewProduct: {
              product: {
                ids: {
                  website: item.code,
                },
              },
            },
          },
        },
      ],
    };
  },
  target: sendAnalytic,
});
