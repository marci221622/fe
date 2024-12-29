import { CartItem } from '@/generated/customer_hub/entities/cart.v1';
import { Item } from '@/generated/customer_hub/entities/item.v1';

export function buildDataAttrsFromItem(item: Item) {
  return {
    'data-dig-product-code': item.code,
  };
}

export function buildDataAttrsFromCartItem(item: CartItem) {
  return {
    'data-dig-product-code': item.item?.code,
    'data-dig-product-name': item.item?.title,
    'data-dig-product-quantity': item.item?.quantity,
  };
}
