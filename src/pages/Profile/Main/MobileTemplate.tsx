import { useLingui } from '@lingui/react';
import loadable from '@loadable/component';
import { useGate, useUnit } from 'effector-react';

import { $mappedStrings, $profilePageWidgetsOptions } from '@/shared/configs';
import { $isAuthorized, logout } from '@/shared/session';

import { paths } from '@/constants/paths';

import { AuthFlow, IfGuest } from '@/features/auth';
import { widgetOrders, OrdersGate } from '@/features/customer';
import { useLastFavoriteLink } from '@/features/favorites';
import { OrderCard } from '@/features/orders';

import { useViewport } from '@/lib/hooks';
import { RemoteBoundary } from '@/lib/RemoteBoundary';

import { Button, List, Space } from '@/ui/index';

import { BasketIconV2, FaqIcon, HeartIcon, ProfileIcon, StarIcon } from '@/ui/assets/icons';

import st from './styles.module.scss';

const CustomerLastViewedWidget = loadable(() => import('@/features/customer/widgets/LastViewedWidget.mobile'), {
  ssr: false,
});

const CustomerNovetlyWidget = loadable(() => import('@/features/customer/widgets/NovetlyByBrands/Mobile'), {
  ssr: false,
});

export function MobileTemplate() {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();
  const { isDesktop, isTabletAndBelow } = useViewport();
  const isAuth = useUnit($isAuthorized);
  const ordersResult = useUnit(widgetOrders.query.$result);
  const onLogout = useUnit(logout);
  const options = useUnit($profilePageWidgetsOptions);

  const widgets = [
    {
      widget: (
        <RemoteBoundary key="viewedItems">
          <CustomerLastViewedWidget />
        </RemoteBoundary>
      ),
      position: options.orders.viewedItems?.position ?? 100,
    },
    {
      widget: (
        <RemoteBoundary key="favoriteBrandsNoveltyItems">
          <CustomerNovetlyWidget title={options.novetlyFavoriteBrandsTitle} />
        </RemoteBoundary>
      ),
      position: options.orders.favoriteBrandsNoveltyItems?.position ?? 100,
    },
  ]
    .sort((x, y) => x.position - y.position)
    .map(it => it.widget);

  const favoritePath = useLastFavoriteLink();

  useGate(OrdersGate, { isDesktop, isTabletAndBelow });

  return (
    <>
      <IfGuest>
        <Space stretch className={st.authForm}>
          <AuthFlow direct />
        </Space>
      </IfGuest>

      {!!ordersResult?.orders?.length && (
        <Space stretch className={st.orders}>
          {ordersResult?.orders?.map(order => (
            <OrderCard order={order} key={order.code} />
          ))}
        </Space>
      )}

      {isAuth ? (
        <List
          items={[
            {
              to: paths.profile.contacts(),
              label: texts.profile.myData,
              icon: <ProfileIcon />,
            },
            {
              to: paths.profile.orders(),
              label: texts.profile.myOrders,
              icon: <BasketIconV2 color="currentColor" />,
            },
            {
              to: paths.favorites.brands(),
              label: texts.brandsTab.favoriteBrands,
              icon: <HeartIcon />,
            },
            {
              to: favoritePath,
              label: texts.tabs.favorites,
              icon: <StarIcon />,
            },
            {
              to: paths.profile.info(),
              label: texts.profile.info,
              icon: <FaqIcon />,
            },
          ]}
          className={st.list}
        />
      ) : (
        <List
          items={[
            {
              to: paths.profile.info(),
              label: texts.profile.info,
              icon: <FaqIcon />,
            },
          ]}
          className={st.list}
        />
      )}

      {widgets.length > 0 && <div className={st.widgets}>{widgets}</div>}

      {isAuth && (
        <Space stretch className={st.logoutBtn} onClick={onLogout}>
          <Button reverse size="L" stretch>
            {texts.profile.personalInfo.logout}
          </Button>
        </Space>
      )}
    </>
  );
}
