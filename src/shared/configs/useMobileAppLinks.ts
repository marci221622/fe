import { useEffect, useState } from 'react';

import { CookieServiceFactory, useBaseServices } from '@/lib/services';

const IOS_APP_LINK_URL = 'https://app.appsflyer.com/id6443570090';
const ANDROID_APP_LINK_URL = 'https://app.appsflyer.com/ru.tsum.collect';
const AUTO_APP_LINK_URL = 'https://collect.onelink.me/kcdl';
// для QR кода спецом хардкодим ссылку с нужными utm метками
const QR_APP_LINK =
  'https://collect.onelink.me/kcdl?pid=tsum_collect&c=cn.tsum-collect-landing-qr_ts.tsum-collect_dpt.tsum-collect&af_channel=tsum-collect';

const defaultLinkQueryParam = '(none)';

function computeStringifiedParamsFromCookies(cookies: CookieServiceFactory) {
  const params = {
    /* eslint-disable @typescript-eslint/naming-convention */
    pid: 'tsum_collect',
    c: cookies.get('_channelGrouping') ?? defaultLinkQueryParam,
    af_channel: cookies.get('_utm_source') ?? '(direct)',
    af_sub1: cookies.get('_utm_medium') ?? '(not%20set)',
    af_ad: cookies.get('_utm_campaign') ?? '(not%20set)',
    af_adset: cookies.get('_utm_content') ?? defaultLinkQueryParam,
    af_sub2: cookies.get('_utm_term') ?? defaultLinkQueryParam,
    af_sub3: cookies.get('_ga')?.split?.('.')?.slice(-2)?.join('.') ?? defaultLinkQueryParam,
    af_sub4: cookies.get('gtmc_userid') ?? defaultLinkQueryParam,
    /* eslint-enable @typescript-eslint/naming-convention */
  };

  return new URLSearchParams(params).toString();
}

export function useMobileAppDownloadLinks() {
  const services = useBaseServices();
  const [params, setParams] = useState('');

  useEffect(() => {
    if (services) {
      setParams(computeStringifiedParamsFromCookies(services.cookies));
    }
  }, [services]);

  return {
    ios: `${IOS_APP_LINK_URL}?${params}`,
    android: `${ANDROID_APP_LINK_URL}?${params}`,
    auto: `${AUTO_APP_LINK_URL}?${params}`,
    qr: QR_APP_LINK,
  };
}
