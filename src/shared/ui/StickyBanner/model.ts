import { createEvent, createStore } from 'effector';

import { Loyalty } from '@/generated/customer_hub/entities/loyalty.v1';
import { Place } from '@/generated/customer_hub/enums/place';

import { createField } from '@/lib/createField';

export type StickyLoyalty = Record<Place, Loyalty | null>;

export const visibleField = createField(false);

export const updateSharedLoyalty = createEvent<{ place: Place; loyalty?: Loyalty | null }>();

// С каждого экрана можно пушить информацию по лояльности
// Что бы показать в стики банере
export const $sharedLoyalty = createStore<StickyLoyalty>({
  [Place.PLACE_CART]: null,
  [Place.PLACE_ITEM_DETAILS]: null,
  [Place.PLACE_MAIN]: null,
  [Place.PLACE_ITEMS_LIST]: null,
  [Place.PLACE_ADD_TO_CART_RESULTS]: null,
  [Place.PLACE_CHECKOUT]: null,
  [Place.PLACE_UNSPECIFIED]: null,
  [Place.UNRECOGNIZED]: null,
});

$sharedLoyalty.on(updateSharedLoyalty, (prev, { place, loyalty }) => ({ ...prev, [place]: loyalty }));
