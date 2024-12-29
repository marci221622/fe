import { useLingui } from '@lingui/react';
import loadable from '@loadable/component';
import { useUnit } from 'effector-react';

import { $mappedStrings, $profilePageWidgetsOptions } from '@/shared/configs';

import { AuthFlow, IfGuest, IfAuth } from '@/features/auth';
import {
  $customer,
  $customerContacts,
  ProfileTabs,
  InfoWidget,
  OrdersWidget,
  FavoritesWidget,
} from '@/features/customer';

import { RemoteBoundary } from '@/lib/RemoteBoundary';

import { Space, Typography } from '@/ui/index';

import st from './styles.module.scss';

const CustomerLastViewedWidget = loadable(() => import('@/features/customer/widgets/LastViewedWidget.desktop'), {
  ssr: false,
});

const CustomerNovetlyWidget = loadable(() => import('@/features/customer/widgets/NovetlyByBrands/Desktop'), {
  ssr: false,
});

export function DesktopTemplate() {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();
  const { customer, contacts, options } = useUnit({
    customer: $customer,
    contacts: $customerContacts,
    options: $profilePageWidgetsOptions,
  });

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

  return (
    <>
      <IfGuest>
        <>
          <Typography.PageTitle>{texts.login.phoneInput.title}</Typography.PageTitle>

          <Space align="center" stretch direction="vertical">
            <AuthFlow confirmationAsModal />
          </Space>
        </>
      </IfGuest>

      <IfAuth>
        <>
          <Typography.PageTitle className={st.pageTitle}>{texts.tabs.profile}</Typography.PageTitle>
          <ProfileTabs />

          <Space size="large" stretch className={st.container}>
            <InfoWidget customer={customer} phone={contacts.phone?.value ?? ''} mail={contacts.mail?.value ?? ''} />
            <OrdersWidget />
            <FavoritesWidget />
          </Space>

          {widgets}
        </>
      </IfAuth>
    </>
  );
}
