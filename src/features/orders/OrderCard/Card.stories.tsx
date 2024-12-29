import type { Meta, StoryFn } from '@storybook/react';

import { Order_Status, order_StatusToJSON, order_StatusFromJSON } from '@/generated/customer_hub/entities/order.v1';

import { Space } from '@/ui/Space';

import { createOrderItem, creteOrderDeliveries, createOrder } from '../../../tests/index';

import { OrderCard } from './View';

const meta = {
  title: 'Order/OrderCard',
  component: OrderCard,
  args: {
    maxView: 10,
    smallType: false,
    order: createOrder({
      deliveries: [
        creteOrderDeliveries({
          items: [
            createOrderItem({ title: 'Джинсы' }),
            createOrderItem({ title: 'Сапоги' }),
            createOrderItem({ title: 'Трусы' }),
            createOrderItem({ title: 'Юбка' }),
            createOrderItem({ title: 'Рубашка' }),
            createOrderItem({ title: 'Туфли' }),
          ],
        }),
      ],
    }),
  },
  argTypes: {
    // Хак что бы прокинуть статус, иначе там не серализуется
    // @ts-ignore
    status: {
      options: [
        order_StatusToJSON(Order_Status.ORDER_STATUS_COMPLETED),
        order_StatusToJSON(Order_Status.ORDER_STATUS_CANCELED),
        order_StatusToJSON(Order_Status.ORDER_STATUS_PACKING),
        order_StatusToJSON(Order_Status.ORDER_STATUS_PAID),
        order_StatusToJSON(Order_Status.ORDER_STATUS_SHIPPED),
      ],
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof OrderCard>;

export default meta;

export const Default: StoryFn<typeof OrderCard> = props => {
  return (
    <Space size="large" direction="vertical" stretch>
      {/* @ts-ignore */}
      <OrderCard {...props} order={{ ...props.order, orderStatus: order_StatusFromJSON(props.status) }} />
    </Space>
  );
};

export const AloneCard: StoryFn<typeof OrderCard> = props => {
  const order = createOrder({
    deliveries: [
      creteOrderDeliveries({
        items: [createOrderItem({ title: 'Джинсы' })],
      }),
    ],
  });

  return (
    <Space size="large" direction="vertical" stretch>
      {/* @ts-ignore */}
      <OrderCard {...props} order={{ ...order, orderStatus: order_StatusFromJSON(props.status) }} />
    </Space>
  );
};
