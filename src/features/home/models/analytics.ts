import { createEvent, sample } from 'effector';

import { DYEvent, sendAnalytic } from '@/shared/analytics';
import { $isClient } from '@/shared/start';

const homePageLoaded = createEvent<void>();

sample({
  source: $isClient,
  clock: homePageLoaded,
  fn: isClient => ({
    dy: {
      type: isClient ? 'spa' : 'context',
      ctx: {
        lng: 'ru',
        type: 'HOMEPAGE',
      },
    } as DYEvent,
    gtm: [
      {
        event: 'Spa_pageview',
        pageType: 'Main',
      },
    ],
  }),
  target: sendAnalytic,
});

export const homeAnalytics = {
  homePageLoaded,
};
