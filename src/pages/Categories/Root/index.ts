import loadable from '@loadable/component';

import { withEvents } from '@/shared/pageRouting';

import { builHandler } from '@/lib/remotePages';

import { pageHooks } from './hooks';

const Page = loadable(() => import(/* webpackChunkName: "categories" */ './Page'));

pageHooks.remote.use(builHandler('categories', Page));

export default withEvents(Page, {
  hooks: pageHooks,
});
