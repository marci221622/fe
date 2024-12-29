import { useLingui } from '@lingui/react';
import { useUnit } from 'effector-react';
import { useMemo } from 'react';

import { $mappedStrings } from '@/shared/configs';
import { Meta } from '@/shared/Seo';
import { useLastViwedProducts } from '@/shared/widgets';

import { CatalogContent, ContentWithFiltersWrapper, PageTitle, ProductCounter, ProductList } from '@/features/catalog';

import { createRowScheme } from '@/lib/product';

import { Responsive } from '@/ui/index';

export default function LastViewedProductsPage() {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();
  const lastViewed = useLastViwedProducts({ size: '100' });

  const scheme = useMemo(
    () => createRowScheme({ items: lastViewed.items, needToFullListPreparation: false }),
    [lastViewed.items],
  );

  return (
    <>
      <Meta title={texts.viewedItems.main.title}>
        <meta name="robots" content="noindex" />
      </Meta>

      <Responsive.Desktop>
        <PageTitle title={texts.viewedItems.main.title} />
      </Responsive.Desktop>

      <CatalogContent
        isEmpty={lastViewed.items.length === 0}
        nosidebar
        hasMobileFilters={false}
        hasDesktopFilters={false}
      >
        <ContentWithFiltersWrapper>
          <ProductCounter counter={lastViewed.items.length} />

          <ProductList
            products={lastViewed.items}
            pageType="Catalog"
            list={texts.viewedItems.main.title}
            rowScheme={scheme}
          />
        </ContentWithFiltersWrapper>
      </CatalogContent>
    </>
  );
}
