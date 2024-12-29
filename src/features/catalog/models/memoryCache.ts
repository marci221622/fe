import { createEffect } from 'effector';

import { CatalogWithFiltersResponse } from '@/shared/catalog';

import { MINUTES5 } from '@/constants/days';

export type StoreParams = {
  key: string;
  result: { result: CatalogWithFiltersResponse | null; fromCache: boolean } | null;
};

export function createInMemoryCache() {
  const inMemoryCache = {} as Record<string, { data: CatalogWithFiltersResponse | null; lastUpdate: number }>;

  const storeInFx = createEffect(({ key, result }: StoreParams) => {
    if (typeof window !== 'undefined' && result?.result && !result?.fromCache) {
      inMemoryCache[key] = { data: result.result, lastUpdate: Date.now() + MINUTES5 * 1000 };
    }
  });

  const clearFx = createEffect(({ key }: Omit<StoreParams, 'result'>) => {
    if (typeof window !== 'undefined') {
      delete inMemoryCache[key];
    }
  });

  const readFromCache = (key: string) => {
    const fromCache = inMemoryCache[key];

    if (fromCache && fromCache.lastUpdate > Date.now()) {
      return fromCache.data;
    }

    return null;
  };

  return {
    inMemoryCache,
    storeInFx,
    clearFx,
    readFromCache,
  };
}
