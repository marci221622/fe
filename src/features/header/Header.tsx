import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { forwardRef, useRef } from 'react';
import { useIsomorphicLayoutEffect } from 'react-spring';

import { headerSearchField, headerStuckedField, useStickyHeaderClassnames } from '@/shared/animations';
import { $appIsShort, $mappedStrings } from '@/shared/configs';
import { Modal, ModalSwipeable } from '@/shared/ui';

import { Button, Input } from '@/ui/index';

import { SearchIcon } from '@/ui/assets/icons';

import { AuthFlow, AuthFlowHeader, Steps, authStep, modal } from '../auth';

import { DesktopHeader, DesktopHeaderProps } from './DesktopHeader';
import { MobileHeader, MobileHeaderProps } from './MobileHeader';
import { additionalTitle, suggestField } from './models';
import { Suggests } from './Suggests';

import st from './header.module.scss';

type Props = {
  needMobileHeader?: boolean;
  /**
   * Что бы добавить иконку поиска на мобильном хедере
   */
  searchable?: boolean;
};

const state = {
  appIsShort: $appIsShort,
};

export const Header = forwardRef<HTMLHeadElement, DesktopHeaderProps & MobileHeaderProps & Props>(
  ({ logoOnly, needMobileHeader, searchable, ...props }, ref) => {
    const texts = useUnit($mappedStrings);
    const { i18n } = useLingui();
    const { appIsShort } = useUnit(state);
    const titleField = useUnit(additionalTitle);
    const headerStucked = useUnit(headerStuckedField);
    const search = useUnit(headerSearchField);
    const suggest = useUnit(suggestField);
    const headerCn = useStickyHeaderClassnames();
    const flowSteps = useUnit(authStep);
    const modalField = useUnit(modal);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useIsomorphicLayoutEffect(() => {
      if (search.value) {
        inputRef.current?.focus({ preventScroll: true });
      }
    }, [search.value]);

    const headerProps = {
      className: cn(st.header, props.className, headerCn, {
        [st.stucked]: headerStucked.value,
        [st.searchOpened]: search.value,
        [st.hasTitle]: !!titleField.value && !logoOnly,
        [st.isCartPage]: props.isCartPage,
      }),
    };

    const searchModalModal = (
      <ModalSwipeable
        fullScreen
        withoutAnimation
        fullScreenHeight={100}
        withHeader={false}
        withBorderRadius={false}
        open={search.value}
        onChange={() => {
          search.onChange(false);
          suggest.onChange('');
        }}
      >
        <Suggests
          device="mobile"
          popup={search}
          input={props => (
            <div
              className={cn(st.searchModalHeader, {
                [st.searchActive]: String(props.value).length > 0,
              })}
            >
              <Input
                {...props}
                Prefix={<SearchIcon />}
                ref={inputRef}
                placeholder={texts.searchBar.placeholder.catalog}
                closable={String(props.value).length > 0}
                className={st.input}
              />
              <Button outline onClick={() => search.onChange(false)}>
                {texts.cancel}
              </Button>
            </div>
          )}
        />
      </ModalSwipeable>
    );

    const authModal = (
      <Modal
        open={!!modalField.value}
        onChange={() => modalField.onChange(null)}
        header={<AuthFlowHeader />}
        className={st.modalWrapper}
        mobileFullScreen
        modalSwipeableProps={{ fullScreenHeight: 100 }}
        backActionType={flowSteps.value === Steps.set ? 'close' : 'back'}
        onActionClick={type => {
          if (type === 'close') {
            modalField.onChange(null);
            return undefined;
          }

          return flowSteps.onChange(Steps.set);
        }}
      >
        <AuthFlow source={modalField.value} />
      </Modal>
    );

    if (appIsShort) {
      return authModal;
    }

    if (!needMobileHeader) {
      return (
        <header {...headerProps} ref={ref}>
          <DesktopHeader {...props} />
          {authModal}
          {searchModalModal}
        </header>
      );
    }

    return (
      <header {...headerProps} ref={ref}>
        <DesktopHeader className={cn(st.desktop, props.className)} disableDynamicTexts={logoOnly} />
        <MobileHeader logoOnly={logoOnly} className={cn(st.mobile, props.className)} searchable={searchable} />
        {authModal}
        {searchModalModal}
      </header>
    );
  },
);
