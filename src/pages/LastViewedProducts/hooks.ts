import { sample } from 'effector';

import { createHooks } from '@/shared/pageRouting';

import { additionalTitle } from '@/features/header';

export const pageHooks = createHooks({
  pagename: 'lastViewed',
  waiting: false,
});

sample({
  clock: pageHooks.loadedGuarded,
  fn: () => ({ type: 'text' as const, rows: ['Вы недавно смотрели'] }),
  target: additionalTitle.change,
});
