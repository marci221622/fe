import { useGate, useUnit } from 'effector-react';
import { useNavigate } from 'react-router-dom';

import { useLinkBuilder } from '@/shared/pageRouting';

import { paths } from '@/constants/paths';

import { OrderCard } from '@/features/orders';

import { useViewport } from '@/lib/hooks';

import { Button, OverlayLoader, Space, Typography } from '@/ui/index';

import { OrdersIcon } from '@/ui/assets/icons';

import { OrdersGate, widgetOrders } from '../models';

import { WidgetBlock } from './View';

import st from './styles.module.scss';

export function OrdersWidget() {
  const navigate = useNavigate();
  const { isDesktop, isTabletAndBelow } = useViewport();
  const builder = useLinkBuilder();
  const { result, pending } = useUnit(widgetOrders.query);

  const orders = result?.orders ?? [];

  useGate(OrdersGate, { isDesktop, isTabletAndBelow });

  return (
    <WidgetBlock icon={<OrdersIcon />} headerTitle="Мои заказы" navLink={paths.profile.orders()}>
      <OverlayLoader isLoading={pending}>
        {orders.length > 0 ? (
          <OrderCard order={orders[0]} maxView={4} smallType />
        ) : (
          <Space className={st.orders} stretch direction="vertical" size="large">
            <Typography.Paragraph>Активных заказов пока нет</Typography.Paragraph>
            <Button onClick={() => navigate(builder(paths.categories.root()))}>Перейти в каталог</Button>
          </Space>
        )}
      </OverlayLoader>
    </WidgetBlock>
  );
}
