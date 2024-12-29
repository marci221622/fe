import { createHooks } from '@/shared/pageRouting';

export const pageHooks = createHooks({ guestOnly: true, waiting: false, pagename: 'LoginPage' });
