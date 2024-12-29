import { allSettled, createEffect, createEvent, createStore, fork, sample } from 'effector';

import { RedirectError } from '@/constants/errors';

import { delay } from '@/lib/delay';

import { watchEffect } from '../tests/index';

import { createQuery, FxParams } from './createQuery';
import { $redirect } from './redirect';

describe('createQuery', () => {
  it('should call start and return result', async () => {
    const scope = fork();

    const query = createQuery({
      initialData: [],
      handler: async ([{ timeout }]: FxParams<{ timeout: number }>) => {
        await delay(timeout);
        return [1, 2, 3];
      },
    });

    await allSettled(query.start, { scope, params: { timeout: 0 } });

    expect(scope.getState(query.$result)).toEqual([1, 2, 3]);
  });

  it('should call start and return result (effect handler)', async () => {
    const scope = fork();

    const query = createQuery({
      initialData: [],
      effect: createEffect(async ([{ timeout }]: FxParams<{ timeout: number }>) => {
        await delay(timeout);
        return [1, 2, 3];
      }),
    });

    await allSettled(query.start, { scope, params: { timeout: 0 } });

    expect(scope.getState(query.$result)).toEqual([1, 2, 3]);
  });

  it('should throw error when params not passed', async () => {
    const scope = fork();

    const query = createQuery({
      initialData: [],
    });

    // Специально закоментил что бы проверить ошибку
    // Если не передал параметры
    // @ts-ignore
    await allSettled(query.start, { scope, params: { timeout: 0 } });

    expect(scope.getState(query.$error)).toEqual(new Error('[lib:createQuery]: handler or effect must be setted'));
  });

  it('should reset state correctly', async () => {
    const scope = fork();

    const query = createQuery({
      initialData: [],
      handler: async ([{ timeout }]: FxParams<{ timeout: number }>) => {
        await delay(timeout);
        return [1, 2, 3];
      },
    });

    await allSettled(query.start, { scope, params: { timeout: 10 } });

    await allSettled(query.reset, { scope });

    expect(scope.getState(query.$result)).toEqual([]);
  });

  it('should be aborted', async () => {
    const scope = fork();
    const ctrl = new AbortController();

    const query = createQuery({
      initialData: [],
      handler: async ([{ timeout }, ctrl]: FxParams<{ timeout: number }>) => {
        return new Promise((rs, rj) => {
          ctrl.signal.addEventListener('abort', () => rj(new Error('aborted')));
          delay(timeout).then(() => rs([1, 2, 3]));
        });
      },
    });

    setTimeout(() => {
      ctrl.abort();
    }, 0);

    await allSettled(query.start, { scope, params: { timeout: 10, ctrl } });

    expect(scope.getState(query.$result)).toEqual([]);
  });

  it('should be aborted without ctrl and by next start or reset', async () => {
    const scope = fork();
    const ctrl = new AbortController();

    const query = createQuery({
      initialData: [],
      handler: async ([{ timeout }, ctrl]: FxParams<{ timeout: number }>) => {
        return new Promise((rs, rj) => {
          ctrl.signal.addEventListener('abort', () => rj(new Error('aborted')));
          delay(timeout).then(() => rs([1, 2, 3]));
        });
      },
    });

    const fxWatchers = watchEffect(query.fx, scope);

    setTimeout(() => {
      ctrl.abort();
    }, 0);

    await Promise.all([
      allSettled(query.start, { scope, params: { timeout: 10, ctrl } }),
      allSettled(query.start, { scope, params: { timeout: 20, ctrl } }),
    ]);

    expect(scope.getState(query.$result)).toEqual([1, 2, 3]);
    expect(fxWatchers.listeners.onFailData).toHaveBeenCalledWith(new Error('aborted'));
    expect(fxWatchers.listeners.onFailData).toHaveBeenCalledTimes(1);
  });

  it('should be call redirect when error matched', async () => {
    const scope = fork();

    const query = createQuery({
      initialData: [],
      handler: async (_: FxParams<void>) => {
        return new Promise((rs, rj) => {
          rj(new RedirectError('/path'));
        });
      },
    });

    await allSettled(query.start, { scope });

    expect(scope.getState(query.$result)).toEqual([]);
    expect(scope.getState($redirect)).toEqual({ to: '/path' });
  });

  it('should return error (if not redirect) and reset it', async () => {
    const scope = fork();

    const query = createQuery({
      initialData: [],
      handler: async (_: FxParams<void>) => {
        return new Promise((rs, rj) => {
          rj(new Error('failed'));
        });
      },
    });

    await allSettled(query.start, { scope });

    expect(scope.getState(query.$result)).toEqual([]);
    expect(scope.getState(query.$error)).toEqual(new Error('failed'));
    expect(scope.getState($redirect)).toEqual(null);

    await allSettled(query.reset, { scope });

    expect(scope.getState(query.$result)).toEqual([]);
    expect(scope.getState(query.$error)).toEqual(null);
  });

  it('should be corretly behavior with mainFx and every done', async () => {
    const scope = fork();

    const start = createEvent();

    const query = createQuery({
      initialData: '',
      handler: async (_: FxParams<unknown>) => {
        return new Promise(rs => {
          rs('query');
        });
      },
    });

    const query1 = createQuery({
      initialData: '',
      handler: async (_: FxParams<unknown>) => {
        return new Promise(rs => {
          setTimeout(() => {
            rs('query1');
          }, 10);
        });
      },
    });

    const mainFx = createEffect(async ({ ctrl }: { ctrl?: AbortController }) => {
      const scopedCtrl = ctrl ?? new AbortController();

      const rs = await Promise.all([query.fx([{}, scopedCtrl]), query1.fx([{}, scopedCtrl])]);

      return rs;
    });

    const fxWatchers = watchEffect(mainFx, scope);

    sample({ clock: start, fn: () => ({}), target: mainFx });

    await allSettled(start, { scope });

    expect(fxWatchers.listeners.onDoneData).toHaveBeenCalledWith(['query', 'query1']);
  });

  it('should be corretly behavior with mainFx and redirect error (inside query)', async () => {
    const scope = fork();

    const start = createEvent();

    const query = createQuery({
      initialData: '',
      handler: async (_: FxParams<unknown>) => {
        return new Promise((_, rj) => {
          rj(new RedirectError('/test'));
        });
      },
    });

    const query1 = createQuery({
      initialData: '',
      handler: async (_: FxParams<unknown>) => {
        return new Promise(rs => {
          setTimeout(() => {
            rs('query1');
          }, 10);
        });
      },
    });

    const mainFx = createEffect(async ({ ctrl }: { ctrl?: AbortController }) => {
      const scopedCtrl = ctrl ?? new AbortController();

      const rs = await Promise.all([query.fx([{}, scopedCtrl]), query1.fx([{}, scopedCtrl])]);

      return rs;
    });

    const fxWatchers = watchEffect(mainFx, scope);

    sample({ clock: start, fn: () => ({}), target: mainFx });

    await allSettled(start, { scope });

    expect(fxWatchers.listeners.onFailData).toHaveBeenCalledWith(new RedirectError('/test'));
    expect(scope.getState($redirect)).toEqual({ to: '/test' });
  });

  it('should be corretly behavior with mainFx and redirect error (inside mainFx)', async () => {
    const scope = fork();

    const start = createEvent();

    const query = createQuery({
      initialData: '',
      handler: async (_: FxParams<unknown>) => {
        return new Promise(rs => {
          rs('query');
        });
      },
    });

    const mainFx = createEffect(async ({ ctrl }: { ctrl?: AbortController }) => {
      const scopedCtrl = ctrl ?? new AbortController();

      await Promise.all([query.fx([{}, scopedCtrl])]);

      throw new RedirectError('/test');
    });

    // У нас в качестве теста специально функция возвращает never, поэтому специально заглушим тайпскрипт.
    // В реальных случаях это всё корректно ругается на ошибку, и заглушать так не нужно.
    // Здесь-же специально тестируем невалидный частный случай
    // @ts-ignore
    const fxWatchers = watchEffect(mainFx, scope);

    sample({ clock: start, fn: () => ({}), target: mainFx });

    await allSettled(start, { scope });

    expect(fxWatchers.listeners.onFailData).toHaveBeenCalledWith(new RedirectError('/test'));
    expect(scope.getState($redirect)).toEqual(null);
  });

  it('should be corretly behavior with mainFx and abort outside', async () => {
    const scope = fork();
    const scopedCtrl = new AbortController();

    const start = createEvent();

    const query = createQuery({
      initialData: '',
      handler: async ([_, ctrl]: FxParams<unknown>) => {
        return new Promise((rs, rj) => {
          let id: NodeJS.Timeout | null = null;

          ctrl.signal.addEventListener('abort', () => {
            clearTimeout(id!);
            rj(new Error('cancelled'));
          });

          id = setTimeout(() => {
            rs('query');
          }, 10000);
        });
      },
    });

    const mainFx = createEffect(async ({ ctrl }: { ctrl: AbortController }) => {
      const rs = await Promise.all([query.fx([{}, ctrl])]);

      return rs;
    });

    const fxWatchers = watchEffect(mainFx, scope);

    sample({
      clock: start,
      fn: () => ({
        ctrl: scopedCtrl,
      }),
      target: mainFx,
    });

    const promise = allSettled(start, { scope });

    setTimeout(() => {
      scopedCtrl.abort('cancelled');
    }, 10);

    await promise;

    expect(fxWatchers.listeners.onFailData).toHaveBeenCalledWith(new Error('cancelled'));
  });

  it('should make request if authorized', async () => {
    const scope = fork();

    const query = createQuery({
      $isAuthorized: createStore(true),
      initialData: [],
      handler: async ([{ timeout }]: FxParams<{ timeout: number }>) => {
        await delay(timeout);
        return [1, 2, 3];
      },
    });

    await allSettled(query.start, { scope, params: { timeout: 0 } });

    expect(scope.getState(query.$result)).toEqual([1, 2, 3]);
    expect(scope.getState(query.$error)).toEqual(null);
  });

  it('should not make request if not authorized', async () => {
    const scope = fork();

    const query = createQuery({
      $isAuthorized: createStore(false),
      initialData: [],
      handler: async ([{ timeout }]: FxParams<{ timeout: number }>) => {
        await delay(timeout);
        return [1, 2, 3];
      },
    });

    await allSettled(query.start, { scope, params: { timeout: 0 } });

    expect(scope.getState(query.$result)).toEqual([]);
  });
});
