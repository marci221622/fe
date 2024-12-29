import { combine, createEffect, sample } from 'effector';

import { Section } from '@/generated/customer_hub/enums/section';
import { HomeRequest } from '@/generated/customer_hub/methods/catalog/home.v1';
import { $mainScreenCellsOptions } from '@/shared/configs';
import { createHooks, loaded } from '@/shared/pageRouting';
import { changedGender } from '@/shared/session';

import { fetchHomeBlocks, homeAnalytics, transfrormHomeToList } from '@/features/home';

import { analytics } from '@/lib/bridge';
import { createQuery, FxParams } from '@/lib/createQuery';

const sectionByUrl: Record<string, Section> = {
  /* eslint-disable @typescript-eslint/naming-convention */
  '/': Section.SECTION_FEMALE,
  '/men': Section.SECTION_MALE,
  '/men/': Section.SECTION_MALE,
  /* eslint-enable @typescript-eslint/naming-convention */
};

export const pageHooks = createHooks({ pagename: 'HomePage', injectDYOther: false });

export const homeQuery = createQuery({
  initialData: null,
  abort: pageHooks.leave,
  handler: ([{ section }, ctrl]: FxParams<Omit<Omit<HomeRequest, 'platform'>, 'sessionData'>>) =>
    Promise.all([
      fetchHomeBlocks({ body: { section }, signal: ctrl.signal, platform: 'web-mobile' }),
      fetchHomeBlocks({ body: { section }, signal: ctrl.signal, platform: 'web' }),
    ]).then(([mobile, desktop]) => ({ mobile, desktop })),
});

const mainFx = createEffect(
  async ({ ctrl, section }: Omit<{ section: Section }, 'sessionData'> & { ctrl?: AbortController }) => {
    const scopedCtrl = ctrl ?? new AbortController();

    const rs = await Promise.all([homeQuery.fx([{ section }, scopedCtrl])]);

    return rs;
  },
);

export const $homeList = combine({ screens: homeQuery.$result, options: $mainScreenCellsOptions }).map(
  ({ screens, options }) => ({
    mobile: screens ? transfrormHomeToList(screens.mobile, options) : [],
    desktop: screens ? transfrormHomeToList(screens.desktop, options) : [],
  }),
);

const $queryParams = pageHooks.$params.map(params => ({
  section: sectionByUrl[params?.url] ?? Section.SECTION_FEMALE,
}));

sample({
  clock: pageHooks.enterGuarded,
  fn: ({ url }) => sectionByUrl[url] ?? Section.SECTION_FEMALE,
  target: changedGender,
});

sample({
  source: $queryParams,
  clock: pageHooks.enterGuarded,
  fn: (params, { ctrl }) => ({ ...params, ctrl }),
  target: mainFx,
});

loaded({
  effect: mainFx,
  hooks: pageHooks,
});

analytics(() => {
  sample({
    clock: pageHooks.loadedGuarded,
    target: homeAnalytics.homePageLoaded,
  });
});
