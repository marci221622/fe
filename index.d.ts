declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

declare type WidgetResult = {
  data: {
    email: Nullable<string>;
    transactionId: number;
  };
  status: 'success' | 'fail' | 'cancel' | 'rejected';
  type: 'payment';
};

class PaymentBlocks {
  constructor(config: any, settings: any): void;

  mount(element: HTMLElement): void;

  on(event: string, cb: (result: WidgetResult) => void): void;

  off(event: string): void;

  unmount(): void;
}

declare type CPCreptogramCreateError = {
  cardNumber?: string;
  cvv?: string;
  expDateMonth?: string;
  expDateYear?: string;
};

declare type CPCryptogramParams = {
  cvv: string;
  cardNumber?: string;
  expDateMonth?: string;
  expDateYear?: string;
};

class Checkout {
  constructor(config: any): void;

  createPaymentCryptogram(params: CPCryptogramParams): Promise<string>;
}

declare interface Window {
  FILTER_DATA: any[];
  INITIAL_STATE: Record<string, any>;
  dataLayer: any[];
  mindboxLayer: any[];
  // Что бы на любом стенде видеть логи
  loggerEnabled?: boolean;
  mindbox: (type: string, payload: any) => void;

  slSpaLoaded: boolean;
  SL?: {
    pageContext: any;
    API: (event: 'event' | 'spa', payload: any) => void;
  };

  cp: {
    PaymentBlocks: Constructable<PaymentBlocks>;
    Checkout: Constructable<Checkout>;
  };
}

declare type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;
declare type Await<T> = T extends PromiseLike<infer U> ? U : T;

declare type Device = 'mobile' | 'desktop';

declare type Coords = {
  latitude: number;
  longitude: number;
};

type SeoMeta = {
  seoText?: string;
  seoTextMore?: string;
  seoTitle?: string;
};

type CatalogMeta = {
  canonicalUrl?: string;
};

type BaseMetaType = {
  title?: string;
  description?: string;
  keywords?: string;
  ogDescription?: string;
  ogTitle?: string;
  ogType?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogUrl?: string;
  ogImageSecureUrl?: string;
  twitterCard?: string;
  twitterImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  ogAvailability?: string;
  elementImageTitle?: string;
  elementImageAlt?: string;
  robots?: string;
} & SeoMeta &
  CatalogMeta;

type PageType =
  | 'SearchPage'
  | 'SelCatalogPage'
  | 'CategoryPage'
  | 'Cart'
  | 'brands'
  | 'Main'
  | 'BrandPage'
  | 'Catalog'
  | 'ProductPage'
  | 'Checkout'
  | 'Profile'
  | 'SearchResults'
  | 'SelectionCatalog'
  | 'ThankYouPage'
  | 'wishList'
  | 'Unknown';
