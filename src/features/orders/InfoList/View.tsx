import { useUnit } from 'effector-react';

import { Order_Status, Order } from '@/generated/customer_hub/entities/order.v1';
import { $mappedStrings } from '@/shared/configs';
import { DescriptionModals, useDescriptionModals } from '@/shared/description-modals';

import { formatWithRULocale } from '@/lib/format';
import { isClickCollectOrder } from '@/lib/orders';
import { formatPhone } from '@/lib/string';
import { readDateSafely } from '@/lib/transformers';

import { List, ListItems } from '@/ui/index';

import { Checked, CloseIconStroked, DeliveryIcon, PayedIcon, ProfileIcon } from '@/ui/assets/icons';

import st from './styles.module.scss';

export function InfoList({ order }: { order: Order }) {
  const texts = useUnit($mappedStrings);
  const deliveredDate = formatWithRULocale({
    date: readDateSafely(order.closedAt) ?? 0,
    template: 'd MMMM',
  });
  const rooms = useDescriptionModals();

  const isClickAndCollect = isClickCollectOrder(order);

  const recipient = [order.customerFullName ?? '', formatPhone(order.customerPhone)].filter(Boolean);

  return (
    <List
      className={st.list}
      items={
        [
          order.orderStatus === Order_Status.ORDER_STATUS_CANCELED && {
            label: texts.orderDetails.info.deliveryProgress.cell.subtitle.status,
            icon: <CloseIconStroked />,
            subtitle: texts.orderDetails.info.deliveryProgress.cell.subtitle.cancelled,
          },
          order.orderStatus === Order_Status.ORDER_STATUS_COMPLETED && {
            label: texts.orderDetails.info.deliveryProgress.cell.subtitle.status,
            icon: <Checked />,
            subtitle: `${texts.orderDetails.info.deliveryProgress.cell.subtitle.delivered} ${deliveredDate}`,
          },
          {
            label: texts.orderDetails.info.deliveryType.delivery,
            icon: <DeliveryIcon />,
            subtitle: order.deliveries[0]?.deliveryAddress,
            onMoreAction: isClickAndCollect ? () => rooms.setCurrentModal(DescriptionModals.Room) : undefined,
          },
          {
            label: texts.orderDetails.info.recipient,
            icon: <ProfileIcon />,
            subtitle: recipient,
          },
          // TODO: хардкод
          {
            label: texts.orderDetails.info.paymentMethod.title,
            icon: <PayedIcon />,
            subtitle: !isClickAndCollect
              ? texts.orderDetails.info.paymentMethod.cardOnline
              : texts.orderDetails.info.paymentMethod.onClickAndCollectReceive,
          },
        ].filter(Boolean) as ListItems
      }
    />
  );
}
