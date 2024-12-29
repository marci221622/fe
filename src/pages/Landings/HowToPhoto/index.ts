import loadable from '@loadable/component';

import { createHooks, withEvents } from '@/shared/pageRouting';

import { builHandler } from '@/lib/remotePages';

const Page = loadable(() => import(/* webpackChunkName: "Landings" */ './Page'));

const pageHooks = createHooks({ pagename: 'HowToPhoto', waiting: false });

pageHooks.remote.use(builHandler('HowToPhoto', Page));

export default withEvents(Page, {
  hooks: pageHooks,
});
