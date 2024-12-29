import { grpc } from '@improbable-eng/grpc-web';
import { allSettled, createEvent, fork, sample } from 'effector';

import { GrpcWebError } from '@/generated/customer_hub/customer-hub-service';
import { $activePage } from '@/shared/pageRouting';
import { baseRequestFx, BaseRequestFxParams, RequestParams } from '@/shared/request';

import { delay } from '@/lib/delay';
import { $redirect } from '@/lib/redirect';

import { watchEffect } from '../../../tests';

import { authRequestFx, $pendingRequest, requestApi } from './request';
import { $session, logoutFx } from './session';

const createToken = (date: Date) =>
  `${btoa(JSON.stringify({ head: true }))}.${btoa(JSON.stringify({ exp: +date / 1e3 }))}`;

describe('@/shared/authRequestFx', () => {
  // Потому что baseRequestFx не вернул 401
  it('should called normaly (no need to refresh)', async () => {
    const start = createEvent();
    const scope = fork({
      handlers: new Map().set(baseRequestFx, () => 'response'),
    });
    const authFxWatchers = watchEffect(authRequestFx, scope);

    sample({ clock: start, fn: (): RequestParams => ({ method: 'GetHomeScreen' }), target: authRequestFx });

    await allSettled(start, { scope });

    expect(scope.getState($pendingRequest)).toBe(null);
    expect(scope.getState($session)).toEqual({ accessToken: '', refreshToken: '' });
    expect(authFxWatchers.listeners.onDoneData).toHaveBeenCalledWith('response');
  });

  // 401 по итогу
  it('should ommit refresh when 401 & refresh not exists (logout and redirect to login)', async () => {
    const start = createEvent();
    const scope = fork({
      // Выставить начальную страницу, связи находятся в модуле хука
      // Из-за циклов
      values: new Map().set($activePage, { url: '/cart' }),
      handlers: new Map()
        .set(baseRequestFx, () =>
          Promise.reject(new GrpcWebError('anauth', grpc.Code.Unauthenticated, new grpc.Metadata())),
        )
        .set(logoutFx, () => 'done'),
    });

    const authFxWatchers = watchEffect(authRequestFx, scope);
    const logoutFetchWatchers = watchEffect(logoutFx, scope);

    sample({ clock: start, fn: (): RequestParams => ({ method: 'AddCartItems' }), target: authRequestFx });

    await allSettled(start, { scope });

    expect(scope.getState($pendingRequest)).toBe(null);
    expect(scope.getState($redirect)).toEqual({ to: '/login?backurl=/cart' });
    expect(scope.getState($session)).toEqual({ accessToken: '', refreshToken: '' });
    expect(authFxWatchers.listeners.onFailData).toHaveBeenCalledWith(
      new GrpcWebError('anauth', grpc.Code.Unauthenticated, new grpc.Metadata()),
    );
    expect(logoutFetchWatchers.listeners.onDoneData).toHaveBeenCalledWith('done');
  });

  // Пойдем обновлять токен в первую очередь из-за того что метод вернул 401
  it('should call refresh token', async () => {
    const start = createEvent();
    const scope = fork({
      values: new Map().set($session, {
        refreshToken: createToken(new Date(new Date('Dec 13, 2022 09:00:00').getTime() / 1e3)),
        accessToken: createToken(new Date(new Date('Dec 13, 2022 09:00:00').getTime() / 1e3)),
      }),
      handlers: new Map()
        .set(baseRequestFx, (_: void, { params }: BaseRequestFxParams) => {
          return params.body?.sessionData?.accessToken !== 'new_token'
            ? Promise.reject(new GrpcWebError('anauth', grpc.Code.Unauthenticated, new grpc.Metadata()))
            : Promise.resolve('done');
        })
        .set(logoutFx, () => 'done')
        .set(requestApi.refreshTokenFx, () => {
          return delay(0).then(() => ({
            accessToken: 'new_token',
            refreshToken: createToken(new Date(new Date('Dec 16, 2022 09:00:00').getTime() / 1e3)),
          }));
        }),
    });

    const authFxWatchers = watchEffect(authRequestFx, scope);
    const logoutFetchWatchers = watchEffect(logoutFx, scope);

    sample({ clock: start, fn: (): RequestParams => ({ method: 'GetHomeScreen', body: {} }), target: authRequestFx });

    await allSettled(start, { scope });

    expect(scope.getState($pendingRequest)).toBe(null);
    expect(scope.getState($redirect)).toEqual(null);
    expect(scope.getState($session)).toEqual({
      accessToken: 'new_token',
      refreshToken: createToken(new Date(new Date('Dec 16, 2022 09:00:00').getTime() / 1e3)),
    });
    expect(authFxWatchers.listeners.onFailData).toHaveBeenCalledTimes(0);
    expect(logoutFetchWatchers.listeners.onDoneData).toHaveBeenCalledTimes(0);
  });

  // 1 метод вызовет рефреш
  // другие ждут или проверяют после 401 валидно ли
  it('should not be race condition', async () => {
    const start = createEvent();

    const safeDate = new Date();

    safeDate.setDate(safeDate.getDate() + 1);

    const nextAccessToken = createToken(safeDate);
    const initialAccessToken = createToken(new Date(new Date('Dec 12, 2021 09:00:00').getTime() / 1e3));

    const scope = fork({
      values: new Map().set($session, {
        refreshToken: '',
        // протухший токен + метод 401 дает
        accessToken: initialAccessToken,
      }),
      handlers: new Map()
        .set(baseRequestFx, (_: void, { params }: { params: RequestParams & { delay: number } }) => {
          return params.body?.sessionData?.accessToken !== nextAccessToken
            ? delay(params.delay).then(() =>
                Promise.reject(new GrpcWebError('anauth', grpc.Code.Unauthenticated, new grpc.Metadata())),
              )
            : delay(params.delay).then(() => 'done');
        })
        .set(logoutFx, () => 'done')
        .set(requestApi.refreshTokenFx, () => {
          return delay(0).then(() => ({
            accessToken: nextAccessToken,
            refreshToken: '',
          }));
        }),
    });

    const authFxWatchers = watchEffect(authRequestFx, scope);
    const logoutFetchWatchers = watchEffect(logoutFx, scope);
    const requestFetchWatchers = watchEffect(baseRequestFx, scope);
    const refreshTokenshWatchers = watchEffect(requestApi.refreshTokenFx, scope);

    sample({
      clock: start,
      fn: (): RequestParams & { delay: number } => ({ method: 'GetHomeScreen', delay: 0 }),
      target: authRequestFx,
    });

    sample({
      clock: start,
      fn: (): RequestParams & { delay: number } => ({ method: 'GetHomeScreen', delay: 100 }),
      target: authRequestFx,
    });

    sample({
      clock: start,
      fn: (): RequestParams & { delay: number } => ({ method: 'GetHomeScreen', delay: 200 }),
      target: authRequestFx,
    });

    await allSettled(start, { scope });

    expect(scope.getState($pendingRequest)).toBe(null);
    expect(scope.getState($redirect)).toEqual(null);
    expect(scope.getState($session)).toEqual({ accessToken: nextAccessToken, refreshToken: '' });
    expect(authFxWatchers.listeners.onFailData).toHaveBeenCalledTimes(0);
    // Токен получаем 1 раз
    // Далее даже если другие запросы падают с 401 - будет проверка
    // Потому что он мог уже обновится
    expect(refreshTokenshWatchers.listeners.onCall).toHaveBeenCalledTimes(1);
    expect(logoutFetchWatchers.listeners.onCall).toHaveBeenCalledTimes(0);
    expect(requestFetchWatchers.listeners.onCall).toHaveBeenCalledTimes(6);
  });
});
