import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import reactStringReplace from 'react-string-replace';

import { Item } from '@/generated/customer_hub/entities/item.v1';
import { productsAnalytics } from '@/shared/products';
import { BaseProductsWidgetList } from '@/shared/widgets';

import { filtersCodes } from '@/constants/hardcode';

import { createReaddableSize } from '@/lib/transformers';

import { Responsive } from '@/ui/index';

import { useAdditionalActions } from '../Templates/useAdditionalActions';

import { DEFAULT_PAGE_SIZE, widgetQuery } from './model';

type Props = {
  product: Item;
};

export function ProductsWidgetByCollection({ product }: Props) {
  const { reset, start, result } = useUnit(widgetQuery);
  const links = useAdditionalActions(product);
  const onProductClicked = useUnit(productsAnalytics.productClicked);

  const items = result?.items?.filter(item => item.code !== product.code);

  const size = product.size?.russianSize;
  const collectionCode = product.collection?.code;
  const additionalTitle = size ? (
    <>
      , размер&nbsp;
      {reactStringReplace(createReaddableSize(product.size), ' ', () => (
        <>&nbsp;</>
      ))}
    </>
  ) : (
    ''
  );
  const needAdditionalAction = (result?.itemsCount ?? 0) > +DEFAULT_PAGE_SIZE;
  const additionalLink = size ? `?${filtersCodes.size}=${size}` : '';
  const nextLink = links?.collection?.link ? `${links?.collection?.link}${additionalLink}` : '';

  const props = {
    onProductClicked,
    items: items ?? [],
    title: (
      <>
        {product.collection?.title ?? ''}
        {additionalTitle}
      </>
    ),
    needAdditionalAction,
    link: nextLink,
    sizeVisibility: false,
    pageType: 'ProductPage' as const,
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (collectionCode) {
      start({ collection: collectionCode, size });

      return () => {
        reset();
      };
    }
  }, [collectionCode, reset, start, size]);

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
