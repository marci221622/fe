import { createEvent, sample } from 'effector';
import { assign } from 'lodash';

import { sendAnalytic, itemToGTM, DYEvent } from '@/shared/analytics';
import { CatalogWithFiltersResponse } from '@/shared/catalog';
import { $isClient } from '@/shared/start';

import { ANALYTICS_PRODUCT_LEN_SSR } from '@/constants/analytics';

const catalogLoaded = createEvent<CatalogWithFiltersResponse>();
const filtersReset = createEvent<{ category?: string; attributes: string }>();
const filtersChanged = createEvent<CatalogWithFiltersResponse>();
const filterOpened = createEvent<{ title: string; rootCategory?: string; isSorting?: boolean }>();
const filteClosed = createEvent<{ title: string; method?: 'tap' | 'button' }>();
const resetSingleFilter = createEvent<{ ctx: 'toggle' | 'button' | 'popup'; content: string }>();
const applyFilters = createEvent<{ values: string; ctx: 'row' | 'column'; code: string; title: string }>();
const applySortingFilters = createEvent<{ sortType: string; categories: string }>();
const showAllCategories = createEvent<{ category: string }>();
const showMoreProducts = createEvent();

function getPageTypeFromCatalog(catalog: CatalogWithFiltersResponse): PageType {
  if (catalog.fulltext) {
    return 'SearchResults';
  }

  if (catalog.header?.brand) {
    return 'BrandPage';
  }

  return 'Catalog';
}

sample({
  source: $isClient,
  clock: catalogLoaded,
  fn: (isClient, rs) => {
    const type = getPageTypeFromCatalog(rs);

    return {
      dy: {
        type: isClient ? 'spa' : 'context',
        ctx: {
          lng: 'ru',
          type: type !== 'SearchResults' ? 'CATEGORY' : 'SEARCH',
          data: (type === 'SearchResults'
            ? [rs.fulltext]
            : [rs.header?.collection?.title ?? rs.header?.brand?.title]
          ).filter(Boolean),
        },
      } as DYEvent,
      gtm: [
        {
          event: 'Spa_pageview',
          pageType: type,
          ecommerce: {
            impressions: rs.items.slice(0, ANALYTICS_PRODUCT_LEN_SSR).map((it, index) => itemToGTM(it, index + 1)),
          },
          ...(type === 'SearchResults' && {
            searchKeyword: rs.fulltext, // поисковый запрос
          }),
          ...(type === 'BrandPage' && {
            vendorId: rs.header?.brand?.code,
            vendorName: rs.header?.brand?.title,
            vendorIdNum: rs.header?.brand?.id,
          }),
        },
      ],
    };
  },
  target: sendAnalytic,
});

sample({
  source: filterOpened,
  fn: ({ title, rootCategory, isSorting }) => ({
    gtm: [
      assign(
        {
          event: 'OWOX',
          eventCategory: 'Interactions',
          eventAction: 'click',
          eventLabel: isSorting ? 'filter_sort_open' : 'filter_open',
          eventContent: title, // клик по категории фильтра или корневая категория фильтра при первом открытии
        },
        rootCategory && {
          eventContext: rootCategory, // корневая категория/подкатегория фильтра
        },
      ),
    ],
  }),
  target: sendAnalytic,
});

sample({
  source: filteClosed,
  fn: ({ title, method }) => ({
    gtm: [
      {
        event: 'OWOX',
        eventCategory: 'Interactions',
        eventAction: 'click',
        eventLabel: 'filter_close',
        eventContent: title,
        eventContext: method,
      },
    ],
  }),
  target: sendAnalytic,
});

sample({
  source: filtersReset,
  fn: ({ category, attributes }) => ({
    gtm: [
      {
        event: 'OWOX',
        eventCategory: 'Interactions',
        eventAction: 'click',
        eventLabel: 'filter_reset_all',
        eventContent: category, // категория фильтра, через запятую если несколько
        eventContext: attributes, // категория параметров фильтра, через запятую если несколько
      },
    ],
  }),
  target: sendAnalytic,
});

sample({
  source: resetSingleFilter,
  fn: ({ content, ctx }) => ({
    gtm: [
      {
        event: 'OWOX',
        eventCategory: 'Interactions',
        eventAction: 'click',
        eventLabel: 'filter_reset_single',
        eventContent: ctx, // параметр фильтра
        eventContext: content, // категория параметров фильтра
      },
    ],
  }),
  target: sendAnalytic,
});

sample({
  source: applyFilters,
  fn: ({ values, ctx, title }) => ({
    dy: {
      type: 'event',
      payload: {
        name: 'Filter Items',
        properties: {
          eventType: 'filter-items-v1',
          filterType: title, // Name of filter (Color, Size, Brand, Category...)
          filterStringValue: values,
        },
      },
    } as DYEvent,

    gtm: [
      {
        event: 'OWOX',
        eventCategory: 'Interactions',
        eventAction: 'click',
        eventLabel: 'filter_apply',
        eventContent: values, // выбранный параметр фильтра (через запятую, если выбрано несколько)
        eventContext: ctx, // признак клика по фильтру
      },
    ],
  }),
  target: sendAnalytic,
});

sample({
  source: showAllCategories,
  fn: ({ category }) => ({
    gtm: [
      {
        event: 'OWOX',
        eventCategory: 'Interactions',
        eventAction: 'click',
        eventLabel: 'filter_apply_all',
        eventContent: category, // Категория фильтра
      },
    ],
  }),
  target: sendAnalytic,
});

sample({
  source: showMoreProducts,
  fn: () => ({
    gtm: [
      {
        event: 'OWOX',
        eventCategory: 'Interactions',
        eventAction: 'click',
        eventLabel: 'load_more_products',
      },
    ],
  }),
  target: sendAnalytic,
});

sample({
  source: applySortingFilters,
  fn: ({ sortType, categories }) => {
    const sortOrder: Record<string, string> = {
      'По возрастанию цены': 'ASC',
      'По убыванию цены': 'DESC',
    };

    const sortBy: Record<string, string> = {
      'По возрастанию цены': 'price',
      'По убыванию цены': 'price',
      'Выбор TSUM Collect': 'colelct',
      'Новые поступления': 'novetly',
      'По популярности': 'popularity',
    };

    return {
      dy: {
        type: 'event',
        payload: {
          name: 'Sort Items',
          properties: {
            eventType: 'sort-items-v1',
            sortOrder: sortOrder[sortType],
            sortBy: sortBy[sortType],
          },
        },
      } as DYEvent,
      gtm: [
        {
          event: 'OWOX',
          eventCategory: 'Interactions',
          eventAction: 'click',
          eventLabel: 'filter_sort_apply',
          eventContent: sortType, // тип выбраннной сортировки
          eventContext: categories, // корневая категория/подкатегория фильтра
        },
      ],
    };
  },
  target: sendAnalytic,
});

export const catalogAnalytics = {
  catalogLoaded,
  filtersReset,
  filtersChanged,
  filterOpened,
  filteClosed,
  resetSingleFilter,
  applyFilters,
  applySortingFilters,
  showAllCategories,
  showMoreProducts,
};
