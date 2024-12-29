import cn from 'classnames';
import { useMemo, ComponentPropsWithoutRef } from 'react';

import { Chevron } from '../assets/icons';

import { PaginationPage } from './types';

import st from './styles.module.scss';

// FROM_TSUM_APP
export const DOTS = '…' as const;

interface Props extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  current: number;
  total: number;
  pageSize: number;
  onChange: (pageNumber: number) => void;
  baseUrl?: string;
  prevIconRender?: React.FC<{ className: string; onClick: (event: React.MouseEvent<Element, MouseEvent>) => void }>;
  nextIconRender?: React.FC<{ className: string; onClick: (event: React.MouseEvent<Element, MouseEvent>) => void }>;
  pageRender?: React.FC<{
    className: string;
    onClick: (event: React.MouseEvent<Element, MouseEvent>) => void;
    key: string | number | null;
  }>;
  numberToShow?: number;
}

export const Pagination = ({
  current,
  total,
  pageSize,
  prevIconRender: PrevIconRender,
  nextIconRender: NextIconRender,
  pageRender: PageRender,
  onChange,
  baseUrl,
  className,
  numberToShow = 6,
  ...rest
}: Props) => {
  const totalPages = Math.ceil(total / pageSize);
  const pages = [...Array(totalPages)].map((_, i) => ({ page: i + 1, id: `page${i}` }));

  const actualPages = useMemo(
    () =>
      pages
        .map(page => {
          const pageNumber = page.page;
          const leftOffset = 2;
          const rightOffset = 1;

          const dots: PaginationPage = { page: DOTS, id: `dots${pageNumber}` };
          const skip: PaginationPage = { page: null, id: `null${pageNumber}` };
          const inStart = current < numberToShow;
          const inEnd = totalPages + 1 - current < numberToShow;

          const offsetFromEdge = inStart ? pageNumber : totalPages + 1 - pageNumber;
          const currentLeftOffset = current - pageNumber;
          const currentRightOffset = pageNumber - current;

          const isDots = currentLeftOffset === leftOffset + 1 || currentRightOffset === rightOffset + 1;
          const isSkip = currentLeftOffset > leftOffset + 1 || currentRightOffset > rightOffset + 1;

          if (pageNumber === 1 || pageNumber === totalPages) {
            return page;
          }

          if (inStart || inEnd) {
            if (offsetFromEdge === numberToShow + 1) {
              return dots;
            }

            if (offsetFromEdge > numberToShow) {
              return skip;
            }

            return page;
          }

          if (isDots) {
            return dots;
          }

          if (isSkip) {
            return skip;
          }

          return page;
        })
        .filter(({ page }) => Boolean(page)),
    [current, numberToShow, pages, totalPages],
  );

  const handlePageChange = (value: number | typeof DOTS | null) => (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();

    if (value === null || value === DOTS || value < 1 || value > totalPages) {
      return;
    }

    onChange(value);
  };

  if (totalPages === 1) return null;

  return (
    <div className={cn(st.paginationWrapper, className)} {...rest}>
      {PrevIconRender ? (
        <PrevIconRender
          className={cn(st.prevBtn, { [st.disable]: current === 1 })}
          onClick={handlePageChange(current - 1)}
        />
      ) : (
        <div className={cn(st.prevBtn, { [st.disable]: current === 1 })} onClick={handlePageChange(current - 1)}>
          <Chevron />
        </div>
      )}

      {actualPages.map(({ page, id }) => {
        const hasQuery = baseUrl?.includes('?');
        const pagePath = hasQuery ? `${baseUrl}&page=${page}` : `${baseUrl}?page=${page}`;
        // Page may be '...'
        const pageLink = typeof page === 'number' ? pagePath : null;

        if (!pageLink) {
          return (
            <div
              key={id}
              onClick={handlePageChange(page)}
              className={cn(st.numberBtn, { [st.active]: page === current, [st.dots]: page === DOTS })}
            >
              {page}
            </div>
          );
        }

        return (
          <a
            href={pageLink}
            key={id}
            onClick={handlePageChange(page)}
            className={cn(st.numberBtn, { [st.active]: page === current, [st.dots]: page === DOTS })}
          >
            {page}
          </a>
        );
      })}

      {NextIconRender ? (
        <NextIconRender
          className={cn(st.nextBtn, { [st.disable]: current === totalPages })}
          onClick={handlePageChange(current + 1)}
        />
      ) : (
        <div
          className={cn(st.nextBtn, { [st.disable]: current === totalPages })}
          onClick={handlePageChange(current + 1)}
        >
          <Chevron />
        </div>
      )}
    </div>
  );
};
