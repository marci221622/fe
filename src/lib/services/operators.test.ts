import { grpc } from '@improbable-eng/grpc-web';
import { BrowserHeaders } from 'browser-headers';

import { GrpcWebError } from '@/generated/customer_hub/customer-hub-service';

import { delay } from '@/lib/delay';

import { retry } from './operators';

type BaseRequestParams = { type: 'res' | 'rej'; payload: string };

function createRequest(ms: number) {
  return jest.fn().mockImplementation(
    ({ type, payload }: BaseRequestParams) =>
      // eslint-disable-next-line no-async-promise-executor
      new Promise(async (resolve, reject) => {
        await delay(ms);
        if (type === 'rej') {
          reject(payload);
        } else {
          resolve(payload);
        }
      }),
  );
}

describe('operators', () => {
  describe('retry', () => {
    it('should called', async () => {
      const request = createRequest(20);

      const fn = retry({
        attempts: 3,
        fn: () => request({ type: 'res', payload: 'result' }),
      });

      const rs = await fn({});

      expect(rs).toEqual('result');
    });

    it('should skip retry when code mismatched', async () => {
      const request = createRequest(20);

      const fn = retry({
        attempts: 3,
        codes: [grpc.Code.Unavailable],
        fn: () =>
          request({ type: 'rej', payload: new GrpcWebError('error', grpc.Code.AlreadyExists, new BrowserHeaders({})) }),
      });

      try {
        await fn({});
      } catch (err) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(err).toEqual(new GrpcWebError('error', grpc.Code.AlreadyExists, new BrowserHeaders({})));
      }

      expect(request).toHaveBeenCalledTimes(1);
    });

    it('should retry 3 attempts and then failed', async () => {
      const request = createRequest(20);

      const fn = retry({
        attempts: 3,
        codes: [grpc.Code.Unavailable],
        fn: () =>
          request({ type: 'rej', payload: new GrpcWebError('error', grpc.Code.Unavailable, new BrowserHeaders()) }),
      });

      try {
        await fn({});
      } catch (err) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(err).toEqual(new GrpcWebError('error', grpc.Code.Unavailable, new BrowserHeaders({})));
      }

      expect(request).toHaveBeenCalledTimes(3);
    });

    it('should be aborted', async () => {
      const request = createRequest(20);
      const ctrl = new AbortController();

      const fn = retry({
        attempts: 3,
        codes: [grpc.Code.Unavailable],
        fn: () =>
          request({
            type: 'rej',
            payload: new GrpcWebError('error', grpc.Code.Unavailable, new BrowserHeaders({})),
          }),
      });

      try {
        const promise = fn({
          signal: ctrl.signal,
        });

        setTimeout(() => {
          ctrl.abort();
        }, 45);

        await promise;
      } catch (err) {
        // Проверить что ретрай не будет работать когда отменили запрос
        // eslint-disable-next-line jest/no-conditional-expect
        expect(err).toEqual(new GrpcWebError('CANCELLED', grpc.Code.Canceled, new BrowserHeaders({})));
      }

      // Успели дважды вызвать апи до отмены
      expect(request).toHaveBeenCalledTimes(2);
    });
  });
});
