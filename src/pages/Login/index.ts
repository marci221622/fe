import { withEvents } from '@/shared/pageRouting';

import { pageHooks } from './model';
import Page from './page';

export default withEvents(Page, {
  hooks: pageHooks,
});
