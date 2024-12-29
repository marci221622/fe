import { combine, createEffect, sample } from 'effector';

import { Section } from '@/generated/customer_hub/enums/section';
import { GetItemByCodeResponse } from '@/generated/customer_hub/methods/catalog/get_item_by_code.v1';
import { createBreadcrumbs } from '@/shared/createBreadcrumbs';
import { loaded } from '@/shared/pageRouting';
import { createSeo } from '@/shared/Seo';
import { $currentGender, changedGender, revertGender, wasLogouted } from '@/shared/session';

import { SECTION_TO_STRING } from '@/constants/hardcode';
import { paths } from '@/constants/paths';

import { logged } from '@/features/auth';
import {
  cardPayment,
  clickAndCollectConfirmMutation,
  isOneClickCheckoutData,
  isQuickByCheckoutData,
} from '@/features/basket';
import { fetchProductByCode, productsAnalytics } from '@/features/product';

import { analytics, bridge } from '@/lib/bridge';
import { createQuery, FxParams } from '@/lib/createQuery';
import { keepFresh } from '@/lib/keepFresh';
import { pageStatus } from '@/lib/status';
import { capitalizeFirstLetter } from '@/lib/string';

import { pageHooks } from './hooks';

const sections: Record<Section, string> = {
  [Section.SECTION_FEMALE]: 'female',
  [Section.SECTION_MALE]: 'male',
  [Section.UNRECOGNIZED]: 'female',
};

type QueryParams = { code: string; section?: Section };

const $productParams = combine({
  params: pageHooks.$params,
  section: $currentGender,
}).map(({ params, section }) =>
  params ? { code: params?.params?.itemCode ?? '', ctrl: undefined, section } : ({ section } as QueryParams),
);

export const breadcrumbs = createBreadcrumbs({
  linkTransformer: link => paths.catalog.withSlug.common({ slug: link }),
});

export const productQuery = createQuery({
  initialData: null,
  abort: pageHooks.leave,
  handler: async ([{ code, section }, ctrl]: FxParams<QueryParams>) => {
    const rs = await fetchProductByCode({ body: { code, section }, signal: ctrl.signal });

    return rs;
  },
});

export const $product = productQuery.$result.map(it => it?.item ?? null);
export const $productCodes = productQuery.$result.map(it => (it?.item ? [it.item.code] : []));

export const seo = createSeo(
  $product.map(product =>
    product
      ? ({
          title: `${capitalizeFirstLetter(product.title)} ${product.brand?.title ?? ''}, цвет ${
            product.color?.title ?? ''
          } купить на ресейл-платформе TSUM Collect, арт. ${product.code}`,
          description: `${capitalizeFirstLetter(product.title)} ${product.brand?.title ?? ''}, цвет ${
            product.color?.title ?? ''
          } купить на ресейл-платформе TSUM Collect. Гарантия подлинности. Быстрая доставка. Aрт. ${product.code}`,
          keywords: `${product.title} ${product.brand?.title ?? ''} ${product.color?.title ?? ''}`,
          ogImageAlt: `${product.title} ${product.brand?.title ?? ''} ${product.color?.title ?? ''}, ${
            product.code
          } - 001`,
        } as BaseMetaType)
      : {},
  ),
);

const mainFx = createEffect(async ({ ctrl, code, section }: QueryParams & { ctrl?: AbortController }) => {
  const scopedCtrl = ctrl ?? new AbortController();

  const product = await productQuery.fx([{ code, section }, scopedCtrl]);

  // В продукте секция не в урле
  // По этому можно зайти с другого гендера и не получим крошки
  // Нужно дождаться товар и получить корректне крошки по секции
  const currentSectionIncluded = product.item && section && product.item.sections.includes(sections[section]);
  const nextSection = currentSectionIncluded ? section : section && revertGender(section);

  const crumbs = await breadcrumbs.query.fx([
    {
      itemCode: code,
      section: nextSection,
    },
    scopedCtrl,
  ]);

  return [product, crumbs];
});

sample({
  clock: pageHooks.enterGuarded,
  source: $productParams,
  fn: (params, { ctrl }) => ({ ...params, ctrl }),
  target: mainFx,
});

sample({
  clock: [
    productQuery.fx.failData,
    sample({
      clock: productQuery.fx.doneData,
      filter: it => !it.item,
    }),
  ],
  fn: () => 404,
  target: pageStatus.change,
});

sample({
  source: $currentGender,
  clock: productQuery.fx.doneData,
  filter: (gender, rs) => !!rs.item && !rs.item.sections.includes(SECTION_TO_STRING[gender]),
  fn: gender => revertGender(gender),
  target: changedGender,
});

// Обновление стейта по клику и покупке
bridge(() => {
  sample({
    source: productQuery.$result,
    clock: clickAndCollectConfirmMutation.fx.doneData,
    filter: (item, data) => !!item && !!data.checkoutState && isOneClickCheckoutData(data.checkoutState),
    fn: item => ({ item: { ...item?.item, isCollected: true } } as GetItemByCodeResponse),
    target: productQuery.$result,
  });

  sample({
    source: productQuery.$result,
    clock: cardPayment.paymentSuccess,
    filter: (item, result) => !!item && isQuickByCheckoutData(result.data),
    fn: item => ({ item: { ...item?.item, inStock: false, quantity: '0' } } as GetItemByCodeResponse),
    target: productQuery.$result,
  });
});

sample({
  clock: pageHooks.leave,
  target: breadcrumbs.query.reset,
});

loaded({
  effect: mainFx,
  hooks: pageHooks,
});

keepFresh(productQuery, {
  source: $productParams,
  triggers: [logged, wasLogouted],
  if: pageHooks.$onPage,
});

analytics(() => {
  sample({
    source: productQuery.$result,
    filter: it => !!it?.item,
    fn: it => it?.item!,
    clock: pageHooks.loadedGuarded,
    target: productsAnalytics.productLoaded,
  });
});
