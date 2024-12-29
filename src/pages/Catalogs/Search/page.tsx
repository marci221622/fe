import { useLingui } from '@lingui/react';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchParams } from 'react-router-dom';

import { Place } from '@/generated/customer_hub/enums/place';
import { getDYSelector } from '@/shared/analytics';
import { LoyaltyBody } from '@/shared/ui/LoyaltyBanners';
import { useLoyalty } from '@/shared/ui/StickyBanner';

import { ADDITIONAL_SEARCH_TITLE, NO_SEARCH_TITLE_KEY, filtersCodes } from '@/constants/hardcode';

import {
  Filters,
  ProductCounter,
  ProductList,
  useLoadMore,
  CatalogContent,
  FiltersWrapper,
  ContentWithFiltersWrapper,
  MobileCategoriesList,
  PageTitle,
  CatalogSidebarWrapper,
  Sidebar,
  LoadMoreSpinner,
} from '@/features/catalog';
import { recentlySuggests } from '@/features/header';

import { BreadcrumbsPane, BreadcrumbsUI, Responsive } from '@/ui/index';

import { searchCatalog, breadcrumbs } from './model';

export default function SearchCatalogPage() {
  const { i18n } = useLingui();

  const recently = useUnit(recentlySuggests);

  const [params] = useSearchParams();
  const breadcrumbsList = useUnit(breadcrumbs.$breadcrumbs);

  const onLoadMore = useUnit(searchCatalog.loadMore);

  const { products, nextPage, counter, hasSidebar, hasFilters, rowScheme, collectionCodes } = useUnit(searchCatalog);

  const moreControls = useLoadMore({ nextPage, onLoadMore });

  const loyalty = useLoyalty({ place: Place.PLACE_ITEMS_LIST, needUpdateShared: true, collectionCodes });

  const searchString = params.get(filtersCodes.search) ?? '';
  const noSearch = params.get(NO_SEARCH_TITLE_KEY) === '1';

  const list = noSearch ? searchString : ADDITIONAL_SEARCH_TITLE + searchString;

  useEffect(() => {
    if (products.length) {
      recently.persist(searchString);
    }
  }, [searchString]);

  return (
    <>
      <breadcrumbs.ui.Seo />

      <section {...getDYSelector({ type: 'pageType', page: 'searchOrEmptySearchCatalog' })}>
        <Responsive.Desktop>
          <LoyaltyBody loyalty={loyalty?.loyalty} place="catalog" />
          <PageTitle title={list} />
        </Responsive.Desktop>

        <CatalogContent
          isEmpty={products.length === 0}
          nosidebar={!hasSidebar}
          pageType="SearchResults"
          hasMobileFilters={hasFilters.mobile}
          hasDesktopFilters={hasFilters.desktop}
        >
          <CatalogSidebarWrapper>
            <Sidebar filters={searchCatalog.$filters} />
          </CatalogSidebarWrapper>

          <FiltersWrapper>
            <Filters
              filters={searchCatalog.$filters}
              baseCounter={counter}
              categoriesList={
                <MobileCategoriesList
                  $categories={searchCatalog.$mobileCategoryFilters}
                  $scheme={searchCatalog.$filtersScheme}
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
              <ProductList products={products} pageType="SearchPage" list={list} rowScheme={rowScheme} />
            </InfiniteScroll>
            {moreControls.loadMoreBtn}
          </ContentWithFiltersWrapper>
        </CatalogContent>
      </section>

      <BreadcrumbsPane compact nosticky>
        <BreadcrumbsUI breadcrumbs={breadcrumbsList} />
      </BreadcrumbsPane>
    </>
  );
}
