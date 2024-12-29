import { createEffect, sample } from 'effector';

import { OrderStatus } from '@/generated/customer_hub/enums/order_status';
import { createHooks, loaded } from '@/shared/pageRouting';

import { cutomerAnalytics } from '@/features/customer';
import { createCustomerOrders } from '@/features/orders';

import { analytics } from '@/lib/bridge';
import { createField } from '@/lib/createField';

export const filtersField = createField([OrderStatus.ACTIVE]);

export const pageHooks = createHooks({ authOnly: true, pagename: 'ProfileOrdersPage' });

export const orders = createCustomerOrders();

const mainFx = createEffect(async ({ ctrl, statuses }: { ctrl?: AbortController; statuses: OrderStatus[] }) => {
  const scopedCtrl = ctrl ?? new AbortController();

  const rs = await Promise.all([
    orders.query.fx([
      {
        statuses,
        pagination: undefined,
        sort: undefined,
      },
      scopedCtrl,
    ]),
  ]);

  return rs;
});

sample({
  clock: pageHooks.enterGuarded,
  fn: ({ ctrl }) => {
    return {
      statuses: [],
      ctrl,
    };
  },
  target: mainFx,
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
