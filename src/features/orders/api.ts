import { createAuthRequest } from '@/shared/session';

export const fetchOrderDetails = createAuthRequest('GetCustomerOrder');
export const fetchCustomerOrders = createAuthRequest('GetCustomerOrders');
