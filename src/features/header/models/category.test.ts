import { allSettled, createEvent, fork, sample } from 'effector';

import { baseRequestFx } from '@/shared/request';

import { FxParams } from '@/lib/createQuery';

import { watchEffect } from '../../../tests/index';

import { catalogQuery, categoryLoaderFx } from './category';

describe('categories', () => {
  it('should be fetch categories', async () => {
    const scopedCtrl = new AbortController();
    const start = createEvent<void>();
    const scope = fork({
      handlers: new Map().set(baseRequestFx, () => ({ catalogs: ['catalog'] })),
    });

    sample({ clock: start, fn: () => [{}, scopedCtrl] as FxParams<void>, target: catalogQuery.fx });

    await allSettled(start, { scope });

    expect(scope.getState(catalogQuery.$result)).toEqual({
      catalogs: ['catalog'],
    });
  });

  // Пример того как дергается глобальная сущность
  // + возможность дозагрузки через эффект с последующим кешем в приложении
  it('should be fetch and cache categories', async () => {
    const scopedCtrl = new AbortController();
    const start = createEvent<void>();
    const scope = fork({
      handlers: new Map().set(baseRequestFx, () => ({ catalogs: ['catalog'] })),
    });

    sample({ clock: start, fn: () => [{}, scopedCtrl] as FxParams<void>, target: categoryLoaderFx });

    const baseFxWatchers = watchEffect(baseRequestFx, scope);

    await allSettled(start, { scope });
    await allSettled(start, { scope });

    expect(scope.getState(catalogQuery.$result)).toEqual({
      catalogs: ['catalog'],
    });
    expect(baseFxWatchers.listeners.onCall).toHaveBeenCalledTimes(1);
  });
});
