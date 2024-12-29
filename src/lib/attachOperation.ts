/* eslint-disable no-underscore-dangle */
import { createFactory } from '@withease/factories';
import { createEffect } from 'effector';

import { FxParams, Query, createQuery } from './createQuery';

type Ctrl = { ctrl?: AbortController };

export const attachOperation = createFactory(<Params, Result>(query: Query<Params, Result>) => {
  const attachedFx = createEffect<FxParams<Params & Ctrl>, Result>(params => {
    // @ts-ignore
    return (query.__.effect ?? query.__.handler)(params);
  });

  const attachedQuery = createQuery({
    ...query.__,
    effect: attachedFx,
  });

  return attachedQuery;
})
