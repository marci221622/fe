import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { ReactNode, useCallback, forwardRef, useEffect } from 'react';
import { Popover, ArrowContainer, PopoverState, PopoverAlign } from 'react-tiny-popover';

import { usePopupState } from '@/lib/hooks';

import { Responsive } from '@/ui/index';

import { ModalSwipeable } from '../Modal/ModalSwipeable';
import { PopupMenu } from '../PopupMenu';

import st from './styles.module.scss';

interface Props {
  children: ReactNode;
  tag: (params: { openPopup: () => void }) => React.JSX.Element;
  label: string;
  popoverOnly?: boolean;
  popoverAlign?: PopoverAlign;
  popoverMaxWidth?: boolean;
  withPopoverHeader?: boolean;
}

export const Tooltip = forwardRef<HTMLDivElement, Props>(
  (
    { tag, children, label, popoverOnly, popoverAlign = 'center', withPopoverHeader = false, popoverMaxWidth = true },
    ref,
  ) => {
    const { i18n } = useLingui();
    const popup = usePopupState();

    const renderContent = useCallback(
      ({ position, childRect, popoverRect }: PopoverState) => {
        return (
          <ArrowContainer
            position={position}
            childRect={childRect}
            popoverRect={popoverRect}
            arrowColor="#1B1B1B"
            arrowSize={12}
            arrowClassName={st.arrow}
          >
            <PopupMenu
              closePopup={popup.closePopup}
              className={cn(st.popup, {
                [st.noMaxWidth]: !popoverMaxWidth,
              })}
              withHeader={withPopoverHeader}
              title={label}
              ref={ref}
            >
              {children}
            </PopupMenu>
          </ArrowContainer>
        );
      },
      [popup.closePopup, popoverMaxWidth, withPopoverHeader, label, ref, children],
    );

    const popover = (
      <Popover
        containerClassName={st.popupContainer}
        align={popoverAlign}
        padding={6}
        positions={['bottom']}
        isOpen={popup.isOpen}
        content={renderContent}
        onClickOutside={popup.closePopup}
      >
        {tag({ openPopup: popup.openPopup })}
      </Popover>
    );

    // eslint-disable-next-line consistent-return
    useEffect(() => {
      if (popup.isOpen) {
        const id = setTimeout(() => {
          popup.closePopup();
        }, 3000);

        return () => {
          clearTimeout(id);
        };
      }
    }, [popup]);

    if (popoverOnly) {
      return popover;
    }

    return (
      <>
        <Responsive.Desktop>{popover}</Responsive.Desktop>

        <Responsive.TabletAndBelow>
          {tag({ openPopup: popup.openPopup })}

          <ModalSwipeable
            open={popup.isOpen}
            onChange={popup.closePopup}
            onActionClick={popup.closePopup}
            centeredHeader
            headerClassName={st.header}
            header={label}
          >
            {children}
          </ModalSwipeable>
        </Responsive.TabletAndBelow>
      </>
    );
  },
);
