import { useLingui } from '@lingui/react';
import cn from 'classnames';

import { Order, Order_Status } from '@/generated/customer_hub/entities/order.v1';
import { useStickyClassnames } from '@/shared/animations';

import { OrderProductCard, DeliveryStatuses, InfoList } from '@/features/orders';

import { Disclamer, Space, Typography } from '@/ui/index';

import st from './styles.module.scss';

export function DesktopTemplate({ order }: { order: Order }) {
  const { i18n } = useLingui();
  const classnames = useStickyClassnames({
    stuckedCn: st.stucked,
  });
  const [delivery] = order.deliveries;

  return (
    <div className={cn(st.content)}>
      <Space size="large" stretch direction="vertical">
        {delivery.items.map(order => (
          <OrderProductCard order={order} key={order.itemCode} />
        ))}
      </Space>

      <div className={st.summary}>
        <div className={cn(st.form, classnames)}>
          <DeliveryStatuses order={order} />

          {order.description && order.orderStatus !== Order_Status.ORDER_STATUS_CANCELED && (
            <Disclamer stretch>
              <Typography.Paragraph className={st.descriptionText}>{order.description}</Typography.Paragraph>
            </Disclamer>
          )}

          <InfoList order={order} />
        </div>
      </div>
    </div>
  );
}
