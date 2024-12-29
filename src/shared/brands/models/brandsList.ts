import { attach, combine, sample } from 'effector';

import { Brand } from '@/generated/customer_hub/entities/brand.v1';
import { $appIsShort } from '@/shared/configs';
import { $currentGender } from '@/shared/session';
import { appStartedOnClient } from '@/shared/start';

import { SECTION_TO_STRING } from '@/constants/hardcode';

import { createQuery, FxParams } from '@/lib/createQuery';

import { fetchBrandsList } from '../api';

export const staticBrandsQuery = createQuery({
  initialData: null,
  handler: ([_, ctrl]: FxParams<object>) => fetchBrandsList({ body: {}, signal: ctrl.signal }),
});

export const $brandsList = staticBrandsQuery.$result.map(it => (it ? it.brands : []));
export const $brandsListScheme = $brandsList.map(list =>
  list.reduce((acc, brand) => {
    acc[brand.code] = brand;

    return acc;
  }, {} as Record<string, Brand>),
);
export const $brandsListByTitleScheme = $brandsList.map(list =>
  list.reduce((acc, brand) => {
    acc[brand.title] = brand;

    return acc;
  }, {} as Record<string, Brand>),
);
export const $brandsListByGender = combine({ gender: $currentGender, brands: $brandsList }).map(
  state => state?.brands?.filter(it => it.sections.includes(SECTION_TO_STRING[state.gender])) ?? [],
);
export const $topBrands = combine({ gender: $currentGender, brands: $brandsList }).map(
  state => state?.brands?.filter(it => it.sectionsTop.includes(SECTION_TO_STRING[state.gender])) ?? [],
);

// Лоадер для проверки на кеш
// Что бы постоянно не грузить большой список
export const brandsLoaderFx = attach({
  source: staticBrandsQuery.$result,
  effect: async (cachedBrands, params: FxParams<object>) => {
    if (cachedBrands) {
      return cachedBrands;
    }

    const rs = await staticBrandsQuery.fx([{}, params[1]]);

    return rs;
  },
});

sample({
  source: { result: staticBrandsQuery.$result, appIsShort: $appIsShort },
  clock: appStartedOnClient,
  filter: ({ result, appIsShort }) => !result && !appIsShort,
  fn: (_, { ctrl = new AbortController() }) => [{}, ctrl] as FxParams<object>,
  target: brandsLoaderFx,
});
