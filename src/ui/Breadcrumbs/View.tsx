import cn from 'classnames';
import { forwardRef, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { Typography } from '../Typography';

import st from './styles.module.scss';

export type Breadcrumbs = { to: string; title: string }[];
export type BreadcrumbsProps = { breadcrumbs: Breadcrumbs; className?: string };

export function BreadcrumbsUI({ breadcrumbs, className }: BreadcrumbsProps) {
  return (
    <ul
      className={cn(st.breadcrumbs, className, {
        [st.empty]: breadcrumbs.length === 0,
      })}
    >
      {breadcrumbs.map((it, index) => (
        <li key={it.to}>
          {it.to ? <Link to={it.to}>{it.title}</Link> : <Typography.Paragraph>{it.title}</Typography.Paragraph>}

          {index < breadcrumbs.length - 1 && breadcrumbs.length > 1 && <span className={st.dot}>•</span>}
        </li>
      ))}
    </ul>
  );
}

export const BreadcrumbsPane = forwardRef<
  HTMLDivElement,
  {
    children: ReactNode;
    className?: string;
    hasActions?: boolean;
    compact?: boolean;
    noMargin?: boolean;
    bottom?: boolean;
    nosticky?: boolean;
    noPadding?: boolean;
  }
>(({ children, className, hasActions = false, compact, noMargin, bottom, nosticky, noPadding }, ref) => {
  return (
    <div
      className={cn(st.pane, className, {
        [st.hasActions]: hasActions,
        [st.compact]: compact,
        [st.noMargin]: noMargin,
        [st.bottom]: bottom,
        [st.nosticky]: nosticky,
        [st.noPadding]: noPadding,
      })}
      ref={ref}
    >
      {children}
    </div>
  );
});
