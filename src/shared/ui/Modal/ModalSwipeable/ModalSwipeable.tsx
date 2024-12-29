import cn from 'classnames';
import { ComponentPropsWithoutRef, CSSProperties, forwardRef, ReactNode } from 'react';
import { useTransition, animated } from 'react-spring';

import { useNoScroll } from '@/lib/hooks';

import { Portal } from '../../Portal';
import { CloseModalButton, BackModalButton } from '../Actions';
import { ModalPropsCommon } from '../types';

import st from './style.module.scss';
import stModal from '../style.module.scss';

type ModalSwipeablePropsFullScreenProps =
  | {
      fullScreen?: false;
      fullScreenHeight?: never;
    }
  | {
      fullScreen: true;
      fullScreenHeight?: number;
    };

export type ModalSwipeableProps = Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> &
  ModalPropsCommon &
  ModalSwipeablePropsFullScreenProps & {
    autoHeight?: boolean;
    closeClassName?: string;
    withAction?: boolean;
    noPadding?: boolean;
    footer?: ReactNode;
    withBorderRadius?: boolean;
    withoutAnimation?: boolean;
    likeIOS?: boolean;
    bottomAction?: ReactNode;
  };

const DEFAULT_FULLSCREEN_HEIGHT = 80;

const ModalSwipeable = forwardRef<HTMLDivElement, ModalSwipeableProps>(
  (
    {
      likeIOS,
      open,
      autoHeight,
      fullScreen,
      fullScreenHeight = DEFAULT_FULLSCREEN_HEIGHT,
      header,
      footer,
      closeClassName,
      headerClassName,
      wrapClassName,
      centeredHeader = true,
      children,
      withAction = true,
      withHeader = true,
      noPadding,
      withBorderRadius = true,
      shouldCloseOnOverlayClick = true,
      withoutAnimation,
      bodyClassName,
      onChange,
      onActionClick,
      backActionType = 'close',
      bottomAction,
      visibility = true,
      ...props
    },
    ref,
  ) => {
    const contentBaseStyles: CSSProperties = {
      maxHeight: `${fullScreenHeight}vh`,
      ...(fullScreen && { height: `100%` }),
      ...(autoHeight && { height: 'auto' }),
      ...(likeIOS && { height: 'calc(100% - 16px)', maxHeight: '100vh' }),
    };

    const transitions = useTransition(open, {
      from: { opacity: 0, transform: 'translateY(100%)' },
      enter: { opacity: 1, transform: 'translateY(0%)' },
      leave: { opacity: 0, transform: 'translateY(100%)' },
      config: { duration: 200 },
      immediate: Boolean(withoutAnimation),
    });

    const onAction = () => {
      if (onActionClick) {
        onActionClick(backActionType);

        return;
      }

      if (backActionType === 'close') {
        onChange?.(false);
      }
    };

    const actions = {
      back: <BackModalButton className={closeClassName} onClick={onAction} />,
      close: <CloseModalButton className={closeClassName} onClick={onAction} />,
    };

    useNoScroll(open);

    return (
      <Portal>
        {transitions(
          (styles, item) =>
            item && (
              <div
                {...props}
                className={cn(st.modal, {
                  [st.visibility]: visibility,
                })}
              >
                <animated.div
                  className={stModal.overlay}
                  style={{ opacity: styles.opacity }}
                  onClick={() => {
                    if (shouldCloseOnOverlayClick) {
                      onChange(false);
                    }
                  }}
                />
                <animated.div
                  className={cn(st.content, {
                    [st.contentWBorderRadius]: withBorderRadius,
                  })}
                  style={{ ...contentBaseStyles, transform: styles.transform }}
                  ref={ref}
                >
                  {withHeader && (
                    <div
                      className={cn(stModal.header, headerClassName, {
                        [stModal.centeredHeader]: centeredHeader,
                      })}
                    >
                      {withAction && actions[backActionType]}
                      <div style={{ minHeight: 19 }}>{header}</div>
                    </div>
                  )}

                  <div
                    data-scroll="allow"
                    className={cn(stModal.body, st.body, bodyClassName, {
                      [stModal.noPadding]: noPadding,
                    })}
                  >
                    {children}
                  </div>

                  {bottomAction}
                  {footer && <div className={st.footer}>{footer}</div>}
                </animated.div>
              </div>
            ),
        )}
      </Portal>
    );
  },
);

ModalSwipeable.displayName = 'ModalSwipeable';

export default ModalSwipeable;
