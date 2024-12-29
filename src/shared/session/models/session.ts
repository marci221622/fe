import { createEvent, createStore, sample } from 'effector';
import { not } from 'patronum';
import { v4 as uuidv4 } from 'uuid';

import { TokenResponse } from '@/generated/customer_hub/methods/auth/auth_by_code.v1';
import { updatedCartCode } from '@/shared/configs';

import { authTokenCookieName, refreshTokenCookieName } from '@/constants/cookies';
import { DAYS30 } from '@/constants/days';

import { parseJwt } from '@/lib/jwt';
import { createFx } from '@/lib/services';

import { revokeToken } from '../api';
import { SessionTokens } from '../types';

export const $session = createStore<SessionTokens>({ refreshToken: '', accessToken: '' });
export const $isAuthorized = $session.map(it => !!it.accessToken);

export const logout = createEvent();

export const setSession = createEvent<TokenResponse>();

export const saveCredentialsFx = createFx<TokenResponse, TokenResponse>(async (session, { cookies }) => {
  cookies.set(authTokenCookieName, session.accessToken, {
    expires: DAYS30,
  });
  cookies.set(refreshTokenCookieName, session.refreshToken, {
    expires: DAYS30,
  });

  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(session));
  }

  return session;
});

export const logoutFx = createFx<SessionTokens, string>(async (session, { cookies }) => {
  const { sub } = parseJwt(session);

  cookies.removeAll([authTokenCookieName, refreshTokenCookieName]);

  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt');
  }

  if (session.refreshToken) {
    await revokeToken({ body: { refreshToken: session.refreshToken } });
  }

  return sub ?? '';
});

export const wasLogouted = sample({ filter: not($isAuthorized), clock: logoutFx.finally });

$session.on(setSession, (_, { accessToken, refreshToken }) => ({ accessToken, refreshToken })).reset(logoutFx);

sample({ source: $session, clock: logout, filter: logoutFx.inFlight.map(actives => actives === 0), target: logoutFx });
sample({ clock: setSession, target: saveCredentialsFx });

sample({ clock: wasLogouted, fn: () => uuidv4(), target: updatedCartCode });
