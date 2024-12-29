import { sample } from 'effector';
import { createGate } from 'effector-react';

import { OrderStatus } from '@/generated/customer_hub/enums/order_status';
import { $isAuthorized } from '@/shared/session';

import { logged } from '@/features/auth';
import { createCustomerOrders } from '@/features/orders';

const ordersParams = {
  pagination: undefined,
  statuses: [OrderStatus.ACTIVE],
  sort: undefined,
};

export const OrdersGate = createGate<{ isDesktop: boolean; isTabletAndBelow: boolean }>();

export const widgetOrders = createCustomerOrders();

sample({
  source: $isAuthorized,
  clock: OrdersGate.state,
  fn: () => ordersParams,
  filter: (isAuthorized, state) =>
    isAuthorized && ((state.isDesktop && !state.isTabletAndBelow) || (!state.isDesktop && state.isTabletAndBelow)),
  target: widgetOrders.query.start,
});

sample({
  clock: OrdersGate.close,
  target: widgetOrders.query.reset,
});

sample({
  clock: logged,
  filter: OrdersGate.status,
  fn: () => ordersParams,
  target: widgetOrders.query.start,
});
