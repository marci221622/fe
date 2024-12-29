import { attach, createEffect } from 'effector';

import { SearchFilter } from '@/generated/customer_hub/entities/search_filter.v1';
import { SearchFilterType } from '@/generated/customer_hub/enums/search_filter_type';
import { Section } from '@/generated/customer_hub/enums/section';
import { Sort } from '@/generated/customer_hub/enums/sort';
import { fetchCatalogWithFilters } from '@/shared/catalog';
import { $currentGender } from '@/shared/session';

import { filtersCodes } from '@/constants/hardcode';

import { FxParams, createQuery } from '@/lib/createQuery';

type Params = { brands: string[]; size?: string };

const DEFAULT_PAGE_SIZE = '20';

// Использоваться может везде
// Все данные даже по длине одинаковые
// По поведению так же
// Просто вынесу и заиспользую один набор данных

export const novetlyByBrandsQuery = createQuery({
  initialData: { items: [], itemsCount: 0 },
  effect: attach({
    source: $currentGender,
    mapParams: (params: FxParams<Params>, gender) => ({ gender, params }),
    effect: createEffect(async ({ gender, params: [params, ctrl] }: { gender: Section; params: FxParams<Params> }) => {
      const result = await fetchCatalogWithFilters({
        signal: ctrl.signal,
        body: {
          pageToken: '',
          searchParams: {
            sort: Sort.SORT_NOVELTY,
            collections: [gender === Section.SECTION_FEMALE ? 'COLL-1' : 'COLL-139'],
            filters: [
              {
                code: filtersCodes.brands,
                type: SearchFilterType.SEARCH_FILTER_TYPE_UNSPECIFIED,
                values: params.brands,
              },
            ] as SearchFilter[],
            brands: [],
            sections: [gender],
            section: gender,
            pageSize: DEFAULT_PAGE_SIZE,
            rootMenuCode: gender === Section.SECTION_FEMALE ? 'MENU-1' : 'MENU-139',
            currentMenuCode: gender === Section.SECTION_FEMALE ? 'MENU-1' : 'MENU-139',
            currentMenuCodes: [],
            itemCodes: [],
          },
        },
      });

      return {
        items: result.items,
        itemsCount: +result.itemsCount,
      };
    }),
  }),
});
