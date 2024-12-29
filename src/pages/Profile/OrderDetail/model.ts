import { createEffect, sample } from 'effector';

import { createHooks, loaded } from '@/shared/pageRouting';

import { fetchOrderDetails } from '@/features/orders';

import { createQuery, FxParams } from '@/lib/createQuery';

export const pageHooks = createHooks({ authOnly: true, pagename: 'ProfileOrdersPage' });

export const orderQuery = createQuery({
  initialData: null,
  handler: ([{ code }, ctrl]: FxParams<{ code: string }>) =>
    fetchOrderDetails({
      body: { code },
      signal: ctrl.signal,
    }),
});

const mainFx = createEffect(async ({ ctrl, code }: { ctrl?: AbortController; code: string }) => {
  const scopedCtrl = ctrl ?? new AbortController();

  const rs = await Promise.all([orderQuery.fx([{ code }, scopedCtrl]), pageHooks.remote({ ctrl: scopedCtrl })]);

  return rs;
});

sample({
  clock: pageHooks.enterGuarded,
  fn: ({ params }) => {
    return {
      code: params?.orderCode ?? '',
    };
  },
  target: mainFx,
});

loaded({
  effect: mainFx,
  hooks: pageHooks,
});
