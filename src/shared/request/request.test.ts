import { allSettled, createEvent, fork, sample } from 'effector';

import { watchEffect } from '../../tests/index';

import { baseRequestFx, RequestParams } from './index';

describe('baseRequestFx', () => {
  it('should be called normaly', async () => {
    const start = createEvent<void>();
    const scope = fork({
      handlers: new Map().set(baseRequestFx, () => 'done'),
    });
    const fxWatchers = watchEffect(baseRequestFx, scope);

    sample({ clock: start, fn: (): RequestParams => ({ method: 'GetHomeScreen' }), target: baseRequestFx });

    await allSettled(start, { scope });

    expect(fxWatchers.listeners.onDoneData).toHaveBeenCalledWith('done');
  });
});