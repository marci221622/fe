import { useUnit } from 'effector-react';
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';

import { CatalogFilter_Type, CatalogFilter_Value } from '@/generated/customer_hub/entities/catalog_filter.v1';
import { Category } from '@/generated/customer_hub/entities/category.v1';
import { Slug } from '@/generated/customer_hub/entities/slug.v1';
import { ClientCatalogFilter } from '@/shared/catalog';

import { EXPECTED_FILTERS_GROUP_SEPARATOR, filtersCodes, NO_SEARCH_TITLE_KEY } from '@/constants/hardcode';

import { catalogAnalytics } from '../../models';
import { prepareFiltersToSearch, validateFiltersToSearch } from '../helpers';
import { treeToAppliedArray, pickAllSelected, treeToAppliedArrayFromFilter } from '../tree';
import { DraftFilters } from '../types';

import { useDySyncWithFilters } from './dy';
import { AdditionalFiltersSorting, useAdditionalSorting } from './sorting';

type Code = string;

type DraftFiltersState = { type: string; filters: DraftFilters; code: Code };
type DraftFiltersActions =
  | { type: 'reset'; payload?: Code[] } // скинуть все кроме (!)
  | { type: 'set'; payload: DraftFilters } // поставить без тригера на сервер
  | {
      type: 'apply';
      payload: CatalogFilter_Value[];
      code: Code;
    }; // поставить часть стейта с тригером на севрер

export type FiltersCtx = {
  actions: {
    // expect - фильтры которые мы не ресетим
    // Это значит что нажав ресет - мы скинем все кроме того что явно передали
    // Там может быть
    // - просто название
    // - название:значение1,значени2
    // Сделано для того что бы не реагировать на какой то из фильтров
    // Но остаться в памяти он должен, что бы потом отправить на бек
    // Задача https://jira.int.tsum.com/browse/POWEB-753
    resetAll: (expect?: Code[]) => void;
    apply: <T extends Code | 'sort' | 'collections'>(filters: CatalogFilter_Value[] | string[], code: T) => void;
  };
  draftFilters: DraftFilters;
  filtersFromServer: DraftFilters;
  additionalSortMap: AdditionalFiltersSorting;
  categorySortMap: Record<string, number>;
  categoryFromFilterSortMap: Record<string, number>;
  baseCounter: number;
  slug?: Slug;
  // коллекция что бы вытянуть по ней топ бренды из фб
  collection?: string;
};

const defaultEmpty: any[] = [];

export const filtersCtx = createContext<FiltersCtx | null>(null);
export const filtersActionsCtx = createContext<FiltersCtx | null>(null);

export function useLocalFilters<T extends Code | 'sort' | 'collections'>(code: T) {
  const value = useContext(filtersCtx);

  if (!value) {
    throw new Error('[filtersCtx]: must used inside provider');
  }

  return {
    ...value,
    // локальные фильтры
    // попадают сюда с сервера или когда применили какой то из списка
    // по ключу
    draftFilters: value.draftFilters[code] ?? defaultEmpty,
    // локальные фильтры все
    allFilters: value.draftFilters,
  };
}

const initialDraft: DraftFiltersState = {
  code: '',
  type: 'initial',
  filters: {
    collections: [],
  },
};

function draftFiltersReducer(state: DraftFiltersState, action: DraftFiltersActions): DraftFiltersState {
  switch (action.type) {
    case 'set':
      return { type: 'set', filters: { ...state.filters, ...action.payload }, code: '' };
    case 'apply':
      return { type: 'apply', filters: { ...state.filters, [action.code]: action.payload }, code: action.code };
    case 'reset': {
      const expect = action.payload;
      const nextFilters = { ...initialDraft.filters };

      // Оставляем фильтры которые передали в expect
      if (expect) {
        expect.forEach(field => {
          const isGrouppedFilter = field.includes(EXPECTED_FILTERS_GROUP_SEPARATOR);

          // Может быть так что это группа
          // И скинуть нужно только часть
          // Пример filterCode:value1,value2
          // Скинем все кроме value1,value2 для фильтра filterCode
          if (isGrouppedFilter) {
            const [groupFilterCode, value] = field.split(EXPECTED_FILTERS_GROUP_SEPARATOR);
            const groupValues = value.split(',');

            nextFilters[groupFilterCode] = state.filters[groupFilterCode].filter(filter =>
              groupValues.includes(filter.code),
            );
          } else if (state.filters[field]) {
            nextFilters[field] = state.filters[field];
          }
        });
      }

      return { type: 'reset', filters: nextFilters, code: '' };
    }
    default:
      return state;
  }
}

export function ControlProvider({
  children,
  currentFilters,
  categories,
  baseCounter,
  slug,
  collection,
}: {
  children: ReactNode;
  currentFilters: Record<string, ClientCatalogFilter>;
  categories: Category[];
  baseCounter: number;
  slug?: Slug;
  collection?: string;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const onResetAllFilters = useUnit(catalogAnalytics.filtersReset);

  // мапа категорий по урлу
  // Там корректная сортировка
  const { categorySortMap, categoryFromFilterSortMap } = useMemo(() => {
    return {
      categorySortMap: (search.get(filtersCodes.collections)?.split(',') ?? []).reduce(
        (acc, id, index) => ({ ...acc, [id]: index }),
        {},
      ) as Record<string, number>,
      categoryFromFilterSortMap: (search.get(filtersCodes.categoryFilter)?.split(',') ?? []).reduce(
        (acc, id, index) => ({ ...acc, [id]: index }),
        {},
      ) as Record<string, number>,
    };
  }, [search]);

  // Сделать из фильтров от бека
  // мапу на клиент по ключ-выбранные значения
  // что бы потом обноылять ее
  // и ее трансвормироть для запроса
  // ключевой стейт всех фильтров
  const filtersFromServer = useMemo(
    () =>
      Object.keys(currentFilters).reduce(
        (acc, key) => {
          if (currentFilters[key].type === CatalogFilter_Type.SWITCHABLE) {
            return {
              ...acc,
              [filtersCodes.toggles]: [
                ...(acc[filtersCodes.toggles] ?? []),
                ...(currentFilters[key]?.values.filter(it => it.selected) ?? []),
              ],
            };
          }

          if (currentFilters[key].type === CatalogFilter_Type.CATEGORY) {
            return {
              ...acc,
              [currentFilters[key].code]: treeToAppliedArrayFromFilter(currentFilters[key]).sort(
                (x, y) =>
                  (categoryFromFilterSortMap[x.code] ?? Infinity) - (categoryFromFilterSortMap[y.code] ?? Infinity),
              ),
            };
          }

          return currentFilters[key]?.code
            ? {
                ...acc,
                [currentFilters[key].code]: currentFilters[key]?.values.filter(it => it.selected),
              }
            : acc;
        },
        {
          ...initialDraft.filters,
          // TODO: бекенд херит сортировку
          // Ставим в урл 1,2,3
          // Потом бек вернет 2,3,1 и в урл пойдет 2,3,1,5
          collections: treeToAppliedArray(categories).sort(
            (x, y) => (categorySortMap[x] ?? Infinity) - (categorySortMap[y] ?? Infinity),
          ),
        } as DraftFilters,
      ),
    [currentFilters, categories, categoryFromFilterSortMap, categorySortMap],
  );

  const [draftFilters, setFilters] = useReducer(draftFiltersReducer, {
    ...initialDraft,
    filters: { ...initialDraft.filters, ...filtersFromServer },
  } as DraftFiltersState);

  const { additionalSortMap, actions: sortingActions } = useAdditionalSorting({ filtersFromServer });

  const onResetAll = useCallback(
    (expect?: Code[]) => {
      const category = pickAllSelected(categories)
        .map(it => it.title)
        .join(',');

      sortingActions.onReset();

      setFilters({
        type: 'reset',
        payload: expect,
      });

      onResetAllFilters({
        category,
        attributes: Object.keys(filtersFromServer)
          .filter(key => filtersFromServer[key].length > 0)
          .join(','),
      });
    },
    [categories, filtersFromServer, onResetAllFilters, sortingActions],
  );

  const onApply = useCallback<FiltersCtx['actions']['apply']>(
    (filters, code) => {
      sortingActions.onApply(filters, code);

      // @ts-ignore
      setFilters({
        type: 'apply',
        payload: filters,
        code,
      });
    },
    [sortingActions],
  );

  const values = useMemo(() => {
    return {
      actions: { resetAll: onResetAll, apply: onApply },
      draftFilters: draftFilters.filters,
      filtersFromServer,
      categoryFromFilterSortMap,
      additionalSortMap,
      categorySortMap,
      baseCounter,
      slug,
      collection,
    };
  }, [
    onResetAll,
    onApply,
    draftFilters.filters,
    filtersFromServer,
    categoryFromFilterSortMap,
    additionalSortMap,
    categorySortMap,
    baseCounter,
    slug,
    collection,
  ]);

  useEffect(() => {
    sortingActions.onSyncWithServer();
    setFilters({
      type: 'set',
      payload: filtersFromServer,
    });
  }, [filtersFromServer, sortingActions]);

  useEffect(() => {
    if (draftFilters.type === 'apply' || draftFilters.type === 'reset') {
      const filters = {
        ...prepareFiltersToSearch(draftFilters.filters),
        q: search.get(filtersCodes.search) ?? '',
      } as Record<string, string>;

      if (search.get(NO_SEARCH_TITLE_KEY) === '1') {
        filters[NO_SEARCH_TITLE_KEY] = '1';
      }

      navigate({
        pathname: location.pathname,
        search: new URLSearchParams(
          validateFiltersToSearch(
            mergeFiltersWithSearch({
              filters,
              search,
              expectedFilter: draftFilters.code,
              isReset: draftFilters.type === 'reset',
            }),
          ),
        ).toString(),
      });
    }
  }, [draftFilters.code, draftFilters.filters, draftFilters.type, location.pathname, navigate, search]);

  useDySyncWithFilters({ filtersFromServer });

  return <filtersCtx.Provider value={values}>{children}</filtersCtx.Provider>;
}

function mergeFiltersWithSearch({
  filters,
  search,
  expectedFilter,
  isReset,
}: {
  filters: Record<string, string>;
  search: URLSearchParams;
  expectedFilter: string;
  isReset: boolean;
}) {
  if (isReset) {
    return filters;
  }

  const { [expectedFilter]: notMergedFilter, ...rest } = filters;

  return {
    [expectedFilter]: notMergedFilter,
    ...Object.keys(rest).reduce((acc, key) => {
      const prevValues = search.get(key);

      if (prevValues) {
        return {
          ...acc,
          [key]: [...new Set([...prevValues.split(','), ...rest[key].split(',')])].join(','),
        };
      }

      return {
        ...acc,
        [key]: rest[key],
      };
    }, {}),
  };
}
