import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { OrderStatus } from '@/generated/customer_hub/enums/order_status';
import { useStickyClassnames } from '@/shared/animations';
import { $mappedStrings } from '@/shared/configs';
import { useLinkBuilder } from '@/shared/pageRouting';

import { paths } from '@/constants/paths';

import { ProfileTabs } from '@/features/customer';
import { OrderCard } from '@/features/orders';

import { usePrevious } from '@/lib/usePrevious';

import { Button, Menu, Responsive, Segments, Space, Typography } from '@/ui/index';

import { ArrowRightIcon } from '@/ui/assets/icons';

import { orders } from './model';

import st from './styles.module.scss';

const MAX_ORDER_LEN = 5;
const MAX_ORDER_LEN_NO_SIDEBAR = 7;

const scheme: Record<OrderStatus, string> = {
  [OrderStatus.ACTIVE]: 'active',
  [OrderStatus.FINISHED]: 'finished',
  [OrderStatus.UNRECOGNIZED]: 'notExists',
};

const $initialTab = orders.query.$result.map(orders => {
  if (orders?.orders?.length) {
    const hasActive = orders.orders.some(order => order.status === OrderStatus.ACTIVE);
    const hasFinished = orders.orders.some(order => order.status === OrderStatus.FINISHED);

    if (hasActive) {
      return {
        tab: 'active',
        hasActive,
        hasFinished,
      };
    }

    if (hasFinished) {
      return {
        tab: 'finished',
        hasActive,
        hasFinished,
      };
    }
  }

  return {
    tab: '',
    hasActive: false,
    hasFinished: false,
  };
});

export default function OrdersPage() {
  const { i18n } = useLingui();
  const texts = useUnit($mappedStrings);
  const navigate = useNavigate();
  const builder = useLinkBuilder();
  const ordersResult = useUnit(orders.query.$result);
  const tabs = useUnit($initialTab);

  const classname = useStickyClassnames({});
  const [activeTab, setActiveTab] = useState<string>(tabs.tab);
  const prevTab = usePrevious(activeTab);

  const activeFilterChecked = activeTab === 'active';
  const finishedFilterChecked = activeTab === 'finished';

  const needAllTabs = tabs.hasActive && tabs.hasFinished;

  const ordersToShow = ordersResult?.orders.length
    ? ordersResult.orders.filter(order => activeTab === scheme[order.status])
    : [];

  const handleStatusChanged = (checked: boolean) => (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();

    if (!checked) {
      setActiveTab(e.target.value);
    }
  };

  useEffect(() => {
    if (prevTab !== activeTab) {
      window.scrollTo({ behavior: 'smooth', left: 0, top: 0 });
    }
  }, [activeTab, prevTab]);

  const ordersHeader = (
    <Space stretch className={st.header}>
      <ArrowRightIcon onClick={() => navigate(paths.profile.main())} />
      <Typography.PageTitle className={st.pageTitle}>{texts.orders.title}</Typography.PageTitle>
    </Space>
  );

  if (!ordersResult?.orders.length) {
    return (
      <>
        {ordersHeader}

        <Responsive.Desktop>
          <ProfileTabs />
        </Responsive.Desktop>

        <Space className={st.emptyContent} stretch>
          <Typography.Paragraph center className={st.emptyListTitle}>
            <strong>{texts.orders.emptyList.title}</strong>
          </Typography.Paragraph>

          <Typography.Paragraph center className={cn(st.emptyListText)}>
            {texts.orders.emptyList.text}
          </Typography.Paragraph>

          <Button
            size="XS"
            className={cn(st.catalogAction)}
            onClick={() => navigate(builder(paths.categories.root()))}
            colored
            bold
          >
            {texts.itemDetails.purchasePanel.showCatalog}
          </Button>
        </Space>
      </>
    );
  }

  return (
    <>
      {ordersHeader}

      <Responsive.Desktop>
        <ProfileTabs />

        <div
          className={cn(st.wrapper, {
            [st.notabs]: !needAllTabs,
          })}
        >
          {needAllTabs && (
            <Menu
              className={st.sidebar}
              boxClassname={classname}
              list={[
                {
                  title: texts.orders.selectPanel.active,
                  checked: activeFilterChecked,
                  onChange: handleStatusChanged(activeFilterChecked),
                  value: 'active',
                },
                {
                  title: texts.orders.selectPanel.finished,
                  checked: finishedFilterChecked,
                  onChange: handleStatusChanged(finishedFilterChecked),
                  value: 'finished',
                },
              ]}
            />
          )}

          {ordersToShow.length > 0 && (
            <div className={st.orderList}>
              {ordersToShow.map(order => {
                return (
                  <OrderCard
                    order={order}
                    key={order.code}
                    maxView={needAllTabs ? MAX_ORDER_LEN : MAX_ORDER_LEN_NO_SIDEBAR}
                  />
                );
              })}
            </div>
          )}
        </div>
      </Responsive.Desktop>

      <Responsive.TabletAndBelow>
        {needAllTabs && (
          <Segments
            name="orders"
            className={st.tabs}
            onChange={it => setActiveTab(it.target.value)}
            value={activeTab}
            options={[
              { label: texts.orders.selectPanel.active, value: 'active' },
              { label: texts.orders.selectPanel.finished, value: 'finished' },
            ]}
          />
        )}

        {ordersToShow.length > 0 && (
          <div className={st.orderList}>
            {ordersToShow.map(order => (
              <OrderCard order={order} key={order.code} />
            ))}
          </div>
        )}
      </Responsive.TabletAndBelow>
    </>
  );
}
