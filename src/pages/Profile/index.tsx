import { Route } from 'react-router-dom';

import { paths } from '@/constants/paths';

import ContactsPage from './Contacts';
import ProfileInfo from './Info';
import MainPage from './Main';
import OrderDetail from './OrderDetail';
import OrdersPage from './Orders';

export const profileRoutes = (
  <>
    <Route path={paths.profile.main()} element={<MainPage />} />
    <Route path={paths.profile.info()} element={<ProfileInfo />} />
    <Route path={paths.profile.contacts()} element={<ContactsPage />} />
    <Route path={paths.profile.orders()} element={<OrdersPage />} />
    <Route path={paths.profile.orderDetail()} element={<OrderDetail />} />
  </>
);
