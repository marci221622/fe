import { Route } from 'react-router-dom';

import { paths } from '@/constants/paths';

import BrandsList from './BrandsList';
import FaqPage from './Faq';
import FaqProfSellerPage from './FaqProfSeller';
import FaqSellerPage from './FaqSeller';
import HowToPhoto from './HowToPhoto';
import LandingPage from './Landing';
import PrivacyPolicyPage from './PrivacyPolicy';
import SellerPage from './Seller';
import TermsPage from './Terms';

export const landingRoutes = (
  <>
    <Route path={paths.landings.privacyPolicy()} element={<PrivacyPolicyPage />} />
    <Route path={paths.landings.faq()} element={<FaqPage />} />
    <Route path={paths.landings.faqSeller()} element={<FaqSellerPage />} />
    <Route path={paths.landings.faqProfSeller()} element={<FaqProfSellerPage />} />
    <Route path={paths.landings.terms()} element={<TermsPage />} />
    <Route path={paths.landings.landing()} element={<LandingPage />} />
    <Route path={paths.landings.brandList()} element={<BrandsList />} />
    <Route path={paths.landings.seller()} element={<SellerPage />} />
    <Route path={paths.landings.howToPhoto()} element={<HowToPhoto />} />
  </>
);
