import loadable from '@loadable/component';

import { withEvents } from '@/shared/pageRouting';

import { builHandler } from '@/lib/remotePages';

import { pageHooks } from './model';

const Page = loadable(() => import(/* webpackChunkName: "e404" */ './Page'));

pageHooks.remote.use(builHandler('e404', Page));

export default withEvents(Page, {
  hooks: pageHooks,
});
