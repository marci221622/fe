import { grpc } from '@improbable-eng/grpc-web';
import { attach, createEffect, createStore, sample } from 'effector';
import { omit } from 'lodash';

import { CustomerHubService, GrpcWebError } from '@/generated/customer_hub/customer-hub-service';
import { TokenResponse } from '@/generated/customer_hub/methods/auth/auth_by_code.v1';
import { $sessionData } from '@/shared/configs';
import { baseRequestFx, RequestParams, RequestReturn, createBaseRequest } from '@/shared/request';

import { createDefer, Defer } from '@/lib/defer';
import { parseJwt } from '@/lib/jwt';

import { SessionTokens } from '../types';

import { $session, setSession, logout } from './session';

// TODO: Переписать с использованием @/lib/services/grpc-web-details
const ERROR_TOKEN_MSG = 'token is not valid';

export const $pendingRequest = createStore<Defer<TokenResponse> | null>(null);

export const requestApi = {
  refreshTokenFx: createBaseRequest('RefreshToken'),
};

export const getTokensFx = createEffect<
  { defer: Defer<TokenResponse>; signal?: AbortSignal; refreshToken: string },
  TokenResponse
>(({ defer, signal, refreshToken }) => {
  const req = requestApi.refreshTokenFx({ body: { refreshToken }, signal });

  req.then(defer.rs, defer.rj);

  return defer.req;
});

// Рефрешит все запросы
// Какой первый падает - тот и начинает рефреш запускать
// Остальные запросу ждут
// В случае не удачи все запросы упадут
export const baseRefreshFx = attach({
  source: { pending: $pendingRequest, session: $session },
  effect: async ({ pending, session }, { signal }: { signal?: AbortSignal }) => {
    if (!pending) {
      const { exp = Infinity } = parseJwt(session);
      const currentMS = new Date().getTime() + 2 * 60 * 1000;

      if (session.accessToken && currentMS < exp * 1000) {
        return session as SessionTokens;
      }

      const defer = createDefer<TokenResponse>();

      return getTokensFx({ defer, signal, refreshToken: session.refreshToken });
    }

    return pending.req;
  },
});

// На основе baseRequestFx
// Дополняет реквесты возможностью токен рефреша
// И разлогинам на 401 ошибку
export const authRequestFx = attach({
  source: { session: $session, sessionData: $sessionData },
  effect: async ({ session, sessionData }, params: RequestParams & { silent?: boolean }) => {
    try {
      const result = await baseRequestFx({
        ...params,
        body: {
          ...omit(params?.body, 'cartCode'),
          sessionData: {
            ...sessionData,
            accessToken: session.accessToken || undefined,
            code: params?.body?.cartCode || sessionData.code,
          },
        },
      });

      return result;
    } catch (error) {
      if (error instanceof GrpcWebError && error.code === grpc.Code.Unauthenticated && !!session.accessToken) {
        const credentials = await baseRefreshFx({ signal: params.signal });

        return baseRequestFx({
          ...params,
          body: {
            ...omit(params?.body, 'cartCode'),
            sessionData: {
              ...sessionData,
              accessToken: credentials.accessToken,
              // code можно не гдобальный брать
              // а передать в тело, в body приоритет
              code: params?.body?.cartCode || sessionData.code,
            },
          },
        });
      }

      throw error;
    }
  },
});

export function createAuthRequest<Method extends keyof CustomerHubService>(
  method: Method,
  mock?: RequestParams<Method>['mock'],
) {
  return createEffect<Omit<RequestParams<Method>, 'method' | 'mock'>, Await<RequestReturn<Method>>, GrpcWebError>(
    params => authRequestFx({ ...params, method, mock }) as Await<RequestReturn<Method>>,
  );
}

$pendingRequest.on(getTokensFx, (_, { defer }) => defer).reset(getTokensFx.finally);

sample({ clock: getTokensFx.doneData, target: setSession });

sample({
  source: $session,
  clock: authRequestFx.fail,
  filter: (_, { params, error }) =>
    // @ts-ignore
    !params.silent && (error?.code === grpc.Code.Unauthenticated || error?.message === ERROR_TOKEN_MSG),
  target: logout,
});
