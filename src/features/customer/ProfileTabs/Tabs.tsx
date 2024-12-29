import { useUnit } from 'effector-react';
import { useLocation } from 'react-router-dom';

import { $mappedStrings } from '@/shared/configs';
import { logout } from '@/shared/session';

import { paths } from '@/constants/paths';

import { Button, Space, TabLinks } from '@/ui/index';

import { useClickedLinkAnalytics } from '../useClickedAnalytics';

import st from './styles.module.scss';

export function ProfileTabs() {
  const text = useUnit($mappedStrings);
  const { pathname } = useLocation();
  const onLogout = useUnit(logout);
  const clickHandler = useClickedLinkAnalytics({ place: 'profile' });

  return (
    <Space stretch className={st.ProfileTabs}>
      <TabLinks
        classname={st.links}
        active={pathname}
        onClick={clickHandler}
        tabs={[
          {
            label: text.tabs.main,
            to: paths.profile.main(),
          },
          {
            label: text.profile.myData,
            to: paths.profile.contacts(),
          },
          {
            label: text.profile.myOrders,
            to: paths.profile.orders(),
          },
          {
            label: text.brandsTab.favoriteBrands,
            to: paths.favorites.brands(),
          },
        ]}
      />

      <Button size="XS" outline onClick={onLogout} className={st.logoutAction}>
        {text.profile.personalInfo.logout}
      </Button>
    </Space>
  );
}
