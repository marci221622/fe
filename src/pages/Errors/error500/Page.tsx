import { HelmetProvider } from 'react-helmet-async';

import { Meta } from '@/shared/Seo';

import { paths } from '@/constants/paths';

import { Button } from '@/ui/Button';
import { Responsive } from '@/ui/Responsive';
import { Typography } from '@/ui/Typography';

import { DesktopBanner } from './desktopBanner';
import { MobileBanner } from './mobileBanner';

import st from './styles.modules.scss';

export default function Error500({ helmet }: { helmet?: object }) {
  const handleButtonClick = () => {
    window.location.href = paths.main();
  };

  return (
    <HelmetProvider context={helmet}>
      <div className={st.error500}>
        <Meta>
          <meta name="yandex-verification" content="9c1a3147bc1df254" />
          <meta name="google-site-verification" content="8nR_mFGvdGfNih3EK-VVhyGQLQpG4EiqAyVLEECqP1k" />
          <title>TSUM Collect</title>
          <meta name="robots" content="noindex" />
        </Meta>

        <div className={st.titleContainer}>
          <Typography.Title className={st.title}>ошибка на сервере</Typography.Title>
        </div>
        <div className={st.descriptionContainer}>
          <Typography.Paragraph className={st.description}>
            Возможно, вы перешли по неправильной ссылке или на сайте идут плановые работы. Попробуйте обновить страницу
            через некоторое время
          </Typography.Paragraph>
        </div>
        <div className={st.buttonContainer}>
          <Button size="L" className={st.button} onClick={handleButtonClick}>
            Перейти на главную
          </Button>
        </div>
        <Responsive.Desktop>
          <DesktopBanner />
        </Responsive.Desktop>
        <Responsive.TabletAndBelow>
          <MobileBanner />
        </Responsive.TabletAndBelow>
      </div>
    </HelmetProvider>
  );
}
