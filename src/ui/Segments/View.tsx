import cn from 'classnames';
import { ComponentPropsWithoutRef } from 'react';

import { Segment } from './Segment';

import st from './styles.module.scss';

type InputProps = ComponentPropsWithoutRef<'input'>;
type RequiredInputPropsKeys = 'name' | 'onChange' | 'value';

type SegmentsProps = {
  options: {
    label: string;
    value: string;
  }[];
} & Omit<InputProps, RequiredInputPropsKeys> &
  Required<Pick<InputProps, RequiredInputPropsKeys>>;

const SEGMENTS_STYLES_SWITCH_NUMBER = 3;

export const Segments = ({ className, options, value: propsValue, ...props }: SegmentsProps) => (
  <div className={cn(st.container, className)}>
    {options.map(({ label, value }, index) => (
      <Segment
        {...props}
        key={value}
        id={`${props.name}-segment-${index}`}
        value={value}
        checked={propsValue === value}
        isSmall={options.length > SEGMENTS_STYLES_SWITCH_NUMBER}
      >
        {label}
      </Segment>
    ))}
  </div>
);
