import { MessageDescriptor } from '@lingui/core';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { $appIsShort, $mappedStrings, useMobileAppDownloadLinks } from '@/shared/configs';
import { useDescriptionModals } from '@/shared/description-modals';

import { TELEGRAMM_LINK } from '@/constants/hardcode';
import { paths } from '@/constants/paths';

import { usePrevious } from '@/lib/usePrevious';

import { Accordion, Responsive, useAccordionTrigger } from '@/ui/index';

import { AppleBadge, GoogleBadge } from '@/ui/assets/Bagges';
import { Chevron, TelegramIcon } from '@/ui/assets/icons';

import { InfoLink } from './info';
import { $activePanels, $info, panelsChanged } from './model';

import st from './styles.module.scss';

type FooterProps = {
  className?: string;
};

function InfoBlock({
  title,
  links,
  onCommand,
}: {
  title?: MessageDescriptor | string;
  links: InfoLink[];
  onCommand?: (command: string) => void;
}) {
  const { i18n } = useLingui();

  const renderItemContent = (it: InfoLink) => {
    const text = i18n._(it.text);

    if (it.href) {
      return (
        <Link to={it.href} target={it.target}>
          {text}
        </Link>
      );
    }

    if (it.command && onCommand) {
      const command = it.command;

      return (
        <button
          type="button"
          onClick={() => {
            onCommand(command);
          }}
        >
          {text}
        </button>
      );
    }

    return text;
  };

  return (
    <div className={st.info}>
      {title && <h2 className={st.title}>{typeof title === 'string' ? title : i18n._(title)}</h2>}
      <ul>
        {links.map(it => (
          <li key={it.text.id}>{renderItemContent(it)}</li>
        ))}
      </ul>
    </div>
  );
}

function Socials() {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();
  const mobileAppLinks = useMobileAppDownloadLinks();

  return (
    <>
      <h2 className={st.title}>{texts.web.ourApp}</h2>
      <p>{texts.web.scanQR}</p>
      <div className={st.appsWithQr}>
        <Responsive.Desktop>
          <QRCodeSVG value={mobileAppLinks.qr} className={st.qrCode} includeMargin size={84} />
        </Responsive.Desktop>
        <div className={st.appLinks}>
          <a href={mobileAppLinks.ios} aria-label="apple">
            <AppleBadge />
          </a>
          <a href={mobileAppLinks.android} aria-label="android">
            <GoogleBadge />
          </a>
        </div>
      </div>
    </>
  );
}

const InfoAsAccordion = ({
  onCommand,
  accordion: [activePanels, { changePanels }],
}: {
  onCommand?: (command: string) => void;
  accordion: ReturnType<typeof useAccordionTrigger>;
}) => {
  const { i18n } = useLingui();
  const info = useUnit($info);

  return (
    <Accordion activePanels={activePanels} onChange={changePanels}>
      {info.map(it => (
        <Accordion.Panel
          activeTitleClassName={st.activeTitle}
          className={st.footerPanel}
          key={typeof it.title === 'string' ? it.title : it.title.id}
          title={({ isActive }) => (
            <p className={st.devider}>
              {typeof it.title === 'string' ? it.title : i18n._(it.title)}
              <Chevron className={cn(st.chevron)} direction={isActive ? 'top' : 'right'} />
            </p>
          )}
          titleClassName={st.title}
        >
          <InfoBlock links={it.links} onCommand={onCommand} />
        </Accordion.Panel>
      ))}
    </Accordion>
  );
};

export function Footer({ className }: FooterProps) {
  const texts = useUnit($mappedStrings);
  const appIsShort = useUnit($appIsShort);
  const { i18n } = useLingui();
  const descriptionModals = useDescriptionModals();
  const info = useUnit($info);
  const activePannels = useUnit($activePanels);
  const changePanel = useUnit(panelsChanged);

  const accordion = useAccordionTrigger({
    isMultiply: true,
    initialKeys: activePannels,
  });

  const prevPannels = usePrevious(accordion[0]);

  useEffect(() => {
    if (accordion[0] && prevPannels !== accordion[0]) {
      changePanel(accordion[0]);
    }
  }, [accordion, changePanel, prevPannels]);

  const date = new Date();

  if (appIsShort) {
    return null;
  }

  return (
    <div className={cn(className, st.footer)}>
      <Responsive.Desktop>
        <div className={st.infoWrapper}>
          {info.map(it => (
            <InfoBlock
              key={typeof it.title === 'string' ? it.title : it.title.id}
              title={it.title}
              links={it.links}
              onCommand={descriptionModals?.setCurrentModal}
            />
          ))}

          <div className={cn(st.info, st.socials)}>
            <Socials />
          </div>
        </div>
      </Responsive.Desktop>

      <Responsive.TabletAndBelow>
        <InfoAsAccordion onCommand={descriptionModals?.setCurrentModal} accordion={accordion} />
      </Responsive.TabletAndBelow>

      <Responsive.TabletAndBelow>
        <a href={TELEGRAMM_LINK} className={st.telegram} target="_blank" rel="noreferrer">
          <h2 className={st.title}>{t`Мы в Telegram`}</h2>
          <TelegramIcon />
        </a>
      </Responsive.TabletAndBelow>

      <Responsive.TabletAndBelow className={cn(st.info, st.socials)}>
        <Socials />
      </Responsive.TabletAndBelow>

      <div className={cn(st.infoWrapper, st.row2)}>
        <p className={st.company}>{t`© ООО «Меркури Мода», ${date.getFullYear()}`}</p>
        <p>
          <Link to={paths.landings.terms()}>{texts.help.userAgreement}</Link>
        </p>
        <p>
          <Link to={paths.landings.privacyPolicy()}>{texts.help.privacyPolicy}</Link>
        </p>
        <Responsive.Desktop className={st.p}>
          <a href={TELEGRAMM_LINK} className={st.telegram} target="_blank" rel="noreferrer">
            {texts.web.telegram} <TelegramIcon />
          </a>
        </Responsive.Desktop>
      </div>
    </div>
  );
}
