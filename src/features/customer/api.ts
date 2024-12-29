import { createAuthRequest } from '@/shared/session';

export const fetchCustomer = createAuthRequest('GetCustomerProfile');
export const updateCustomer = createAuthRequest('UpdateUser');
