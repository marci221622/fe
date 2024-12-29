import { combine, createEffect, sample } from 'effector';
import { Action } from 'history';

import { SlugType } from '@/generated/customer_hub/entities/slug.v1';
import { createStaticBreadcrumbs } from '@/shared/createBreadcrumbs';
import { loaded } from '@/shared/pageRouting';
import { RequestParams } from '@/shared/request';
import { $currentGender } from '@/shared/session';

import { paths } from '@/constants/paths';

import {
  prepareParamsToRequest,
  createBaseCatalog,
  catalogAnalytics,
  createCatalogSeo,
  buildKey,
} from '@/features/catalog';
import { additionalTitle } from '@/features/header';

import { analytics } from '@/lib/bridge';

import { pageHooks } from './hooks';

const $catalogParams = combine({ gender: $currentGender, params: pageHooks.$params }).map(({ params, gender }) =>
  params
    ? {
        ...prepareParamsToRequest(
          {
            ...params,
            slug: { type: SlugType.SLUG_TYPE_COLLECTION, slug: params?.params?.slug ?? '' },
          },
          {
            gender,
          },
        ),
        navType: params.navType,
      }
    : ({} as ReturnType<typeof prepareParamsToRequest>),
);

export const selCatalog = createBaseCatalog({
  $params: $catalogParams,
  hooks: pageHooks,
  path: paths.catalog.withSlug.collection,
  getKey: params => buildKey(params) || 'sel',
});

export const seo = createCatalogSeo(selCatalog, 'common');

export const breadcrumbs = createStaticBreadcrumbs({
  breadcrumbs: selCatalog.$header.map(header => {
    if (header?.collection) {
      return [
        {
          title: header.collection.title,
          to: '',
        },
      ];
    }

    return [];
  }),
});

const mainFx = createEffect(
  async ({
    ctrl,
    ...params
  }: RequestParams<'GetItems'>['body'] & { ctrl?: AbortController; loadMore?: boolean; navType?: Action }) => {
    const scopedCtrl = ctrl ?? new AbortController();

    const rs = await Promise.all([selCatalog.query.fx([params, scopedCtrl])]);

    return rs;
  },
);

sample({
  source: $catalogParams,
  fn: (params, { ctrl }) => ({ ...params, ctrl }),
  clock: pageHooks.enterGuarded,
  target: mainFx,
});

sample({
  source: selCatalog.$title,
  clock: pageHooks.loadedGuarded,
  target: additionalTitle.change.prepend((title: string) => ({ type: 'text', rows: [title] })),
});

loaded({
  effect: mainFx,
  hooks: pageHooks,
  condition: params => !!params.loadMore === false,
});

analytics(() => {
  sample({
    filter: Boolean,
    source: selCatalog.$result,
    clock: pageHooks.loadedGuarded,
    target: catalogAnalytics.catalogLoaded,
  });
});
