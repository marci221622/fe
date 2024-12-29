import { useLingui } from '@lingui/react';
import { useUnit } from 'effector-react';
import { useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';

import { useDefinePageTitle } from '@/features/catalog/DefinePageTitle';
import { SlugType } from '@/generated/customer_hub/entities/slug.v1';
import { Place } from '@/generated/customer_hub/enums/place';
import { getDYSelector } from '@/shared/analytics';
import { LoyaltyBody } from '@/shared/ui/LoyaltyBanners';
import { useLoyalty } from '@/shared/ui/StickyBanner';

import {
  CatalogContent,
  CatalogDescription,
  CatalogSidebarWrapper,
  ContentWithFiltersWrapper,
  Filters,
  FiltersWrapper,
  MobileCategoriesList,
  PageTitle,
  ProductCounter,
  ProductList,
  Sidebar,
  useLoadMore,
  LoadMoreSpinner,
} from '@/features/catalog';

import { BreadcrumbsPane, BreadcrumbsUI, Responsive } from '@/ui/index';

import Error404 from '../../Errors/error404';

import { commonCatalog, seo, breadcrumbs } from './model';

export default function CommonCatalogPage() {
  const { i18n } = useLingui();
  const params = useParams();
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
    filters,
    collectionCodes,
  } = useUnit(commonCatalog);
  const breadcrumbsList = useUnit(breadcrumbs.$breadcrumbs);

  const moreControls = useLoadMore({ nextPage, onLoadMore: loadMore });

  const loyalty = useLoyalty({ place: Place.PLACE_ITEMS_LIST, needUpdateShared: true, collectionCodes });

  const updatedTitle = useDefinePageTitle(filters.filters, title);

  // Для обратной совместимости
  const menuCode = params.menuCode;
  const slug = useMemo(() => ({ type: SlugType.SLUG_TYPE_MENU_ITEM, slug: params.slug ?? '' }), [params.slug]);

  if (catalogNotFound) {
    return <Error404 />;
  }

  return (
    <>
      <section {...getDYSelector({ type: 'pageType', page: 'catalogOrEmptyCatalog' })}>
        <seo.Seo />
        <breadcrumbs.ui.Seo />

        <Responsive.Desktop>
          <LoyaltyBody loyalty={loyalty?.loyalty} place="catalog" />
          <PageTitle title={updatedTitle} />
        </Responsive.Desktop>

        <CatalogDescription />

        <CatalogContent
          isEmpty={products.length === 0}
          nosidebar={!hasSidebar}
          hasMobileFilters={hasFilters.mobile}
          hasDesktopFilters={hasFilters.desktop}
        >
          <CatalogSidebarWrapper>
            <Sidebar filters={commonCatalog.$filters} />
          </CatalogSidebarWrapper>

          <FiltersWrapper>
            <Filters
              collection={header?.collection?.code}
              slug={!menuCode ? slug : undefined}
              filters={commonCatalog.$filters}
              baseCounter={counter}
              categoriesList={
                <MobileCategoriesList
                  $categories={commonCatalog.$mobileCategoryFilters}
                  $scheme={commonCatalog.$filtersScheme}
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
              <ProductList products={products} pageType="Catalog" list={title} rowScheme={rowScheme} />
            </InfiniteScroll>

            {moreControls.loadMoreBtn}
          </ContentWithFiltersWrapper>
        </CatalogContent>
      </section>

      {breadcrumbsList.length > 0 && (
        <BreadcrumbsPane compact nosticky>
          <BreadcrumbsUI breadcrumbs={breadcrumbsList} />
        </BreadcrumbsPane>
      )}
    </>
  );
}
