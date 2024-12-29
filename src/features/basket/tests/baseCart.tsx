import { CartItem, CartState } from '@/generated/customer_hub/entities/cart.v1';

export function createCartItem(item: Partial<CartItem>): CartItem {
  return CartItem.create(item);
}

export function createBaseCartData({ count = 10 }: { count?: number }) {
  return CartState.create({
    items: Array.from({ length: count }).map((_, idx) =>
      createCartItem({
        title: `Cart title id ${idx}`,
      }),
    ),
  });
}
