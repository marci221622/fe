import { QRCodeSVG } from 'qrcode.react';
import React from 'react';

import { useMobileAppDownloadLinks } from '@/shared/configs';

import { Typography } from '@/ui/Typography';

import { AppleBadge, GoogleBadge } from '@/ui/assets/Bagges';

import phoneImg1 from './phoneImg1.png';
import phoneImg2 from './phoneImg2.png';

import st from './styles.module.scss';

export function DesktopBanner() {
  const mobileAppLinks = useMobileAppDownloadLinks();

  return (
    <div className={st.desktopBanner}>
      <div className={st.content}>
        <div className={st.titleContainer}>
          <Typography.Title className={st.title}>устройте себе шопинг в нашем приложении</Typography.Title>
        </div>
        <div className={st.descriptionContainer}>
          <Typography.Paragraph className={st.description}>
            Отсканируйте QR-код,
            <br /> чтобы установить приложение
          </Typography.Paragraph>
        </div>
        <div className={st.row}>
          <div className={st.loadImgContainer}>
            <a href={mobileAppLinks.ios} aria-label="apple">
              <AppleBadge />
            </a>
            <a href={mobileAppLinks.android} aria-label="android">
              <GoogleBadge />
            </a>
          </div>
          <div className={st.qrCode}>
            <QRCodeSVG value={mobileAppLinks.qr} className={st.qrCode} includeMargin size={84} />
          </div>
        </div>
      </div>
      <div className={st.bannersContainer}>
        <img src={phoneImg1} width={219} height={365} alt="" />
        <img src={phoneImg2} width={172} height={287} alt="" />
      </div>
    </div>
  );
}
