import { createEffect, sample } from 'effector';

import { Section } from '@/generated/customer_hub/enums/section';
import { Sort } from '@/generated/customer_hub/enums/sort';
import { GetBrandsItemsListResponse } from '@/generated/customer_hub/methods/catalog/get_brands_items_list.v1';
import { $favoriteBrands, favoriteBrandsQuery, fetchItemsByCodes, mapBrandsByGender } from '@/shared/brands';
import { createHooks, loaded } from '@/shared/pageRouting';

import { ITEMS_BY_BRANDS_LENGTH } from '@/constants/hardcode';

import { onFavoriteBrandsApply } from '@/features/brands';
import { lastFavoriteLinkField } from '@/features/favorites';
import { additionalTitle } from '@/features/header';

import { FxParams, createQuery } from '@/lib/createQuery';

export const pageHooks = createHooks({ pagename: 'FavoriteBrandsList', authOnly: true });

// TODO: пагинация
export const itemsByBrandsQuery = createQuery({
  initialData: {
    [Section.SECTION_FEMALE]: { items: [] },
    [Section.SECTION_MALE]: { items: [] },
    [Section.UNRECOGNIZED]: { items: [] },
  },
  handler: async ([params, ctrl]: FxParams<{ male: string[]; female: string[] }>) => {
    const searchParams = {
      sort: Sort.SORT_NOVELTY,
      itemsCount: ITEMS_BY_BRANDS_LENGTH,
    };

    const [female, male] = await Promise.all([
      fetchItemsByCodes({
        body: {
          searchParams: {
            ...searchParams,
            brandsCodes: params.female,
            section: Section.SECTION_FEMALE,
          },
        },
        signal: ctrl.signal,
      }),
      fetchItemsByCodes({
        body: {
          searchParams: {
            ...searchParams,
            brandsCodes: params.male,
            section: Section.SECTION_MALE,
          },
        },
        signal: ctrl.signal,
      }),
    ]);

    return {
      [Section.SECTION_FEMALE]: female,
      [Section.SECTION_MALE]: male,
    } as Record<Section, GetBrandsItemsListResponse>;
  },
});

const mainFx = createEffect(async ({ ctrl }: { ctrl?: AbortController }) => {
  const scopedCtrl = ctrl ?? new AbortController();
  // TODO: DUBLICATED_REQUESTS
  const list = await favoriteBrandsQuery.fx([{ section: undefined }, scopedCtrl]);

  const { [Section.SECTION_FEMALE]: female, [Section.SECTION_MALE]: male } = mapBrandsByGender(list);

  const items = await itemsByBrandsQuery.fx([
    { female: female.map(it => it.brandCode), male: male.map(it => it.brandCode) },
    scopedCtrl,
  ]);

  return items;
});

sample({
  clock: pageHooks.enterGuarded,
  fn: ({ ctrl }) => ({ ctrl }),
  target: mainFx,
});

sample({
  clock: pageHooks.enterGuarded,
  fn: () => 'brands' as const,
  target: lastFavoriteLinkField.change,
});

sample({
  clock: pageHooks.leave,
  target: [itemsByBrandsQuery.reset],
});

sample({
  clock: pageHooks.loadedGuarded,
  fn: () => ({ type: 'text' as const, rows: ['Избранное'] }),
  target: additionalTitle.change,
});

sample({
  source: $favoriteBrands,
  clock: onFavoriteBrandsApply,
  filter: pageHooks.$onPage,
  fn: brands => {
    return {
      female: brands[Section.SECTION_FEMALE].map(it => it.brandCode),
      male: brands[Section.SECTION_MALE].map(it => it.brandCode),
    };
  },
  target: itemsByBrandsQuery.start,
});

loaded({
  effect: mainFx,
  hooks: pageHooks,
});
