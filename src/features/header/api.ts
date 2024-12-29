import { createBaseRequest } from '@/shared/request';

export const fetchCatalog = createBaseRequest('GetMenuTree');
export const fetchSuggests = createBaseRequest('Suggest');
