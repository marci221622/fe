import cn from 'classnames';
import { ReactNode, ComponentPropsWithoutRef, forwardRef } from 'react';

import { Responsive } from '../Responsive';
import { OverlayLoader } from '../Spinner';

import st from './styles.module.scss';

export type ActionSize = 'L' | 'M' | 'S' | 'XS';

type Props = {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  colored?: boolean;
  bold?: boolean;
  stretch?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  pending?: boolean;
  outline?: boolean;
  size?: ActionSize | ActionSize[]; // common | [desktop, mobile]
  asText?: boolean;
  // Что бы кнопка фактически была в ДОМ
  // От параметра анимируется
  withVisibleTransition?: boolean;
  visibled?: boolean;
} & ComponentPropsWithoutRef<'button'>;

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      children,
      className,
      reverse,
      colored,
      bold,
      stretch,
      onClick,
      disabled,
      pending,
      size = 'M',
      outline,
      asText,
      withVisibleTransition,
      visibled,
      ...props
    },
    ref,
  ) => {
    const commonStyles = {
      [st.reverse]: reverse,
      [st.colored]: colored,
      [st.bold]: bold,
      [st.stretch]: stretch,
      [st.disabled]: disabled,
      [st.outline]: outline,
      [st.asText]: asText,
      [st.withVisibleTransition]: withVisibleTransition,
      [st.visibled]: visibled,
    };

    if (!Array.isArray(size)) {
      return (
        <button
          ref={ref}
          onClick={e => {
            if (!disabled) {
              onClick?.(e);
            }
          }}
          type="button"
          className={cn(st.btn, st[size], commonStyles, className)}
          {...props}
        >
          <OverlayLoader isLoading={pending}>{children}</OverlayLoader>
        </button>
      );
    }
    return (
      <>
        <Responsive.Desktop className={cn(st.container)}>
          <button
            ref={ref}
            onClick={e => {
              if (!disabled) {
                onClick?.(e);
              }
            }}
            type="button"
            className={cn(st.btn, st[size[0]], commonStyles, className)}
            {...props}
          >
            <OverlayLoader isLoading={pending}>{children}</OverlayLoader>
          </button>
        </Responsive.Desktop>
        <Responsive.TabletAndBelow className={cn(st.container)}>
          <button
            ref={ref}
            onClick={e => {
              if (!disabled) {
                onClick?.(e);
              }
            }}
            type="button"
            className={cn(st.btn, st[size[1]], commonStyles, className)}
            {...props}
          >
            <OverlayLoader isLoading={pending}>{children}</OverlayLoader>
          </button>
        </Responsive.TabletAndBelow>
      </>
    );
  },
);
