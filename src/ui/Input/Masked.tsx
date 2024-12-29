import cn from 'classnames';
import { forwardRef, InputHTMLAttributes } from 'react';
import Masked, { BeforeMaskedStateChangeStates, InputState } from 'react-input-mask';
import { NumericFormat } from 'react-number-format';

import { digestPhone, formatPhone } from '@/lib/string';

import { CloseFilledIcon } from '@/ui/assets/icons';

import { Typography } from '../Typography';

import { CommonInputProps } from './types';

import st from './styles.module.scss';

export type MaskedInputProps = CommonInputProps &
  InputHTMLAttributes<HTMLInputElement> & {
    maskProps: {
      mask: { type: 'currency' } | string;
      maskChar?: string | null;
      placeholder?: string;
      beforeMaskedStateChange?: (states: BeforeMaskedStateChangeStates) => InputState;
      inputRef?: (input: HTMLInputElement) => void;
    };
  };

export const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
  (
    {
      Prefix,
      className,
      maskProps,
      bordered,
      withShadow,
      suffix,
      outline,
      closable,
      simple,
      onCloseClick,
      isTelInput,
      variant = 'light',
      ...props
    },
    ref,
  ) => {
    const isTextablePrefix = typeof Prefix === 'string';

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
      if (isTelInput) {
        event.preventDefault();

        const text = event.clipboardData.getData('text');
        const phone = digestPhone(text);

        // @ts-ignore
        props.onChange?.({ target: { value: formatPhone(phone) } });
      }
    };

    const nextValue = props.value;

    return (
      <div
        className={cn(st.field, className, st[variant], {
          [st.hasPrefix]: !!Prefix,
          [st.isTextablePrefix]: isTextablePrefix,
          [st.hasSuffix]: !!suffix || !!closable,
          [st.outline]: !!outline,
          [st.closable]: !!closable,
          [st.bordered]: bordered,
          [st.withShadow]: withShadow,
          [st.simple]: !!simple,
        })}
      >
        {Prefix && isTextablePrefix ? (
          <span>
            <Typography.Paragraph>{Prefix}</Typography.Paragraph>
          </span>
        ) : (
          Prefix && <span>{Prefix}</span>
        )}

        {typeof maskProps.mask !== 'string' && maskProps.mask.type === 'currency' ? (
          <NumericFormat
            suffix=" ₽"
            thousandSeparator=" "
            placeholder={props.placeholder}
            {...props}
            // @ts-ignore
            ref={ref}
          />
        ) : (
          <Masked
            {...props}
            mask={maskProps.mask as string}
            beforeMaskedStateChange={maskProps.beforeMaskedStateChange}
            inputRef={maskProps.inputRef}
            maskPlaceholder={null}
            maskChar={maskProps.maskChar || null}
            onPaste={handlePaste}
            value={nextValue}
            // @ts-ignore
            ref={ref}
          />
        )}

        {suffix && !closable && <span className={st.suffix}>{suffix}</span>}

        {closable && (
          <span className={cn(st.suffix, st.closeIcon)}>
            <CloseFilledIcon
              onClick={e => {
                e.stopPropagation();
                // @ts-ignore
                props.onChange?.({ target: { value: '' } });
                onCloseClick?.();
              }}
            />
          </span>
        )}
      </div>
    );
  },
);
