import loadable from '@loadable/component';

import { withEvents } from '@/shared/pageRouting';

import { builHandler } from '@/lib/remotePages';

import { pageHooks } from './models';

const Page = loadable(() => import(/* webpackChunkName: "FavoriteList" */ './page'));

pageHooks.remote.use(builHandler('FavoriteList', Page));

export default withEvents(Page, {
  hooks: pageHooks,
});
