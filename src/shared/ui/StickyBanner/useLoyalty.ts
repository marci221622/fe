import { useUnit } from 'effector-react';
import { useCallback, useEffect } from 'react';

import { Place } from '@/generated/customer_hub/enums/place';
import { getLoyalty } from '@/shared/api';

import { useMount } from '@/lib/hooks';
import { useRequest } from '@/lib/useRequest';

import { updateSharedLoyalty } from './model';

type Props = {
  place: Place;
  needUpdateShared?: boolean;
  condition?: boolean;
  itemCodes?: string[];
  collectionCodes?: string[];
};

const defaultList = [] as string[];

export function useLoyalty({
  place,
  needUpdateShared,
  condition = true,
  itemCodes = defaultList,
  collectionCodes = defaultList,
}: Props) {
  const fetchLoyalty = useUnit(getLoyalty);
  const update = useUnit(updateSharedLoyalty);
  const [{ request, reset }, { data }] = useRequest({
    request: useCallback(
      (
        {
          itemCodes,
          collectionCodes,
        }: {
          itemCodes?: string[];
          collectionCodes?: string[];
        },
        signal,
      ) => fetchLoyalty({ body: { place, itemCodes, collectionCodes }, signal }),
      [fetchLoyalty, place],
    ),
  });

  // eslint-disable-next-line consistent-return
  useMount(() => {
    if (condition) {
      request({ itemCodes, collectionCodes });

      return () => {
        reset();
      };
    }
  }, [condition]);

  useEffect(() => {
    if (needUpdateShared && data?.loyalty) {
      update({ place, loyalty: data?.loyalty });
    }
  }, [data?.loyalty, needUpdateShared, place, update]);

  return data;
}
