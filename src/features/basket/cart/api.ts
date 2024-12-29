import { createAuthRequest } from '@/shared/session';

import { createBasketApi } from '../createApi';

export const fetchCart = createAuthRequest('FindCheckout');
export const fetchOrderByCode = createAuthRequest('FindCheckout');
export const addToCart = createAuthRequest('AddCartItems');
export const removeFromCart = createBasketApi({ method: 'RemoveCartItems' });
export const selectCartItem = createBasketApi({ method: 'SelectCartItems' });
export const unselectCartItem = createBasketApi({ method: 'UnselectCartItems' });
export const applyPromocode = createBasketApi({ method: 'CalculateDiscounts' });
