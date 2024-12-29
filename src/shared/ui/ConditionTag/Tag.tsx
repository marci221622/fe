import cn from 'classnames';
import { forwardRef } from 'react';

import st from './styles.module.scss';

export type Props = {
  tag: string;
  className?: string;
  onClick?: () => void;
};

export const ConditionTag = forwardRef<HTMLParagraphElement, Props>(({ tag, className, onClick }, ref) => {
  if (tag) {
    return (
      <p
        ref={ref}
        role="presentation"
        onClick={onClick}
        className={cn(st.tag, className, {
          [st.hasTag]: !!tag,
        })}
      >
        {tag ?? ' '}
      </p>
    );
  }

  return null;
});
