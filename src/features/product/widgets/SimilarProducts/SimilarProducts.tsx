import { useUnit } from 'effector-react';

import { Item } from '@/generated/customer_hub/entities/item.v1';
import { $mappedStrings } from '@/shared/configs';
import { productsAnalytics } from '@/shared/products';
import { BaseProductsWidgetList, BaseProductWidgetProps } from '@/shared/widgets';

import { useMount, usePopupState } from '@/lib/hooks';

import { Responsive } from '@/ui/index';

import { widgetSimilarQuery } from '../model';

import { ProductsModal } from './Modal';

type Props = {
  product: Item;
};

const defaultList = [] as Item[];

export function SimilarProducts({ product }: Props) {
  const texts = useUnit($mappedStrings);
  const { reset, start, result } = useUnit(widgetSimilarQuery);
  const onProductClicked = useUnit(productsAnalytics.productClicked);
  const popup = usePopupState(false);

  const items = result ?? defaultList;
  const initialItems = items.slice(0, 10);

  const codes = product.relevantItemCodes;

  const props = {
    device: 'desktop',
    items: initialItems,
    onProductClicked,
    // eslint-disable-next-line react/jsx-no-useless-fragment
    title: <>{texts.relevantItems.item.button}</>,
    needAdditionalAction: initialItems.length < items.length,
    link: e => {
      e.preventDefault();
      popup.openPopup();
    },
    sizeVisibility: true,
    pageType: 'ProductPage' as const,
  } as BaseProductWidgetProps;

  // eslint-disable-next-line consistent-return
  useMount(() => {
    if (codes.length > 0) {
      start({ codes });

      return () => {
        reset();
      };
    }
  });

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <div className="widget">
        <Responsive.Desktop>
          <BaseProductsWidgetList {...props} device="desktop" />
        </Responsive.Desktop>

        <Responsive.TabletAndBelow>
          <BaseProductsWidgetList {...props} device="mobile" />
        </Responsive.TabletAndBelow>
      </div>

      <ProductsModal popup={popup} items={items} />
    </>
  );
}
