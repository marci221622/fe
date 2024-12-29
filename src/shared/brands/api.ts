import { createBaseRequest } from '@/shared/request';

import { createAuthRequest } from '../session';

export const fetchBrandsList = createBaseRequest('GetBrandList');
export const fetchItemsByCodes = createAuthRequest('GetBrandsItemsList');

// Любимые бренды
export const addBrandToFavoriteList = createAuthRequest('AddBrandsToFavoriteList');
export const removeBrandFromFavoriteList = createAuthRequest('RemoveBrandsFromFavoriteList');
export const fetchFavoriteBrandsList = createAuthRequest('GetFavoriteBrandsList');
