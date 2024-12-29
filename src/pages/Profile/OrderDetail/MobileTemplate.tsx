import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { useEffect, useState } from 'react';

import { Order, Order_Status } from '@/generated/customer_hub/entities/order.v1';
import { $mappedStrings } from '@/shared/configs';

import { OrderProductCard, DeliveryStatuses, InfoList } from '@/features/orders';

import { usePrevious } from '@/lib/usePrevious';

import { Disclamer, Segments, Space, Typography } from '@/ui/index';

import st from './styles.module.scss';

export function MobileTemplate({ order }: { order: Order }) {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();
  const [tab, setTab] = useState('info');
  const prevTab = usePrevious(tab);
  const [delivery] = order.deliveries;

  useEffect(() => {
    if (prevTab !== tab) {
      window.scrollTo({ behavior: 'smooth', left: 0, top: 0 });
    }
  }, [prevTab, tab]);

  const segmentsOptions = [
    { label: texts.profile.info, value: 'info' },
    {
      label: texts.orderDetails.goods.replace('%@', String(order.deliveries[0]?.items?.length)),
      value: 'products',
    },
  ];

  return (
    <div className={cn(st.mobile, st.content)}>
      <Segments
        name="orders"
        className={st.tabs}
        onChange={it => setTab(it.target.value)}
        value={tab}
        options={segmentsOptions}
      />

      {tab === 'products' ? (
        <Space size="large" stretch direction="vertical">
          {delivery.items.map(order => (
            <OrderProductCard order={order} key={order.itemCode} withLabels />
          ))}
        </Space>
      ) : (
        <Space direction="vertical" size="large">
          <DeliveryStatuses order={order} />

          {order.description && order.orderStatus !== Order_Status.ORDER_STATUS_CANCELED && (
            <Disclamer stretch>
              <Typography.Paragraph className={st.descriptionText}>{order.description}</Typography.Paragraph>
            </Disclamer>
          )}

          <InfoList order={order} />
        </Space>
      )}
    </div>
  );
}
