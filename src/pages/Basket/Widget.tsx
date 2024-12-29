import { useLingui } from '@lingui/react';
import { useUnit } from 'effector-react';
import { useMemo } from 'react';

import { $mappedStrings } from '@/shared/configs';
import { productsAnalytics } from '@/shared/products';
import { BaseProductsWidgetList, useLastViwedProducts } from '@/shared/widgets';

import { paths } from '@/constants/paths';

import { CatalogContent, ContentWithFiltersWrapper, ProductList } from '@/features/catalog';

import { createRowScheme } from '@/lib/product';

import { Responsive } from '@/ui/Responsive';
import { Typography } from '@/ui/Typography';

import st from './styles.module.scss';

type Props = {
  condition: boolean;
};

export function ViewedWidget({ condition }: Props) {
  const { i18n } = useLingui();
  const lastViewed = useLastViwedProducts({ condition, size: '100' });
  const onProductClicked = useUnit(productsAnalytics.productClicked);
  const texts = useUnit($mappedStrings);

  const scheme = useMemo(
    () => createRowScheme({ items: lastViewed.items, needToFullListPreparation: false }),
    [lastViewed.items],
  );

  if (lastViewed.items.length === 0) {
    return null;
  }

  return (
    <>
      <Responsive.Desktop>
        <BaseProductsWidgetList
          onProductClicked={onProductClicked}
          device="desktop"
          sizeVisibility
          pageType="Cart"
          title={texts.viewedItems.itemDetails.title}
          items={lastViewed.items}
          needAdditionalAction={lastViewed.hasMoreItems}
          link={paths.lastViewedProducts()}
        />
      </Responsive.Desktop>

      <Responsive.TabletAndBelow>
        <Typography.PageTitle className={st.viewedTitle}>{texts.viewedItems.cart.title}</Typography.PageTitle>

        <CatalogContent isEmpty={false} nosidebar>
          <ContentWithFiltersWrapper>
            <ProductList
              pageType="Cart"
              list={texts.viewedItems.viewed.title}
              products={lastViewed.items}
              hasFavorite={false}
              rowScheme={scheme}
            />
          </ContentWithFiltersWrapper>
        </CatalogContent>
      </Responsive.TabletAndBelow>
    </>
  );
}
