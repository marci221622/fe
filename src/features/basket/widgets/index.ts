import loadable from '@loadable/component';

export const OneClickModal = loadable(() => import('./OneClickModal/View'), { ssr: false });

export const CheckoutAsModal = loadable(() => import('./CheckoutAsModal/View'), { ssr: false });

export const QuickByModal = loadable(() => import('./QuickByModal/View'), { ssr: false });

export const CollectRequiredFieldsModal = loadable(() => import('./RequiredFieldsModal/ClickAndCollect'), {
  ssr: false,
});

export const CheckoutRequiredFieldsModal = loadable(() => import('./RequiredFieldsModal/Checkout'), { ssr: false });
