import { allSettled, fork } from 'effector';

import { $baseServices } from '@/lib/services';

import { createTestBaseServices } from '../../tests/baseServices';
import { watchEffect } from '../../tests/watchEffects';
import { appStarted } from '../start';

import { configsQuery } from './firebase';

describe('configsQuery from Firebase', () => {
  it('should be triggered by sample(clock: appStarted, target: configsQuery.start)', async () => {
    const scopedCtrl = new AbortController();
    const { services } = createTestBaseServices();
    const scope = fork({
      values: [[$baseServices, services]],
    });

    const fxWatchers = watchEffect(configsQuery.fx, scope);

    await allSettled(appStarted, {
      scope,
      params: { ctrl: scopedCtrl },
    });

    const received = scope.getState(configsQuery.$result);

    expect(received).toEqual('{}');
    expect(fxWatchers.listeners.onCall).toHaveBeenCalledTimes(1);
  });
});
