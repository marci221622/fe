import { Money } from '@/generated/common/money.v1';

// Фильтр по табам
export enum FavoriteTabs {
  inStock = '1',
  outOfStock = '2',
}

export type ToggleFavoritesParams = {
  id: string;
  offerId?: string;
  size?: string;
  isActive: boolean;
  listid?: string;
  price?: Money;
  title: string;
  place: 'wishList' | 'Catalog' | 'ProductPage' | 'cart';
};
