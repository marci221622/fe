import { useLingui } from '@lingui/react';
import { useUnit } from 'effector-react';
import { useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';

import { SlugType } from '@/generated/customer_hub/entities/slug.v1';
import { Place } from '@/generated/customer_hub/enums/place';
import { LoyaltyBody } from '@/shared/ui/LoyaltyBanners';
import { useLoyalty } from '@/shared/ui/StickyBanner';

import {
  CatalogContent,
  CatalogDescription,
  CatalogSidebarWrapper,
  ContentWithFiltersWrapper,
  Filters,
  FiltersWrapper,
  LoadMoreSpinner,
  MobileCategoriesList,
  PageTitle,
  ProductCounter,
  ProductList,
  Sidebar,
  useLoadMore,
} from '@/features/catalog';

import { BreadcrumbsPane, BreadcrumbsUI, Responsive } from '@/ui/index';

import Error404 from '../../Errors/error404';

import { selCatalog, seo, breadcrumbs } from './model';

export default function SelCatalogPage() {
  const { i18n } = useLingui();
  const params = useParams();
  const breadcrumbsList = useUnit(breadcrumbs.$breadcrumbs);

  const {
    products,
    nextPage,
    counter,
    loadMore,
    title,
    hasSidebar,
    catalogNotFound,
    hasFilters,
    header,
    rowScheme,
    collectionCodes,
  } = useUnit(selCatalog);

  const moreControls = useLoadMore({ nextPage, onLoadMore: loadMore });

  const loyalty = useLoyalty({ place: Place.PLACE_ITEMS_LIST, needUpdateShared: true, collectionCodes });

  const slug = useMemo(() => ({ type: SlugType.SLUG_TYPE_COLLECTION, slug: params.slug ?? '' }), [params.slug]);

  if (catalogNotFound) {
    return <Error404 />;
  }

  return (
    <>
      <seo.Seo />
      <breadcrumbs.ui.Seo />

      <Responsive.Desktop>
        <LoyaltyBody loyalty={loyalty?.loyalty} place="catalog" />
        <PageTitle title={title} />
      </Responsive.Desktop>

      <CatalogDescription />

      <CatalogContent
        isEmpty={products.length === 0}
        nosidebar={!hasSidebar}
        hasMobileFilters={hasFilters.mobile}
        hasDesktopFilters={hasFilters.desktop}
      >
        <CatalogSidebarWrapper>
          <Sidebar filters={selCatalog.$filters} />
        </CatalogSidebarWrapper>

        <FiltersWrapper>
          <Filters
            collection={header?.collection?.code}
            slug={slug}
            filters={selCatalog.$filters}
            baseCounter={counter}
            categoriesList={
              <MobileCategoriesList
                $categories={selCatalog.$mobileCategoryFilters}
                $scheme={selCatalog.$filtersScheme}
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
            <ProductList products={products} pageType="SelCatalogPage" list={title} rowScheme={rowScheme} />
          </InfiniteScroll>

          {moreControls.loadMoreBtn}
        </ContentWithFiltersWrapper>
      </CatalogContent>

      <BreadcrumbsPane compact nosticky>
        <BreadcrumbsUI breadcrumbs={breadcrumbsList} />
      </BreadcrumbsPane>
    </>
  );
}
