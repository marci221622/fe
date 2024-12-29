import cn from 'classnames';
import { useUnit } from 'effector-react';
import ReactModal, { Props as ReactModalProps } from 'react-modal';

import { $stack, useInitialValue, useNoScroll } from '@/lib/hooks';

import { BackModalButton, CloseModalButton } from '../Actions';
import { ModalPropsCommon } from '../types';

import st from './style.module.scss';
import stModal from '../style.module.scss';

export interface ModalWindowProps extends Omit<ReactModalProps, 'isOpen' | 'className' | 'children'>, ModalPropsCommon {
  borderedHeader?: boolean;
  fullScreen?: boolean;
  iconClassName?: string;
}

if (process?.env?.NODE_ENV !== 'test') {
  ReactModal.setAppElement('#app-root');
}

export const ModalWindow = ({
  open,
  className = '',
  overlayClassName = '',
  wrapClassName = '',
  headerClassName = '',
  header = null,
  children,
  onChange,
  centeredHeader = true,
  borderedHeader = true,
  withHeader = true,
  fullScreen = false,
  onActionClick,
  backActionType = 'close',
  bodyClassName,
  visibility = true,
  iconClassName,
  ...props
}: ModalWindowProps) => {
  const stack = useUnit($stack);
  const initialStack = useInitialValue(stack, open);

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
    back: <BackModalButton onClick={onAction} className={iconClassName} />,
    close: <CloseModalButton onClick={onAction} className={iconClassName} />,
  };

  useNoScroll(open);

  return (
    <ReactModal
      isOpen={open}
      onRequestClose={() => onChange(false)}
      closeTimeoutMS={300}
      className={cn(st.rmContent, wrapClassName, {
        [st.fullScreen]: fullScreen,
      })}
      // @ts-ignore
      overlayClassName={cn(stModal.overlay, st.rmOverlay, overlayClassName, st[`index-${initialStack}`], {
        [st.visibility]: visibility,
      })}
      {...props}
    >
      <div
        className={cn(stModal.content, st.content, className, {
          [stModal.bordered]: borderedHeader,
          [stModal.fullScreen]: fullScreen,
        })}
      >
        {withHeader && (
          <div className={cn(stModal.header, st.header, headerClassName, { [stModal.centeredHeader]: centeredHeader })}>
            {actions[backActionType]}
            {header}
          </div>
        )}
        <div className={cn(stModal.body, bodyClassName)}>{children}</div>
      </div>
    </ReactModal>
  );
};
