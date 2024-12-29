import cn from 'classnames';
import { useUnit } from 'effector-react';
import { ComponentPropsWithoutRef } from 'react';

import { TELEGRAMM_LINK_BOT, WHATSAPP_LINK } from '@/constants/hardcode';

import { usePopupState, useViewport } from '@/lib/hooks';

import { List, Responsive } from '@/ui/index';

import { ChatIcon, CloseIcon, TelegramStrokedIcon, WhatsAppIcon } from '@/ui/assets/icons';

import { $appIsShort, $mappedStrings } from '../../configs';
import { ModalSwipeable } from '../Modal/ModalSwipeable';

import { Popup } from './Popup';

import st from './styles.module.scss';

type Props = {
  /**
   * common только для обычных кнопок на страницах
   * custom для явно вставленных
   */
  context?: 'common' | 'custom';
  desktopOnly?: boolean;
};

export function ChatBadge({
  className,
  context = 'common',
  desktopOnly,
  ...props
}: ComponentPropsWithoutRef<'div'> & Props) {
  const texts = useUnit($mappedStrings);
  const popup = usePopupState();
  const appIsShort = useUnit($appIsShort);
  const { isDesktop } = useViewport();

  const icon = (
    <div
      onClick={e => {
        e.stopPropagation();
        popup.togglePopup();
      }}
      {...props}
      className={cn(st.wrapper)}
    >
      {popup.isOpen ? <CloseIcon /> : <ChatIcon />}
    </div>
  );

  const listItems = [
    { label: texts.contactUs.cell.whatsApp, to: WHATSAPP_LINK, icon: <WhatsAppIcon /> },
    { label: texts.contactUs.cell.telegram, to: TELEGRAMM_LINK_BOT, icon: <TelegramStrokedIcon /> },
  ];

  const styles = {
    [st.commonCtx]: context === 'common',
  };

  if (appIsShort || (desktopOnly && !isDesktop)) {
    return null;
  }

  return (
    <>
      <Responsive.Desktop className={cn(st.positioner, className, styles)}>
        <Popup isOpen={popup.isOpen} closePopup={popup.closePopup} icon={icon}>
          <List items={listItems} />
        </Popup>
      </Responsive.Desktop>

      <Responsive.TabletAndBelow className={cn(st.positioner, className, styles)}>
        {icon}

        <ModalSwipeable header={texts.contactUs.title} open={popup.isOpen} onChange={popup.closePopup}>
          <List labelsSize="small" items={listItems} />
        </ModalSwipeable>
      </Responsive.TabletAndBelow>
    </>
  );
}
