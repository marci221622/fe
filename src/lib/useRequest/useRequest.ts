import { AxiosError } from 'axios';
import { useCallback, useEffect, useReducer, useRef } from 'react';

import { Action, RequestState, UseRequestReturn, UseRequestProps, StateEvent, LOADING_STATUS } from './types';

// FROM_TSUM_APP
function createReducer<Result, Error>() {
  return (state: RequestState<Result, Error>, action: Action<Result, Error>) => {
    switch (action.type) {
      case StateEvent.reset:
        return { ...state, data: action.payload, status: LOADING_STATUS.initial, error: null };
      case StateEvent.start:
        return { ...state, status: LOADING_STATUS.loading };
      case StateEvent.success:
        return { ...state, status: LOADING_STATUS.ready, data: action.payload, error: null };
      case StateEvent.failed:
        return { ...state, status: LOADING_STATUS.failed, error: action.payload };
      default:
        return state;
    }
  };
}

export function useRequest<Result, Params, Error = AxiosError>({
  request,
  initialData,
  onRejected,
  onFulFilled,
  onFinaly,
}: UseRequestProps<Result, Params, Error>): UseRequestReturn<Result, Params, Error> {
  const initialDataRef = useRef(initialData);
  const withThrow = useRef(false);
  const controller = useRef<AbortController | null>(null);

  const [state, dispatch] = useReducer(createReducer<Result, Error>(), {
    data: initialData,
    status: LOADING_STATUS.initial,
    error: null,
  });

  const abort = useCallback(() => {
    if (controller.current) {
      controller.current.abort('cancellation from useRequest');

      if (process?.env?.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('cancellation from useRequest');
      }
    }
  }, []);

  const reset = useCallback(() => {
    abort();
    withThrow.current = false;
    dispatch({
      type: StateEvent.reset,
      payload: initialDataRef.current,
    });
  }, [abort]);

  const fetchFn = useCallback(
    (params: Params) => {
      abort();
      let status: 'fail' | 'success' = 'fail';

      controller.current = new AbortController();

      dispatch({
        type: StateEvent.start,
      });

      const defer = request(params, controller.current.signal)
        .then(result => {
          status = 'success';

          dispatch({
            type: StateEvent.success,
            payload: result,
          });

          if (onFulFilled) {
            onFulFilled(result);
          }

          return Promise.resolve(result);
        })
        .catch(error => {
          status = 'fail';

          dispatch({
            type: StateEvent.failed,
            payload: error,
          });

          if (onRejected) {
            onRejected(error);
          }

          if (withThrow.current) {
            throw error;
          }
        })
        .finally(() => {
          if (onFinaly) {
            onFinaly(params, status);
          }
        });

      const rs = {
        defer,
        unwrap: () => {
          withThrow.current = true;

          return rs;
        },
      };

      return rs;
    },
    [abort, request, onRejected, onFulFilled, onFinaly],
  );

  useEffect(() => () => reset(), [reset]);

  return [{ request: fetchFn, abort, reset }, state];
}
