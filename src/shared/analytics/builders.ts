
import { CartItem } from '@/generated/customer_hub/entities/cart.v1';
import { Item } from '@/generated/customer_hub/entities/item.v1';

import { COIN_WEIGHT } from '@/constants/hardcode';

import { getReaddableCondition } from '@/lib/transformers';

export function itemToGTM(item: Item & { list?: string }, index: number) {
  return {
    id: item.code,
    name: item.title,
    brand: item.brand?.title, // название бренда
    category: item.collection?.title, // название категории товара, NP: category.title
    categoryId: item.collection?.code, // Id категории товара/каталога, NP: category.id
    list: item.list ? `ttl:${item.list}` : undefined, // Название списка. [Подробнее](docs/product_array.md#название-списка-товаров)
    position: index, // порядковый номер товара / объекта слева направо или сверху вниз. Счет начинаем с 1
    quantity: item.quantity, // количество данного товара (в событиях добавления/удаления передавать кол-во добавленного/удаленного товара)
    // 'variant'        : 'White', // вариант товара (?)
    price: +(item.itemOffers[0]?.price?.units ?? '0') / COIN_WEIGHT, // цена товара (со скидками и бонусами)
    // 'metric1'        : '7586.00', // цена товара (до скидок и бонусов)
    currency: item.itemOffers[0]?.price?.currencyCode, // код локальной валюты в которой отображены цены на сайте
    dimension5: item.size?.russianSize, // размер Ru
    dimension6: item.itemOffers[0]?.offerCode, // offer_code
    // 'dimension7'     : '0|1|personal_sale', // Название акции (если есть) которая действует на данный товар, если названия акции нет но есть скидка, отправлять 1
    dimension12: item.size?.vendorSize, // размер Eu
    // 'dimension42'    : '8504', // item_id
    dimension68: +item.quantity > 0, // наличие товара (productAvailability)
    // 'dimension71'    : '165399', // идентификатор бренда товара tsum_np.item_model.brand_id, NP: brand.id
    // 'dimension72'    : '4078', // Id категории товара/каталога
    dimension73: item.labels.map(label => label.id).join(','), // id шильдиков товара, через запятую
    // 'dimension74'    : '0|1', // товар по предзаказу  (pre-order), по умолчанию: 0
    // 'dimension75'    : '0|1', // товар по обязательной предоплате  (pre-payment), по умолчанию: 0
    // 'dimension217'   : '1', // товар заменен в подборке на аналог тк его нет в продаже, актуально только для луксетов
    // 'dimension223'   : 'Доставка с 5 июля' // Условия доставки товара (при наличии условий)
    dimension226: getReaddableCondition(item.condition?.state),
  };
}

export function cartItemToGTM(item: CartItem, index: number) {
  if (item.item) {
    return itemToGTM(item.item, index);
  }

  return {};
}

export function cartItemToMindbox(item: CartItem, pricrField = 'pricePerItem') {
  return {
    product: {
      ids: {
        website: item.item?.code,
      },
    },
    count: '1',
    [pricrField]: +(item.finalPrice?.units ?? item.item?.itemOffers[0]?.price?.units ?? '0') / COIN_WEIGHT,
  };
}

export function cartItemToDY(item: CartItem) {
  return {
    productId: item.item?.itemOffers?.[0]?.offerCode,
    quantity: +(item.item?.quantity ?? '1'),
    itemPrice: +(item.finalPrice?.units ?? item.item?.itemOffers[0]?.price?.units ?? '0') / 100,
    size: item.item?.size?.russianSize,
  };
}
