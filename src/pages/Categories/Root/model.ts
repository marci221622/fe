import { attach, createEffect, sample } from 'effector';

import { Category } from '@/generated/customer_hub/entities/category.v1';
import { SearchFilter } from '@/generated/customer_hub/entities/search_filter.v1';
import { SearchParams } from '@/generated/customer_hub/entities/search_params.v1';
import { Section } from '@/generated/customer_hub/enums/section';
import { Sort } from '@/generated/customer_hub/enums/sort';
import { fetchCatalogWithFilters } from '@/shared/catalog';
import { loaded } from '@/shared/pageRouting';
import { $currentGender, wasLogouted } from '@/shared/session';

import { logged } from '@/features/auth';
import { categoryLoaderFx, getRootCatalogByGender } from '@/features/header';

import { createQuery } from '@/lib/createQuery';
import { keepFresh } from '@/lib/keepFresh';

import { pageHooks } from './hooks';

const createParams = ({ gender, coll, menu }: { gender: Section; coll?: string; menu?: string }) => ({
  pageToken: '',
  searchParams: {
    sort: Sort.SORT_PRESORTED,
    rootMenuCode: menu,
    collections: [coll],
    currentMenuCodes: [menu],
    filters: [] as SearchFilter[],
    brands: [] as string[],
    sections: [gender],
    pageSize: '10',
    fulltext: '',
  } as SearchParams,
});

export const categoriesQuery = createQuery({
  initialData: {
    categories: [],
  },
  abort: pageHooks.leave,
  effect: attach({
    source: $currentGender,
    effect: async (gender, [_, ctrl]) => {
      const rootCategories = await categoryLoaderFx([{}, ctrl]).then(
        it => getRootCatalogByGender({ catalog: it, gender })?.categories ?? ([] as Category[]),
      );

      const result = await Promise.all(
        rootCategories.map(category =>
          fetchCatalogWithFilters({
            signal: ctrl.signal,
            body: createParams({ gender, coll: category.collectionCode, menu: category.menuCode }),
          }).then(items => items.items),
        ),
      );

      return {
        categories: rootCategories
          .map((category, idx) => ({
            ...category,
            products: result[idx] ?? [],
          }))
          .sort((x, y) => +x.position - +y.position),
      };
    },
  }),
});

const mainFx = createEffect(async ({ ctrl }: { ctrl?: AbortController }) => {
  const scopedCtrl = ctrl ?? new AbortController();

  const rs = await Promise.all([categoriesQuery.fx([{}, scopedCtrl])]);

  return rs;
});

export const $categoriesWithProducts = categoriesQuery.$result.map(it => it?.categories ?? []);

sample({
  clock: pageHooks.enterGuarded,
  fn: ({ ctrl, ...params }) => ({ ...params, ctrl }),
  target: mainFx,
});

loaded({
  effect: mainFx,
  hooks: pageHooks,
});

keepFresh(categoriesQuery, {
  if: pageHooks.$onPage,
  triggers: [logged, wasLogouted],
});
