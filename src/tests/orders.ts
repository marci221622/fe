import { Image } from '@/generated/common/image.v1';
import { Money } from '@/generated/common/money.v1';
import { Brand } from '@/generated/customer_hub/entities/brand.v1';
import { ServiceItem } from '@/generated/customer_hub/entities/delivery.v1';
import { Order, Order_Delivery, Order_Item, Order_Status } from '@/generated/customer_hub/entities/order.v1';
import { Size } from '@/generated/customer_hub/entities/size.v1';
import { OrderStatus } from '@/generated/customer_hub/enums/order_status';

export function createOrderItem(order: Partial<Order_Item>): Order_Item {
  return Order_Item.create({
    title: 'Рубашка из вискозы',
    brand: Brand.create({
      title: 'Balenciaga',
      id: '1',
      code: 'code',
    }),
    size: Size.create({
      russianSize: '50',
      russianLabel: 'RU',
      vendorSize: '10',
      vendorLabel: 'FR',
    }),
    image: Image.create({ src: 'https://placehold.co/524x800', width: 524, height: 800 }),
    price: Money.create({ units: '100000', currencyCode: 'RUB' }),
    ...order,
  });
}

export function creteOrderDeliveries(delivery: Partial<Order_Delivery>): Order_Delivery {
  return {
    code: 'code',
    operator: 'operator',
    deliveryDate: new Date(),
    deliveryInterval: {
      start: { hours: 10, minutes: 10, seconds: 10, nanos: 1 },
      end: { hours: 20, minutes: 20, seconds: 20, nanos: 1 },
    },
    serviceItem: ServiceItem.fromPartial({}),
    serviceItems: [ServiceItem.fromPartial({})],
    items: [createOrderItem({})],
    description: 'sescription',
    deliveryAddress: 'Большая марфинская 4к1',
    ...delivery,
  };
}

export function createOrder(order: Partial<Order>): Order {
  return {
    code: 'code',
    status: OrderStatus.ACTIVE,
    closedAt: undefined,
    updatedAt: new Date(),
    createdAt: new Date(),
    price: Money.create({ units: '100000', currencyCode: 'RUB' }),
    finalPrice: Money.create({ units: '100000', currencyCode: 'RUB' }),
    deliveries: [creteOrderDeliveries({})] as Order_Delivery[],
    description:
      'Ваш заказ будет доставлен 20 апреля с 09:00 до 18:00. В день доставки курьер свяжется с вами для уточнения удобного времени',
    customerFullName: 'Dmitry',
    customerPhone: '+79999999999',
    orderStatus: Order_Status.ORDER_STATUS_SHIPPED,
    source: 'source',
    availableActions: [],
    ...order,
  };
}
