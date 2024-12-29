import { useLingui } from '@lingui/react';
import loadable from '@loadable/component';
import { useUnit } from 'effector-react';

import { Place } from '@/generated/customer_hub/enums/place';
import { CompanyAdvantages } from '@/shared/Advantages';
import { getDYSelector } from '@/shared/analytics';
import { headerSearchField } from '@/shared/animations';
import { $mappedStrings } from '@/shared/configs';
import { productsAnalytics } from '@/shared/products';
import { baseSeo } from '@/shared/Seo';
import { GenderActions } from '@/shared/ui';
import { LoyaltyBody } from '@/shared/ui/LoyaltyBanners';
import { useLoyalty } from '@/shared/ui/StickyBanner';

import { suggestField } from '@/features/header';
import { Banner, Categories, HomeResponseAsList, Items } from '@/features/home';

import { RemoteBoundary } from '@/lib/RemoteBoundary';

import { Responsive } from '@/ui/index';

import { $homeList } from './model';

import st from './styles.module.scss';

const LastViewedWidget = loadable(
  () => import(/* webpackChunkName: "LastViewedWidget" */ '@/features/home/widgets/LastViewedWidget'),
  {
    ssr: false,
  },
);

const ProductFromBrandsWidget = loadable(
  () => import(/* webpackChunkName: "ProductFromBrandsWidget" */ '@/features/home/widgets/NovetlyByBrands'),
  {
    ssr: false,
  },
);

const FavoriteBrands = loadable(
  () => import(/* webpackChunkName: "FavoriteBrands" */ '@/features/home/widgets/FavoriteBrands'),
  {
    ssr: false,
  },
);

function HomeContentByPlatform({ homeList, device }: { homeList: HomeResponseAsList; device: Device }) {
  const onProductClicked = useUnit(productsAnalytics.productClicked);

  return (
    <>
      {homeList.map(it => {
        switch (it.type) {
          case 'ourAdvantages':
            return <CompanyAdvantages className={st.advantages} titleColored />;
          case 'banner':
            return <Banner banner={it.payload} device={device} key={`${it.type}/${it.position}`} />;

          case 'category':
            return <Categories key={`${it.type}/${it.position}`} category={it.payload} device={device} />;

          case 'viewedItems':
            return (
              <RemoteBoundary key="viewedItems">
                <LastViewedWidget device={device} />
              </RemoteBoundary>
            );

          case 'favoriteBrandsNoveltiesItems':
            return (
              <RemoteBoundary key="favoriteBrandsNoveltiesItems">
                <ProductFromBrandsWidget device={device} />
              </RemoteBoundary>
            );

          case 'product':
            return (
              <Items
                key={`${it.type}/${it.position}`}
                item={it.payload}
                verticalPriceAlignment={it.verticalPriceAlignment}
                device={device}
                onProductClicked={item => onProductClicked({ item, page: 'Main', list: it.payload.title })}
              />
            );

          case 'favoriteBrands':
            return (
              <RemoteBoundary key="favoriteBrands">
                <FavoriteBrands block={it.payload} key={`${it.type}/${it.position}`} device={device} />
              </RemoteBoundary>
            );

          default:
            return null;
        }
      })}
    </>
  );
}

export default function HomePage() {
  const { i18n } = useLingui();
  const homeList = useUnit($homeList);
  const searchOpened = useUnit(headerSearchField);
  const field = useUnit(suggestField);
  const texts = useUnit($mappedStrings);
  const loyalty = useLoyalty({ place: Place.PLACE_MAIN, needUpdateShared: true });

  return (
    <section {...getDYSelector({ type: 'pageType', page: 'homePage' })}>
      <baseSeo.Seo />
      <GenderActions
        showStab
        withNavigate
        placeholder={texts.searchBar.placeholder.catalog}
        largeBottomMargin={false}
        wrapperClassname={st.genders}
        searchOpened={searchOpened.value}
        onStubClick={() => searchOpened.onChange(true)}
        onCloseClick={() => searchOpened.onChange(false)}
        value={field.value}
        onChange={e => field.onChange(e.target.value)}
      />

      <LoyaltyBody place="home" loyalty={loyalty?.loyalty} />

      <Responsive.Desktop className={st.contentWrapper}>
        <HomeContentByPlatform homeList={homeList.desktop} device="desktop" />
      </Responsive.Desktop>

      <Responsive.TabletAndBelow className={st.contentWrapper}>
        <HomeContentByPlatform homeList={homeList.mobile} device="mobile" />
      </Responsive.TabletAndBelow>
    </section>
  );
}
