import cn from 'classnames';
import { Fragment } from 'react';

import { Order_Status, Order } from '@/generated/customer_hub/entities/order.v1';

import { isClickCollectOrder } from '@/lib/orders';

import { orderTitles, orderIcons, clickAndCollectOrderTitles, clickAndColelctOrderIcons } from '../statuses';

import st from './styles.module.scss';

const noNeedToShow = [Order_Status.ORDER_STATUS_COMPLETED, Order_Status.ORDER_STATUS_CANCELED];

const statuses = (isClickAndCollect: boolean) => [
  {
    status: isClickAndCollect ? Order_Status.ORDER_STATUS_CREATED : Order_Status.ORDER_STATUS_PAID,
    priority: 0,
  },
  {
    status: Order_Status.ORDER_STATUS_PACKING,
    priority: 1,
  },
  {
    status: isClickAndCollect ? Order_Status.ORDER_STATUS_PACKED : Order_Status.ORDER_STATUS_SHIPPED,
    priority: 2,
  },
  {
    status: Order_Status.ORDER_STATUS_COMPLETED,
    priority: 3,
  },
];

export function DeliveryStatuses({ order }: { order: Order }) {
  const isClickAndCollect = isClickCollectOrder(order);
  const statusesList = statuses(isClickAndCollect);
  const currentStatusPriority = statusesList.find(it => it.status === order.orderStatus);
  const priority = currentStatusPriority?.priority ?? -1;
  const icons = isClickAndCollect ? clickAndColelctOrderIcons : orderIcons;
  const titles = isClickAndCollect ? clickAndCollectOrderTitles : orderTitles;

  if (noNeedToShow.includes(order.orderStatus)) {
    return null;
  }

  return (
    <div className={st.delivery}>
      {statusesList.map((it, idx) => {
        return (
          <Fragment key={idx}>
            <div className={cn(st.block)}>
              <div
                className={cn(st.icon, {
                  [st.passed]: idx <= priority,
                })}
              >
                {icons[it.status] || null}
              </div>
              <span className={cn(st.title, { [st.passed]: idx <= priority })}>{titles[it.status]}</span>
            </div>

            {idx < statusesList.length - 1 && (
              <div
                className={cn(st.line, {
                  [st.passed]: idx + 1 <= priority,
                })}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
