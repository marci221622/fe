export const paths = {
  main: () => '/',
  home: {
    women: () => '/',
    men: () => '/men',
  },
  news: () => '/news',
  login: () => '/login',
  errors: {
    e404: () => '*',
    e500: () => '/error500',
  },
  catalog: {
    common: {
      /**
       * @deprecated
       * Удалить нужно будет когда приложения передут на нормальные ссылки
       * Путь как в коллекции (но по факту тут стоит меню)
       * Равносильно обычному каталогу который будет
       * catalog/:slug
       */
      // Свой код поддерживаем
      // eslint-disable-next-line deprecation/deprecation
      collectionHARDCODE: ({ menuCode = '', collection }: { menuCode?: string; collection?: string }) => {
        const path = '/collection/:collection/:menuCode';

        return collection
          ? path.replace(':collection', collection).replace(':menuCode', menuCode).replace('//', '/')
          : path;
      },
      /**
       * @deprecated нужен только что бы открыть старые ссылки
       */
      // Свой код поддерживаем
      // eslint-disable-next-line deprecation/deprecation
      withCollAndMenu: ({ menuCode = '', collection }: { menuCode?: string; collection?: string }) => {
        const path = '/catalog/:collection/:menuCode';

        return collection
          ? path.replace(':collection', collection).replace(':menuCode', menuCode).replace('//', '/')
          : path;
      },
    },
    /**
     * @deprecated нужен только что бы открыть старые ссылки
     */
    // Свой код поддерживаем
    // eslint-disable-next-line deprecation/deprecation
    brand: ({ collection = '', brandCode = '' }: { collection?: string; brandCode?: string }) => {
      const path = '/brand/:brandCode/:collection';

      return brandCode ? path.replace(':collection', collection).replace('//', '/') : path;
    },
    search: ({ q = '' }: { q?: string }) => {
      const path = '/search';

      return q ? `${path}?${q}` : path;
    },

    // Нужно поддержать старые урлы
    // + урлы сол слагом
    // Которые и будут внутри сайта использоваться
    withSlug: {
      // Конкретно этот урл исключение
      // Старый будет поддерживаться за счет фолбека на бекенде
      collection: ({ slug }: { slug?: string }) => {
        const path = '/collection/:slug';

        return slug ? path.replace(':slug', slug) : path;
      },
      common: ({ slug }: { slug?: string }) => {
        const path = '/catalog/:slug';

        return slug ? path.replace(':slug', slug).replace('//', '/') : path;
      },
      brand: ({ slug }: { slug?: string }) => {
        const path = '/brand/:slug';

        return slug ? path.replace(':slug', slug).replace('//', '/') : path;
      },
    },
  },
  profile: {
    info: () => '/profile/info',
    main: () => '/profile',
    orders: () => '/profile/orders',
    orderDetail: (code?: string) => {
      const path = '/profile/order/:orderCode';

      return code ? path.replace(':orderCode', code) : path;
    },
    stuff: () => '/profile/stuff',
    contacts: () => '/profile/contacts',
  },
  product: (code?: string) => {
    const path = '/item/:itemCode';

    return code ? path.replace(':itemCode', code) : path;
  },
  favorites: {
    main: () => '/favorites',
    brands: () => '/favorites/brands',
  },
  typ: ({ orderCode, isQuickBy }: { orderCode?: string; isQuickBy?: boolean }) => {
    const path = `/order/:orderCode/thanks`;
    const queries = isQuickBy ? '?qb=1' : '';

    return orderCode ? `${path.replace(':orderCode', orderCode)}${queries}` : path;
  },
  basket: () => '/cart',
  brandsList: () => '/brand',
  profSeller: () => '/profseller',
  categories: {
    root: () => '/catalog',
    collection: ({ collection }: { collection?: string }) => {
      const path = '/category/:collection';

      return collection ? path.replace(':collection', collection) : path;
    },
  },
  lastViewedProducts: () => '/profile/viewedItems',
  landings: {
    privacyPolicy: () => '/privacy-policy',
    faq: () => '/faq',
    faqSeller: () => '/faq_seller',
    faqProfSeller: () => '/faq_prof_seller',
    terms: () => '/terms',
    landing: () => '/landing',
    brandList: () => '/brand-list',
    seller: () => '/seller',
    howToPhoto: () => '/how_to_photo',
  },
};
