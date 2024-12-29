import { attach, combine, sample } from 'effector';
import { useUnit } from 'effector-react';
import { useMemo } from 'react';

import { Catalog } from '@/generated/customer_hub/entities/catalog.v1';
import { Category } from '@/generated/customer_hub/entities/category.v1';
import { Section } from '@/generated/customer_hub/enums/section';
import { GetMenuTreeResponse } from '@/generated/customer_hub/methods/catalog/get_menu_tree.v1';
import { $appIsShort } from '@/shared/configs';
import { $currentGender } from '@/shared/session';
import { appStarted } from '@/shared/start';

import { createQuery, FxParams } from '@/lib/createQuery';

import { fetchCatalog } from '../api';

export const catalogQuery = createQuery({
  initialData: {
    catalogs: [],
  },
  handler: async ([_, ctrl]: FxParams<unknown>) => {
    const rs = await fetchCatalog({
      body: {},
      signal: ctrl.signal,
    });

    return rs;
  },
});

export const categoryLoaderFx = attach({
  source: catalogQuery.$result,
  effect: async (cachedCategories, [_, ctrl]: FxParams<unknown>) => {
    if (cachedCategories?.catalogs?.length) {
      return cachedCategories;
    }

    const rs = await catalogQuery.fx([{}, ctrl]);

    return rs;
  },
});

export function getRootCatalogByGender({ gender, catalog }: { gender: Section; catalog?: GetMenuTreeResponse | null }) {
  return catalog?.catalogs?.find(it => it.gender === gender) ?? null;
}

// Рутовый каталог из дерева категорий
export const $catalogByGender = combine({ catalog: catalogQuery.$result, gender: $currentGender }).map(
  getRootCatalogByGender,
);

sample({
  source: { result: catalogQuery.$result, appIsShort: $appIsShort },
  clock: appStarted,
  filter: ({ result, appIsShort }) => result?.catalogs?.length === 0 && !appIsShort,
  fn: (_, { ctrl }) => ({ ctrl }),
  target: catalogQuery.start,
});

export function useCategoryFromCatalog(collection?: string) {
  const catalog = useUnit(catalogQuery.$result);

  const category = useMemo(() => {
    if (!catalog || !collection) {
      return null;
    }

    const queue = catalog.catalogs.reduce((acc, it) => [...acc, ...it.categories], [] as Category[]);

    while (queue.length > 0) {
      const currentCategory = queue.shift()!;

      if (currentCategory.collectionCode === collection) {
        return currentCategory;
      }

      queue.push(...currentCategory.categories);
    }

    return null;
  }, [catalog, collection]);

  return category;
}

export function useRootCatalogByGender() {
  const catalog = useUnit($catalogByGender);

  return catalog;
}

export function getParentCategoryFromCollections(catalogs: Catalog[], collection: string) {
  const queue = catalogs.reduce((acc, it) => [...acc, ...it.categories], [] as Category[]);
  const parent = new Map<string, Category>();

  while (queue.length > 0) {
    const currentCategory = queue.shift()!;

    if (currentCategory.collectionCode === collection) {
      return parent.get(currentCategory.collectionCode!) ?? null;
    }

    currentCategory.categories.forEach(it => parent.set(it.collectionCode!, currentCategory));

    queue.push(...currentCategory.categories);
  }

  return null;
}
