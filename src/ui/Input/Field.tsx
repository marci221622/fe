import cn from 'classnames';
import { forwardRef } from 'react';

import { Typography } from '@/ui/Typography';

import { ExeptionIcon } from '@/ui/assets/icons';

import { MaskedInput, MaskedInputProps } from './Masked';
import { Input, InputProps } from './View';

import st from './styles.module.scss';

type Props = { title?: string; error?: string };

export const Field = forwardRef<HTMLInputElement, InputProps & Props>(
  ({ title, error, variant = 'light', ...props }, ref) => {
    return (
      <div
        className={cn(st.fieldWrapper, st[variant], {
          [st.hasError]: !!error,
        })}
      >
        {title && <Typography.Paragraph>{title}</Typography.Paragraph>}
        <Input
          {...props}
          ref={ref}
          suffix={error ? <ExeptionIcon className="ExeptionIcon" /> : null}
          variant={variant}
        />
      </div>
    );
  },
);

export const FieldMasked = forwardRef<HTMLInputElement, MaskedInputProps & Props>(
  ({ title, error, variant = 'light', ...props }, ref) => {
    return (
      <div
        className={cn(st.fieldWrapper, st[variant], {
          [st.hasError]: !!error,
        })}
      >
        {title && <Typography.Paragraph>{title}</Typography.Paragraph>}
        <MaskedInput
          {...props}
          ref={ref}
          suffix={error ? <ExeptionIcon className="ExeptionIcon" /> : null}
          variant={variant}
        />
      </div>
    );
  },
);
