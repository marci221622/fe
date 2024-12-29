import { useLingui } from '@lingui/react';
import { useUnit } from 'effector-react';
import { useMemo } from 'react';

import { $mappedStrings } from '@/shared/configs';
import { productsAnalytics } from '@/shared/products';
import { BaseProductsWidgetList, useLastViwedProducts } from '@/shared/widgets';

import { paths } from '@/constants/paths';

import { CatalogContent, ContentWithFiltersWrapper, ProductList } from '@/features/catalog';
import { FavoriteTabs } from '@/features/favorites';

import { createRowScheme } from '@/lib/product';

import { Responsive } from '@/ui/Responsive';
import { Typography } from '@/ui/Typography';

import st from './styles.module.scss';

type Props = {
  activeTab: FavoriteTabs;
  outOfStockCounter: number;
  inStockCounter: number;
};

export default function ViewedWidget({ activeTab, outOfStockCounter, inStockCounter }: Props) {
  const texts = useUnit($mappedStrings);
  const hasSomeItems =
    (activeTab === FavoriteTabs.inStock && inStockCounter > 0) ||
    (activeTab === FavoriteTabs.outOfStock && outOfStockCounter > 0);

  const { i18n } = useLingui();
  const viewed = useLastViwedProducts({ condition: !hasSomeItems, size: '100' });
  const onProductClicked = useUnit(productsAnalytics.productClicked);

  const scheme = useMemo(
    () => createRowScheme({ items: viewed.items, needToFullListPreparation: false }),
    [viewed.items],
  );

  if (hasSomeItems || viewed.items.length === 0) {
    return null;
  }

  return (
    <>
      <Responsive.Desktop>
        <BaseProductsWidgetList
          onProductClicked={onProductClicked}
          device="desktop"
          sizeVisibility
          pageType="wishList"
          title={texts.viewedItems.main.title}
          items={viewed.items}
          needAdditionalAction={viewed.hasMoreItems}
          link={paths.lastViewedProducts()}
        />
      </Responsive.Desktop>

      <Responsive.TabletAndBelow>
        <Typography.PageTitle className={st.viewedTitle}>{texts.viewedItems.main.title}</Typography.PageTitle>

        <CatalogContent isEmpty={false} nosidebar>
          <ContentWithFiltersWrapper>
            <ProductList
              pageType="wishList"
              list={texts.viewedItems.main.title}
              products={viewed.items}
              hasFavorite={false}
              rowScheme={scheme}
            />
          </ContentWithFiltersWrapper>
        </CatalogContent>
      </Responsive.TabletAndBelow>
    </>
  );
}
