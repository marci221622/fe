import { useUnit } from 'effector-react';
import { useEffect } from 'react';

import { Item } from '@/generated/customer_hub/entities/item.v1';
import { productsAnalytics } from '@/shared/products';
import { BaseProductsWidgetList } from '@/shared/widgets';

import { filtersCodes } from '@/constants/hardcode';

import { Responsive } from '@/ui/index';

import { useAdditionalActions } from '../Templates/useAdditionalActions';

import { DEFAULT_PAGE_SIZE, widgetByBrandsQuery } from './model';

type Props = {
  product: Item;
};

// Показать виджет только если нету размеров
export function ProductsWidgetByBrand({ product }: Props) {
  const { reset, start, result } = useUnit(widgetByBrandsQuery);
  const links = useAdditionalActions(product);
  const onProductClicked = useUnit(productsAnalytics.productClicked);

  const items = result?.items?.filter(item => item.code !== product.code);

  const collectionCode = product.collection?.code;
  const brandLabel = product.brand?.title;

  const needAdditionalAction = (result?.itemsCount ?? 0) > +DEFAULT_PAGE_SIZE;
  const additionalLink = `?${filtersCodes.brands}=${brandLabel}`;
  const nextLink = links?.collection?.link ? `${links?.collection?.link}${additionalLink}` : '';

  const props = {
    onProductClicked,
    items: items ?? [],
    title: (
      <>
        {product.collection?.title ?? ''} {brandLabel}
      </>
    ),
    needAdditionalAction,
    link: nextLink,
    brandVisibility: true,
    pageType: 'ProductPage' as const,
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (collectionCode && brandLabel) {
      start({ collection: collectionCode, brand: brandLabel });

      return () => {
        reset();
      };
    }
  }, [collectionCode, reset, start, brandLabel]);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="widget">
      <Responsive.Desktop>
        <BaseProductsWidgetList device="desktop" {...props} />
      </Responsive.Desktop>

      <Responsive.TabletAndBelow>
        <BaseProductsWidgetList device="mobile" {...props} />
      </Responsive.TabletAndBelow>
    </div>
  );
}
