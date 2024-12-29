import { attach, createEffect, createEvent, createStore, sample, split, Store, Event, Effect } from 'effector';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';

import { GrpcWebError } from '@/generated/customer_hub/customer-hub-service';

import { RedirectError } from '@/constants/errors';

import { setRedirect } from './redirect';

type Ctrl = { ctrl?: AbortController };

// eslint-disable-next-line no-use-before-define
export type Query<Params, Result> = ReturnType<typeof createQuery<Params, Result>>;

export type FxParams<Params> = [Params & Ctrl, AbortController];

type Props<Params, Result, Err> = {
  initialData?: Result | null;
  effect?: Effect<FxParams<Params>, Result, Err>;
  handler?: (params: FxParams<Params>) => Promise<Result>;
  stateUpdater?: (params: Params & Ctrl, result: { prev: Result | null; result: Result }) => Result;
  getKey?: (params: Params & Ctrl) => string;
  $isAuthorized?: Store<boolean>;
  abort?: Event<any>;
};

// TODO: передизайнить фабрику (?)
// Возможно стоит не передвать ctrl в start, а при инициализации подкинуть ивент abort

// Фабрика отменяет запросы, даже если не передали ctrl
// Работает только через start
// Вызывая fx на прямую - абрт работать не будет (если не прокидывать ctrl явно в параметры)
export function createQuery<Params, Result, Err = GrpcWebError>({
  $isAuthorized = createStore(true),
  initialData = null,
  handler,
  effect,
  abort,
  stateUpdater = (_, rs) => rs.result,
}: Props<Params & Ctrl, Result, Err>) {
  const $result = createStore(initialData);
  const $error = createStore<Err | null>(null);
  const start = createEvent<Params & Ctrl>();
  const reset = createEvent();
  const setError = createEvent<Err>();
  const fx = attach({
    source: $isAuthorized,
    mapParams: (params: FxParams<Params & Ctrl>, isAuthorized) => ({ params, isAuthorized }),
    effect: createEffect<{ params: FxParams<Params & Ctrl>; isAuthorized: boolean }, Result, Err>(
      ({ params, isAuthorized }) => {
        if (!effect && !handler) {
          throw new Error('[lib:createQuery]: handler or effect must be setted');
        }

        if (isAuthorized) {
          // Странно что тут ошибка, я выше проверил что если
          // Нету effect и handler
          // Бросаем исключение
          // @ts-ignore
          return (effect ?? handler)(params);
        }

        return Promise.resolve(initialData!);
      },
    ),
  });

  const abortFx = attach({
    source: fx.inFlight,
    effect: (inFlight, ctrl: AbortController) => {
      if (!ctrl.signal.aborted && inFlight > 0) {
        ctrl.abort('abortFx from createQuery');

        if (process?.env?.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log('abortFx from createQuery');
        }
      }
    },
  });

  $result.on(fx.done, (prev, { params: [params], result }) => stateUpdater(params, { prev, result })).reset(reset);
  $error.on(setError, (_, err) => err).reset(reset);

  sample({
    source: fx,
    clock: [start, reset].filter(Boolean) as Event<void>[],
    fn: ([_, ctrl]) => ctrl,
    filter: ([_, ctrl]) => !!ctrl,
    target: abortFx,
  });

  sample({
    clock: start,
    fn: params => [params, params?.ctrl ?? new AbortController()] as FxParams<Params>,
    target: fx,
  });

  split({
    // @ts-ignore
    source: fx.failData,
    match: {
      to: (error: Error) => error instanceof RedirectError,
    },
    cases: {
      to: setRedirect.prepend((error: RedirectError) => error.to),
      __: setError,
    },
  });

  if (abort) {
    sample({
      clock: abort,
      target: reset,
    });
  }

  function useReset() {
    const onReset = useUnit(reset);

    useEffect(() => {
      return () => onReset();
    }, [onReset]);
  }

  return {
    __: { initialData, effect, abort, stateUpdater, handler, $isAuthorized },
    reset,
    start,
    $result,
    $error,
    $pending: fx.pending,
    fx,
    useReset,
    '@@unitShape': () => ({
      reset,
      start,
      result: $result,
      error: $error,
      pending: fx.pending,
    }),
  };
}
