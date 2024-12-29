import { createEvent, sample } from 'effector';
import { condition } from 'patronum/macro';

import { $isAuthorized } from '@/shared/session';

import { logged, modal } from '@/features/auth';

import { analytics } from '@/lib/bridge';
import { createField } from '@/lib/createField';
import { createMutation, FxParams } from '@/lib/createMutation';

import * as api from '../api';
import { ToggleFavoritesParams } from '../types';

import { favoriteAnalytics } from './analytics';
import { favoriteResults } from './list';
import { $favoritesScheme } from './scheme';

// Если гость жмет в избранное
// Сохраняем ид и авторизируем
// После авторизации добавляем
export const lastGuestFavoriteId = createField<ToggleFavoritesParams>(null!);

export const toggleFavorites = createEvent<ToggleFavoritesParams>();

export const toggleFavoritesMutation = createMutation({
  handler: ([{ id, isActive, listid }]: FxParams<ToggleFavoritesParams>) => {
    if (isActive) {
      return api.removeFromFavorite({
        body: {
          favoriteListId: listid,
          itemCodes: [id],
        },
      });
    }

    return api.addToFavorite({
      body: {
        favoriteListId: listid,
        itemCodes: [id],
      },
    });
  },
});

$favoritesScheme
  .on(toggleFavoritesMutation.start, (map, params) => ({
    ...map,
    [params.id]: !params.isActive,
  }))
  .on(toggleFavoritesMutation.fx.fail, (map, { params }) => ({
    ...map,
    [params[0].id]: params[0].isActive,
  }));

condition({
  source: toggleFavorites,
  if: $isAuthorized,
  then: toggleFavoritesMutation.start,
  else: lastGuestFavoriteId.change,
});

// Изменяем каунтер без бекенда
sample({
  clock: toggleFavoritesMutation.fx,
  filter: ([params]) => !params.isActive,
  target: favoriteResults.increment,
});

sample({
  clock: toggleFavoritesMutation.fx,
  filter: ([params]) => params.isActive,
  target: favoriteResults.decrement,
});

sample({
  clock: lastGuestFavoriteId.change,
  fn: () => 'favorites' as const,
  target: modal.change,
});

sample({
  clock: toggleFavoritesMutation.fx,
  target: lastGuestFavoriteId.reset,
});

sample({
  source: lastGuestFavoriteId.$value,
  clock: logged,
  filter: Boolean,
  target: toggleFavoritesMutation.start,
});

analytics(() => {
  sample({
    clock: toggleFavoritesMutation.fx.finally,
    fn: result =>
      result.status === 'fail' ? { ...result.params[0], isFailed: true } : { ...result.params[0], isFailed: false },
    target: favoriteAnalytics.toggleFavorite,
  });
});
