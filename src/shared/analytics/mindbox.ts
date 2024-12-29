import { createEffect, createEvent, sample } from 'effector';

import { $isClient, $isServer, appStartedOnClient } from '@/shared/start';

import { prodLoggerEnabled } from '@/constants/runtimeConfig';

import { addToStaticAnalytic } from './static';
import { MindboxType } from './types';

export const sendMindbox = createEvent<any[]>();

export const sendMindboxFx = createEffect((params: any[]) => {
  params.forEach(payload => {
    window.mindbox?.('async', payload);

    if (prodLoggerEnabled()) {
      // eslint-disable-next-line no-console
      console.log('Mindbox:send ->', payload);
    }
  });
});

function prepareAnalytic() {
  return (body: { operation: string; data: any }[]) => {
    return body.map(it => ({
      operation: it.operation,
      data: {
        ...it.data,
      },
    }));
  };
}

sample({
  filter: $isClient,
  fn: prepareAnalytic(),
  clock: sendMindbox,
  target: sendMindboxFx,
});

sample({
  filter: $isServer,
  fn: prepareAnalytic(),
  clock: sendMindbox,
  target: addToStaticAnalytic.prepend((payload: MindboxType[]) => ({ type: 'mindbox', payload })),
});

sample({
  clock: appStartedOnClient,
  fn: () => window.mindboxLayer ?? [],
  target: sendMindbox,
});
