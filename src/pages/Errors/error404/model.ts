import { sample } from 'effector';

import { createHooks, loaded } from '@/shared/pageRouting';

import { pageStatus } from '@/lib/status';

export const pageHooks = createHooks({ pagename: 'e404', waiting: false });

sample({ clock: pageHooks.enterGuarded, fn: () => 404, target: [pageStatus.change] });

loaded({
  effect: pageHooks.remote,
  hooks: pageHooks,
});
