import loadable from '@loadable/component';

import { withEvents } from '@/shared/pageRouting';

import { builHandler } from '@/lib/remotePages';

import { pageHooks } from './hooks';

const Page = loadable(() => import(/* webpackChunkName: "Landings" */ './page'));

pageHooks.remote.use(builHandler('ProfSellerPage', Page));

export default withEvents(Page, {
  hooks: pageHooks,
});
