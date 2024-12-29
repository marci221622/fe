import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useMobileAppDownloadLinks } from '@/shared/configs';

import { paths } from '@/constants/paths';


import { TabLinks } from '@/ui/index';
import { Responsive } from '@/ui/Responsive';

import { InfoList } from '../InfoList';
import { SellerForm } from '../SellerForm';
import { BuyerInfo, LandingFormType, SellerInfo, TsumLandingLogo } from '../types';

import st from './style.module.scss';

type Props = {
  tsumCollectLogo: TsumLandingLogo;
  buyer: BuyerInfo;
  seller: SellerInfo;
  form: LandingFormType;
};

const SELLER_TAB_HASH = '#startSelling';
const SELLER_TAB_LINK = `${paths.landings.landing()}${SELLER_TAB_HASH}`;

const tablinks = [
  {
    label: 'Купить',
    to: paths.landings.landing(),
  },
  {
    label: 'Продать',
    to: SELLER_TAB_LINK,
  },
];

export function Info({ buyer, seller, form, tsumCollectLogo }: Props) {
  const location = useLocation();
  const [activeTabLink, setActiveTabLink] = useState(`${location.pathname}${location.hash}`);
  const mobileAppLinks = useMobileAppDownloadLinks();

  const BuyerTabContent = (
    <div>
      <a className={st.mobileApp} href={mobileAppLinks.auto}>
        <picture>
          <source
            type="image/webp"
            srcSet={`${buyer.mobilePhonePictureWebp} 1x, ${buyer.mobilePhonePictureWebp2x} 2x`}
          />
          <img
            src={buyer.mobilePhonePicture}
            srcSet={`${buyer.mobilePhonePicture2x} 2x`}
            width="240"
            height="184"
            alt={buyer.downloadAppText}
          />
        </picture>
        <div className={st.downloadApp}>
          <div className={st.downloadAppImage}>
            <img src={tsumCollectLogo.logo} width="40" height="40" alt={tsumCollectLogo.alt} />
          </div>
          <p>{buyer.downloadAppText}</p>
          <div className={st.downloadAppButton}>{buyer.downloadAppButton.text}</div>
        </div>
      </a>
      <InfoList data={buyer} />
    </div>
  );

  const SellerTabContent = (
    <>
      <SellerForm form={form} description={seller.description} />
      <InfoList data={seller} />
    </>
  );

  return (
    <>
      <Responsive.Desktop>
        <section className={st.info}>
          <div className={st.infoTop}>
            <div className={st.buyer}>
              <h2 className={st.title}>{buyer.title}</h2>
              <div className={st.qrContainer}>
                <picture className={st.qrBackground}>
                  <source
                    type="image/webp"
                    srcSet={`${buyer.desktopPhonePictureWebp} 1x, ${buyer.desktopPhonePictureWebp2x} 2x`}
                  />
                  <img
                    src={buyer.desktopPhonePicture}
                    srcSet={`${buyer.desktopPhonePicture2x} 2x`}
                    height="273"
                    alt=""
                  />
                </picture>
                <div className={st.qrContent}>
                  <div className={st.qrTextContainer}>
                    <p className={st.qrTitle}>{buyer.qr.text}</p>
                    <p className={st.qrNote}>{buyer.qr.note}</p>
                  </div>
                  <QRCodeSVG value={mobileAppLinks.qr} size={128} />
                </div>
              </div>
            </div>
            <div className={st.seller}>
              <h2 className={st.title}>{seller.title}</h2>
              <SellerForm form={form} description={seller.description} />
            </div>
          </div>
          <div className={st.infoBottom}>
            <InfoList data={buyer} />
            <InfoList data={seller} />
          </div>
        </section>
      </Responsive.Desktop>

      <Responsive.TabletAndBelow>
        <TabLinks classname={st.links} tabs={tablinks} active={activeTabLink} onClick={setActiveTabLink} />
        {activeTabLink === SELLER_TAB_LINK ? SellerTabContent : BuyerTabContent}
      </Responsive.TabletAndBelow>
    </>
  );
}
