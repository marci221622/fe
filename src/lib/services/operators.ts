import { grpc } from '@improbable-eng/grpc-web';
import { BrowserHeaders } from 'browser-headers';
import { Event } from 'effector';

import { CustomerHubService, GrpcWebError } from '@/generated/customer_hub/customer-hub-service';
import { RequestReturn } from '@/shared/request';

import { delay } from '@/lib/delay';

export function cancellation<P, D>(fn: (params: P) => Promise<D>, abort: Event<void>): (params: P) => Promise<D> {
  return params =>
    new Promise((resolve, reject) => {
      const unbind = abort.watch(() => {
        reject(new GrpcWebError('CANCELLED', grpc.Code.Canceled, new BrowserHeaders({})));
      });

      fn(params).then(resolve).catch(reject).finally(unbind);
    });
}

export function retry<Method extends keyof CustomerHubService = keyof CustomerHubService>({
  fn,
  attempts = Infinity,
  codes = [],
}: {
  fn: () => Promise<RequestReturn<Method>>;
  attempts?: number;
  codes?: grpc.Code[];
}) {
  return ({ signal }: { signal?: AbortSignal }) => {
    const promise = new Promise<RequestReturn<Method>>((resolve, reject) => {
      let attempt = 0;
      let lastError: GrpcWebError | null = null;

      async function runner() {
        let done: RequestReturn<Method> | string = 'not_settled';

        while (done === 'not_settled' && attempts > attempt) {
          try {
            // eslint-disable-next-line no-await-in-loop
            done = await fn();
          } catch (error: unknown) {
            const typedError = error as GrpcWebError;

            lastError = typedError;

            if (codes.includes(typedError.code) && !signal?.aborted) {
              // eslint-disable-next-line no-await-in-loop
              await delay(300);
              attempt += 1;
            } else {
              if (signal?.aborted) {
                throw new GrpcWebError('CANCELLED', grpc.Code.Canceled, new BrowserHeaders({}));
              }

              throw typedError;
            }
          }
        }

        if (done === 'not_settled' && lastError) {
          throw lastError;
        }

        return done as RequestReturn<Method>;
      }

      runner().then(resolve).catch(reject);
    });

    return promise;
  };
}
