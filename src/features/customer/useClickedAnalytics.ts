import { useUnit } from 'effector-react';
import { useCallback } from 'react';

import { paths } from '@/constants/paths';

import { cutomerAnalytics } from './models';

export function useClickedLinkAnalytics({ place }: { place: 'popup' | 'profile' }) {
  const analytics = useUnit({
    orders: cutomerAnalytics.customerOrdersClicked,
    stuff: cutomerAnalytics.customerStuffClicked,
    contacts: cutomerAnalytics.customerDataClicked,
  });

  const handler = useCallback(
    (to: string) => {
      switch (to) {
        case paths.profile.orders():
          return analytics.orders({ place });
        case paths.profile.contacts():
          return analytics.contacts({ place });
        // TODO: поменять урл на вещи (когда появится)
        case paths.landings.seller():
          return analytics.stuff({ place });
        default:
          return null;
      }
    },
    [analytics, place],
  );

  return handler;
}
