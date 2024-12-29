import { Order } from '@/generated/customer_hub/entities/order.v1';

export const isClickCollectOrder = (order: Order) => order.source === 'click_and_collect';
