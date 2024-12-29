import { useUnit } from 'effector-react';
import { useEffect, useMemo } from 'react';

import { Sort } from '@/generated/customer_hub/enums/sort';
import { WithProductShowAnalytic } from '@/shared/analytics';
import { $favoriteBrandsIdsAsString, $favoriteBrandsPageLink } from '@/shared/brands';
import { $mappedStrings } from '@/shared/configs';
import { useLinkBuilder } from '@/shared/pageRouting';
import { productsAnalytics } from '@/shared/products';
import { ProductCard } from '@/shared/ui';
import { novetlyByBrandsQuery } from '@/shared/widgets/novetlyByBrandsModel';

import { useViewport } from '@/lib/hooks';
import { createRowScheme } from '@/lib/product';

import { MoreAction, Typography } from '@/ui/index';

import st from '../styles.module.scss';

export default function CustomerNevetlyWidgetMobile({ title }: { title: string }) {
  const texts = useUnit($mappedStrings);
  const { isTabletAndBelow } = useViewport();
  const brandsIds = useUnit($favoriteBrandsIdsAsString);
  const productClicked = useUnit(productsAnalytics.productClicked);
  const { reset, start, result } = useUnit(novetlyByBrandsQuery);
  const brandsLink = useUnit($favoriteBrandsPageLink);
  const builder = useLinkBuilder();

  const scheme = useMemo(
    () => createRowScheme({ items: result?.items ?? [], noGroup: true, needToFullListPreparation: true }),
    [result?.items],
  );

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const ids = brandsIds.split(',');

    if (ids.length > 0 && isTabletAndBelow) {
      start({ brands: ids });

      return () => {
        reset();
      };
    }
  }, [brandsIds, isTabletAndBelow, reset, start]);

  return result && result.items.length > 0 && title ? (
    <div className={st.mobileProducts}>
      <Typography.Title>{title}</Typography.Title>
      <ul>
        {result.items.map(product => (
          <WithProductShowAnalytic item={product} list={title} key={product.code}>
            <li>
              <ProductCard
                type="minimal"
                className={st.card}
                product={product}
                sizeVisibility={false}
                tagsVisibility={false}
                hasItem={+product.quantity > 0}
                isCollected={product.isCollected}
                titleOnlyOneRow={false}
                hasComments={scheme.__[product.code].hasComments}
                hasDiscountInRow={scheme.__[product.code].hasDiscountInRow}
                priceDirection={scheme.__[product.code].priceVertical ? 'vertical' : 'horizontal'}
                onClick={() => productClicked({ page: 'Profile', item: product, list: title })}
              />
            </li>
          </WithProductShowAnalytic>
        ))}

        <li className={st.moreAction}>
          <MoreAction
            to={`${builder(brandsLink)}&sort=${Sort.SORT_NOVELTY}`}
            title={texts.viewedItems.allViewedItemsButton.title}
            onClick={() => productClicked({ item: 'all_view_action', page: 'Profile', list: title })}
          />
        </li>
      </ul>
    </div>
  ) : null;
}
