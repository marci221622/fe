import { Route, Outlet } from 'react-router-dom';

import { createRoutesByGender } from '@/shared/pageRouting';
import { ChatBadge, MainTemplate } from '@/shared/ui';

import { paths } from '@/constants/paths';

import { Footer } from '@/features/footer';
import { Header, MobileNav } from '@/features/header';

import BasketPage from './Basket';
import BrandsListPage from './Brands';
import { catalogRoutes } from './Catalogs';
import { categoriesRoutes } from './Categories';
import { errorRoutes } from './Errors';
import { favoriteRoutes } from './Favorite';
import HomePage from './Home';
import { landingRoutes } from './Landings';
import ProfSeller from './Landings/ProfSeller';
import LastViewedProductsPage from './LastViewedProducts';
import LoginPage from './Login';
import ProductPage from './Product';
import { profileRoutes } from './Profile';
import ThanksPage from './ThanksPage';

export const getRoutes = () => (
  <>
    <Route
      path={paths.main()}
      element={
        <MainTemplate
          header={<Header logoOnly />}
          footer={<Footer />}
          outlet={<Outlet />}
          mobileNav={<MobileNav />}
          chatBadge={<ChatBadge />}
        />
      }
    >
      <Route path={paths.home.women()} element={<HomePage />} />
      <Route path={paths.home.men()} element={<HomePage />} />

      {createRoutesByGender({
        path: paths.brandsList(),
        element: <BrandsListPage />,
      })}

      <Route path={paths.typ({})} element={<ThanksPage />} />
      <Route path={paths.profSeller()} element={<ProfSeller />} />
      {profileRoutes}
      {categoriesRoutes}
      {errorRoutes}
      {landingRoutes}
      {favoriteRoutes}
    </Route>
    <Route
      path={paths.main()}
      element={
        <MainTemplate
          header={<Header needMobileHeader searchable />}
          footer={<Footer />}
          outlet={<Outlet />}
          mobileNav={<MobileNav />}
          chatBadge={<ChatBadge />}
        />
      }
    >
      {catalogRoutes}
    </Route>

    <Route
      path={paths.main()}
      element={
        <MainTemplate
          header={<Header needMobileHeader />}
          footer={<Footer />}
          outlet={<Outlet />}
          mobileNav={<MobileNav />}
          chatBadge={<ChatBadge />}
        />
      }
    >
      <Route path={paths.lastViewedProducts()} element={<LastViewedProductsPage />} />
    </Route>

    <Route
      path={paths.login()}
      element={
        <MainTemplate
          header={<Header isLoginPage logoOnly />}
          footer={<Footer />}
          outlet={<Outlet />}
          mobileNav={<MobileNav />}
          chatBadge={<ChatBadge />}
        />
      }
    >
      <Route path={paths.login()} element={<LoginPage />} />
    </Route>

    <Route
      path={paths.basket()}
      element={
        <MainTemplate
          header={<Header isCartPage />}
          footer={<Footer />}
          outlet={<Outlet />}
          mobileNav={<MobileNav />}
          chatBadge={<ChatBadge desktopOnly />}
        />
      }
    >
      <Route path={paths.basket()} element={<BasketPage />} />
    </Route>

    <Route
      path={paths.main()}
      element={
        <MainTemplate
          needMobileNavGap
          header={<Header needMobileHeader logoOnly />}
          footer={<Footer />}
          outlet={<Outlet />}
          chatBadge={<ChatBadge />}
        />
      }
    >
      <Route path={paths.product()} element={<ProductPage />} />
    </Route>
  </>
);
