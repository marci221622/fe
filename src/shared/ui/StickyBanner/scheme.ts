import { Place } from '@/generated/customer_hub/enums/place';

import { paths } from '@/constants/paths';

// У нас сылки разного типа
// /men/brand, /women/brand, /brand
// COLLECT_HARDCODE
function createPaths(path: string, code: string) {
  return ['', 'men', 'women'].map(part => ({ path: part ? `/${part}${path}` : path, code }));
}

function createLoyaltyPaths(path: string, type: Place) {
  return ['', 'men', 'women'].map(part => ({ path: part ? `/${part}${path}` : path, type }));
}

export const codesToUrls = [
  { path: paths.home.men(), code: 'main' },
  { path: paths.home.women(), code: 'main' },
  ...createPaths(paths.brandsList(), 'brands'),
  // Свой код поддерживаем
  // eslint-disable-next-line deprecation/deprecation
  ...createPaths(paths.catalog.brand({}), 'itemsList'),
  ...createPaths(paths.catalog.withSlug.brand({}), 'itemsList'),
  ...createPaths(paths.catalog.withSlug.collection({}), 'itemsList'),
  ...createPaths(paths.catalog.withSlug.common({}), 'itemsList'),
  // Свой код поддерживаем
  // eslint-disable-next-line deprecation/deprecation
  ...createPaths(paths.catalog.common.withCollAndMenu({}), 'itemsList'),
  ...createPaths(paths.catalog.search({}), 'itemsList'),
  ...createPaths(paths.categories.collection({}), 'catalog'),
  ...createPaths(paths.categories.root(), 'catalog'),
  { path: paths.basket(), code: 'cart' },
];

export const loyaltyTypesToUrls = [
  { path: paths.home.men(), type: Place.PLACE_MAIN },
  { path: paths.home.women(), type: Place.PLACE_MAIN },
  { path: paths.basket(), type: Place.PLACE_CART },
  { path: paths.product(), type: Place.PLACE_ITEM_DETAILS },
  // Свой код поддерживаем
  // eslint-disable-next-line deprecation/deprecation
  ...createLoyaltyPaths(paths.catalog.brand({}), Place.PLACE_ITEMS_LIST),
  ...createLoyaltyPaths(paths.catalog.withSlug.brand({}), Place.PLACE_ITEMS_LIST),
  ...createLoyaltyPaths(paths.catalog.withSlug.collection({}), Place.PLACE_ITEMS_LIST),
  ...createLoyaltyPaths(paths.catalog.withSlug.common({}), Place.PLACE_ITEMS_LIST),
  // Свой код поддерживаем
  // eslint-disable-next-line deprecation/deprecation
  ...createLoyaltyPaths(paths.catalog.common.withCollAndMenu({}), Place.PLACE_ITEMS_LIST),
  ...createLoyaltyPaths(paths.catalog.search({}), Place.PLACE_ITEMS_LIST),
];
