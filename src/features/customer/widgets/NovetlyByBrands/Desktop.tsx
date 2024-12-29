import { useUnit } from 'effector-react';
import { useEffect } from 'react';

import { Sort } from '@/generated/customer_hub/enums/sort';
import { $favoriteBrandsIdsAsString, $favoriteBrandsPageLink } from '@/shared/brands';
import { useLinkBuilder } from '@/shared/pageRouting';
import { productsAnalytics } from '@/shared/products';
import { BaseProductsWidgetList } from '@/shared/widgets';
import { novetlyByBrandsQuery } from '@/shared/widgets/novetlyByBrandsModel';

import { useViewport } from '@/lib/hooks';

export default function CustomerNevetlyWidgetDesktop({ title }: { title: string }) {
  const { isDesktop } = useViewport();
  const brandsIds = useUnit($favoriteBrandsIdsAsString);
  const { reset, start, result } = useUnit(novetlyByBrandsQuery);
  const brandsLink = useUnit($favoriteBrandsPageLink);
  const builder = useLinkBuilder();
  const onProductClicked = useUnit(productsAnalytics.productClicked);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const ids = brandsIds.split(',');

    if (ids.length > 0 && isDesktop) {
      start({ brands: ids });

      return () => {
        reset();
      };
    }
  }, [brandsIds, isDesktop, reset, start]);

  return result && result.items.length > 0 && title ? (
    <BaseProductsWidgetList
      onProductClicked={onProductClicked}
      device="desktop"
      sizeVisibility
      pageType="Profile"
      title={title}
      items={result.items}
      needAdditionalAction
      link={`${builder(brandsLink)}&sort=${Sort.SORT_NOVELTY}`}
    />
  ) : null;
}
