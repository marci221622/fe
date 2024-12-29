import { invoke } from '@withease/factories';
import { createEffect, sample } from 'effector';

import { createHooks, loaded } from '@/shared/pageRouting';

import { createCustomerUpdater, customerQuery, cutomerAnalytics } from '@/features/customer';

import { attachOperation } from '@/lib/attachOperation';
import { analytics } from '@/lib/bridge';

export const pageHooks = createHooks({ authOnly: true, pagename: 'ProfileContactPage' });

export const customerUpdater = createCustomerUpdater();

// Просто стнхронизировать данные с глобальным состоянием
const customerLocalQuery = invoke(() => attachOperation(customerQuery));

const mainFx = createEffect(async ({ ctrl }: { ctrl?: AbortController }) => {
  const scopedCtrl = ctrl ?? new AbortController();

  const rs = await Promise.all([customerLocalQuery.fx([{}, scopedCtrl])]);

  return rs;
});

sample({
  clock: pageHooks.enterGuarded,
  fn: ({ ctrl }) => ({ ctrl }),
  target: mainFx,
});

sample({
  source: customerLocalQuery.$result,
  filter: Boolean,
  clock: pageHooks.loaded,
  target: customerQuery.$result,
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
