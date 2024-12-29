export enum LOADING_STATUS {
  initial = 'initial',
  ready = 'ready',
  loading = 'loading',
  failed = 'failed',
}

export type RequestState<Result, Error> = { data: Result | undefined; status: LOADING_STATUS; error: Error | null };
export type RequestRs<Result> = { defer: Promise<Result | void>; unwrap: () => RequestRs<Result> };
export type RequestActions<Params, Result> = {
  abort: () => void;
  request: (params: Params) => RequestRs<Result>;
  reset: () => void;
};

export type UseRequestProps<Result, Params, Error> = {
  request: (params: Params, signal: AbortSignal) => Promise<Result>;
  initialData?: Result;
  onRejected?: (error: Error) => void;
  onFulFilled?: (result: Result) => void;
  onFinaly?: (params: Params, status: 'success' | 'fail') => void;
};

export type UseRequestReturn<Result, Params, Error> = [RequestActions<Params, Result>, RequestState<Result, Error>];

export enum StateEvent {
  reset,
  start,
  success,
  failed,
}

export type Action<Result, Error> =
  | {
      type: StateEvent.reset;
      payload: Result | undefined;
    }
  | {
      type: StateEvent.start;
    }
  | {
      type: StateEvent.failed;
      payload: Error | null;
    }
  | {
      type: StateEvent.success;
      payload: Result;
    };
