import { Order_Status } from '@/generated/customer_hub/entities/order.v1';
import { OrderLotStatus } from '@/generated/customer_hub/enums/order_lot';

import { clickAndCollectIcons, CloseIcon, DeliveryIcon, PackingIcon, PayedIcon } from '@/ui/assets/icons';

export const orderIcons: Record<Order_Status, React.JSX.Element> = {
  [Order_Status.ORDER_STATUS_PAID]: <PayedIcon />,
  [Order_Status.ORDER_STATUS_PACKING]: <PackingIcon />,
  [Order_Status.ORDER_STATUS_SHIPPED]: <DeliveryIcon />,
  [Order_Status.ORDER_STATUS_COMPLETED]: <clickAndCollectIcons.CompletedIcon />,
  [Order_Status.ORDER_STATUS_CANCELED]: <CloseIcon />,
  [Order_Status.ORDER_STATUS_PACKED]: <clickAndCollectIcons.ReadyIcon />,
  [Order_Status.ORDER_STATUS_CREATED]: <clickAndCollectIcons.CreatedIcon />,
  [Order_Status.UNRECOGNIZED]: <CloseIcon />,
};

export const clickAndColelctOrderIcons: Record<Order_Status, React.JSX.Element> = {
  ...orderIcons,
  [Order_Status.ORDER_STATUS_PACKING]: <clickAndCollectIcons.PackingIcon />,
};

export const orderTitles: Record<Order_Status, string> = {
  [Order_Status.ORDER_STATUS_PAID]: 'Оплачен', // Валидный для обычных заказов = ORDER_STATUS_PAID
  [Order_Status.ORDER_STATUS_PACKING]: 'Комплектуется', // Валидный для обычных заказов = ORDER_STATUS_PACKING (ORDER_STATUS_PACKED приходит из ордерсервиса и мапится до ORDER_STATUS_PACKING )
  [Order_Status.ORDER_STATUS_SHIPPED]: 'В пути', // Валидный для обычных заказов = ORDER_STATUS_SHIPPED
  [Order_Status.ORDER_STATUS_COMPLETED]: 'Доставлен', // Валидный для КиК заказа = ORDER_STATUS_COMPLETED (Выкуплен для [КиК])
  [Order_Status.ORDER_STATUS_CANCELED]: 'Отменен', // Валидный для всех заказов = ORDER_STATUS_CANCELED
  [Order_Status.ORDER_STATUS_PACKED]: 'Готов к выдаче', //  Валидный для КиК заказа = ORDER_STATUS_PACKED [КиК]
  [Order_Status.ORDER_STATUS_CREATED]: 'Создан', // Валидный для для КиК заказа = ORDER_STATUS_CREATED
  [Order_Status.UNRECOGNIZED]: 'Ожидает оплаты', // Не валидный
};

export const ReadableOrderLotStatus = {
  create: (status: OrderLotStatus) => {
    switch (status) {
      case OrderLotStatus.ORDER_LOT_STATUS_RETURNED:
        return 'Возврат';
      case OrderLotStatus.ORDER_LOT_STATUS_NOT_REDEEMED:
        return 'Не выкуплено';
      default:
        return '';
    }
  },
};

export const clickAndCollectOrderTitles: Record<Order_Status, string> = {
  ...orderTitles,
  [Order_Status.ORDER_STATUS_COMPLETED]: 'Выкуплен', // Валидный для КиК заказа = ORDER_STATUS_COMPLETED (Выкуплен для [КиК])
};
