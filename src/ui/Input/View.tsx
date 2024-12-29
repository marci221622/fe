import cn from 'classnames';
import { InputHTMLAttributes, forwardRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { CloseFilledIcon, CloseIconStroked } from '../assets/icons';

import { CommonInputProps } from './types';

import st from './styles.module.scss';

export type InputProps = CommonInputProps & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      Prefix,
      className,
      outline,
      closable,
      onCloseClick,
      bordered = false,
      withShadow = false,
      suffix,
      showStab,
      onStubClick,
      stubClassName,
      simple,
      closeIcon = 'default',
      disabled,
      stretch = false,
      variant = 'light',
      ...props
    },
    ref,
  ) => {
    const Icon = closeIcon === 'default' ? CloseFilledIcon : CloseIconStroked;

    return (
      <div
        className={cn(
          st.field,
          {
            [st.hasPrefix]: !!Prefix,
            [st.hasSuffix]: !!suffix || !!closable,
            [st.outline]: !!outline,
            [st.closable]: !!closable,
            [st.bordered]: bordered,
            [st.withShadow]: withShadow,
            [st.simple]: !!simple,
            [st.stretch]: stretch,
            [st.disabled]: disabled,
          },
          st[variant],
          className,
        )}
      >
        {Prefix && <span>{Prefix}</span>}

        {showStab ? (
          <div
            className={cn(st.stub, stubClassName, {
              [st.stubDisabled]: disabled,
            })}
            onClick={() => {
              if (!disabled) {
                onStubClick?.();
              }
            }}
          >
            <p
              className={cn(st.placeholder, {
                [st.noValue]: !props.value,
              })}
            >
              {props.value || props.placeholder}
            </p>
          </div>
        ) : (
          <input {...props} ref={ref} disabled={disabled} />
        )}

        {suffix && !closable && <span className={st.suffix}>{suffix}</span>}

        {closable && (
          <span className={cn(st.suffix, st.closeIcon)}>
            <Icon
              onClick={() => {
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

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  CommonInputProps & InputHTMLAttributes<HTMLTextAreaElement> & { oneLine?: boolean }
>(
  (
    {
      Prefix,
      className,
      outline,
      closable,
      onCloseClick,
      bordered = false,
      withShadow = false,
      suffix,
      stubClassName,
      showStab,
      onStubClick,
      simple,
      oneLine = false,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          st.field,
          {
            [st.hasPrefix]: !!Prefix,
            [st.hasSuffix]: !!suffix || !!closable,
            [st.outline]: !!outline,
            [st.closable]: !!closable,
            [st.bordered]: bordered,
            [st.withShadow]: withShadow,
            [st.simple]: !!simple,
          },
          className,
        )}
      >
        {Prefix && <span>{Prefix}</span>}
        {showStab ? (
          <div
            className={cn(st.stub, st.isArea, stubClassName, {
              [st.oneLine]: oneLine,
            })}
            onClick={onStubClick}
          >
            <p
              className={cn(st.placeholder, {
                [st.noValue]: !props.value,
              })}
            >
              {props.value || props.placeholder}
            </p>
          </div>
        ) : (
          // @ts-ignore
          <TextareaAutosize {...props} ref={ref} maxRows={4} className={st.isArea} />
        )}

        {suffix && !closable && <span className={st.suffix}>{suffix}</span>}

        {closable && (
          <span className={st.suffix}>
            <CloseFilledIcon
              onClick={() => {
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