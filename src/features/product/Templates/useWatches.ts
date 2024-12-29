import { Item } from '@/generated/customer_hub/entities/item.v1';
import { isWatchProduct, geAttrValuesFromGroup } from '@/shared/watches';

export function useWatches(product?: Item | null) {
  if (product) {
    const values = geAttrValuesFromGroup(product);
    const isClock = isWatchProduct(values);

    return {
      isClock,
      values,
      groups: product.attributesGroups,
    };
  }

  return {
    isClock: false,
    values: [],
    groups: [],
  };
}
