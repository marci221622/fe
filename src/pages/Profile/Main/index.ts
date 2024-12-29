import loadable from '@loadable/component';

import { withEvents } from '@/shared/pageRouting';

import { builHandler } from '@/lib/remotePages';

import { pageHooks } from './model';

const Page = loadable(() => import(/* webpackChunkName: "Profile" */ './page'));

pageHooks.remote.use(builHandler('ProfileMain', Page));

export default withEvents(Page, {
  hooks: pageHooks,
});