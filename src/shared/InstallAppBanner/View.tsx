import cn from 'classnames';
import { useUnit } from 'effector-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useStateStored } from '@/lib/hooks/useStateStored';
import { $mappedStrings } from '@/shared/configs';

import { DAYS7 } from '@/constants/days';

import { Typography } from '@/ui/index';

import { detectChromeOrAndroid } from './detector';
import { CloseSVG, LogoSVG } from './icons';

import st from './installAppBanner.module.scss';

const BANNER_VISIBLE_KEY = 'installAppBannerVisible_next';
const AFTER_DATE_KEY = `${BANNER_VISIBLE_KEY}_afterDate`;

const downloadUrls = {
  ios: 'https://apps.apple.com/RU/app/id6443570090?mt=8',
  android: 'https://play.google.com/store/apps/details?id=ru.tsum.collect',
};

export function InstallAppBanner({ className }: { className?: string }) {
  const texts = useUnit($mappedStrings);
  const [visible, setVisible, removeVisible] = useStateStored<boolean>(BANNER_VISIBLE_KEY, true);
  const { search } = useLocation();
  const [detected, setDetected] = useState<'ios' | 'android' | undefined>();

  const closeAppBanner = () => {
    setVisible(false);
    localStorage.setItem(AFTER_DATE_KEY, DAYS7.toString());
  };

  useEffect(() => {
    if (search.includes(`${BANNER_VISIBLE_KEY}=clear`)) {
      removeVisible();
    }
  }, [removeVisible, search]);

  useEffect(() => {
    const showBannerForOs = detectChromeOrAndroid();

    setDetected(showBannerForOs);
  }, []);

  useEffect(() => {
    const afterDate = localStorage.getItem(AFTER_DATE_KEY);
    const now = Date.now();

    if (afterDate && Number.isInteger(+afterDate) && now > +afterDate) {
      setVisible(true);
    }
  }, [setVisible]);

  if (!detected || !visible) {
    return null;
  }

  const downloadUrl = detected === 'ios' ? downloadUrls.ios : downloadUrls.android;

  return (
    <div className={cn(st.wrapper, className)}>
      <div className={st.content}>
        <LogoSVG />

        <div>
          <Typography.Paragraph>
            {texts.web.inApp}
            <br />
            {texts.web.mobileApp}
          </Typography.Paragraph>
        </div>

        <a className={st.btn_download} href={downloadUrl} target="_blank" rel="noreferrer">
          {texts.web.download}
        </a>
      </div>

      <CloseSVG onClick={closeAppBanner} className={st.btn_close} />
    </div>
  );
}
