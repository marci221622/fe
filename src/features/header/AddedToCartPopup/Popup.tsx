import { useLingui } from '@lingui/react';
import { useUnit } from 'effector-react';
import { ReactNode, useCallback, ReactElement, forwardRef } from 'react';
import { Popover, ArrowContainer, PopoverAlign, PopoverState } from 'react-tiny-popover';

import { $mappedStrings } from '@/shared/configs';
import { ModalSwipeable, PopupMenu } from '@/shared/ui';

import { Responsive } from '@/ui/index';

import st from './styles.module.scss';

interface Props {
  closePopup: () => void;
  isOpen: boolean;
  children: ReactElement & ReactNode;
  icon: React.JSX.Element;
  align?: PopoverAlign;
  padding?: number;
  withArrow?: boolean;
}

export const Popup = forwardRef<HTMLDivElement, Props>(
  ({ closePopup, isOpen, children, icon, align = 'center', padding = 6, withArrow = true }, ref) => {
    const texts = useUnit($mappedStrings);
    const { i18n } = useLingui();

    const renderContent = useCallback(
      ({ position, childRect, popoverRect }: PopoverState) => {
        const popup = (
          <PopupMenu
            ref={ref}
            title={texts.itemDetails.addToCartResult.title}
            headerClassName={st.header}
            closePopup={closePopup}
            className={st.bodyWrapper}
          >
            {children}
          </PopupMenu>
        );

        return withArrow ? (
          <ArrowContainer
            position={position}
            childRect={childRect}
            popoverRect={popoverRect}
            arrowColor="white"
            arrowSize={12}
          >
            {popup}
          </ArrowContainer>
        ) : (
          popup
        );
      },
      [ref, closePopup, children, withArrow, texts.itemDetails.addToCartResult.title],
    );

    return (
      <>
        <Responsive.Desktop>
          <Popover
            align={align}
            padding={padding}
            positions={['bottom']}
            isOpen={isOpen}
            content={renderContent}
            onClickOutside={closePopup}
            containerClassName={st.popup}
          >
            {icon}
          </Popover>
        </Responsive.Desktop>

        <Responsive.TabletAndBelow>
          {icon}

          <ModalSwipeable
            open={isOpen}
            header={texts.itemDetails.addToCartResult.title}
            onChange={closePopup}
            onActionClick={closePopup}
            centeredHeader
          >
            {children}
          </ModalSwipeable>
        </Responsive.TabletAndBelow>
      </>
    );
  },
);
