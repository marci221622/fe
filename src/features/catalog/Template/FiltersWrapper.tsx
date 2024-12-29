import cn from 'classnames';
import { useUnit } from 'effector-react';
import { useContext, useRef, useState } from 'react';

import { useStickyClassnames } from '@/shared/animations';
import { $appIsShort } from '@/shared/configs';

import { useScrollEventListener } from '@/lib/useScrollEventListener';

import { BREAKPOINTS } from '@/ui/breakpoints';

import { catalogCtx } from './ContentWrapper';

import st from './styles.module.scss';

export function FiltersWrapper({ children, className }: { children: React.JSX.Element; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { nosidebar, hasDesktopFilters, hasMobileFilters } = useContext(catalogCtx);
  const classname = useStickyClassnames({});
  const [scrollDirIsDown, setDirectionState] = useState(false);
  const appIsShort = useUnit($appIsShort);

  useScrollEventListener((e, { scrollDirection }) => {
    if (window.innerWidth <= BREAKPOINTS.md && !appIsShort) {
      setDirectionState(scrollDirection === 'down');
    }
  }, ref.current?.offsetHeight ?? 0);

  return (
    <div
      className={cn(
        st.filters,
        classname,
        {
          [st.nosidebar]: nosidebar,
          [st.appIsShort]: appIsShort,
          [st.scrollDirIsDown]: scrollDirIsDown,
          [st.noMobileFilters]: !hasMobileFilters,
          [st.noDesktopFilters]: !hasDesktopFilters,
        },
        className,
      )}
    >
      <div className={st.inner}>{children}</div>
    </div>
  );
}
