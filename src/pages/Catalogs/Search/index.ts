import loadable from '@loadable/component';

import { withEvents } from '@/shared/pageRouting';

import { builHandler } from '@/lib/remotePages';

import { pageHooks } from './hooks';

const Page = loadable(() => import(/* webpackChunkName: "Catalog" */ './page'));

pageHooks.remote.use(builHandler('Catalog', Page));

export default withEvents(Page, {
  hooks: pageHooks,
});
