import cn from 'classnames';
import React, { forwardRef, ReactNode } from 'react';

import { Checked } from '../assets/icons';

import st from './styles.module.scss';

// FROM_TSUM_APP
type Props = {
  checked: boolean;
  value?: string | number | readonly string[];
  name?: string;
  disabled?: boolean;
  className?: string;
  stretch?: boolean;
  children?: ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  colored?: boolean;
  rounded?: boolean;
};

type Ref = HTMLInputElement;

export const Checkbox = forwardRef<Ref, Props>((props, ref) => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  <label
    className={cn(st.wrap, props.className, {
      [st.stretch]: props.stretch,
      [st.disabled]: props.disabled,
    })}
  >
    <input
      ref={ref}
      type="checkbox"
      checked={props.checked}
      disabled={props.disabled}
      name={props.name}
      value={props.value}
      className={cn(st.input)}
      onChange={props.onChange}
      onClick={props.onClick}
    />

    <span
      className={cn(st.control, {
        [st.colored]: props.colored,
        [st.rounded]: props.rounded,
      })}
    >
      <Checked className={st.icon} />
    </span>

    <span className={st.title} data-title>
      {props.children}
    </span>
  </label>
));
