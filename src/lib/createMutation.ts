import { attach, createEffect, createEvent, createStore, sample, split } from 'effector';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';

import { GrpcWebError } from '@/generated/customer_hub/customer-hub-service';

import { RedirectError } from '@/constants/errors';

import { setRedirect } from './redirect';

type Ctrl = { ctrl?: AbortController };

export type FxParams<Params> = [Params & Ctrl, AbortController];

// eslint-disable-next-line no-use-before-define
export type Mutation<Params, Result> = ReturnType<typeof createMutation<Params, Result>>;

type Props<Params, Result> = {
  handler: (params: FxParams<Params>) => Promise<Result>;
};

export function createMutation<Params, Result, Err = GrpcWebError>({ handler }: Props<Params & Ctrl, Result>) {
  const $lastParams = createStore<Params | null>(null, { serialize: 'ignore' });
  const $error = createStore<Err | null>(null);
  const start = createEvent<Params & Ctrl>();
  const reset = createEvent();
  const setError = createEvent<Err>();
  const fx = createEffect<FxParams<Params & Ctrl>, Result, Err>(params => handler(params));

  // По сути тут не нужен аборт
  // По этому весь ресет не используется
  // По выходу со страницы что бы дальнейшие действия не запускать
  // Делаю аборт
  const abortFx = attach({
    source: fx.inFlight,
    effect: (inFlight, ctrl: AbortController) => {
      if (!ctrl.signal.aborted && inFlight > 0) {
        ctrl.abort('abortFx from createMutation');

        if (process?.env?.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log('abortFx from createMutation');
        }
      }
    },
  });

  $error.on(setError, (_, err) => err).reset(reset, fx);

  $lastParams.on(start, (_, params) => params).reset(fx.finally);

  sample({
    source: fx,
    clock: reset,
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
      to: (error: GrpcWebError) => error instanceof RedirectError,
    },
    cases: {
      to: setRedirect.prepend((error: RedirectError) => error.to),
      __: setError,
    },
  });

  function useReset() {
    const onReset = useUnit(reset);

    useEffect(() => {
      return () => onReset();
    }, [onReset]);
  }

  return {
    reset,
    start,
    $error,
    $pending: fx.pending,
    fx,
    useReset,
    '@@unitShape': () => ({
      reset,
      start,
      error: $error,
      pending: fx.pending,
    }),
    // Experimantal
    __: {
      $lastParams,
    },
  };
}
