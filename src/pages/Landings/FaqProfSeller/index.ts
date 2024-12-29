import loadable from '@loadable/component';

import { createHooks, withEvents } from '@/shared/pageRouting';

import { builHandler } from '@/lib/remotePages';

const Page = loadable(() => import(/* webpackChunkName: "Landings" */ './Page'));

const pageHooks = createHooks({ pagename: 'FaqProfSeller', waiting: false });

pageHooks.remote.use(builHandler('FaqProfSeller', Page));

export default withEvents(Page, {
  hooks: pageHooks,
});
