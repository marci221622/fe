import { createEvent, createStore, sample } from 'effector';

import { SessionData } from '@/generated/customer_hub/entities/session_data.v1';
import { CheckoutType } from '@/generated/customer_hub/enums/checkout_type';
import { Platform } from '@/generated/customer_hub/enums/platform';

import { xidCookieName } from '@/constants/cookies';
import { DAYS365 } from '@/constants/days';

import { createFx } from '@/lib/services';

// Просто временное хранилище кода
// Для клика на пример или БП
// Для того что бы иметь независимые чекауты и в апи передавать их уникальные коды
export const $temporaryCartCode = createStore({ type: CheckoutType.UNRECOGNIZED, code: '' });
export const $temporaryClickAndCollectSeateld = $temporaryCartCode.map(
  it => !!it.code && it.type === CheckoutType.CHECKOUT_TYPE_CLICK_AND_COLLECT_ONE_CLICK,
);
export const $temporaryQuickBySeateld = $temporaryCartCode.map(
  it => !!it.code && it.type === CheckoutType.CHECKOUT_TYPE_ONE_CLICK,
);

// Дата для всех запросов
// ауз и нет
export const $sessionData = createStore<Omit<SessionData, 'ab' | 'requestToken'>>({
  // Чисто костыль для корзины (там код, аналог xid в цуме)
  // Не имеет отношения к авториации
  // Просто зачем то мы это передаем в каждый запрос
  code: '',
  deviceFingerprint: '',
  platform: Platform.PLATFORM_WEB,
  infoFields: [],
});

export const updatedCartCode = createEvent<string>();

export const updatedCartCodeFx = createFx<string, void>((xid, { cookies }) => {
  if (xid) {
    cookies.set(xidCookieName, xid, {
      expires: DAYS365,
    });
  } else {
    cookies.remove(xidCookieName);
  }
});

$sessionData.on(updatedCartCode, (prev, next) => ({ ...prev, code: next }));

sample({ clock: updatedCartCode, target: updatedCartCodeFx });
