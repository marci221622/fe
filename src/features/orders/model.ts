import { sample } from 'effector';

import { Order } from '@/generated/customer_hub/entities/order.v1';
import { GetCustomerOrdersRequest } from '@/generated/customer_hub/methods/order/get_customer_orders.v1';
import { $isAuthorized, wasLogouted } from '@/shared/session';

import { createQuery, FxParams } from '@/lib/createQuery';

import { fetchCustomerOrders } from './api';

type Result = {
  orders: Order[];
};

type Params = FxParams<Omit<GetCustomerOrdersRequest, 'sessionData'>>;

export function createCustomerOrders() {
  const query = createQuery<Omit<GetCustomerOrdersRequest, 'sessionData'>, Result>({
    $isAuthorized,
    initialData: {
      orders: [],
    } as Result,
    handler: async ([{ sort, pagination, statuses }, ctrl]: Params) =>
      fetchCustomerOrders({
        body: { sort, pagination, statuses },
        signal: ctrl.signal,
      }),
  });

  sample({ clock: wasLogouted, target: query.reset });

  return {
    query,
  };
}
