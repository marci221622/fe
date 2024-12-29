import { createEffect, sample } from 'effector';

import { loaded } from '@/shared/pageRouting';

import { basketAnalytics, fetchOrderByCode, isQuickByCheckoutData } from '@/features/basket';

import { analytics } from '@/lib/bridge';
import { createQuery, FxParams } from '@/lib/createQuery';
import { pageStatus } from '@/lib/status';

import { pageHooks } from './hooks';

export const orderQuery = createQuery({
  initialData: null,
  handler: ([{ orderCode }, ctrl]: FxParams<{ orderCode: string }>) =>
    fetchOrderByCode({ body: { orderCode }, signal: ctrl.signal }),
});

const mainFx = createEffect(
  async ({ ctrl, orderCode }: Omit<{ orderCode?: string }, 'sessionData'> & { ctrl?: AbortController }) => {
    const scopedCtrl = ctrl ?? new AbortController();

    const rs = await Promise.all([orderQuery.fx([{ orderCode: orderCode ?? '' }, scopedCtrl])]);

    return rs;
  },
);

sample({
  clock: pageHooks.enterGuarded,
  fn: ({ params, ctrl }) => ({
    ctrl,
    orderCode: params?.orderCode,
  }),
  target: mainFx,
});

sample({
  clock: mainFx.failData,
  fn: () => 404,
  target: pageStatus.change,
});

loaded({
  effect: mainFx,
  hooks: pageHooks,
});

analytics(() => {
  sample({
    source: { result: orderQuery.$result, params: pageHooks.$params },
    clock: pageHooks.loadedGuarded,
    fn: ({ result, params }) => ({
      data: result,
      orderCode: params?.params?.orderCode ?? '',
      isQuickBy: result ? isQuickByCheckoutData(result) : false,
    }),
    filter: it => !!it.result,
    target: basketAnalytics.typLoaded,
  });
});
