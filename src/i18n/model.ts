import { Messages } from '@lingui/core';
import { createEffect, createEvent, createStore, sample } from 'effector';

import { appStarted } from '@/shared/start';

export const $locale = createStore('ru');
export const $messages = createStore<Messages>({});

export const changeLocale = createEvent<string>();

export const loadLocalesFx = createEffect(async ({ locale }: { locale: string }) => {
  const rootMessages = await import(/* webpackChunkName: "root-i18-[request]" */ `i18n/locales/${locale}.js`).then(
    ({ messages }) => messages as Messages,
  );

  return rootMessages;
});

$locale.on(loadLocalesFx.done, (_, { params }) => params.locale);
$messages.on(loadLocalesFx.doneData, (_, messages) => messages);

sample({
  clock: appStarted,
  source: $locale,
  fn: locale => ({ locale }),
  target: loadLocalesFx,
});

sample({
  clock: changeLocale,
  fn: locale => ({ locale }),
  target: loadLocalesFx,
});
