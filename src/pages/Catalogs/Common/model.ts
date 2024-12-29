import { combine, createEffect, sample } from 'effector';
import { Action } from 'history';

import { SlugType } from '@/generated/customer_hub/entities/slug.v1';
import { createBreadcrumbs } from '@/shared/createBreadcrumbs';
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
import { $catalogByGender, additionalTitle, getParentCategoryFromCollections } from '@/features/header';

import { analytics } from '@/lib/bridge';

import { pageHooks } from './hooks';

const $catalogParams = combine({ gender: $currentGender, params: pageHooks.$params }).map(({ params, gender }) => {
  if (params) {
    const slug = { type: SlugType.SLUG_TYPE_MENU_ITEM, slug: params.params?.slug ?? '' };
    /**
     * @deprecated сделано для обратной совместимости
     * на старые урлы каталога
     */
    const menuCode = params.params?.menuCode;

    return {
      ...prepareParamsToRequest(
        {
          ...params,
          // Свой код поддерживаем
          // eslint-disable-next-line deprecation/deprecation
          slug: !menuCode ? slug : undefined,
        },
        {
          gender,
        },
      ),
      navType: params.navType,
    };
  }

  return {} as ReturnType<typeof prepareParamsToRequest>;
});

export const breadcrumbs = createBreadcrumbs({
  linkTransformer: link => paths.catalog.withSlug.common({ slug: link }),
});

export const commonCatalog = createBaseCatalog({
  $params: $catalogParams,
  hooks: pageHooks,
  path: paths.catalog.withSlug.common,
  getKey: params => buildKey(params) || 'common',
});

// Один из вариантов группировки n запросов для страницы в одном эффекте
const mainFx = createEffect(
  async ({
    ctrl,
    ...params
  }: RequestParams<'GetItems'>['body'] & { ctrl?: AbortController; loadMore?: boolean; navType?: Action }) => {
    const scopedCtrl = ctrl ?? new AbortController();

    const rs = await Promise.allSettled([
      commonCatalog.query.fx([params, scopedCtrl]),
      breadcrumbs.query.fx([
        {
          slug: params.searchParams?.slug?.slug,
        },
        scopedCtrl,
      ]),
    ]);

    return rs;
  },
);

export const seo = createCatalogSeo(commonCatalog, 'common');

sample({
  source: $catalogParams,
  fn: (params, { ctrl }) => ({ ...params, ctrl }),
  clock: pageHooks.enterGuarded,
  target: mainFx,
});

sample({
  source: { catalog: $catalogByGender, mainTitle: commonCatalog.$title, params: pageHooks.$params },
  clock: pageHooks.loadedGuarded,
  fn: ({ catalog, mainTitle, params }) => {
    const catalogs = catalog ? [catalog] : [];
    const head = { type: 'text' as const, rows: [mainTitle] };
    const parent = getParentCategoryFromCollections(catalogs, params?.params?.collection ?? '');

    if (parent?.title) {
      head.rows.push(parent.title);
    }

    return head;
  },
  target: additionalTitle.change,
});

sample({
  clock: pageHooks.leave,
  target: breadcrumbs.query.reset,
});

loaded({
  effect: mainFx,
  hooks: pageHooks,
  condition: params => !!params.loadMore === false,
});

analytics(() => {
  sample({
    filter: Boolean,
    source: commonCatalog.$result,
    clock: pageHooks.loadedGuarded,
    target: catalogAnalytics.catalogLoaded,
  });
});
