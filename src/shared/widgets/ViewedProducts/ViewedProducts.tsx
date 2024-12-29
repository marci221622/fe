import { useUnit } from 'effector-react';
import { useEffect, useMemo } from 'react';

import { Item } from '@/generated/customer_hub/entities/item.v1';
import { $mappedStrings } from '@/shared/configs';
import { productsAnalytics } from '@/shared/products';

import { viewedProductsQuery } from './model';

type Props = {
  condition?: boolean;
  size?: string;
};

type ItemsAcc = { keys: Record<string, boolean>; items: Item[] };

export function useLastViwedProducts({ condition = true, size = '20' }: Props) {
  const texts = useUnit($mappedStrings);

  const { start, result } = useUnit(viewedProductsQuery);
  const onProductClicked = useUnit(productsAnalytics.productClicked);

  const productClickHandler = (product: Item | 'all_view_action') => {
    onProductClicked({ item: product, page: 'CategoryPage', list: texts.viewedItems.main.title });
  };

  useEffect(() => {
    if (condition) {
      start({ size });
    }
  }, [condition, start, size]);

  return {
    ...result!,
    items: useMemo(
      () =>
        result!.items
          .reduce(
            (acc, item) => {
              const uniqKey = `${item.color?.title}+${item.articleProducer}+${item.condition?.state}+${item.brand?.code}`;

              if (item.articleProducer && !acc.keys[uniqKey]) {
                acc.items.push(item);
                acc.keys[uniqKey] = true;
              }

              if (!item.articleProducer) {
                acc.items.push(item);
              }

              return acc;
            },
            { keys: {}, items: [] } as ItemsAcc,
          )
          .items.slice(0, +size),
      [result, size],
    ),
    productClickHandler,
  };
}
