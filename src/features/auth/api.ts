import { attach } from 'effector';

import { $temporaryCartCode } from '@/shared/configs';
import { RequestParams, createBaseRequest } from '@/shared/request';

export const sendCode = createBaseRequest('GetAuthenticationCodeWeb');

export const checkAuthCode = attach({
  source: $temporaryCartCode,
  mapParams: (params: Omit<RequestParams<'AuthenticateByCode'>, 'method' | 'mock'>, temporaryCartCode) => ({
    ...params,
    body: {
      ...params.body,
      // Для того что бы в новой сессии для клик
      // Или для быстрой покупки бек понял что нужно сюда
      // вернуть данные пользователя
      customSessionCodes: [temporaryCartCode.code].filter(Boolean),
    },
  }),
  effect: createBaseRequest('AuthenticateByCode'),
});
