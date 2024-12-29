import { combine, createEffect, sample } from 'effector';
import { Action } from 'history';

import { Section } from '@/generated/customer_hub/enums/section';
import { createStaticBreadcrumbs } from '@/shared/createBreadcrumbs';
import { loaded } from '@/shared/pageRouting';
import { RequestParams } from '@/shared/request';
import { $currentGender } from '@/shared/session';

import { ADDITIONAL_SEARCH_TITLE, NO_SEARCH_TITLE_KEY, ROOT_COLLECTIONS, filtersCodes } from '@/constants/hardcode';

import { prepareParamsToRequest, createBaseCatalog, catalogAnalytics, buildKey } from '@/features/catalog';
import { AdditionalHeaderTitle, additionalTitle } from '@/features/header';

import { analytics } from '@/lib/bridge';

import { pageHooks } from './hooks';

const $catalogParams = combine({ gender: $currentGender, params: pageHooks.$params }).map(({ params, gender }) =>
  params
    ? {
        ...prepareParamsToRequest(params, {
          gender,
          collections: [
            gender === Section.SECTION_FEMALE
              ? ROOT_COLLECTIONS[Section.SECTION_FEMALE]
              : ROOT_COLLECTIONS[Section.SECTION_MALE],
          ],
        }),
        navType: params.navType,
      }
    : ({} as ReturnType<typeof prepareParamsToRequest>),
);

export const breadcrumbs = createStaticBreadcrumbs({
  breadcrumbs: pageHooks.$params.map(params => {
    if (params?.query) {
      const noSearch = params.query[NO_SEARCH_TITLE_KEY] === '1';
      const title = params.query[filtersCodes.search] ?? '';

      return [
        {
          title: noSearch ? title : ADDITIONAL_SEARCH_TITLE + title,
          to: '',
        },
      ];
    }

    return [];
  }),
});

export const searchCatalog = createBaseCatalog({
  $params: $catalogParams,
  hooks: pageHooks,
  getKey: params => buildKey(params) || 'search',
});

const mainFx = createEffect(
  async ({
    ctrl,
    ...params
  }: RequestParams<'GetItems'>['body'] & { ctrl?: AbortController; loadMore?: boolean; navType?: Action }) => {
    const scopedCtrl = ctrl ?? new AbortController();

    const rs = await Promise.all([searchCatalog.query.fx([params, scopedCtrl])]);

    return rs;
  },
);

sample({
  source: pageHooks.$params,
  clock: pageHooks.loadedGuarded,
  fn: params => {
    const search = params.query?.[filtersCodes.search];
    const noSearch = params.query?.[NO_SEARCH_TITLE_KEY] === '1';

    if (search) {
      return { type: 'text', rows: [noSearch ? search : ADDITIONAL_SEARCH_TITLE + search] } as AdditionalHeaderTitle;
    }

    return null as AdditionalHeaderTitle;
  },
  target: additionalTitle.change,
});

sample({
  source: $catalogParams,
  clock: pageHooks.enterGuarded,
  fn: (params, { ctrl }) => ({ ...params, ctrl }),
  target: mainFx,
});

loaded({
  effect: mainFx,
  hooks: pageHooks,
  condition: params => !!params.loadMore === false,
});

analytics(() => {
  sample({
    filter: Boolean,
    source: searchCatalog.$result,
    clock: pageHooks.loadedGuarded,
    target: catalogAnalytics.catalogLoaded,
  });
});
