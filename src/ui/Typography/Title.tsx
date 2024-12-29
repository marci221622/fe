import cn from 'classnames';
import { ReactNode } from 'react';

import st from './styles.module.scss';

type Props = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function Title({ children, className, id }: Props) {
  return (
    <h2 className={cn(st.title, className)} id={id}>
      {children}
    </h2>
  );
}
