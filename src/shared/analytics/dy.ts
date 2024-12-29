import { createEffect, createEvent, sample } from 'effector';
import { useUnit } from 'effector-react';
import { isEmpty } from 'lodash';
import { useCallback, useEffect } from 'react';

import { prodLoggerEnabled } from '@/constants/runtimeConfig';

import { $isClient, $isServer } from '../start';

import { addToStaticAnalytic } from './static';
import { DYEvent } from './types';

export const sendSL = createEvent<DYEvent>();

export const sendSLFx = createEffect((payload: DYEvent) => {
  if (window.SL) {
    switch (payload.type) {
      case 'context': {
        window.SL.pageContext = payload.ctx;
        break;
      }

      case 'spa': {
        const data = {
          context: payload.ctx,
          url: globalThis.location.href,
          countAsPageview: true,
        };

        if (prodLoggerEnabled()) {
          console.log('SL:SPA ->', data);
        }

        window.SL.API('spa', data);
        break;
      }

      case 'event': {
        if (prodLoggerEnabled()) {
          console.log('SL:EVENT ->', payload.payload);
        }

        window.SL.API('event', payload.payload);
        break;
      }
      default:
        break;
    }
  }
});

sample({
  filter: $isClient,
  clock: sendSL,
  target: sendSLFx,
});

sample({
  source: $isServer,
  clock: sendSL,
  filter: (isServer, params) => isServer && params.type === 'context',
  // @ts-ignore
  fn: (_, event) => ({ type: 'slCtx' as const, payload: event.ctx }),
  target: addToStaticAnalytic,
});

export function useDYReady() {
  const send = useUnit(sendSL);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      document.dispatchEvent(new CustomEvent('sl-ready'));
      window.slSpaLoaded = true;

      if (window.SL?.pageContext && !isEmpty(window.SL?.pageContext)) {
        send({ type: 'spa', ctx: window.SL?.pageContext });
      }
    });

    return () => {
      cancelAnimationFrame(id);
    };
  }, [send]);
}

export function useDYFilters() {
  const dy = useUnit(sendSL);

  return useCallback(
    ({ filterField, value }: { filterField: string; value?: number | string }) => {
      if (value) {
        dy({
          type: 'event',
          payload: {
            name: 'Filter Items Joined',
            properties: {
              filterType: filterField,
              filterStringValue: String(value),
            },
          },
        });
      }
    },
    [dy],
  );
}

export const SELECTORS = {
  meta: {
    type: 'data-meta-name',
    list: {
      logo: 'logo',
      menu: 'menu',
      genders: 'gender_block',
      breadcrumbs: 'breadcrumbs',
      catalogTitle: 'heading',
      catalogFiltersReset: 'reset_filters',
      catalogFilters: 'filters',
      catalogCounter: 'catalog_counter',
      catalogList: 'catalog', // Родитель товаров
      catalogProduct: 'product',
      search: 'search', // глобальный инпут поиска
      catalogShowMore: 'show_more',
      catalogPagination: 'pagination',
      catalogSeoText: 'catalog_description',
      catalogEmptyText: 'nothing_found',
    },
  },
  pageType: {
    type: 'data-page-type',
    list: {
      homePage: 'homepage', // главная
      catalogOrEmptyCatalog: 'category', // каталог/пустой каталог
      brandOrEmptyBrand: 'brand', // страница бренда/пустого бренда
      product: 'product', // КТ
      cartOrEmptyCart: 'cart', // корзина/пустая корзина
      checkout: 'checkout', // чекаут
      notFoundPage: '404', // 404 страница
      searchOrEmptySearchCatalog: 'search', // поиск/пустой поиск,
      login: 'login', // логин
    },
  },
  id: {
    type: 'data-id',
    list: {
      productId: (id: number) => id,
    },
  },
};

export function getDYSelector(
  params:
    | { type: 'meta'; name: keyof typeof SELECTORS.meta.list }
    | { type: 'id'; name: keyof typeof SELECTORS.id.list; id: number }
    | { type: 'pageType'; page: keyof typeof SELECTORS.pageType.list },
) {
  if (params.type === 'meta') {
    return {
      [SELECTORS.meta.type]: SELECTORS.meta.list[params.name],
    };
  }

  if (params.type === 'pageType') {
    return {
      [SELECTORS.pageType.type]: SELECTORS.pageType.list[params.page],
    };
  }

  return {
    [SELECTORS.id.type]: SELECTORS.id.list[params.name](params.id),
  };
}
