import { invoke } from '@withease/factories';
import { createEffect, sample } from 'effector';

import { createHooks, loaded } from '@/shared/pageRouting';
import { wasLogouted } from '@/shared/session';

import { customerQuery, cutomerAnalytics } from '@/features/customer';

import { attachOperation } from '@/lib/attachOperation';
import { analytics } from '@/lib/bridge';

export const pageHooks = createHooks({ pagename: 'ProfileMainPage' });

// Просто стнхронизировать данные с глобальным состоянием
// Потому что при логине и тд - глоабадлный запрашиваем
// Только для отображения инфы
// Текущий локально на профиль
// Потом мы это обновляем
const customerLocalQuery = invoke(() => attachOperation(customerQuery));

const mainFx = createEffect(async ({ ctrl }: { ctrl?: AbortController }) => {
  const scopedCtrl = ctrl ?? new AbortController();

  const rs = await Promise.allSettled([customerLocalQuery.fx([{}, scopedCtrl])]);

  return rs;
});

sample({
  source: customerLocalQuery.$result,
  filter: Boolean,
  clock: pageHooks.loadedGuarded,
  target: customerQuery.$result,
});

sample({
  clock: pageHooks.enterGuarded,
  fn: ({ ctrl }) => ({ ctrl }),
  target: mainFx,
});

sample({
  clock: wasLogouted,
  target: customerQuery.reset,
});

loaded({
  effect: mainFx,
  hooks: pageHooks,
});

analytics(() => {
  sample({
    clock: pageHooks.loadedGuarded,
    target: cutomerAnalytics.profilePageLoaded,
  });
});
