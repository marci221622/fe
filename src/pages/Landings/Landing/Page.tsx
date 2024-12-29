import cn from 'classnames';
import { useUnit } from 'effector-react';

import { $appIsShort } from '@/shared/configs';

import { Faq, landingSeo } from '@/features/landings';


import BannerMob from './assets/banner/banner-1-mob.jpg';
import BannerWebpMob from './assets/banner/banner-1-mob.webp';
import Banner2xMob from './assets/banner/banner-1-mob@2x.jpg';
import BannerWebp2xMobx from './assets/banner/banner-1-mob@2x.webp';
import Banner from './assets/banner/banner-1.jpg';
import BannerWebp from './assets/banner/banner-1.webp';
import Banner2x from './assets/banner/banner-1@2x.jpg';
import BannerWebp2x from './assets/banner/banner-1@2x.webp';
import { DATA } from './data';
import { Info } from './Info/index';

import st from './styles.module.scss';

export default function LandingPage() {
  const appIsShort = useUnit($appIsShort);

  return (
    <>
      <landingSeo.Seo />

      <section
        className={cn(st.banner, {
          [st.navigationDisabled]: appIsShort,
        })}
      >
        <div className={st.bannerImageWrapper}>
          <picture>
            <source
              type="image/webp"
              media="(max-width: 550px)"
              srcSet={`${BannerWebpMob} 1x, ${BannerWebp2xMobx} 2x`}
            />
            <source type="image/webp" media="(max-width: 550px)" srcSet={`${BannerMob} 1x, ${Banner2xMob} 2x`} />
            <source type="image/webp" srcSet={`${BannerWebp} 1x, ${BannerWebp2x} 2x`} />
            <img
              src={Banner}
              srcSet={`${Banner2x} 2x`}
              width={1184}
              height={582}
              alt="Сервис ЦУМа для покупки и продажи товаров класса люкс"
            />
          </picture>
        </div>
      </section>

      <div className={st.pageDescription}>
        <h1>{DATA.pageTitle}</h1>
        <p>{DATA.pageDescription}</p>
      </div>

      <Info buyer={DATA.buyer} seller={DATA.seller} form={DATA.form} tsumCollectLogo={DATA.tsumCollectLogo} />

      <Faq titleClassName={st.faqTitle} hideListTitles />
    </>
  );
}