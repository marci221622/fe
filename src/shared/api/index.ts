import { createBaseRequest } from '@/shared/request';
import { createAuthRequest } from '@/shared/session';

export const sharedFetchItemsByCodes = createAuthRequest('GetItemsByCodes');
export const getLoyalty = createBaseRequest('GetLoyalty');
