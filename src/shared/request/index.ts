import { grpc } from '@improbable-eng/grpc-web';
import { attach, createEffect, Store, StoreValue } from 'effector';
import { noop } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { CustomerHubService, GrpcWebError } from '@/generated/customer_hub/customer-hub-service';
import { AppInfoField, SessionData } from '@/generated/customer_hub/entities/session_data.v1';
import { $appIsShort, $sessionData, $versioning } from '@/shared/configs';

import { delay } from '@/lib/delay';
import { $baseServices, BaseServices, retry } from '@/lib/services';
import { uniq } from '@/lib/uniq';

type AppPlatform = 'web' | 'web-mobile';

export type RequestBody<Method extends keyof CustomerHubService> = ArgumentTypes<CustomerHubService[Method]>[0];
export type RequestReturn<Method extends keyof CustomerHubService> = ReturnType<CustomerHubService[Method]>;
export type RequestParams<Method extends keyof CustomerHubService = keyof CustomerHubService> = {
  method: Method;
  body?: ArgumentTypes<CustomerHubService[Method]>[0] & {
    // Это поле по сути не относится к сесии
    // сюда передаем код для корзины
    cartCode?: string;
    sessionData?: Omit<SessionData, 'ab' | 'requestToken'>;
  };
  metadata?: grpc.Metadata;
  signal?: AbortSignal;
  mock?: { delay: number; result?: Await<RequestReturn<Method>> };
  platform?: AppPlatform;
};

export type BaseRequestFxParams = {
  services: BaseServices;
  params: RequestParams;
  versioning?: StoreValue<typeof $versioning>;
  sessionData?: StoreValue<typeof $sessionData>;
  appIsShort: boolean;
};

type BaseRequestParams = {
  baseServices: BaseServices;
  versioning: StoreValue<typeof $versioning>;
  sessionData: StoreValue<typeof $sessionData>;
  appIsShort: boolean;
};

export enum RequestStatus {
  initial = 'initial',
  loading = 'loading',
  failed = 'failed',
  ready = 'ready',
}

export const baseRequest = (
  services: BaseServices,
  params: RequestParams & {
    reqId?: string;
    versioning?: StoreValue<typeof $versioning>;
    sessionData?: StoreValue<typeof $sessionData>;
    platform?: AppPlatform;
    appIsShort: boolean;
  },
): Promise<any> => {
  const { signal, method, metadata, body, mock, reqId, versioning, sessionData, platform = 'web', appIsShort } = params;
  // Ауз реквест сам прокидывает дату + токены
  // Бейс реквест так же берет дату
  const baseData = body?.sessionData ?? sessionData;

  const patchedSessionData = baseData
    ? {
        sessionData: {
          ...baseData,
          requestToken: reqId,
          code: baseData.code || undefined,
          infoFields: [
            ...(baseData?.infoFields ?? []),
            ...(versioning ?? []),
            {
              key: AppInfoField.APP_INFO_FIELD_PLATFORM,
              value: platform,
            },
            appIsShort && {
              key: AppInfoField.APP_INFO_FIELD_SOURCE,
              value: 'tsum',
            },
          ].filter(Boolean),
        },
      }
    : {
        sessionData: { infoFields: [...(versioning ?? [])] },
      };

  if (mock) {
    return delay(mock.delay).then(() => mock.result);
  }

  // Тут почему то на method ругается
  // Именно в консоли при проверке
  // Возможно потому что метод внутри содержит
  // Задепрекейченные методы
  // eslint-disable-next-line deprecation/deprecation
  const promise = services.grpc.hub[method](
    // @ts-ignore
    {
      ...body,
      ...patchedSessionData,
    },
    metadata,
  );

  if (signal) {
    const handler = (event: Event) => {
      // @ts-ignore
      promise?.abort(event);
    };

    signal.addEventListener('abort', handler);

    // Промис в ретрае будет исполнятся по кругу с одни ctrl
    // если не отписаться - все будет дублироваться
    promise.finally(() => signal.removeEventListener('abort', handler)).catch(noop);
  }

  return promise;
};

export const baseRequestFx = attach({
  source: {
    baseServices: $baseServices as Store<BaseServices>,
    versioning: $versioning,
    sessionData: $sessionData,
    appIsShort: $appIsShort,
  },
  mapParams: (params: RequestParams, { baseServices: services, ...rest }: BaseRequestParams) => ({
    services,
    params,
    ...rest,
  }),
  effect: createEffect(({ services, params, versioning, sessionData, appIsShort }: BaseRequestFxParams) => {
    const id = uuidv4();

    // TODO: возможно стоить подумать
    // Но думаю ретраи нам вообще не пригодятся кроме кейса оплаты
    // Ид реквеста уникальный + на ретрай предыдущий
    // Возможно со стороны бекенда это должны быть metadata
    // а не раздувание sessionData до бесконечности
    // всевозможными параметрами
    // defer ?
    const req = retry({
      attempts: 3,
      codes: [grpc.Code.Unavailable, grpc.Code.Aborted],
      fn: () =>
        baseRequest(services, {
          ...params,
          reqId: uniq(id),
          versioning,
          sessionData,
          appIsShort,
        }),
    });

    return req({ signal: params.signal });
  }),
});

export function createBaseRequest<Method extends keyof CustomerHubService>(
  method: Method,
  mock?: RequestParams<Method>['mock'],
) {
  // Создаем уник ид на базовом уровне апи
  // При ретрае остаентся предыдущий ид
  return createEffect<Omit<RequestParams<Method>, 'method' | 'mock'>, Await<RequestReturn<Method>>, GrpcWebError>(
    params => {
      return baseRequestFx({ ...params, method, mock }) as Await<RequestReturn<Method>>;
    },
  );
}
