import { useLingui } from '@lingui/react';
import { useUnit } from 'effector-react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

import { Place } from '@/generated/customer_hub/enums/place';
import { CompanyAdvantages } from '@/shared/Advantages';
import { getDYSelector } from '@/shared/analytics';
import { OnlyFullVariant } from '@/shared/configs';
import { useLoyalty } from '@/shared/ui/StickyBanner';

import { runtimeConfig } from '@/constants/runtimeConfig';

import { OneClickModal, QuickByModal } from '@/features/basket';
import {
  DesktopProduct,
  MobileProduct,
  Actions,
  ProductsWidgetByCollection,
  ProductsWidgetByBrand,
  SimilarProducts,
} from '@/features/product';

import { useDevFF } from '@/lib/hooks';

import { Responsive } from '@/ui/index';

import Error404 from '../Errors/error404';

import { ProductGallery } from './Gallery';
import { $product, seo, breadcrumbs, $productCodes } from './model';

import st from './styles.module.scss';

export default function ProductPage() {
  const { i18n } = useLingui();
  const product = useUnit($product);
  const productCodes = useUnit($productCodes);
  const { pathname } = useLocation();
  const breadcrumbsList = useUnit(breadcrumbs.$breadcrumbs);
  const [slideIndex, setSlideIndex] = useState<number | null>(null);
  const widgetsAreEnabled = useDevFF('productWidgets');
  const loyalty = useLoyalty({ place: Place.PLACE_ITEM_DETAILS, needUpdateShared: true, itemCodes: productCodes });

  if (!product) {
    return <Error404 />;
  }

  const isGalleryOpen = slideIndex !== null;
  const outOfStock = !!product && +product.quantity === 0;
  const size = product.size?.russianSize;
  const title = `${product.brand?.title ?? ''} ${product.title}`.trim();

  return (
    <section {...getDYSelector({ type: 'pageType', page: 'product' })}>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'Product',
            name: product.title,
            image: product.imagesLarge.map(element => element.src),
            description: product.description,
            brand: { '@type': 'Brand', name: product.brand?.title },
            offers: {
              '@type': 'Offer',
              url: runtimeConfig.HOSTNAME + pathname,
              priceCurrency: product.itemOffers[0]?.price?.currencyCode,
              price: `${product.itemOffers[0]?.price?.units ? Number(product.itemOffers[0]?.price?.units) : undefined}`,
              availability: `https://schema.org/${outOfStock ? 'OutOfStock' : 'InStock'}`,
              itemCondition: 'https://schema.org/NewCondition',
            },
          })}
        </script>
      </Helmet>
      <seo.Seo />
      <breadcrumbs.ui.Seo />
      <h1 className={st.hiddenTitle}>{title}</h1>
      <Responsive.Desktop>
        <DesktopProduct
          breadcrumbs={breadcrumbsList}
          loyalty={loyalty?.loyalty}
          notExists={outOfStock}
          product={product}
          openGallery={setSlideIndex}
          closeGallery={() => setSlideIndex(null)}
          galleryOpened={isGalleryOpen}
        />
      </Responsive.Desktop>

      <Responsive.TabletAndBelow>
        <MobileProduct
          notExists={outOfStock}
          product={product}
          openGallery={setSlideIndex}
          loyalty={loyalty?.loyalty}
        />
      </Responsive.TabletAndBelow>

      <OnlyFullVariant>
        <div className={st.widgets}>
          <SimilarProducts product={product} />

          {widgetsAreEnabled && (
            <>
              {!size && <ProductsWidgetByBrand product={product} />}
              <ProductsWidgetByCollection product={product} />
            </>
          )}

          <CompanyAdvantages className={st.advantages} titleVisible={false} />
        </div>
      </OnlyFullVariant>

      <ProductGallery
        images={product.imagesLarge}
        actions={<Actions className={st.actions} product={product} notExists={outOfStock} actionsSize="M" />}
        setSlideIndex={setSlideIndex}
        slideIndex={slideIndex}
      />
      <OneClickModal />
      <QuickByModal />
    </section>
  );
}
