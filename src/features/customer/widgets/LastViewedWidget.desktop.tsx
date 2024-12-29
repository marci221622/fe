import { useUnit } from 'effector-react';

import { $mappedStrings } from '@/shared/configs';
import { productsAnalytics } from '@/shared/products';
import { BaseProductsWidgetList, useLastViwedProducts } from '@/shared/widgets';

import { paths } from '@/constants/paths';

import { useViewport } from '@/lib/hooks';

export default function CustomerLastViewedWidgetDesktop() {
  const texts = useUnit($mappedStrings);
  const { isDesktop } = useViewport();
  const lastViewed = useLastViwedProducts({ size: '10', condition: isDesktop });
  const onProductClicked = useUnit(productsAnalytics.productClicked);

  return lastViewed.items.length > 0 ? (
    <BaseProductsWidgetList
      device="desktop"
      onProductClicked={onProductClicked}
      sizeVisibility
      pageType="Profile"
      title={texts.viewedItems.main.title}
      items={lastViewed.items}
      needAdditionalAction={lastViewed.hasMoreItems}
      link={paths.lastViewedProducts()}
    />
  ) : null;
}
