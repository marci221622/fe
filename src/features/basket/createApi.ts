
import { StoreValue, attach, createEffect } from 'effector';

import { CustomerHubService, GrpcWebError } from '@/generated/customer_hub/customer-hub-service';
import { $temporaryCartCode } from '@/shared/configs';
import { RequestParams, RequestReturn } from '@/shared/request';
import { authRequestFx } from '@/shared/session';

type Params<Method extends keyof CustomerHubService> = Omit<RequestParams<Method>, 'method' | 'mock'>;
type FxParams<Method extends keyof CustomerHubService> = {
  params: Params<Method>;
  source: {
    temporaryCartCode: StoreValue<typeof $temporaryCartCode>;
  };
};

// метод для обработки сидов
// может быть общий и можно сделать по чекаутам (когда появится)
export function createBasketApi<Method extends keyof CustomerHubService>({
  method,
}: {
  method: Method;
  mock?: RequestParams<Method>['mock'];
}) {
  const fx = attach({
    source: { temporaryCartCode: $temporaryCartCode },
    mapParams: (params: Params<Method>, source) => ({ params, source }),
    effect: createEffect<FxParams<Method>, Await<RequestReturn<Method>>, GrpcWebError>(async ({ source, params }) => {
      const rs = (await authRequestFx({
        ...params,
        method,
        // Внутри реквест сам проставит другой код
        // если temporaryCartCode не будет
        body: { cartCode: source.temporaryCartCode.code, ...params.body },
      })) as Await<RequestReturn<Method>>;

      return rs;
    }),
  });

  return fx;
}
