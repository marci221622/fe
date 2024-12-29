
import { useCallback, useEffect, useMemo, useState } from 'react';

type Props<T> = {
  data: T[];
  pageSize?: number;
};

export function useVirtualPagination<T>({ data, pageSize = 10 }: Props<T>) {
  const [currentPage, setPage] = useState(1);

  const onLoadMore = useCallback(() => {
    setPage(prev => prev + 1);
  }, []);
  const dataByChunks = useMemo(() => data.slice(0, currentPage * pageSize), [currentPage, data, pageSize]);
  const hasMore = dataByChunks.length < data.length;
  const dataLength = dataByChunks.length;

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (data) {
      return () => {
        setPage(1);
      };
    }
  }, [data]);

  return {
    onLoadMore,
    data: dataByChunks,
    hasMore,
    dataLength,
  };
}
