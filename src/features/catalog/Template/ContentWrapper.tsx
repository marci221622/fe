import cn from 'classnames';
import { createContext, ReactNode } from 'react';

import st from './styles.module.scss';

type Props = {
  children: ReactNode;
  isEmpty?: boolean;
  nosidebar?: boolean;
  pageType?: PageType;
  hasDesktopFilters?: boolean;
  hasMobileFilters?: boolean;
  className?: string;
};

export const catalogCtx = createContext({
  isEmpty: false,
  nosidebar: false,
  pageType: 'Unknown',
  hasDesktopFilters: true,
  hasMobileFilters: true,
});

export function CatalogContent({
  children,
  isEmpty = false,
  nosidebar = false,
  pageType = 'Unknown',
  hasDesktopFilters = true,
  hasMobileFilters = true,
  className,
}: Props) {
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <catalogCtx.Provider value={{ isEmpty, nosidebar, pageType, hasDesktopFilters, hasMobileFilters }}>
      <div className={cn(st.wrapper, className)}>{children}</div>
    </catalogCtx.Provider>
  );
}
 