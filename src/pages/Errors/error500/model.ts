import { createHooks, loaded } from '@/shared/pageRouting';

export const pageHooks = createHooks({ pagename: 'e500', waiting: false });

loaded({
  effect: pageHooks.remote,
  hooks: pageHooks,
});
