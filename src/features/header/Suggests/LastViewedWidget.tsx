import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';

import { WithProductShowAnalytic } from '@/shared/analytics';
import { $mappedStrings } from '@/shared/configs';
import { MinimalProductCard } from '@/shared/ui';
import { useLastViwedProducts } from '@/shared/widgets';

import { paths } from '@/constants/paths';

import { useViewport } from '@/lib/hooks';

import { MoreAction } from '@/ui/MoreAction';
import { Space } from '@/ui/Space';
import { Typography } from '@/ui/Typography';

import { suggestField } from '../models';

import st from './styles.module.scss';

type Props = {
  popup: { onChange: (value: boolean) => void; value: boolean };
};

export default function LastViewedWidget({ popup }: Props) {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();
  const { isTabletAndBelow } = useViewport();
  const lastViewed = useLastViwedProducts({ condition: isTabletAndBelow && popup.value, size: '10' });

  const field = useUnit(suggestField);

  return (
    <div
      className={cn(st.list, st.productsWrapper, {
        [st.visibility]: !field.value && popup.value,
      })}
    >
      {lastViewed.items.length > 0 && (
        <Space stretch className={st.clearHeader}>
          <Typography.Paragraph className={st.title}>{texts.viewedItems.main.title}</Typography.Paragraph>
        </Space>
      )}

      <ul className={cn(st.suggests, st.products)} data-scroll="allow">
        {lastViewed.items.map(it => (
          <WithProductShowAnalytic item={it} list={texts.viewedItems.main.title}>
            <li key={it.code} className={st.productItem}>
              <MinimalProductCard
                onClick={() => {
                  popup.onChange(false);
                }}
                code={it.code}
                imagePrimary={{
                  small: it.imagesSmall[0]?.src,
                  middle: it.imagesMiddle[0]?.src,
                  large: it.imagesLarge[0]?.src,
                }}
                imageSecondary={{
                  small: it.imagesSmall[1]?.src,
                  middle: it.imagesMiddle[1]?.src,
                  large: it.imagesLarge[1]?.src,
                }}
                brandText={it.brand?.title ?? ''}
                brandImage={it.brand?.logoLink?.src}
              />
            </li>
          </WithProductShowAnalytic>
        ))}

        {lastViewed.hasMoreItems && (
          <li key="action">
            <MoreAction
              centered
              title={texts.viewedItems.allViewedItemsButton.title}
              to={paths.lastViewedProducts()}
              onClick={() => {
                popup.onChange(false);
                lastViewed.productClickHandler('all_view_action');
              }}
            />
          </li>
        )}
      </ul>
    </div>
  );
}
