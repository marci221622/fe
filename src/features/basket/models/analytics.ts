import { createEvent, sample, EventPayload } from 'effector';

import { Money } from '@/generated/common/money.v1';
import { GrpcWebError } from '@/generated/customer_hub/customer-hub-service';
import { CartItem } from '@/generated/customer_hub/entities/cart.v1';
import { CheckoutData } from '@/generated/customer_hub/entities/checkout_data.v1';
import { CheckoutType, checkoutTypeToJSON } from '@/generated/customer_hub/enums/checkout_type';
import { cartItemToGTM, cartItemToMindbox, sendAnalytic, MindboxType, cartItemToDY, DYEvent } from '@/shared/analytics';
import { $favoriteBrandsScheme } from '@/shared/brands';
import { $isAuthorized } from '@/shared/session';
import { $isClient } from '@/shared/start';

import { COIN_WEIGHT } from '@/constants/hardcode';

// originalItems - для mindbox, актуальный список товаров
type CartMutationParams = {
  type: 'cart' | 'quickOrder' | 'preOrder';
  page: string;
  originalItems: CartItem[];
};

const selectPromocode = createEvent<void>();
const applyPromocode = createEvent<{ error?: GrpcWebError; code: string }>();
const checkoutLoaded = createEvent<CartItem[]>();
const addedToCart = createEvent<CartMutationParams & { item: CartItem | null }>();
const removeFromCart = createEvent<CartMutationParams & { items: CartItem[] }>();
const toggleSelection = createEvent<{ items: CartItem[]; selected: boolean; originalItems: CartItem[] }>();
const changeCartTabs = createEvent<{ type: 'in' | 'out' }>(); // tab_out_of_stock|tab_in_stock
// Перед началом оформления
const checkoutBegin = createEvent<{ items: CartItem[]; partial?: boolean; isClickAndCollect?: boolean }>();
const initiateCheckout = createEvent<void>();
const addressSelected = createEvent<{ error?: GrpcWebError }>();
const intervalChanged = createEvent<{
  error?: GrpcWebError | undefined;
  interval: string;
  type: string; // 'dropdown' | 'button'
  ctx: 'date' | 'time';
}>();
const typLoaded = createEvent<{
  data?: CheckoutData | null;
  orderCode: string;
  isClickAndCollect?: boolean;
  isQuickBy?: boolean;
}>();

const beginClickAndCollect = createEvent<CartItem | null>();
const collectedErrorLimit = createEvent<{ price?: Money; title: string; code: string } | null>();

const beginQuickBy = createEvent<CartItem | null>();

sample({
  source: selectPromocode,
  target: sendAnalytic.prepend(() => {
    return {
      gtm: [
        {
          event: 'OWOX',
          eventCategory: 'Conversions',
          eventAction: 'click',
          eventLabel: 'usePromoCode',
          eventLocation: 'cart',
        },
      ],
    };
  }),
});

sample({
  source: applyPromocode,
  target: sendAnalytic.prepend((rs: EventPayload<typeof applyPromocode>) => {
    return {
      gtm: [
        {
          event: 'OWOX',
          eventCategory: 'Conversions',
          eventAction: 'click',
          eventLabel: 'applyPromoCode',
          eventContent: 'success', // success|fail успех совершенного клиентом действия
          eventLocation: 'cart',
          eventContext: rs.code, // промокод
          ...(rs.error && {
            errorCode: rs.error?.message, // код ошибки
          }),
        },
      ],
    };
  }),
});

sample({
  source: $isClient,
  clock: checkoutLoaded,
  fn: (isClient, items) => {
    return {
      dy: {
        type: isClient ? 'spa' : 'context',
        ctx: {
          lng: 'ru',
          type: 'CART',
          data: items.map(item => item.item?.itemOffers?.[0]?.offerCode),
        },
      } as DYEvent,
      gtm: [
        {
          event: 'Spa_pageview',
          pageType: 'Checkout', // тип страницы
          checkoutStepName: 'Cart', // название этапа оформления заказа
          checkoutStepNumber: '1', // номер этапа оформления заказа
          deviceOrientation: 'landscape', // ориентация устройства
          cartType: 'cart', // Тип корзины
          ecommerce: {
            checkout: {
              actionField: {
                step: 1, // checkout step number
                option: 'cart', // опции заказа тип анкеты/доставки/оплаты и тп в зависимости от шага анкеты
              },
              products: items.map(cartItemToGTM), // массив товаров
            },
            promoView: {
              promotions: [], // массив баннеров (если есть)
            },
          },
        },
      ],
    };
  },
  target: sendAnalytic,
});

sample({
  source: $favoriteBrandsScheme,
  clock: addedToCart,
  fn: (brandsScheme, { item, type, page, originalItems }) => {
    if (item) {
      const price = +(item.finalPrice?.units ?? '0') / COIN_WEIGHT;

      return {
        dy: {
          type: 'event',
          payload: {
            name: 'Add to Cart',
            properties: {
              eventType: 'add-to-cart-v1',
              value: price,
              currency: 'RUB',
              productId: item.item?.code,
              quantity: 1,
              size: item.item?.size?.vendorSize,
              cart: [cartItemToDY(item)],
            },
          },
        } as DYEvent,
        gtm: [
          {
            event: 'OWOX',
            eventCategory: 'Conversions',
            eventAction: 'add',
            eventLabel: 'cart',
            eventContext: 'add', // 'add|change_size|restore_deleted', add - стандартная механика добавления, change_size - добавление при изменении размера, restore_deleted - вернуть удаленный товар
            eventContent: 'success',
            eventLocation: page, // тип страницы
            cartType: type, // тип корзины (quickOrder|cart|preOrder)
            // eventCategoryName: item.collection?.title, // название категории товара
            // eventCategoryId: item.collection?.code, // Id категории товара/каталога
            eventProductId: item.item?.code, // item_code
            eventProductName: item.item?.title, // название товара
            eventProductPrice: price, // цена товара (со скидками и бонусами)
            ecommerce: {
              add: {
                actionField: {
                  action: 'add',
                  list: page, // Название списка. Подробнее в сноске Название списка товаров
                },
                products: [cartItemToGTM(item, 0)], // Массив c товаром
              },
            },
            // eslint-disable-next-line deprecation/deprecation
            isBrandFavorite: !!brandsScheme[item.brand?.code ?? ''],
          },
        ],

        mindbox: [
          {
            operation: 'WebsiteCollect.SetCart',
            data: {
              productList: originalItems.filter(it => it.selected).map(it => cartItemToMindbox(it)),
            },
          },
        ],
      };
    }

    return { gtm: [] };
  },
  target: sendAnalytic,
});

sample({
  source: $favoriteBrandsScheme,
  clock: removeFromCart,
  fn: (brandsScheme, { items, type, page, originalItems }) => {
    const isCartClear = originalItems.length === 0;

    return {
      gtm: items.map(item => ({
        event: 'OWOX',
        eventCategory: 'Conversions',
        eventAction: 'remove',
        eventLabel: 'cart',
        eventContext: 'remove', // 'add|change_size|restore_deleted', add - стандартная механика добавления, change_size - добавление при изменении размера, restore_deleted - вернуть удаленный товар
        eventContent: 'success',
        eventLocation: page, // тип страницы
        cartType: type, // тип корзины (quickOrder|cart|preOrder)
        // eventCategoryName: item.collection?.title, // название категории товара
        // eventCategoryId: item.collection?.code, // Id категории товара/каталога
        eventProductId: item.item?.code, // item_code
        eventProductName: item.item?.title, // название товара
        eventProductPrice: +(item.finalPrice?.units ?? '0') / COIN_WEIGHT, // цена товара (со скидками и бонусами)
        ecommerce: {
          remove: {
            actionField: {
              option: 'cart', // 'cart|quickOrder'  опции заказа тип анкеты/доставки/оплаты и тп в зависимости от шага анкеты
              list: page, // Название списка. Подробнее в сноске Название списка товаров
            },
            products: [cartItemToGTM(item, 0)], // Массив c товаром
          },
        },
        // eslint-disable-next-line deprecation/deprecation
        isBrandFavorite: !!brandsScheme[item.brand?.code ?? ''],
      })),

      dy: {
        type: 'event',
        payload: {
          name: 'Remove from Cart',
          properties: {
            eventType: 'remove-from-cart-v1',
            value: items.reduce((acc, item) => acc + +(item.finalPrice?.units ?? '0') / 100, 0),
            currency: 'RUB',
            productId: items[0].item?.code,
            quantity: 1,
            size: items[0].item?.size?.vendorSize,
            cart: items.map(cartItemToDY),
          },
        },
      } as DYEvent,

      mindbox: isCartClear
        ? [
            {
              operation: 'WebsiteCollect.ClearCart',
              data: {},
            },
          ]
        : [
            {
              operation: 'WebsiteCollect.SetCart',
              data: {
                productList: originalItems.filter(it => it.selected).map(it => cartItemToMindbox(it)),
              },
            },
          ],
    };
  },
  target: sendAnalytic,
});

sample({
  source: toggleSelection,
  fn: ({ items, selected, originalItems }) => {
    return {
      gtm: items.map(item => ({
        event: 'OWOX',
        eventCategory: 'Interactions',
        eventAction: 'click',
        eventLabel: 'checkbox_part_buyout',
        eventContent: selected ? 'disabled' : 'enabled', // Состояние чекбокса частичного выкупа
        eventLocation: 'cart',
        // 'eventCategoryName'  : 'Куртки', // название категории товара
        // 'eventCategoryId'    : '10456', // Id категории товара/каталога
        eventProductId: item.item?.code, // артикул AX (строка, может содержать текст) tsum_np.item_model.ext_id
        // 'eventProductModelId': '5564978', // bitrix артикул цвет (SKU OWOX) tsum_np.item.id
        eventProductName: item.item?.title, // название товара coalesce(tsum_np.item_model.title)
        // 'eventProductSkuId'  : '10734456', // id товара (артикул-цвет-размер) bitrix
        eventProductPrice: +(item.finalPrice?.units ?? '0') / COIN_WEIGHT, // цена товара (со скидками и бонусами)
        // 'colorCode'          : 'NS', // код цвета на странице товара
        dimension5: item.item?.size?.russianSize, // размер Ru
        dimension12: item.item?.size?.vendorSize, // размер Eu
      })),

      mindbox: [
        {
          operation: 'WebsiteCollect.SetCart',
          data: {
            productList: originalItems.filter(it => it.selected).map(it => cartItemToMindbox(it)),
          },
        },
      ],
    };
  },
  target: sendAnalytic,
});

sample({
  source: changeCartTabs,
  fn: ({ type }) => {
    return {
      gtm: [
        {
          event: 'OWOX',
          eventCategory: 'Interactions',
          eventAction: 'click',
          eventLabel: type === 'in' ? 'tab_in_stock' : 'tab_out_of_stock', // Клик по табу Нет в наличии / В наличии
          eventLocation: 'cart',
        },
      ],
    };
  },
  target: sendAnalytic,
});

sample({
  source: checkoutBegin,
  fn: ({ items, partial, isClickAndCollect }) => {
    const clickSlice = {
      eventLabel: 'ClickAndCollect',
      cartType: 'ClickAndCollect',
    };

    const cartSlice = {
      eventLabel: partial ? 'partial' : 'total', // полный|частичный выкуп
      cartType: 'cart', // тип корзины
    };

    return {
      gtm: [
        {
          ...(isClickAndCollect ? clickSlice : cartSlice),
          event: 'OWOX',
          eventCategory: 'Conversions',
          eventAction: 'begin_checkout',
          checkoutStepName: 'personalData', // название этапа оформления заказа
          checkoutStepNumber: '2', // номер этапа оформления заказа
          ecommerce: {
            checkout: {
              actionField: {
                step: 2, // checkout step number
                option: isClickAndCollect ? 'ClickAndCollect' : 'cart', // 'cart|ClickAndCollect' опции заказа
              },
              products: items.map(cartItemToGTM), // массив товаров
            },
          },
        },
      ],
    };
  },
  target: sendAnalytic,
});

sample({
  clock: initiateCheckout,
  fn: () => {
    return {
      gtm: [
        {
          event: 'OWOX',
          eventCategory: 'Conversions',
          eventAction: 'click',
          eventLabel: 'initiateCheckout',
          eventContent: 'success', // success|fail успех совершенного клиентом действия
          eventLocation: 'Банковская карта', // выбранный способ оплаты
          // 'errorCode'     : 'Код/Текст ошибки'  // код ошибки если fail
        },
      ],
    };
  },
  target: sendAnalytic,
});

sample({
  clock: addressSelected,
  fn: ({ error }) => {
    return {
      gtm: [
        {
          event: 'OWOX',
          eventCategory: 'Interactions',
          eventAction: 'click',
          eventLabel: 'choseDeliveryAddress',
          eventContent: error ? 'fail' : 'success', // success|fail успех совершенного клиентом действия
          eventLocation: 'saveAddress', // выбрал и сохранил адрес или оставил свободный адрес
          ...(error && { errorCode: error.message }), // код ошибки если fail})
        },
      ],
    };
  },
  target: sendAnalytic,
});

sample({
  clock: intervalChanged,
  fn: ({ error, interval, type, ctx }) => {
    return {
      gtm: [
        {
          event: 'OWOX',
          eventCategory: 'Interactions',
          eventAction: 'click',
          eventLabel: 'choseTimeToDelivery',
          eventContent: type, // выбор в выпадающем списке или кнопкой
          eventContext: ctx, // выбор даты или времени
          eventLocation: interval, // выбранный период 'Сегодня|13 ноября|с 14 до 17'
          ...(error && { errorCode: error.message }), // код ошибки если fail})
        },
      ],
    };
  },
  target: sendAnalytic,
});

sample({
  source: $isAuthorized,
  clock: typLoaded,
  fn: (isAuthorized, { data, orderCode, isClickAndCollect, isQuickBy }) => {
    const clickSlice = {
      event: 'OWOX',
      eventCategory: 'Conversions',
      eventAction: 'purchase',
      eventLabel: 'ClickAndCollect',
      cartType: 'ClickAndCollect', // тип корзины
      transactionPaymentType: 'При получении',
    };

    const cartSlice = {
      event: 'Spa_pageview',
      cartType: isQuickBy ? 'quickOrder' : 'cart',
      transactionPaymentType: 'Банковская карта',
      pageType: 'ThankYouPage',
    };

    const deliveryPrice =
      +(data?.deliveryData?.selectedDeliveries?.[0]?.serviceItem?.price?.units ?? '0') / COIN_WEIGHT;
    const cartSum = +(data?.cartData?.cartMeta?.sumWithDiscount ?? '0') / COIN_WEIGHT;

    return {
      gtm: [
        data && {
          ...(isClickAndCollect ? clickSlice : cartSlice),
          orderId: orderCode, // номер заказа
          transactionShippingMethod: 'Доставка', // способ доставки
          ecommerce: {
            purchase: {
              actionField: {
                action: 'purchase',
                affiliation: 'web',
                id: orderCode, // номер заказа
                revenue: cartSum, // сумма заказа
                shipping: deliveryPrice, // стоимость доставки
                // 'coupon'     : 'summer_sale' // название купона
              },
              products: (data.cartData?.items ?? []).map(cartItemToGTM), // Массив с товарами
            },
            promoView: {
              promotions: [], // при наличии
            },
          },
        },
      ].filter(Boolean),

      mindbox: [
        data && {
          operation: isAuthorized ? 'WebsiteCollect.CreateAuthorizedOrder' : 'WebsiteCollect.CreateUnauthorizedOrder',
          data: {
            customer: {
              firstName: data.deliveryData?.recipient?.personName ?? '',
              email: '',
              ids: {
                tsumcollectId: data.meta?.customerId ?? '',
                webappId: data.meta?.userId ?? '',
              },
            },
            order: {
              ids: {
                collectWebsiteID: orderCode,
              },
              customFields: {
                checkoutType: checkoutTypeToJSON(data.meta?.type ?? CheckoutType.UNRECOGNIZED),
              },
              deliveryCost: deliveryPrice,
              totalPrice: cartSum,
              lines: (data.cartData?.items ?? []).map(it => cartItemToMindbox(it, 'basePricePerItem')),
            },
          },
        },
      ].filter(Boolean) as MindboxType[],

      dy: {
        type: 'event',
        payload: {
          name: 'Purchase',
          properties: {
            uniqueTransactionId: orderCode,
            eventType: 'purchase-v1',
            value: cartSum,
            currency: 'RUB',
            cart: (data?.cartData?.items ?? []).map(it => cartItemToDY(it)),
          },
        },
      } as DYEvent,
    };
  },
  target: sendAnalytic,
});

sample({
  source: beginClickAndCollect,
  fn: item => {
    if (item) {
      return {
        gtm: [
          {
            event: 'OWOX',
            eventCategory: 'Conversions',
            eventAction: 'click',
            eventLabel: 'ClickAndCollect',
            eventLocation: 'ProductPage', // тип страницы
            cartType: 'ClickAndCollect', // тип корзины
            eventProductId: item.item?.code, // item_code
            eventProductName: item.item?.title, // название товара
            eventProductPrice: +(item.finalPrice?.units ?? '0') / COIN_WEIGHT, // цена товара (со скидками и бонусами)
          },
        ],

        mindbox: [
          {
            operation: 'WebsiteCollect.SetCart',
            data: {
              productList: [cartItemToMindbox(item)],
            },
          },
        ],
      };
    }

    return { gtm: [] };
  },
  target: sendAnalytic,
});

sample({
  source: collectedErrorLimit,
  fn: item => {
    if (item) {
      return {
        gtm: [
          {
            event: 'OWOX',
            eventCategory: 'Conversions',
            eventAction: 'reserve_limit',
            eventLabel: 'ClickAndCollect',
            eventProductId: item.code, // item_code
            eventProductName: item.title, // название товара
            eventProductPrice: +(item.price?.units ?? '0') / COIN_WEIGHT, // цена товара (со скидками и бонусами)
          },
        ],
      };
    }

    return { gtm: [] };
  },
  target: sendAnalytic,
});

sample({
  source: beginQuickBy,
  fn: item => {
    if (item) {
      return {
        gtm: [
          {
            event: 'OWOX',
            eventCategory: 'Conversions',
            eventAction: 'add',
            eventLabel: 'cart',
            eventContext: 'add', // 'add|change_size|restore_deleted', add - стандартная механика добавления, change_size - добавление при изменении размера, restore_deleted - вернуть удаленный товар
            eventContent: 'success',
            eventLocation: 'ProductPage', // тип страницы
            cartType: 'quickOrder', // тип корзины (quickOrder|cart|preOrder)
            // eventCategoryName: item.collection?.title, // название категории товара
            // eventCategoryId: item.collection?.code, // Id категории товара/каталога
            eventProductId: item.item?.code, // item_code
            eventProductName: item.item?.title, // название товара
            eventProductPrice: +(item.finalPrice?.units ?? '0') / COIN_WEIGHT, // цена товара (со скидками и бонусами)
            ecommerce: {
              add: {
                actionField: {
                  action: 'add',
                  list: 'ProductPage', // Название списка. Подробнее в сноске Название списка товаров
                },
                products: [cartItemToGTM(item, 0)], // Массив c товаром
              },
            },
          },
        ],
      };
    }

    return {};
  },
  target: sendAnalytic,
});

export const basketAnalytics = {
  selectPromocode,
  applyPromocode,
  checkoutLoaded,
  addedToCart,
  removeFromCart,
  toggleSelection,
  changeCartTabs,
  checkoutBegin,
  initiateCheckout,
  addressSelected,
  intervalChanged,
  typLoaded,

  beginClickAndCollect,
  collectedErrorLimit,

  beginQuickBy,
};
