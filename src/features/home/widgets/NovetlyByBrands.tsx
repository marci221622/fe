import cn from 'classnames';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';

import { Payload } from '@/generated/customer_hub/entities/payload.v1';
import { ScrollType } from '@/generated/customer_hub/enums/scroll_type';
import { $favoriteBrandsIdsAsString } from '@/shared/brands';
import { $mappedStrings } from '@/shared/configs';
import { productsAnalytics } from '@/shared/products';
import { novetlyByBrandsQuery } from '@/shared/widgets/novetlyByBrandsModel';

import { useViewport } from '@/lib/hooks';

import { Items } from '../Products';

type Props = {
  device: Device;
};

export default function NovetlyByBrands({ device }: Props) {
  const { isDesktop, isMobile } = useViewport();
  const brandsIds = useUnit($favoriteBrandsIdsAsString);
  const productClicked = useUnit(productsAnalytics.productClicked);
  const { reset, start, result } = useUnit(novetlyByBrandsQuery);
  const texts = useUnit($mappedStrings);
  const condition = device === 'desktop' ? isDesktop : isMobile;

  const viewedItemsProps = {
    id: 'novetly',
    title: texts.favoriteBrandsNoveltyItems.main.title,
    scrollType: ScrollType.UNRECOGNIZED,
    position: '1',
    items: [],
    button: {
      title: texts.viewedItems.allViewedItemsButton.title,
      payload: { ...Payload.create(), type: 'favoritebrands' as const },
    },
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const ids = brandsIds.split(',');

    if (ids.length > 0 && condition) {
      start({ brands: ids });

      return () => {
        reset();
      };
    }
  }, [brandsIds, reset, start, condition]);

  return result!.items.length > 0 ? (
    <div className={cn('widget')} data-homeblock>
      <Items
        item={{
          ...viewedItemsProps,
          itemsList: result!.items,
        }}
        device={device}
        onProductClicked={payload =>
          productClicked({ item: payload, page: 'Main', list: texts.favoriteBrandsNoveltyItems.main.title })
        }
      />
    </div>
  ) : null;
}
