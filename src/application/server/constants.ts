export const SSR_API_DOMAIN = process.env.RAZZLE_SSR_API_DOMAIN!;
export const APM_DOMAIN = process.env.RAZZLE_APM_DOMAIN!;

export const enum APM_SPAN_NAMES {
  RENDER = 'render',
  FORK = 'fork',
  remotepages = 'remotepages',
  appStart = 'appStart',
  pageStart = 'pageStart',
  loaded = 'loaded',
}

export const HEADERS = {
  // ставим short
  deprecatedHeader: 'x-navigation-disabled',
  // новый хедер (более читабельный)
  appVariantHeader: 'x-collect-app-variant',
  // Заголовки от цум для сохранения юзер данных
  additionalUserData: {
    name: 'x-collect-username',
    phone: 'x-collect-userphone',
  },
};

export const HEDERS_APP_VARIANT = [
  {
    key: HEADERS.deprecatedHeader,
    value: '',
  },
  {
    key: HEADERS.appVariantHeader,
    value: 'short',
  },
];
