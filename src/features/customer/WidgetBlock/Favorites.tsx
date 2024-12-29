import { useGate, useUnit } from 'effector-react';

import { $mappedStrings } from '@/shared/configs';

import { useLastFavoriteLink } from '@/features/favorites';

import { useViewport } from '@/lib/hooks';

import { OverlayLoader, Space, Typography } from '@/ui/index';

import { StarIcon } from '@/ui/assets/icons';

import { FavoriteListGate, $widgetFavoriteList, $widgetFavoritePending, $widgetFavoriteCounters } from '../models';

import { FavoriteProductList } from './FavoriteProductList';
import { WidgetBlock } from './View';

import st from './styles.module.scss';

export function FavoritesWidget() {
  const texts = useUnit($mappedStrings);
  const { isDesktop } = useViewport();
  const pending = useUnit($widgetFavoritePending);
  const list = useUnit($widgetFavoriteList);
  const counters = useUnit($widgetFavoriteCounters);
  const favoritePath = useLastFavoriteLink();

  useGate(FavoriteListGate, { isDesktop });

  return (
    <WidgetBlock icon={<StarIcon />} headerTitle="Избранное" navLink={favoritePath}>
      <OverlayLoader isLoading={pending}>
        {list.length > 0 ? (
          <FavoriteProductList
            list={list}
            allCounter={counters.instock + counters.outofstock}
            inStockCounter={counters.instock}
          />
        ) : (
          <Space className={st.stuff} stretch direction="vertical" size="large">
            <Typography.Paragraph>{texts.favorite.emptyAvailable.title}</Typography.Paragraph>
          </Space>
        )}
      </OverlayLoader>
    </WidgetBlock>
  );
}
