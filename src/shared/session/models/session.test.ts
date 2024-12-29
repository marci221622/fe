import { allSettled, createEvent, fork, sample } from 'effector';

import { UserData } from '@/generated/customer_hub/entities/user_data.v1';
import { TokenResponse } from '@/generated/customer_hub/methods/auth/auth_by_code.v1';
import { $sessionData } from '@/shared/configs';
import { createHooks } from '@/shared/pageRouting';

import { authTokenCookieName, refreshTokenCookieName, xidCookieName } from '@/constants/cookies';
import { DAYS30, DAYS365 } from '@/constants/days';

import { $redirect } from '@/lib/redirect';
import { $baseServices } from '@/lib/services';

import { watchEffect, createTestBaseServices } from '../../../tests';

import { logoutFx, logout, setSession, $isAuthorized, $session } from './session';

jest.mock('uuid', () => ({ v4: () => 'next_xid' }));

jest.mock('@/constants/runtimeConfig', () => ({
  runtimeConfig: {
    HOSTNAME: 'http://frontend.test:3000',
  },
}));

const defaulCustomer = UserData.create({});

describe('@/shared/session', () => {
  const testPage = createHooks({ pagename: 'test' });

  it('logoutFx should called once', async () => {
    const { services, cookiesMocks } = createTestBaseServices();
    const scope = fork({
      values: new Map().set($baseServices, services),
    });

    const run = createEvent();

    sample({ clock: run, target: logout });

    const logoutWatchers = watchEffect(logoutFx, scope);

    await allSettled(testPage.enter, { scope, params: { url: '/cart' } });

    await Promise.all([allSettled(run, { scope }), allSettled(run, { scope }), allSettled(run, { scope })]);

    expect(logoutWatchers.listeners.onCall).toHaveBeenCalledTimes(1);
    expect(cookiesMocks.get).toHaveBeenCalledTimes(0);
    expect(cookiesMocks.set.mock.calls).toEqual([
      [authTokenCookieName, '', { expires: -1, overwrite: true, domain: '.frontend.test' }],
      [refreshTokenCookieName, '', { expires: -1, overwrite: true, domain: '.frontend.test' }],
      [xidCookieName, 'next_xid', { overwrite: true, expires: DAYS365, domain: '.frontend.test' }],
    ]);
    expect(scope.getState($sessionData).code).toBe('next_xid');
    expect(scope.getState($redirect)).toEqual({ to: '/login?backurl=/cart' });
  });

  it('should call setSession', async () => {
    const { services, cookiesMocks } = createTestBaseServices();
    const scope = fork({
      values: new Map().set($baseServices, services),
    });

    await allSettled(setSession, {
      scope,
      params: TokenResponse.create({
        accessToken: 'access-next',
        refreshToken: 'refresh-next',
        customerProfile: defaulCustomer,
      }),
    });

    expect(cookiesMocks.set.mock.calls).toEqual([
      [authTokenCookieName, 'access-next', { overwrite: true, expires: DAYS30, domain: '.frontend.test' }],
      [refreshTokenCookieName, 'refresh-next', { overwrite: true, expires: DAYS30, domain: '.frontend.test' }],
    ]);
    expect(scope.getState($isAuthorized)).toEqual(true);
    expect(scope.getState($session)).toEqual({ accessToken: 'access-next', refreshToken: 'refresh-next' });
  });
});
