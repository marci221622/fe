import { useLingui } from '@lingui/react';
import { useUnit } from 'effector-react';
import { useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';

import { SlugType } from '@/generated/customer_hub/entities/slug.v1';
import { Place } from '@/generated/customer_hub/enums/place';
import { getDYSelector } from '@/shared/analytics';
import { OnlyFullVariant } from '@/shared/configs';
import { LoyaltyBody } from '@/shared/ui/LoyaltyBanners';
import { useLoyalty } from '@/shared/ui/StickyBanner';

import {
  CatalogContent,
  CatalogSidebarWrapper,
  ContentWithFiltersWrapper,
  MobileCategoriesList,
  Filters,
  FiltersWrapper,
  ProductCounter,
  ProductList,
  Sidebar,
  useLoadMore,
  CatalogDescription,
  LoadMoreSpinner,
} from '@/features/catalog';

import { BreadcrumbsPane, BreadcrumbsUI, Responsive } from '@/ui/index';

import Error404 from '../../Errors/error404';

import { FavoriteStar } from './FavoriteStar';
import { FavoriteStarMobile } from './FavoriteStarMobile';
import { brandCatalog, seo, breadcrumbs } from './model';
import { CatalogTitle } from './Title';

import st from './styles.module.scss';

export default function BrandCatalogPage() {
  const { i18n } = useLingui();
  const params = useParams();

  const breadcrumbsList = useUnit(breadcrumbs.$breadcrumbs);
  const onLoadMore = useUnit(brandCatalog.loadMore);

  const {
    products,
    nextPage,
    counter,
    hasSidebar,
    title,
    header,
    catalogNotFound,
    hasFilters,
    rowScheme,
    collectionCodes,
  } = useUnit(brandCatalog);

  const moreControls = useLoadMore({ nextPage, onLoadMore });
  const loyalty = useLoyalty({ place: Place.PLACE_ITEMS_LIST, needUpdateShared: true, collectionCodes });

  // Для обратной совместимости
  const brandCode = params.brandCode;
  const slug = useMemo(() => ({ type: SlugType.SLUG_TYPE_BRAND, slug: params.slug ?? '' }), [params.slug]);

  if (catalogNotFound) {
    return <Error404 />;
  }

  return (
    <>
      <div className={st.BrandCatalogPage} {...getDYSelector({ type: 'pageType', page: 'brandOrEmptyBrand' })}>
        <seo.Seo />
        <breadcrumbs.ui.Seo />

        <CatalogTitle header={header} title={title} loyalty={loyalty?.loyalty} />

        <OnlyFullVariant>
          <Responsive.Desktop>{header?.brand && <FavoriteStar brand={header?.brand} />}</Responsive.Desktop>
          <Responsive.TabletAndBelow>
            {header?.brand && <FavoriteStarMobile brand={header?.brand} />}
          </Responsive.TabletAndBelow>
        </OnlyFullVariant>

        <CatalogDescription />

        <CatalogContent
          isEmpty={products.length === 0}
          nosidebar={!hasSidebar}
          pageType="brands"
          hasMobileFilters={hasFilters.mobile}
          hasDesktopFilters={hasFilters.desktop}
        >
          <CatalogSidebarWrapper>
            <Sidebar filters={brandCatalog.$filters} />
          </CatalogSidebarWrapper>

          <FiltersWrapper>
            <Filters
              collection={header?.collection?.code}
              slug={!brandCode ? slug : undefined}
              filters={brandCatalog.$filters}
              baseCounter={counter}
              categoriesList={
                <MobileCategoriesList
                  $categories={brandCatalog.$mobileCategoryFilters}
                  $scheme={brandCatalog.$filtersScheme}
                />
              }
            />
          </FiltersWrapper>

          <Responsive.TabletAndBelow className="loyaltyMobile">
            <LoyaltyBody loyalty={loyalty?.loyalty} place="catalog" />
          </Responsive.TabletAndBelow>

          <ContentWithFiltersWrapper>
            <ProductCounter counter={counter} />

            <InfiniteScroll
              dataLength={products.length}
              next={moreControls.onLoadMore}
              hasMore={moreControls.hasMoreForInfinity}
              loader={<LoadMoreSpinner />}
            >
              <ProductList products={products} pageType="BrandPage" list={title} rowScheme={rowScheme} />
            </InfiniteScroll>

            {moreControls.loadMoreBtn}
          </ContentWithFiltersWrapper>
        </CatalogContent>
      </div>

      <BreadcrumbsPane compact nosticky>
        <BreadcrumbsUI breadcrumbs={breadcrumbsList} />
      </BreadcrumbsPane>
    </>
  );
}
