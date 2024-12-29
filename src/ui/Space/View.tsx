import cn from 'classnames';
import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react';

import st from './styles.module.scss';

type Props = {
  children: ReactNode;
  className?: string;
  direction?: 'vertical' | 'horizontal';
  size?: 'large' | 'middle' | 'small';
  align?: 'start' | 'center' | 'between';
  stretch?: boolean;
  wrap?: boolean;
};

export const Space = forwardRef<HTMLDivElement, Props & ComponentPropsWithoutRef<'div'>>(
  ({ className, children, direction = 'horizontal', size = 'small', align = 'start', stretch, wrap, ...rest }, ref) => {
    return (
      <div
        className={cn(
          st.space,
          st[direction],
          st[size],
          st[align],
          {
            [st.stretch]: stretch,
            [st.wrap]: wrap,
          },
          className,
        )}
        {...rest}
        ref={ref}
      >
        {children}
      </div>
    );
  },
);
