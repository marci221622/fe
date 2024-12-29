import { Responsive } from '@/ui/index';

import { ModalSwipeable } from './ModalSwipeable';
import { ModalWindow } from './ModalWindow';
import type { ModalProps } from './types';

type PropsType = ModalProps & { onlyDesktop?: boolean; mobileFullScreen?: boolean; iconClassName?: string };

export const Modal = ({
  modalWindowProps,
  modalSwipeableProps,
  iconClassName,
  fullScreen,
  bodyClassName,
  onlyDesktop,
  mobileFullScreen,
  ...commonProps
}: PropsType) => {
  // Игнорироум модалку в тестах
  if (process.env.NODE_ENV === 'test') {
    return null;
  }

  return (
    <div>
      {onlyDesktop ? (
        <ModalWindow
          {...commonProps}
          {...modalWindowProps}
          fullScreen={fullScreen}
          bodyClassName={bodyClassName}
          iconClassName={iconClassName}
        />
      ) : (
        <>
          <Responsive.Desktop>
            <ModalWindow
              {...commonProps}
              {...modalWindowProps}
              fullScreen={fullScreen}
              bodyClassName={bodyClassName}
              iconClassName={iconClassName}
            />
          </Responsive.Desktop>
          <Responsive.TabletAndBelow>
            {/* @ts-ignore */}
            <ModalSwipeable
              {...commonProps}
              {...modalSwipeableProps}
              fullScreen={mobileFullScreen ?? fullScreen}
              bodyClassName={bodyClassName}
            />
          </Responsive.TabletAndBelow>
        </>
      )}
    </div>
  );
};

export type { ModalProps };
