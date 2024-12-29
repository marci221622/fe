import { createAuthRequest } from '@/shared/session';

export const addToFavorite = createAuthRequest('AddItemsToFavoriteList');
export const removeFromFavorite = createAuthRequest('RemoveItemsFromFavoriteList');
// Прикол в том что тут n листов
// Пока берем первый
export const fetchFavoritesLists = createAuthRequest('GetCustomerFavoriteLists');
// Список товаров для избранного
export const fetchFavoriteItems = createAuthRequest('GetFavoriteItemsList');
