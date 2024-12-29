import { createEvent, sample } from 'effector';

import { Item } from '@/generated/customer_hub/entities/item.v1';
import { itemToGTM } from '@/shared/analytics/builders';
import { sendAnalytic } from '@/shared/analytics/facade';
import { dequeue } from '@/shared/analytics/queue';
import { $favoriteBrandsScheme } from '@/shared/brands';

import { COIN_WEIGHT } from '@/constants/hardcode';

import { analytics } from '@/lib/bridge';

// list - название списка просто
// На пример "Просмотренные товары" или "Похожие модели"
// Или каталог (на пример "Новинки")
const productClicked = createEvent<{ page: PageType; item: Item | 'all_view_action'; list: string }>();
const productViewed = createEvent<{ items: Item[]; list: string; page?: number }>();

sample({
  source: $favoriteBrandsScheme,
  clock: productClicked,
  fn: (brandsScheme, { page, item, list }) => ({
    gtm: [
      item === 'all_view_action'
        ? {
            event: 'OWOX',
            eventCategory: 'Interactions',
            eventAction: 'click',
            eventLabel: 'view_all_products',
            eventContent: `ttl:${list}`, // Название списка в блоке товаров
            eventContext: 'Смотреть все', // текст кнопки
            eventLocation: page, // тип страницы
          }
        : {
            event: 'OWOX',
            eventCategory: 'Interactions',
            eventAction: 'click',
            eventLabel: 'productClick',
            eventLocation: page, // Тип страницы подробнее см. - Список возможных типов страниц
            eventCategoryName: item.collection?.title, // название категории товара
            eventCategoryId: item.collection?.code, // Id категории товара/каталога
            eventContent: `ttl:${list}`, // Название списка в блоке товаров
            eventProductId: item.code, // артикул AX (строка, может содержать текст) tsum_np.item_model.ext_id
            // 'eventProductModelId': '5564978',       // bitrix артикул цвет (SKU OWOX) tsum_np.item.id
            eventProductName: item.title, // название товара coalesce(tsum_np.item_model.title)
            // 'eventProductSkuId'  : '10734456',      // id товара (артикул-цвет-размер) bitrix
            eventProductPrice: +(item.itemOffers[0]?.finalPrice?.units ?? '0') / COIN_WEIGHT, // цена товара (со скидками и бонусами)
            // 'colorCode'          : 'NS',            // код цвета на странице товара
            ecommerce: {
              click: {
                actionField: {
                  list: `ttl:${list}`, // Название списка. [Подробнее](docs/product_array.md#название-списка-товаров)
                },
                products: [itemToGTM(item, 0)], // Массив товаров
              },
            },
            isBrandFavorite: !!brandsScheme[item.brand?.code ?? ''],
          },
    ],
  }),
  target: sendAnalytic,
});

sample({
  clock: productViewed,
  fn: ({ items, list, page }) => ({
    gtm: [
      {
        event: 'OWOX',
        eventCategory: 'Non-Interactions',
        eventAction: 'show',
        eventLabel: 'products',
        eventContent: `ttl:${list}`, // Название списка в блоке товаров
        eventContext: page ? `page${page}` : 'page0', // пагинация если есть
        ecommerce: {
          impressions: items.map((product, index) => itemToGTM({ ...product, list }, index)), // массив товаров
        },
      },
    ],
  }),
  target: sendAnalytic,
});

export const productsAnalytics = {
  productClicked,
  productViewed,
};

analytics(() => {
  sample({
    clock: dequeue,
    fn: params => ({ items: params.toAnalytics, list: params.list }),
    target: productsAnalytics.productViewed,
  });
});
