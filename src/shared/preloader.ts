import { Scope, Store } from 'effector';
import { v4 as uuidv4 } from 'uuid';

import { Section, sectionFromJSON } from '@/generated/customer_hub/enums/section';

import {
  authTokenCookieName,
  currentGenderCookieName,
  fingerprintCookieName,
  refreshTokenCookieName,
  xidCookieName,
} from '@/constants/cookies';
import { DAYS365 } from '@/constants/days';

import { CookieServiceFactory } from '@/lib/services';

import { $sessionData } from './configs';
import { $currentGender, $session } from './session';

export function getPreloadedState({ cookies, map }: { cookies: CookieServiceFactory; map: Map<Store<any>, any> }) {
  let sid = '';
  const accessToken = cookies.get(authTokenCookieName);
  const refreshToken = cookies.get(refreshTokenCookieName);
  const gender = cookies.get(currentGenderCookieName);
  const fuuid = cookies.get(fingerprintCookieName) ?? uuidv4(); // fuuid сгенерится один раз или возмется из куки

  // Ставим куку только если мы гость
  // Если мы ауз - бек сам подставит все
  if (!accessToken) {
    sid = cookies.get(xidCookieName) || uuidv4(); // xid сгенерится один раз или возмется из куки
  }

  map
    .set($currentGender, gender ? sectionFromJSON(gender) : Section.SECTION_FEMALE)
    .set($sessionData, {
      ...$sessionData.defaultState,
      code: sid,
      deviceFingerprint: fuuid,
    })
    .set($session, {
      accessToken: accessToken ?? '',
      refreshToken: refreshToken ?? '',
    });

  return map;
}

// Проставить куки, которые нужны для работы
// xidCookieName - возможно изменится
// Так же xid в апи в body в приоритете над глобальным
export function setDefaultCookies({ cookies, scope }: { cookies: CookieServiceFactory; scope: Scope }) {
  const sid = scope.getState($sessionData).code;

  if (sid) {
    cookies.set(xidCookieName, sid, { expires: DAYS365 });
  }

  cookies.set(fingerprintCookieName, scope.getState($sessionData).deviceFingerprint, { expires: DAYS365 });
}
