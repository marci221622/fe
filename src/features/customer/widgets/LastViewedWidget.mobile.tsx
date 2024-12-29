import { useLingui } from '@lingui/react';
import { useUnit } from 'effector-react';
import { useMemo } from 'react';

import { WithProductShowAnalytic } from '@/shared/analytics';
import { $mappedStrings } from '@/shared/configs';
import { ProductCard } from '@/shared/ui';
import { useLastViwedProducts } from '@/shared/widgets';

import { paths } from '@/constants/paths';

import { useViewport } from '@/lib/hooks';
import { createRowScheme } from '@/lib/product';

import { MoreAction, Typography } from '@/ui/index';

import st from './styles.module.scss';

export default function CustomerLastViewedWidgetMobile() {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();
  const { isTabletAndBelow } = useViewport();
  const lastViewed = useLastViwedProducts({ condition: isTabletAndBelow, size: '10' });

  const scheme = useMemo(
    () => createRowScheme({ items: lastViewed.items, noGroup: true, needToFullListPreparation: true }),
    [lastViewed.items],
  );

  return lastViewed.items.length > 0 ? (
    <div className={st.mobileProducts}>
      <Typography.Title>{texts.viewedItems.main.title}</Typography.Title>

      <ul>
        {lastViewed.items.map(product => (
          <WithProductShowAnalytic item={product} list={texts.viewedItems.main.title} key={product.code}>
            <li>
              <ProductCard
                type="minimal"
                onClick={() => lastViewed.productClickHandler(product)}
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
              />
            </li>
          </WithProductShowAnalytic>
        ))}

        {lastViewed.hasMoreItems && (
          <li key="action">
            <MoreAction
              title={texts.viewedItems.allViewedItemsButton.title}
              to={paths.lastViewedProducts()}
              centered
              onClick={() => {
                lastViewed.productClickHandler('all_view_action');
              }}
            />
          </li>
        )}
      </ul>
    </div>
  ) : null;
}
