import { useUnit } from 'effector-react';
import { useCallback, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { CatalogFilter_Value } from '@/generated/customer_hub/entities/catalog_filter.v1';
import { convertQueriesToRequest } from '@/shared/catalog';
import { baseRequestFx, RequestParams, RequestReturn } from '@/shared/request';
import { $currentGender } from '@/shared/session';

import { filtersCodes } from '@/constants/hardcode';

import { usePrevious } from '@/lib/usePrevious';
import { useRequest } from '@/lib/useRequest';

import { useLocalFilters } from './ControllProvider';
import { prepareFiltersToSearch, validateFiltersToSearch } from './helpers';
import { DraftFilters } from './types';

type Props = {
  filters: DraftFilters;
  code: string;
  comparator?: (prev: CatalogFilter_Value[], next: CatalogFilter_Value[]) => boolean;
};

export function useCounter({ filters, code, comparator = () => true }: Props) {
  const [search] = useSearchParams();
  const params = useParams();
  const gender = useUnit($currentGender);
  const prevFilters = usePrevious(filters);
  const baseRequest = useUnit(baseRequestFx);
  const { slug } = useLocalFilters('sort');

  const needRequest =
    prevFilters?.[code] !== filters?.[code] &&
    (prevFilters?.[code] ? comparator(prevFilters?.[code], filters?.[code]) : true);

  const [{ request }, { status, data }] = useRequest({
    request: useCallback(
      async (params: Omit<RequestParams<'GetItems'>, 'method'>, signal) => {
        const rs = (await baseRequest({
          method: 'GetItems',
          body: {
            ...params.body,
            searchParams: {
              ...params.body?.searchParams,
              pageSize: '0',
            },
          },
          signal,
        })) as Await<RequestReturn<'GetItems'>>;

        return rs;
      },
      [baseRequest],
    ),
  });

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (needRequest) {
      const handler = setTimeout(() => {
        const queries = new URLSearchParams(
          validateFiltersToSearch({
            ...prepareFiltersToSearch(filters),
            q: search.get(filtersCodes.search) ?? '',
          }),
        );
        const body = convertQueriesToRequest({
          query: Object.fromEntries(queries),
          params,
          gender,
          slug,
        });

        request({ body });
      }, 300);

      return () => clearTimeout(handler);
    }
  }, [filters, gender, needRequest, params, request, search, slug]);

  return {
    status,
    counter: data?.itemsCount ? Number(data?.itemsCount) : null,
  };
}
