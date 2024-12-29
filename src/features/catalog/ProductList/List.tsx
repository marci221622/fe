import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { useCallback, useContext } from 'react';

import { Item } from '@/generated/customer_hub/entities/item.v1';
import { WithProductShowAnalytic } from '@/shared/analytics';
import { buildDataAttrsFromItem } from '@/shared/analytics/diginetics';
import { $appIsShort, $mappedStrings } from '@/shared/configs';
import { productsAnalytics } from '@/shared/products';
import { ProductCard } from '@/shared/ui';
import { isPriceByRequest } from '@/shared/watches';

import { ANALYTICS_PRODUCT_LEN_SSR } from '@/constants/analytics';

import { ToggleFavoritesParams, toggleFavorites, useInFavorite } from '@/features/favorites';

import { useCatalogRestorationSync, useCatalogRestorationSyncActions, useViewport } from '@/lib/hooks';
import { RowSchemeResult } from '@/lib/product';

import { catalogCtx } from '../Template';

import st from './styles.module.scss';

type Props = {
  products: Item[];
  pageType: PageType;
  list: string;
  hasFavorite?: boolean;
  openInNewTab?: boolean;
  rowScheme: RowSchemeResult;
  maxList?: boolean;
};

export function ProductList({ products, pageType, list, hasFavorite = true, openInNewTab = false, rowScheme }: Props) {
  const { i18n } = useLingui();
  const { nosidebar } = useContext(catalogCtx);
  const onProductClicked = useUnit(productsAnalytics.productClicked);
  const { persistScrollPosition } = useCatalogRestorationSyncActions();
  const texts = useUnit($mappedStrings);
  const { isTabletAndBelow } = useViewport();
  const appIsShort = useUnit($appIsShort);

  const favoriteAction = useUnit(toggleFavorites);
  const inFavorite = useInFavorite();

  const onItem = useCallback(
    (it: Item) => {
      persistScrollPosition(it.code);
      onProductClicked({ item: it, page: pageType, list });
    },
    [list, onProductClicked, pageType, persistScrollPosition],
  );

  const onFavorite = useCallback(
    (params: Omit<ToggleFavoritesParams, 'place'>) => {
      favoriteAction({ ...params, isActive: inFavorite(params.id, params.isActive), place: 'Catalog' });
    },
    [favoriteAction, inFavorite],
  );

  const schemeVariant = isTabletAndBelow ? 'perRow2' : nosidebar ? 'perRow4' : 'perRow3';

  useCatalogRestorationSync();

  return (
    <div
      className={cn(st.productList, {
        [st.nosidebar]: nosidebar,
      })}
    >
      {products.map((it, index) => {
        // https://jira.int.tsum.com/browse/POWEB-757
        // Для короткой версии в каталоге есть шильдик всегда хардкодный
        const tagsVisibility = appIsShort ? true : rowScheme[schemeVariant][it.code].tagsVisibility;
        const additinalProductProps = {
          tagsVisibility,
          hasDiscountInRow: rowScheme[schemeVariant][it.code].hasDiscountInRow,
          sizeVisibility: rowScheme[schemeVariant][it.code].sizeVisibility,
          hasComments: rowScheme[schemeVariant][it.code].hasComments,
          priceDirection: rowScheme[schemeVariant][it.code].priceVertical
            ? ('vertical' as const)
            : ('horizontal' as const),
          titleOnlyOneRow: rowScheme[schemeVariant][it.code].titleOnlyOneRow,
          priceVisibility: rowScheme[schemeVariant][it.code].hasPriceInRow,
        };

        return (
          <WithProductShowAnalytic
            list={list}
            item={it}
            condition={index > ANALYTICS_PRODUCT_LEN_SSR - 1}
            key={it.code}
          >
            <ProductCard
              product={it}
              inFavorite={inFavorite(it.code, it.favorite)}
              handleFavorite={hasFavorite ? onFavorite : undefined}
              onClick={onItem}
              hasItem={+it.quantity > 0}
              isCollected={it.isCollected}
              openInNewTab={openInNewTab}
              priceByRequestDescription={isPriceByRequest(it) ? texts.itemsList.price.hide : undefined}
              {...additinalProductProps}
              {...buildDataAttrsFromItem(it)}
            />
          </WithProductShowAnalytic>
        );
      })}
    </div>
  );
}
