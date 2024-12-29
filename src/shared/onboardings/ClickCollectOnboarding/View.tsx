import { useLingui } from '@lingui/react';
import { ReactNode, forwardRef, useCallback } from 'react';
import { ArrowContainer, Popover, PopoverState, PopoverPosition } from 'react-tiny-popover';

import { PopupMenu } from '@/shared/ui';

import { Space, Typography } from '@/ui/index';

import { CloseIcon } from '@/ui/assets/icons';

import st from './styles.module.scss';

type Props = {
  closePopup: () => void;
  isOpen: boolean;
  children: ReactNode;
  icon: (onAction: () => void) => React.JSX.Element;
  padding?: number;
  positions?: PopoverPosition[] | PopoverPosition;
  // Действие на icon
  // Что бы сразу так же закрыть онбординг
  onAction?: () => void;
};

export const ClickCollectOnboarding = forwardRef<HTMLDivElement, Props>(
  ({ closePopup, isOpen, children, icon, padding = 6, positions = ['top'], onAction }, ref) => {
    const { i18n } = useLingui();

    const renderContent = useCallback(
      ({ position, childRect, popoverRect }: PopoverState) => {
        const popup = (
          <PopupMenu ref={ref} withHeader={false} closePopup={closePopup} className={st.bodyWrapper}>
            {children}
          </PopupMenu>
        );

        return (
          <ArrowContainer
            position={position}
            childRect={childRect}
            popoverRect={popoverRect}
            arrowColor="#000"
            arrowSize={12}
          >
            {popup}
          </ArrowContainer>
        );
      },
      [ref, closePopup, children],
    );

    return (
      <Popover
        align="center"
        padding={padding}
        positions={positions}
        isOpen={isOpen}
        content={renderContent}
        containerClassName={st.popup}
      >
        {icon(() => {
          closePopup();
          onAction?.();
        })}
      </Popover>
    );
  },
);

export function OnboardingContent({ closePopup, text }: { closePopup: () => void; text?: string }) {
  if (!text) {
    return null;
  }

  return (
    <Space className={st.space}>
      <Typography.Paragraph center>{text}</Typography.Paragraph>

      <CloseIcon onClick={closePopup} />
    </Space>
  );
}
