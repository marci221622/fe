import { useLingui } from '@lingui/react';
import { ReactNode, useCallback, ReactElement, forwardRef } from 'react';
import { Popover } from 'react-tiny-popover';

import { PopupMenu } from '../../PopupMenu';

import st from './styles.module.scss';

interface Props {
  closePopup: () => void;
  isOpen: boolean;
  children: ReactElement & ReactNode;
  icon: React.JSX.Element;
}

export const Popup = forwardRef<HTMLDivElement, Props>(({ closePopup, isOpen, children, icon }, ref) => {
  const { i18n } = useLingui();

  const renderContent = useCallback(
    () => (
      <PopupMenu ref={ref} withHeader={false} closePopup={closePopup} className={st.bodyWrapper}>
        {children}
      </PopupMenu>
    ),
    [children, ref, closePopup],
  );

  return (
    <Popover
      align="end"
      padding={16}
      positions={['top']}
      isOpen={isOpen}
      content={renderContent}
      onClickOutside={closePopup}
      containerClassName={st.popup}
    >
      {icon}
    </Popover>
  );
});
