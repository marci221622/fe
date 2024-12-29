import { useEffect } from 'react';

import { DAYS365 } from '@/constants/days';

import { useBaseServices } from '@/lib/services';

// https://tin-valley-24c.notion.site/5-a52387241a174a5096041ddfcd4c370d
export const useCopySLCookies = () => {
  const services = useBaseServices();

  useEffect(() => {
    if (services) {
      const slid = services.cookies.get('_slid') ?? null;

      if (slid) {
        services.cookies.set('_slid_server', slid, { expires: DAYS365 });
      }
    }
  }, [services]);
};
