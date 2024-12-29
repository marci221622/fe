import { combine, createStore, merge, sample } from 'effector';
import { debounce, every } from 'patronum';

import { Brand } from '@/generated/customer_hub/entities/brand.v1';
import { FavoriteListBrand } from '@/generated/customer_hub/entities/favorite_list_brand.v1';
import { Section } from '@/generated/customer_hub/enums/section';
import { $appIsFull } from '@/shared/configs';
import { $currentGender, $isAuthorized, changedGender } from '@/shared/session';
import { $isClient, appStarted } from '@/shared/start';

import { ROOT_SLUG, SECTION_TO_STRING, filtersCodes } from '@/constants/hardcode';
import { paths } from '@/constants/paths';

import { FxParams, createQuery } from '@/lib/createQuery';
import { createDelay } from '@/lib/delay';

import { fetchFavoriteBrandsList } from '../../api';
import { mapBrandsByGender } from '../../lib';
import { $brandsListScheme } from '../brandsList';

export const $favoriteBrands = createStore<Record<Section, FavoriteListBrand[]>>({
  [Section.SECTION_FEMALE]: [],
  [Section.SECTION_MALE]: [],
  [Section.UNRECOGNIZED]: [],
});

export const $favoriteBrandsByGender = combine({ gender: $currentGender, brands: $favoriteBrands }).map(
  ({ gender, brands }) => {
    return brands[gender];
  },
);

export const $favoriteBrandsNotExists = $favoriteBrandsByGender.map(brands => brands.length === 0);

export const $enrichedFavoriteBrands = combine({ favorite: $favoriteBrandsByGender, brands: $brandsListScheme }).map(
  ({ favorite, brands }) => {
    return favorite.map(brand => brands[brand.brandCode]).filter(Boolean) as Brand[];
  },
);

export const $favoriteBrandsIdsAsString = $enrichedFavoriteBrands.map(brands =>
  brands.map(brand => brand.title).join(','),
);

// В фильтрах костыль
// Нету кода и передается label как тайтл
export const $favoriteBrandsByTitleScheme = $enrichedFavoriteBrands.map(brands =>
  brands.reduce((acc, key) => {
    acc[key.title] = key;

    return acc;
  }, {} as Record<string, Brand>),
);

export const $favoriteBrandsPageLink = combine({ brands: $enrichedFavoriteBrands, gender: $currentGender }).map(
  ({ brands, gender }) => {
    const path = paths.catalog.withSlug.common({
      slug: gender === Section.SECTION_MALE ? ROOT_SLUG.men : ROOT_SLUG.women,
    });

    return brands.reduce((acc, brand, index) => {
      const separator = index < brands.length - 1 ? encodeURIComponent(',') : '';

      return `${acc}${brand.title}${separator}`;
    }, `${path}?${filtersCodes.brands}=`);
  },
);

// Схема по коду конкретно для избранных брендов
export const $favoriteBrandsScheme = $favoriteBrandsByGender.map(brands =>
  brands.reduce((acc, key) => {
    acc[key.brandCode] = key;

    return acc;
  }, {} as Record<string, FavoriteListBrand>),
);

// Запрашиваем при старте
// Или синк по страницам где используется кверя
export const favoriteBrandsQuery = createQuery({
  $isAuthorized,
  initialData: [],
  handler: ([{ section }, ctrl]: FxParams<{ section?: Section }>) => {
    return fetchFavoriteBrandsList({
      body: { section: typeof section !== 'undefined' ? SECTION_TO_STRING[section] : undefined },
      signal: ctrl.signal,
    }).then(rs => rs.brands);
  },
});

$favoriteBrands.on(favoriteBrandsQuery.fx.done, (prev, { params, result }) => {
  if (params[0].section) {
    return {
      ...prev,
      [params[0].section]: result,
    };
  }

  return mapBrandsByGender(result);
});

sample({
  source: $currentGender,
  clock: debounce({ source: merge([changedGender, appStarted]), timeout: createDelay() }),
  filter: every({ stores: [$isClient, $isAuthorized, $favoriteBrandsNotExists, $appIsFull], predicate: Boolean }),
  fn: section => ({ section }),
  target: favoriteBrandsQuery.start,
});
