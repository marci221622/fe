import cn from 'classnames';
import React, { ReactNode } from 'react';

import st from './styles.module.scss';

type Props = {
  children: ReactNode;
  className?: string;
  size?: 'medium' | 'normal';
  bold?: boolean;
  decoration?: 'underline' | 'none';
  center?: boolean;
  onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void;
};

export function Paragraph({ children, className, size = 'normal', bold, decoration = 'none', center, onClick }: Props) {
  return (
    <p
      onClick={onClick}
      role="presentation"
      className={cn(st.paragraph, className, st[size], st[decoration], {
        [st.bold]: bold,
        [st.center]: center,
      })}
    >
      {children}
    </p>
  );
}
