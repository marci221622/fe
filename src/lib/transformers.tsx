import { Money } from '@/generated/common/money.v1';
import { Condition_State } from '@/generated/customer_hub/entities/condition.v1';
import { ItemOffer } from '@/generated/customer_hub/entities/item_offer.v1';
import { Size } from '@/generated/customer_hub/entities/size.v1';

export function createReaddableSize(size?: Size) {
  if (size) {
    return [`${size.vendorLabel ?? ''} ${size.vendorSize}`, `${size.russianLabel ?? ''} ${size.russianSize}`]
      .map(it => it.trim())
      .filter(Boolean)
      .join(' | ');
  }

  return '';
}

export function hasSize(size?: Size) {
  if (size) {
    return [size.vendorSize, size.russianSize].some(Boolean);
  }

  return false;
}
export function getPriceNumberAmount<T extends { tsumPrice?: Money; itemOffers: ItemOffer[] }[]>(priceArray: T) {
  return priceArray.map(item => (String(item.itemOffers[0]?.price?.units ?? 0) + String(item.tsumPrice?.units)).length);
}

export function getPrice<T extends { tsumPrice?: Money; itemOffers: ItemOffer[] }>({ tsumPrice, itemOffers }: T) {
  return {
    withDiscount: tsumPrice?.units ? Number(tsumPrice.units) : undefined,
    original: itemOffers[0]?.price?.units ? Number(itemOffers[0]?.price?.units) : undefined,
    currency: tsumPrice?.currencyCode ?? itemOffers[0]?.price?.currencyCode,
  };
}

export function getPriceFromFinal<T extends { tsumPrice?: Money; finalPrice?: Money }>({ tsumPrice, finalPrice }: T) {
  return {
    withDiscount: tsumPrice?.units ? Number(tsumPrice.units) : undefined,
    original: finalPrice?.units ? Number(finalPrice.units) : undefined,
    currency: tsumPrice?.currencyCode ?? finalPrice?.currencyCode,
  };
}

export function getPriceFromPrimaryPrice<T extends { tsumPrice?: Money; price?: Money }>({ tsumPrice, price }: T) {
  return {
    withDiscount: tsumPrice?.units ? Number(tsumPrice.units) : undefined,
    original: price?.units ? Number(price.units) : undefined,
    currency: tsumPrice?.currencyCode ?? price?.currencyCode,
  };
}

export function getPriceFromOrderItem<T extends { price?: Money }>({ price }: T) {
  return {
    original: price?.units ? Number(price.units) : undefined,
    currency: price?.currencyCode,
  };
}

export function getReaddableCondition(condition?: Condition_State) {
  switch (condition) {
    case Condition_State.ITEM_CONDITION_GRADE_EXCELLENT:
      return 'Отличное';
    case Condition_State.ITEM_CONDITION_GRADE_GOOD:
      return 'Хорошее';
    case Condition_State.ITEM_CONDITION_GRADE_NEW:
      return 'Новое';
    case Condition_State.ITEM_CONDITION_GRADE_NEW_WITH_TAG:
      return 'Новое, с биркой';
    case Condition_State.ITEM_CONDITION_GRADE_UNSPECIFIED:
      return 'Неизвестное';
    default:
      return '';
  }
}

export function readDateSafely(date?: Date) {
  if (date instanceof Date) {
    return +date;
  }

  if (typeof date === 'string') {
    return +new Date(date);
  }

  return null;
}
