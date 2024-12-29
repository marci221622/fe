import { useUnit } from 'effector-react';
import { useCallback } from 'react';

import { paths } from '@/constants/paths';

import { $favoritesScheme, lastFavoriteLinkField } from './models';

export function useInFavorite() {
  const map = useUnit($favoritesScheme);

  return useCallback((id: string, prevActivity: boolean) => map[id] ?? prevActivity, [map]);
}

export function useLastFavoriteLink() {
  const value = useUnit(lastFavoriteLinkField.$value);

  return value === 'items' ? paths.favorites.main() : paths.favorites.brands();
}
