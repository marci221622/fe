import { useLingui } from '@lingui/react';
import loadable from '@loadable/component';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';

import { $mappedStrings } from '@/shared/configs';

import { OneClickModal } from '@/features/basket';
import { CatalogContent, ContentWithFiltersWrapper } from '@/features/catalog';
import { FavoriteLinks, ProductList, FavoriteTabs, FavoriteFilters } from '@/features/favorites';

import { RemoteBoundary } from '@/lib/RemoteBoundary';

import { Typography } from '@/ui/index';

import { Actions } from './Actions';
import { inStockList, outOfStockList, activeTabField } from './models';
import { useLoadMore } from './useLoadMore';

import st from './styles.module.scss';

const ViewedWidget = loadable(() => import('./Widget'), { ssr: false });

export default function FavoritePage() {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();

  const activeTab = useUnit(activeTabField);
  const inStock = useUnit(inStockList.query);
  const outOfStock = useUnit(outOfStockList.query);
  const loadMoreBtn = useLoadMore();

  const result = activeTab.value === FavoriteTabs.inStock ? inStock.result : outOfStock.result;

  const outOfStockCounter = +(outOfStock.result?.itemsCount ?? '0');
  const inStockCounter = +(inStock.result?.itemsCount ?? '0');

  const hasOnlyInStock = inStockCounter > 0 && outOfStockCounter === 0;
  const hasOnlyOutOfStock = inStockCounter === 0 && outOfStockCounter > 0;

  const noFavorites = texts.favorite.emptyListPlaceholder.title; // не добавлено ни одного
  const wentOutOfStock = texts.favorite.emptyAvailable.title; // добавленных нет в наличии

  const emptyText = hasOnlyOutOfStock ? wentOutOfStock : noFavorites;

  const hasTabs = outOfStockCounter > 0;

  useEffect(() => {
    // 1 в В_НАЛИЧИИ, 1 в НЕ_В_НАЛИЧИИ; удаляем 1 из в НЕ_В_НАЛИЧИИ
    //    => переходим в.inStock, убираются табы
    // 1 в В_НАЛИЧИИ, 1 в НЕ_В_НАЛИЧИИ; удаляем 1 из в В_НАЛИЧИИ
    //    => остаёмся на месте, печатаем wentOutOfStock, остаются табы
    if (activeTab.value === FavoriteTabs.outOfStock && hasOnlyInStock) {
      activeTab.onChange(FavoriteTabs.inStock);
    }
  }, [activeTab, hasOnlyInStock, hasOnlyOutOfStock]);

  const changeTab = (tab: FavoriteTabs) => {
    window.scrollTo(0, 0);
    activeTab.onChange(tab);
  };

  return (
    <>
      <Typography.PageTitle
        className={cn(st.pageTitle, {
          [st.hasTabs]: hasTabs,
        })}
      >
        {texts.tabs.favorites}
      </Typography.PageTitle>

      <div
        className={cn(st.favoritePageWrapper, {
          [st.notabs]: !hasTabs,
        })}
      >
        <FavoriteLinks className={st.links} />

        {hasTabs && (
          <FavoriteFilters
            className={st.sidebar}
            inStockCounter={inStockCounter}
            outOfStockCounter={outOfStockCounter}
            activeTab={activeTab.value}
            onChange={changeTab}
          />
        )}

        <CatalogContent
          nosidebar
          pageType="wishList"
          className={st.catalog}
          isEmpty={(result?.items.length ?? 0) === 0}
        >
          <ContentWithFiltersWrapper emptyText={emptyText} withCatalogLink>
            {result && (
              <>
                <ProductList
                  nosidebar={!hasTabs}
                  priceVisibility={activeTab.value !== FavoriteTabs.outOfStock}
                  action={product =>
                    ({ className }) =>
                      <Actions className={className} product={product} />}
                  products={result.items}
                />
                {loadMoreBtn}
              </>
            )}
          </ContentWithFiltersWrapper>
        </CatalogContent>
      </div>

      <RemoteBoundary>
        <ViewedWidget
          activeTab={activeTab.value}
          outOfStockCounter={outOfStockCounter}
          inStockCounter={inStockCounter}
        />
      </RemoteBoundary>
      <OneClickModal />
    </>
  );
}
