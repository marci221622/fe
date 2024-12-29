import { grpc } from '@improbable-eng/grpc-web';
import { LoadableComponent } from '@loadable/component';
import { BrowserHeaders } from 'browser-headers';
import { createEffect } from 'effector';

import { GrpcWebError } from '@/generated/customer_hub/customer-hub-service';

export type RemoteFxParams = { ctrl?: AbortController };

export function builHandler(pageName: string, page: LoadableComponent<unknown>) {
  return ({ ctrl }: RemoteFxParams) => {
    if (process?.env?.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(`[remote-module-${pageName}]: load`);
    }

    return new Promise<void>((rs, rj) => {
      const abortHandler = () => {
        rj(new GrpcWebError('CANCELLED', grpc.Code.Canceled, new BrowserHeaders({})));
      };

      ctrl?.signal?.addEventListener('abort', abortHandler);

      page
        .load()
        .then(() => {
          if (process?.env?.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.log(`[remote-module-${pageName}]: ready`);
          }

          rs(undefined);
        })
        .catch(err => {
          if (process?.env?.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.log(`[remote-module-${pageName}]: failed`);
          }

          rj(err);
        })
        .finally(() => {
          ctrl?.signal?.removeEventListener('abort', abortHandler);
        });
    });
  };
}

export function remotePage(pageName: string) {
  const remoteFx = createEffect<RemoteFxParams, void>(() => {
    if (process?.env?.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(`[remote-module-${pageName}]: empty, you mast add some handler`);
    }

    return undefined;
  });

  return remoteFx;
}
