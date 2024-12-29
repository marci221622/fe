import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { ReactNode, useCallback, ReactElement, forwardRef } from 'react';
import { Popover, ArrowContainer, PopoverState } from 'react-tiny-popover';

import { CatalogFilter_Type } from '@/generated/customer_hub/entities/catalog_filter.v1';
import { $mappedStrings } from '@/shared/configs';
import { ModalSwipeable, PopupMenu } from '@/shared/ui';

import { Button, Responsive } from '@/ui/index';

import { CloseIcon } from '@/ui/assets/icons';

import { useCloseEvent } from '../../analytics';

import st from './styles.module.scss';

interface Props {
  closePopup: () => void;
  isOpen: boolean;
  children: ReactElement & ReactNode;
  tag: React.JSX.Element;
  label: string;
  type: CatalogFilter_Type | 'sort' | 'collections';
  onReset?: () => void;
  hasFilters?: boolean;
  fullScreen?: boolean;
  withHeader?: boolean;
  sizeLarge?: boolean;
  menuClassName?: string;
}

export const Popup = forwardRef<HTMLDivElement, Props>(
  (
    {
      menuClassName,
      closePopup,
      isOpen,
      tag,
      children,
      onReset,
      hasFilters,
      fullScreen,
      label,
      type,
      withHeader = true,
      sizeLarge,
    },
    ref,
  ) => {
    const texts = useUnit($mappedStrings);
    const { i18n } = useLingui();
    const { close } = useCloseEvent({ title: label, closePopup });

    const renderContent = useCallback(
      ({ position, childRect, popoverRect }: PopoverState) => (
        <ArrowContainer
          position={position}
          childRect={childRect}
          popoverRect={popoverRect}
          arrowColor="white"
          arrowSize={12}
          arrowClassName={st.arrow}
        >
          <PopupMenu
            className={cn(menuClassName, st.popup, {
              [st.withHeader]: withHeader,
              [st.sort]: type === 'sort',
              [st.sizeLarge]: sizeLarge,
            })}
            withHeader={withHeader}
            ref={ref}
            headerContent={
              <>
                <CloseIcon className={st.close} onClick={close('button')} color="black" />

                <p className={cn(st.title, { [st.withReset]: hasFilters })}>{label}</p>

                {hasFilters && (
                  <Button
                    asText
                    className={st.reset}
                    onClick={e => {
                      e.stopPropagation();
                      onReset?.();
                    }}
                  >
                    {texts.filters.price.clearButton.title}
                  </Button>
                )}
              </>
            }
          >
            {children}
          </PopupMenu>
        </ArrowContainer>
      ),
      [
        menuClassName,
        withHeader,
        type,
        sizeLarge,
        ref,
        close,
        hasFilters,
        label,
        children,
        onReset,
        texts.filters.price.clearButton.title,
      ],
    );

    return (
      <>
        <Responsive.Desktop>
          <Popover
            containerClassName={st.popupContainer}
            align="center"
            padding={6}
            positions={['bottom']}
            isOpen={isOpen}
            content={renderContent}
            onClickOutside={close('tap')}
          >
            {tag}
          </Popover>
        </Responsive.Desktop>

        <Responsive.TabletAndBelow>
          {tag}

          <ModalSwipeable
            open={isOpen}
            onChange={close('tap')}
            onActionClick={close('button')}
            centeredHeader
            headerClassName={st.header}
            fullScreen={fullScreen}
            withHeader={withHeader}
            withoutAnimation
            header={
              <div className={st.mobileHeaderWrapper}>
                <div />
                <p className={cn(st.title, { [st.withReset]: hasFilters })}>{label}</p>
                {hasFilters ? (
                  <Button
                    asText
                    className={st.reset}
                    onClick={e => {
                      e.stopPropagation();
                      onReset?.();
                    }}
                  >
                    {texts.filters.price.clearButton.title}
                  </Button>
                ) : (
                  <div />
                )}
              </div>
            }
            noPadding
          >
            {children}
          </ModalSwipeable>
        </Responsive.TabletAndBelow>
      </>
    );
  },
);
