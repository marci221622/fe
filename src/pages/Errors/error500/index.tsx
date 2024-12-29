import { withEvents } from '@/shared/pageRouting';

import { builHandler } from '@/lib/remotePages';

import { pageHooks } from './model';
import Page from './Page';

// @ts-ignore
pageHooks.remote.use(builHandler('e500', Page));

export default withEvents(Page, {
  hooks: pageHooks,
});
