import { createEffect, sample } from 'effector';

import { Section } from '@/generated/customer_hub/enums/section';
import { sendAnalytic } from '@/shared/analytics';
import { brandsLoaderFx, favoriteBrandsQuery } from '@/shared/brands';
import { loaded, createHooks } from '@/shared/pageRouting';
import { $currentGender } from '@/shared/session';

import { analytics } from '@/lib/bridge';

export const pageHooks = createHooks({
  pagename: 'BrandListPage',
  needGenderSwitcher: true,
});

const mainFx = createEffect(async ({ ctrl, section }: { ctrl?: AbortController; section: Section }) => {
  const scopedCtrl = ctrl ?? new AbortController();

  const rs = await Promise.all([brandsLoaderFx([{}, scopedCtrl]), favoriteBrandsQuery.fx([{ section }, scopedCtrl])]);

  return rs;
});

sample({
  source: $currentGender,
  clock: pageHooks.enterGuarded,
  fn: (section, { ctrl }) => ({ ctrl, section }),
  target: mainFx,
});

loaded({
  effect: mainFx,
  hooks: pageHooks,
});

analytics(() => {
  sample({
    clock: pageHooks.enterGuarded,
    fn: () => ({
      gtm: [
        {
          pageType: 'Brands',
          event: 'Spa_pageview',
        },
      ],
    }),
    target: sendAnalytic,
  });
});
