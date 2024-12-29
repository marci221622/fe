
import { ReactNode } from 'react';

import { ModalSwipeableProps } from './ModalSwipeable';
import { ModalWindowProps } from './ModalWindow';

type ModalAction = 'close' | 'back';

export interface ModalPropsCommon {
  open: boolean;
  className?: string;
  headerClassName?: string;
  wrapClassName?: string;
  bodyClassName?: string;
  header?: ReactNode;
  withHeader?: boolean;
  centeredHeader?: boolean;
  children: ReactNode;
  shouldCloseOnOverlayClick?: boolean;
  onChange: (isOpen: boolean) => void;
  onActionClick?: (type: ModalAction) => void;
  fullScreen?: boolean;
  backActionType?: ModalAction;
  // Что бы не удалять модалку из дом
  // На какие то моменты нужно просто скрыть через display: none
  visibility?: boolean;
}

export interface ModalProps extends ModalPropsCommon {
  modalWindowProps?: Omit<ModalWindowProps, keyof ModalPropsCommon>;
  modalSwipeableProps?: Omit<ModalSwipeableProps, keyof ModalPropsCommon>;
}
