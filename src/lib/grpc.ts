
import { grpc } from '@improbable-eng/grpc-web';
import { BrowserHeaders } from 'browser-headers';

import { GrpcWebError, GrpcWebImpl } from '@/generated/customer_hub/customer-hub-service';

import { prodLoggerEnabled } from '@/constants/runtimeConfig';

interface UnaryMethodDefinitionishR extends grpc.UnaryMethodDefinition<any, any> {
  requestStream: any;
  responseStream: any;
}

type UnaryMethodDefinitionish = UnaryMethodDefinitionishR;

interface AbortablePromise<T> extends Promise<T> {
  abort: () => void;
}

export class GrpcPreownedClient extends GrpcWebImpl {
  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    _request: any,
    metadata: grpc.Metadata | undefined,
  ): AbortablePromise<any> {
    const options = (this as unknown as { options: GrpcWebImpl['options'] }).options;
    const host = (this as unknown as { host: GrpcWebImpl['host'] }).host;

    const request = { ..._request, ...methodDesc.requestType };
    const maybeCombinedMetadata =
      metadata && options.metadata
        ? new BrowserHeaders({ ...options?.metadata.headersMap, ...metadata?.headersMap })
        : metadata || options.metadata;
    let req: grpc.Request | null = null;
    const deffer: {
      resolve?: (value: unknown) => void;
      reject?: (reason: unknown) => void;
    } = {};

    const promise = new Promise((resolve, reject) => {
      deffer.resolve = resolve;
      deffer.reject = reject;

      if (options.debug || prodLoggerEnabled()) {
        /* eslint-disable no-console */
        console.group(`%c grpc:request ${methodDesc.methodName}`, 'color: green');
        if (typeof window !== 'undefined') {
          console.log(request);
        }
        console.groupEnd();
        /* eslint-enable no-console */
      }

      req = grpc.unary(methodDesc, {
        request,
        host,
        metadata: maybeCombinedMetadata,
        transport: options.transport,
        debug: false,
        onEnd: response => {
          if (response.status === grpc.Code.OK) {
            const rs = response.message!.toObject();

            if (options.debug || prodLoggerEnabled()) {
              /* eslint-disable no-console */
              console.group(`%c grpc:response ${methodDesc.methodName}`, 'color: green');
              if (typeof window !== 'undefined') {
                console.log(rs);
              }
              console.groupEnd();
              /* eslint-enable no-console */
            }

            resolve(rs);
          } else {
            const error = new GrpcWebError(response.statusMessage, response.status, response.trailers);

            if (options.debug || prodLoggerEnabled()) {
              /* eslint-disable no-console */
              console.group(`%c grpc:error ${methodDesc.methodName}`, 'color: red');
              console.log({ ...error, code: error.code, message: error.message });
              console.groupEnd();
              /* eslint-enable no-console */
            }

            reject(error);
          }
        },
      });
    });

    const abortablePromise = promise as AbortablePromise<any>;

    abortablePromise.abort = () => {
      req?.close?.();
      deffer.reject?.(
        new GrpcWebError(
          'CANCELLED',
          grpc.Code.Canceled,
          new BrowserHeaders({ ...(options?.metadata?.headersMap ?? {}), ...metadata?.headersMap }),
        ),
      );
    };

    return abortablePromise;
  }
}
