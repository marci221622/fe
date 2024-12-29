import cn from 'classnames';
import { useUnit } from 'effector-react';

import { ScrollType } from '@/generated/customer_hub/enums/scroll_type';
import { $mappedStrings } from '@/shared/configs';
import { useLastViwedProducts } from '@/shared/widgets';

import { useViewport } from '@/lib/hooks';

import { Items } from '../Products';

type Props = {
  device: Device;
};

export default function LastViewedWidget({ device }: Props) {
  const { isDesktop, isMobile } = useViewport();
  const condition = device === 'desktop' ? isDesktop : isMobile;
  const lastViewed = useLastViwedProducts({ size: '10', condition });
  const texts = useUnit($mappedStrings);
  const viewdItemsProps = {
    id: 'viwed',
    title: texts.viewedItems.main.title,
    scrollType: ScrollType.UNRECOGNIZED,
    position: '1',
    items: [],
    button: lastViewed.hasMoreItems
      ? {
          title: texts.viewedItems.allViewedItemsButton.title,
          payload: {
            title: '',
            type: 'lastViewed' as const,
            value: '',
            slug: undefined,
          },
        }
      : undefined,
  };

  return lastViewed.items.length > 0 ? (
    <div className={cn('widget')} data-homeblock>
      <Items
        item={{
          ...viewdItemsProps,
          itemsList: lastViewed.items,
        }}
        device={device}
        onProductClicked={lastViewed.productClickHandler}
      />
    </div>
  ) : null;
}
