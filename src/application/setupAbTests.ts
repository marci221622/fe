import { AB_TESTS_COOKIES } from '@/constants/cookies';

import { CookieServiceFactory } from '@/lib/services';

export function setupABTests(cookies: CookieServiceFactory) {
  const variant = cookies.get(AB_TESTS_COOKIES.miltyClickAndCollect);

  return {
    multyClickAndCollect: variant === 'B' ? ('variationB' as const) : ('variationA' as const),
  };
}
