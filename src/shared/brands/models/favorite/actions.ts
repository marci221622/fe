import { createEvent, sample } from 'effector';
import { condition } from 'patronum';

import { $isAuthorized, wasLogouted } from '@/shared/session';

import { SECTION_TO_STRING } from '@/constants/hardcode';

import { analytics, bridge } from '@/lib/bridge';
import { createField } from '@/lib/createField';
import { createMutation, FxParams } from '@/lib/createMutation';

import * as api from '../../api';
import { ToggleFavoriteBrandParams } from '../../types';

import { favoriteBrandsAnalytics } from './analytics';
import { $favoriteBrands, favoriteBrandsQuery } from './list';

// Если гость жмет в избранное
// Сохраняем ид и авторизируем
// После авторизации добавляем
export const lastFavoriteBrandId = createField<ToggleFavoriteBrandParams>(null!);

export const resetFavoriteBrands = createEvent<void>();

export const toggleFavoriteBrands = createEvent<ToggleFavoriteBrandParams>();

export const toggleFavoritesBrandsMutation = createMutation({
  handler: ([{ section, brandCode, isActive }]: FxParams<ToggleFavoriteBrandParams>) => {
    if (isActive) {
      return api.removeBrandFromFavoriteList({
        body: {
          brands: [
            {
              brandCode,
              sections: [SECTION_TO_STRING[section]],
            },
          ],
        },
      });
    }

    return api.addBrandToFavoriteList({
      body: {
        brands: [
          {
            brandCode,
            sections: [SECTION_TO_STRING[section]],
          },
        ],
      },
    });
  },
});

$favoriteBrands
  .on(toggleFavoritesBrandsMutation.start, (state, params) => ({
    ...state,
    [params.section]: params.isActive
      ? state[params.section].filter(it => it.brandCode !== params.brandCode)
      : [...state[params.section], { brandCode: params.brandCode, section: params.section }],
  }))
  .reset(resetFavoriteBrands);

analytics(() => {
  condition({
    source: toggleFavoriteBrands,
    if: (arg: ToggleFavoriteBrandParams) => !arg.isActive,
    then: favoriteBrandsAnalytics.addBrandToFavoriteList.prepend(favoriteBrandToAnalytics),
    else: favoriteBrandsAnalytics.removeBrandFromFavoriteList.prepend(favoriteBrandToAnalytics),
  });
});

bridge(() => {
  sample({
    source: lastFavoriteBrandId.$value,
    clock: favoriteBrandsQuery.fx.finally,
    filter: Boolean,
    target: toggleFavoriteBrands,
  });

  sample({
    clock: toggleFavoriteBrands,
    target: lastFavoriteBrandId.reset,
  });

  condition({
    source: toggleFavoriteBrands,
    if: $isAuthorized,
    then: toggleFavoritesBrandsMutation.start,
    else: lastFavoriteBrandId.change,
  });
});

bridge(() => {
  sample({ clock: resetFavoriteBrands, target: [favoriteBrandsQuery.reset, lastFavoriteBrandId.reset] });
  sample({ clock: wasLogouted, target: resetFavoriteBrands });
});

function favoriteBrandToAnalytics(arg: ToggleFavoriteBrandParams) {
  return {
    brandId: arg.brandId,
    brandCode: arg.brandCode,
    brandName: arg.brandName,
  };
}
