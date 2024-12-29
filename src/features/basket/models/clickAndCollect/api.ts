import { createAuthRequest } from '@/shared/session';

import { createBasketApi } from '../../createApi';

export const oneClickAddToCart = createAuthRequest('AddCartItems');
export const oneClickFindCheckout = createBasketApi({ method: 'FindCheckout' });
export const calculateDeliveryClickAndCollect = createBasketApi({ method: 'CalculateDeliveryClickAndCollect' });
export const clickAndCollectConfirmation = createBasketApi({ method: 'ProcessCheckout' });
