import { useLingui } from '@lingui/react';
import cn from 'classnames';
import React, { ReactNode, forwardRef, useCallback } from 'react';
import { ArrowContainer, Popover, PopoverPosition, PopoverState } from 'react-tiny-popover';

import { PopupMenu } from '@/shared/ui';

import { Space, Typography } from '@/ui/index';

import { CloseIcon } from '@/ui/assets/icons';

import st from './styles.module.scss';

export enum ECloseIconPositions {
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

type Props = {
  closePopup: () => void;
  isOpen: boolean;
  children: ReactNode;
  icon: React.JSX.Element;
  padding?: number;
  positions?: PopoverPosition[];
  className?: string;
};

export const FavoriteOnboarding = forwardRef<HTMLDivElement, Props>(
  ({ className, positions = ['bottom'], closePopup, isOpen, children, icon, padding = 6 }, ref) => {
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
            arrowColor="#1B1B1B"
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
        onClickOutside={closePopup}
        align="center"
        padding={padding}
        positions={positions}
        isOpen={isOpen}
        content={renderContent}
        containerClassName={cn(className, st.popup)}
      >
        {icon}
      </Popover>
    );
  },
);

type OnBoardingContentType = {
  closePopup: () => void;
  title?: string;
  text: string;
  closeIconPosition?: ECloseIconPositions;
};

const getCloseIconClassName = (position: ECloseIconPositions): string => {
  switch (position) {
    case ECloseIconPositions.RIGHT:
      return st.rightCloseIcon;
    case ECloseIconPositions.TOP:
    case ECloseIconPositions.LEFT:
    case ECloseIconPositions.BOTTOM:
    default:
      return '';
  }
};

export function OnboardingContent({
  closePopup,
  title,
  text,
  closeIconPosition = ECloseIconPositions.TOP,
}: OnBoardingContentType) {
  const closeIconClassName = getCloseIconClassName(closeIconPosition);

  return (
    <Space className={st.space}>
      {closeIconPosition === ECloseIconPositions.TOP || title ? (
        <div className={st.header}>
          {closeIconPosition === ECloseIconPositions.TOP ? (
            <CloseIcon onClick={closePopup} className={cn(closeIconClassName, st.closeIcon)} />
          ) : null}
          {title ? <Typography.Title>{title}</Typography.Title> : null}
        </div>
      ) : null}
      <div className={st.row}>
        {text ? <Typography.Paragraph>{text}</Typography.Paragraph> : null}
        {closeIconPosition === ECloseIconPositions.RIGHT ? (
          <CloseIcon onClick={closePopup} className={cn(closeIconClassName, st.closeIcon)} />
        ) : null}
      </div>
    </Space>
  );
}
