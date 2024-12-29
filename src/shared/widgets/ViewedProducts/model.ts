import { FxParams, createQuery } from '@/lib/createQuery';

import { fetchItemsByCodes, fetchViewedIdsFromMindbox } from './api';

export const DEFAULT_PAGE_SIZE = '20';

export const viewedProductsQuery = createQuery({
  initialData: { items: [], hasMoreItems: false },
  handler: async ([{ size = DEFAULT_PAGE_SIZE }, ctrl]: FxParams<{ size?: string }>) => {
    // Что бы проверить есть ли еще товары
    const nextSize = String(+size + 1);

    const ids = await fetchViewedIdsFromMindbox({ size: nextSize });
    const rs = await fetchItemsByCodes({
      signal: ctrl.signal,
      body: {
        codes: ids,
        searchParams: { pageSize: nextSize, inStock: true },
      },
    });

    return {
      items: rs.item,
      hasMoreItems: rs.item.length > +size,
    };
  },
});
