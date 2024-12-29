import { useMobileAppDownloadLinks } from '@/shared/configs';

import { Typography } from '@/ui/Typography';

import { AppleBadge, GoogleBadge } from '@/ui/assets/Bagges';

import bannerImg from './bannerImg.png';

import st from './styles.module.scss';

export function MobileBanner() {
  const mobileAppLinks = useMobileAppDownloadLinks();

  return (
    <div className={st.container}>
      <div className={st.titleContainer}>
        <Typography.Title className={st.title}>устройте себе шопинг в нашем приложении</Typography.Title>
      </div>
      <div className={st.descriptionContainer}>
        <Typography.Paragraph className={st.description}>Доступно для iPhone и Android</Typography.Paragraph>
      </div>
      <div className={st.row}>
        <a href={mobileAppLinks.ios} aria-label="apple">
          <AppleBadge />
        </a>
        <a href={mobileAppLinks.android} aria-label="android">
          <GoogleBadge />
        </a>
      </div>
      <img className={st.phoneImg} src={bannerImg} alt="" />
    </div>
  );
}
