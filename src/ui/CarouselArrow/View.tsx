import cn from 'classnames';
import { forwardRef } from 'react';

import { Chevron } from '@/ui/assets/icons';

import st from './styles.module.scss';

type Props = {
  direction?: 'top' | 'left' | 'right' | 'bottom';
  hidden?: boolean;
  size?: 'normal' | 'large';
};

export const CarouselArrow = forwardRef<HTMLDivElement, Props>(({ size = 'large', ...props }, ref) => {
  return (
    <div
      data-arrow="true"
      ref={ref}
      className={cn(st.wrapper, st[size], {
        [st.hidden]: props.hidden,
        [st.right]: props.direction === 'right',
      })}
    >
      <Chevron {...props} />
    </div>
  );
});
