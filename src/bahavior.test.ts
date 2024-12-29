import { fork } from 'effector';

import { Section } from '@/generated/customer_hub/enums/section';
import { $sessionData } from '@/shared/configs';
import { setDefaultCookies, getPreloadedState } from '@/shared/preloader';
import { $currentGender, $session } from '@/shared/session';

import { authTokenCookieName, fingerprintCookieName, xidCookieName } from '@/constants/cookies';
import { DAYS365 } from '@/constants/days';

import { $baseServices, CookieServiceFactory } from '@/lib/services';

import { createTestBaseServices } from './tests';

jest.mock('@/constants/runtimeConfig', () => ({
  runtimeConfig: {
    HOSTNAME: 'http://frontend.test:3000',
  },
}));

jest.mock('uuid', () => ({
  v4: () => 'v4',
}));

// Тесты для глобального поведения в приложении
// Тут проверяются базовые куки которые мы выставляем
// Это xid (он только после авторизации и продлевается на каждый заход)
// И фингер принт (тот же uuidv4)
describe('bahavior/setDefaultCookies', () => {
  it('deviceFingerprint should be stored always', async () => {
    const { services, cookiesMocks } = createTestBaseServices(true);
    const scope = fork({
      values: new Map().set($baseServices, services).set($sessionData, { deviceFingerprint: 'deviceFingerprint' }),
    });

    setDefaultCookies({ scope, cookies: services.cookies });

    expect(cookiesMocks.set.mock.calls).toEqual([
      [fingerprintCookieName, 'deviceFingerprint', { overwrite: true, expires: DAYS365, domain: '.frontend.test' }],
    ]);
  });

  it('xidCookieName should be stored when cookies exists', async () => {
    const { services, cookiesMocks } = createTestBaseServices(true);
    const scope = fork({
      values: new Map()
        .set($baseServices, services)
        .set($sessionData, { deviceFingerprint: 'deviceFingerprint', code: 'xid' }),
    });

    setDefaultCookies({ scope, cookies: services.cookies });

    expect(cookiesMocks.set.mock.calls).toEqual([
      [xidCookieName, 'xid', { overwrite: true, expires: DAYS365, domain: '.frontend.test' }],
      [fingerprintCookieName, 'deviceFingerprint', { overwrite: true, expires: DAYS365, domain: '.frontend.test' }],
    ]);
  });
});

describe('bahavior/getPreloadedState', () => {
  it('should create sid (code) when user is guest & xid NOT in cookies', async () => {
    const cookies = { set: jest.fn(), get: jest.fn() };
    const state = getPreloadedState({ cookies: new CookieServiceFactory(cookies), map: new Map() });

    expect(state.get($currentGender)).toEqual(Section.SECTION_FEMALE);
    expect(state.get($sessionData)).toEqual({
      ...$sessionData.defaultState,
      code: 'v4',
      deviceFingerprint: 'v4',
    });
    expect(state.get($session)).toEqual({
      accessToken: '',
      refreshToken: '',
    });
  });

  it('should store sid (code) when user is guest & xid IN cookies', async () => {
    const cookies = {
      set: jest.fn(),
      get: jest.fn().mockImplementation(cookieName => {
        if (cookieName === xidCookieName) {
          return 'xid_from_cookies';
        }

        return undefined;
      }),
    };
    const state = getPreloadedState({ cookies: new CookieServiceFactory(cookies), map: new Map() });

    expect(state.get($currentGender)).toEqual(Section.SECTION_FEMALE);
    expect(state.get($sessionData)).toEqual({
      ...$sessionData.defaultState,
      code: 'xid_from_cookies',
      deviceFingerprint: 'v4',
    });
    expect(state.get($session)).toEqual({
      accessToken: '',
      refreshToken: '',
    });
  });

  it('should return empty sid (code) when user is auth & xid IN cookies', async () => {
    const cookies = {
      set: jest.fn(),
      get: jest.fn().mockImplementation(cookieName => {
        if (cookieName === xidCookieName) {
          return 'xid_from_cookies';
        }

        if (cookieName === authTokenCookieName) {
          return 'token';
        }

        return undefined;
      }),
    };
    const state = getPreloadedState({ cookies: new CookieServiceFactory(cookies), map: new Map() });

    expect(state.get($currentGender)).toEqual(Section.SECTION_FEMALE);
    expect(state.get($sessionData)).toEqual({
      ...$sessionData.defaultState,
      code: '',
      deviceFingerprint: 'v4',
    });
    expect(state.get($session)).toEqual({
      accessToken: 'token',
      refreshToken: '',
    });
  });

  it('should return empty sid (code) when user is auth & xid NOT in cookies', async () => {
    const cookies = {
      set: jest.fn(),
      get: jest.fn().mockImplementation(cookieName => {
        if (cookieName === authTokenCookieName) {
          return 'token';
        }

        return undefined;
      }),
    };
    const state = getPreloadedState({ cookies: new CookieServiceFactory(cookies), map: new Map() });

    expect(state.get($currentGender)).toEqual(Section.SECTION_FEMALE);
    expect(state.get($sessionData)).toEqual({
      ...$sessionData.defaultState,
      code: '',
      deviceFingerprint: 'v4',
    });
    expect(state.get($session)).toEqual({
      accessToken: 'token',
      refreshToken: '',
    });
  });
});
