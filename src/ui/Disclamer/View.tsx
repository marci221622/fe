import cn from 'classnames';
import { ReactNode } from 'react';

import st from './styles.module.scss';

type Props = {
  children: ReactNode;
  stretch?: boolean;
  className?: string;
  variant?: 'primary' | 'dark' | 'danger';
  rightIcon?: ReactNode;
};

export function Disclamer({ children, stretch, className, variant = 'primary', rightIcon }: Props) {
  return (
    <div
      className={cn(st.disclamer, st[variant], className, { [st.stretch]: stretch, [st.hasRightIcon]: !!rightIcon })}
    >
      {children} {rightIcon}
    </div>
  );
}
