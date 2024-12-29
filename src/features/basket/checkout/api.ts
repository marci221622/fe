import { createBasketApi } from '../createApi';

export const findCheckout = createBasketApi({ method: 'FindCheckout' });
export const addressSuggests = createBasketApi({ method: 'SuggestAddress' });
export const selectInterval = createBasketApi({ method: 'SelectDeliveryInterval' });
export const setAddress = createBasketApi({ method: 'CalculateDelivery' });
export const updateUser = createBasketApi({ method: 'SetDeliveryRecipient' });

export const getSavedCards = createBasketApi({ method: 'ListSavedCards' });

export const switchCheckoutType = createBasketApi({ method: 'SwitchCheckoutType' });
