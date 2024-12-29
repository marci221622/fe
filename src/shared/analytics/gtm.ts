import { createEffect, createEvent, sample } from 'effector';

import { $sessionData } from '@/shared/configs';
import { $session, SessionTokens } from '@/shared/session';
import { $isClient, $isServer } from '@/shared/start';

import { prodLoggerEnabled } from '@/constants/runtimeConfig';

import { parseJwt } from '@/lib/jwt';

import { getSpaLocation, prepareToGTM } from './helpers';
import { addToStaticAnalytic } from './static';

const MAX_SPA_EVENTS = 20;

export const sendGtm = createEvent<any[]>();

export const sendGtmFx = createEffect((params: any[]) => {
  params.forEach(payload => {
    if (process?.env?.NODE_ENV === 'production' && typeof window !== 'undefined' && window.dataLayer) {
      const isSpaPageView = payload.event === 'Spa_pageview';
      const needSlice = window.dataLayer.length > MAX_SPA_EVENTS;

      if (isSpaPageView && needSlice) {
        window.dataLayer.splice(0, window.dataLayer.length - MAX_SPA_EVENTS);
      }

      window.dataLayer.push(payload);
    }

    if (prodLoggerEnabled()) {
      // eslint-disable-next-line no-console
      console.log('Analitics:send ->', payload);
    }
  });
});

function prepareAnalytic(isStatic: boolean) {
  return ({ session }: { session: SessionTokens }, body: any[]) => {
    const sub = parseJwt(session)?.sub;

    return body.map(it =>
      prepareToGTM({
        ...it,
        userId: sub,
        userAuth: !!sub,
        ...(it.event === 'Spa_pageview' && {
          event: !isStatic ? 'Spa_pageview' : undefined,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          spa_location: !isStatic ? getSpaLocation() : undefined,
        }),
      }),
    );
  };
}

sample({
  source: { session: $session, sessionData: $sessionData },
  filter: $isClient,
  fn: prepareAnalytic(false),
  clock: sendGtm,
  target: sendGtmFx,
});

sample({
  source: { session: $session, sessionData: $sessionData },
  filter: $isServer,
  fn: prepareAnalytic(true),
  clock: sendGtm,
  target: addToStaticAnalytic.prepend((payload: any[]) => ({ type: 'gtm', payload })),
});
