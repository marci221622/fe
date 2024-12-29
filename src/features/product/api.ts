import { createAuthRequest } from '@/shared/session';

export const fetchProductByCode = createAuthRequest('GetItemByCode');
export const fetchItemsByCodes = createAuthRequest('GetItemsByCodes');
