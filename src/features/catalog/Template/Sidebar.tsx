import cn from 'classnames';
import { useUnit } from 'effector-react';
import { ReactNode } from 'react';
import { useStickyBox } from 'react-sticky-box';

import { headerStuckedField } from '@/shared/animations';

import { COMPACT_HEADER_HEIGHT, HEADER_HEIGHT } from '@/ui/index';

import st from './styles.module.scss';

export function CatalogSidebarWrapper({ children }: { children: ReactNode }) {
  const stucked = useUnit(headerStuckedField.$value);
  const stickyRef = useStickyBox({
    offsetTop: stucked ? COMPACT_HEADER_HEIGHT : HEADER_HEIGHT,
    offsetBottom: stucked ? COMPACT_HEADER_HEIGHT : HEADER_HEIGHT,
  });

  return (
    <div className={st.sidebar} ref={stickyRef}>
      <aside className={cn(st.box)}>{children}</aside>
    </div>
  );
}
