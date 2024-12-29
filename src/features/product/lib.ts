import { Item } from '@/generated/customer_hub/entities/item.v1';
import { SellerType } from '@/generated/customer_hub/enums/seller_type';

// Считаем что продавец частный, если товар не доступен
export function isPrivateSeller(product: Item) {
  return product.itemOffers.length > 0
    ? product.itemOffers?.[0]?.sellerData?.sellerType === SellerType.PRIVATE_SELLER
    : true;
}

export function productImagesProps(product: Item, index = 0) {
  const partOfTitle = [product.title, product.brand?.title, product.color?.title, product.article]
    .filter(Boolean)
    .join(' | ');

  const title = `${partOfTitle} - ${index + 1}` as const;

  return {
    alt: title,
    title,
  };
}
