import { AttributeValues, AttributesGroup } from '@/generated/customer_hub/entities/item.v1';

export function isWatchProduct(values: AttributeValues[]) {
  for (let i = 0; i < values.length; i++) {
    const attr = values[i];

    for (let j = 0; j < attr.values.length; j++) {
      const value = attr.values[j];

      if (value.code === 'ADDITIONAL_FEATURES_IRON_WATCHES') {
        return true;
      }
    }
  }

  return false;
}

export function geAttrValuesFromGroup<T extends { attributesGroups: AttributesGroup[] }>(item: T) {
  return item.attributesGroups?.reduce((acc, group) => [...acc, ...group.attributesValues], [] as AttributeValues[]);
}

/**
 * Что бы понять что для товара не нужно выводить цену
 * Поиск по атрубутам HIDE_PRICE
 * Потом в конфиге ФБ выводить строки текста вместо цены
 */
export function isPriceByRequest<T extends { attributesGroups: AttributesGroup[] }>(item: T) {
  const values = geAttrValuesFromGroup(item);

  for (let i = 0; i < values?.length; i++) {
    const attr = values[i];

    if (attr.code === 'HIDE_PRICE') {
      for (let j = 0; j < attr.values.length; j++) {
        const value = attr.values[j];

        if (value.code === 'YES') {
          return true;
        }
      }
    }
  }

  return false;
}
