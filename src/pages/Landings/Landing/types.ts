import { ReactNode } from 'react';

type InfoListEntry = {
  text: string;
  icon: ReactNode;
};

type InfoList = InfoListEntry[];

interface InfoEntry {
  title: string;
  titleWide: string;
  infoList: InfoList;
}

export interface SellerInfo extends InfoEntry {
  description: string[];
}

export interface BuyerInfo extends InfoEntry {
  qr: {
    picture: string;
    picture2x: string;
    pictureWebp: string;
    pictureWebp2x: string;
    text: ReactNode;
    note: string;
  };
  desktopPhonePicture: string;
  desktopPhonePicture2x: string;
  desktopPhonePictureWebp: string;
  desktopPhonePictureWebp2x: string;
  mobilePhonePicture: string;
  mobilePhonePicture2x: string;
  mobilePhonePictureWebp: string;
  mobilePhonePictureWebp2x: string;
  downloadAppText: string;
  downloadAppButton: {
    text: string;
    link: string;
  };
}

export type TsumLandingLogo = {
  logo: string;
  alt: string;
};

export type LandingFormType = {
  inputNamePlaceholder: string;
  inputPhonePlaceholder: string;
  textareaCommentPlaceholder: string;
  errorMessage: string;
  buttonFormText: string;
};

export type CollectLandingData = {
  pageTitle: string;
  pageDescription: string;
  features: {
    title: string;
    mobileTitle: string;
    content: {
      picture: string;
      mobilePicture: string;
      text: string;
    }[];
  };
  tsumCollectLogo: TsumLandingLogo;
  buyer: BuyerInfo;
  seller: SellerInfo;
  form: LandingFormType;
};
