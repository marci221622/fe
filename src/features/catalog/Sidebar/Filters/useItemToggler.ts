import { useEffect, useState } from 'react';

import { CatalogFilter_Value } from '@/generated/customer_hub/entities/catalog_filter.v1';

export function useItemToggler(values: CatalogFilter_Value[] | CatalogFilter_Value) {
  const itemsToMark = Array.isArray(values) ? values : values.children;

  const [openedScheme, setScheme] = useState<Record<string, boolean>>(() => {
    return itemsToMark.reduce((acc, value) => ({ ...acc, [value.code]: value.selected }), {});
  });

  const toggleItem = (code: string) => {
    setScheme({ [code]: !openedScheme[code] });
  };

  useEffect(() => {
    setScheme(itemsToMark.reduce((acc, value) => ({ ...acc, [value.code]: value.selected }), {}));
  }, [itemsToMark]);

  return { openedScheme, toggleItem };
}
