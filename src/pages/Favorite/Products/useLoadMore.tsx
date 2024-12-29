import { useLingui } from '@lingui/react';
import { useUnit } from 'effector-react';

import { $mappedStrings } from '@/shared/configs';

import { favoriteResults, FavoriteTabs } from '@/features/favorites';

import { inStockList, outOfStockList, activeTabField } from './models';

import st from './styles.module.scss';

export function useLoadMore() {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();
  const activeTab = useUnit(activeTabField);
  const inStock = useUnit(inStockList.query);
  const loadMoreInStoke = useUnit(inStockList.loadMore);
  const loadMoreOutOfStoke = useUnit(outOfStockList.loadMore);
  const outOfStock = useUnit(outOfStockList.query);
  const { result: favoriteResult } = useUnit(favoriteResults.query);

  const result = activeTab.value === FavoriteTabs.inStock ? inStock.result : outOfStock.result;
  const onLoadMore = activeTab.value === FavoriteTabs.inStock ? loadMoreInStoke : loadMoreOutOfStoke;

  if (!result || !favoriteResult?.favoriteItemsList) {
    return null;
  }

  const { nextPageToken } = result;

  return nextPageToken ? (
    <div className={st.pagination}>
      <p
        role="presentation"
        className={st.loadMore}
        onClick={e => {
          e.preventDefault();
          onLoadMore({ listId: favoriteResult.favoriteItemsList?.id ?? '', nextPageToken });
        }}
      >
        {texts.web.revealMoreItems}
      </p>
    </div>
  ) : null;
}
