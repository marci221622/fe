import cn from 'classnames';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper as SwiperInstance } from 'swiper';
import { Mousewheel, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { BannersBlock } from '@/generated/customer_hub/entities/banners_block.v1';
import { EridAlert, eridToLink } from '@/shared/ui';

import { Typography, CarouselArrow } from '@/ui/index';

import { useHomeBannersLink } from '../transformers';

import st from './styles.module.scss';

export function Banner({ banner, device }: { banner: BannersBlock; device: Device }) {
  const linkClicked = useHomeBannersLink();
  const prevBtnRef = useRef<HTMLDivElement>(null);
  const nextBtnRef = useRef<HTMLDivElement>(null);

  const slidesPerGroup = device === 'desktop' ? +banner.bannersCount || 1 : 1;

  const slidesPerView = Math.min(slidesPerGroup, banner.banners.length);

  const carouselStyles =
    banner.banners[0] && device === 'mobile'
      ? {
          aspectRatio: `${banner.banners[0].image?.width} / ${Math.ceil(
            (banner.banners[0].image?.height ?? 1) / slidesPerGroup,
          )}`,
        }
      : {};

  const imageClassname = slidesPerView === 1 ? st.alone : banner.banners.length === 2 ? st.double : st.triple;

  const onBeforeInit = (swiper: SwiperInstance) => {
    if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
      // eslint-disable-next-line no-param-reassign
      swiper.params.navigation.prevEl = prevBtnRef.current!;
      // eslint-disable-next-line no-param-reassign
      swiper.params.navigation.nextEl = nextBtnRef.current!;
    }
  };

  return (
    <div className={cn(st.banners, st.carousel)} data-homeblock>
      {banner.title && (
        <Typography.Paragraph className={st.title} center>
          {banner.title}
        </Typography.Paragraph>
      )}

      <div
        className={cn(st.banner, imageClassname, {
          [st.hasArrows]: banner.banners.length > slidesPerView,
        })}
        style={carouselStyles}
      >
        <CarouselArrow ref={prevBtnRef} direction="left" />
        <CarouselArrow ref={nextBtnRef} direction="right" />

        <Swiper
          navigation
          pagination={{ clickable: true }}
          slidesPerView={slidesPerView}
          modules={[Pagination, Navigation, Mousewheel]}
          mousewheel={{ forceToAxis: true }}
          spaceBetween={32}
          slidesPerGroup={1}
          onBeforeInit={onBeforeInit}
        >
          {banner.banners.map(banner => {
            const link = linkClicked(banner.payload ? banner.payload : null);

            const content = (
              <div style={{ maxWidth: '100%', width: '100%' }}>
                <img src={banner.image?.src} loading="lazy" alt="" role="presentation" />
                {device === 'desktop' && (
                  <>
                    <Typography.Paragraph className={st.subtitle}>{banner.title}</Typography.Paragraph>
                    <Typography.Paragraph className={st.description}>{banner.description}</Typography.Paragraph>
                  </>
                )}
              </div>
            );

            return (
              <SwiperSlide key={banner.id}>
                <EridAlert className={st.erid} erid={banner.erid} />
                {link.reloadDocument ? (
                  <a href={eridToLink(link.to, banner.erid)} target="_blank" rel="noreferrer" style={{ flex: 1 }}>
                    {content}
                  </a>
                ) : (
                  <Link {...link} to={eridToLink(link.to, banner.erid)}>
                    {content}
                  </Link>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
