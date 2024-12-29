import { useUnit } from 'effector-react';
import { useCallback } from 'react';

import { $favoriteBrandsScheme } from './models';

export function useInFavoriteBrand() {
  const map = useUnit($favoriteBrandsScheme);

  return useCallback((code: string) => !!map[code], [map]);
}
