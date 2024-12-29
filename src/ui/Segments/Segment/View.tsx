import cn from 'classnames';
import { ComponentPropsWithoutRef } from 'react';

import st from './styles.module.scss';

type InputProps = ComponentPropsWithoutRef<'input'>;
type RequiredInputPropsKeys = 'value' | 'checked';

type SegmentProps = {
  isSmall?: boolean;
} & Omit<InputProps, RequiredInputPropsKeys> &
  Required<Pick<InputProps, RequiredInputPropsKeys>>;

export const Segment = ({ children, id, isSmall, ...props }: SegmentProps) => {
  return (
    <label
      className={cn(st.label, {
        [st.label_checked]: props.checked,
        [st.label_small]: isSmall,
      })}
      htmlFor={id}
    >
      <input {...props} id={id} className={st.input} type="radio" />
      {children}
    </label>
  );
};
