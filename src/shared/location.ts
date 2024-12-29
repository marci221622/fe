import { attach, createEvent, sample } from 'effector';

import { $sessionData } from '@/shared/configs';
import { baseRequestFx, RequestReturn } from '@/shared/request';

import { createQuery, FxParams } from '@/lib/createQuery';
import { getCoords } from '@/lib/geo';

export function createLocation() {
  const locationQuery = createQuery({
    initialData: [],
    effect: attach({
      source: $sessionData,
      effect: async (sessionData, [_, ctrl]: FxParams<void>) => {
        const coords = await getCoords();
        const rs = (await baseRequestFx({
          method: 'FindAddressByCoords',
          signal: ctrl?.signal,
          body: {
            ...coords,
            sessionData,
          },
        })) as Await<RequestReturn<'FindAddressByCoords'>>;

        return rs.data;
      },
    }),
  });

  const detectLocation = createEvent<void>();

  sample({ clock: detectLocation, fn: () => ({}), target: locationQuery.start });

  return {
    query: locationQuery,
    detectLocation,
    '@@unitShape': () => ({
      pending: locationQuery.$pending,
      detectLocation,
    }),
  };
}
