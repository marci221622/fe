import { combine, createEffect, sample } from 'effector';
import { Action } from 'history';

import { SlugType } from '@/generated/customer_hub/entities/slug.v1';
import { Section } from '@/generated/customer_hub/enums/section';
import { CatalogWithFiltersResponse } from '@/shared/catalog';
import { createStaticBreadcrumbs } from '@/shared/createBreadcrumbs';
import { loaded } from '@/shared/pageRouting';
import { RequestParams } from '@/shared/request';
import { $currentGender } from '@/shared/session';

import { paths } from '@/constants/paths';

import {
  buildKey,
  catalogAnalytics,
  createBaseCatalog,
  createCatalogSeo,
  prepareParamsToRequest,
} from '@/features/catalog';
import { additionalTitle } from '@/features/header';

import { analytics } from '@/lib/bridge';

import { pageHooks } from './hooks';

const $catalogParams = combine({ gender: $currentGender, params: pageHooks.$params }).map(({ params, gender }) => {
  if (params) {
    const slug = { type: SlugType.SLUG_TYPE_BRAND, slug: params.params?.slug ?? '' };
    /**
     * @deprecated сделано для обратной совместимости
     * на старые урлы каталога
     */
    const brandCode = params.params?.brandCode;

    return {
      ...prepareParamsToRequest(
        {
          ...params,
          // Свой код поддерживаем
          // eslint-disable-next-line deprecation/deprecation
          slug: !brandCode ? slug : undefined,
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

export const brandCatalog = createBaseCatalog({
  $params: $catalogParams,
  hooks: pageHooks,
  path: paths.catalog.withSlug.brand,
  getKey: params => buildKey(params) || 'brand',
});

export const seo = createCatalogSeo(brandCatalog, 'brand');

export const breadcrumbs = createStaticBreadcrumbs({
  breadcrumbs: combine({ header: brandCatalog.$header, section: $currentGender }).map(({ header, section }) => {
    if (header?.brand) {
      return [
        {
          title: section === Section.SECTION_FEMALE ? 'Женское' : 'Мужское',
          to: paths.brandsList(),
        },
        {
          title: header.brand.title,
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

    const rs = await Promise.all([brandCatalog.query.fx([params, scopedCtrl])]);

    return rs;
  },
);

sample({
  source: $catalogParams,
  clock: pageHooks.enterGuarded,
  fn: (params, { ctrl }) => ({ ...params, ctrl }),
  target: mainFx,
});

sample({
  source: { title: brandCatalog.$title, result: brandCatalog.$result },
  clock: pageHooks.loadedGuarded,
  target: additionalTitle.change.prepend(
    ({ title, result }: { title: string; result: CatalogWithFiltersResponse | null }) => {
      const logo = result?.header?.brand?.logoLink;

      if (logo) {
        return { type: 'image', src: logo.src };
      }

      return { type: 'text', rows: [title] };
    },
  ),
});

loaded({
  effect: mainFx,
  hooks: pageHooks,
  condition: params => !!params.loadMore === false,
});

analytics(() => {
  sample({
    filter: Boolean,
    source: brandCatalog.$result,
    clock: pageHooks.loadedGuarded,
    target: catalogAnalytics.catalogLoaded,
  });
});
