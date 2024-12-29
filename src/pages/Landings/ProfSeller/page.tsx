import { Faq } from '@/features/landings';

import { Responsive } from '@/ui/Responsive';

import { BottomBanner } from './Banners/bottomBanner';
import { PartnerBanner } from './Banners/partnerBanner';
import { HowDoesItWork } from './HowDoesItWork';
import { HowDoesItWorkMobile } from './HowDoesItWorkMobile';
import { StartToSell } from './StartToSell';
import { TopCategoriesAndBrands } from './TopCategoriesAndBrands';
import { TopCategoriesAndBrandsMobile } from './TopCategoriesAndBrandsMobile';

import st from './styles.module.scss';

export default function ProfSellerPage() {
  return (
    <div className={st.wrapper}>
      <PartnerBanner />
      <StartToSell />
      <Responsive.Desktop>
        <HowDoesItWork />
        <TopCategoriesAndBrands />
      </Responsive.Desktop>

      <Responsive.TabletAndBelow>
        <HowDoesItWorkMobile />
        <TopCategoriesAndBrandsMobile />
      </Responsive.TabletAndBelow>

      <div className={st.faqLayout}>
        <Faq
          onlyTab="profsell"
          hideListTitles
          dividerClassName={st.dividerClassName}
          answerClassName={st.answerClassName}
        />
      </div>
      <BottomBanner />
    </div>
  );
}
