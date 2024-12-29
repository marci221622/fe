import cn from 'classnames';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper as SwiperInstance } from 'swiper';
import { Mousewheel, FreeMode, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { CategoriesBlock } from '@/generated/customer_hub/entities/categories_block.v1';
import { Type } from '@/generated/customer_hub/enums/type';

import { Typography, CarouselArrow } from '@/ui/index';

import { useHomeBannersLink } from '../transformers';

import st from './styles.module.scss';

const bannersPerView = {
  mobile: 3,
  desktop: 5,
};

export function Categories({ category, device }: { category: CategoriesBlock; device: Device }) {
  const linkClicked = useHomeBannersLink(Type.CATEGORY);
  const prevBtnRef = useRef<HTMLDivElement>(null);
  const nextBtnRef = useRef<HTMLDivElement>(null);

  const onBeforeInit = (swiper: SwiperInstance) => {
    if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
      // eslint-disable-next-line no-param-reassign
      swiper.params.navigation.prevEl = prevBtnRef.current!;
      // eslint-disable-next-line no-param-reassign
      swiper.params.navigation.nextEl = nextBtnRef.current!;
    }
  };

  return (
    <div
      data-homeblock
      className={cn(st.categories, {
        [st.carousel]: device === 'desktop',
      })}
    >
      <Typography.Paragraph className={st.title} center>
        {category.title}
      </Typography.Paragraph>

      {device === 'desktop' ? (
        <div
          className={cn(st.category, {
            [st.hasArrows]: category.categories.length > bannersPerView[device],
          })}
        >
          <CarouselArrow ref={prevBtnRef} direction="left" />
          <CarouselArrow ref={nextBtnRef} direction="right" />

          <Swiper
            navigation
            freeMode
            mousewheel={{ forceToAxis: true }}
            pagination={{ clickable: true }}
            slidesPerView={bannersPerView[device]}
            modules={[Pagination, Navigation, Mousewheel, FreeMode]}
            onBeforeInit={onBeforeInit}
            spaceBetween={16}
          >
            {category.categories.map(it => (
              <SwiperSlide key={it.id}>
                <Link {...linkClicked(it?.payload ?? null)}>
                  <div className={st.productImageContainer}>
                    <img src={it.image?.src} loading="lazy" alt="" role="presentation" />
                  </div>
                  <Typography.Paragraph center className={st.slideTitle}>
                    {it.title}
                  </Typography.Paragraph>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className={st.category}>
          {category.categories.map(it => (
            <div key={it.id} className={st.slide}>
              <Link {...linkClicked(it?.payload ?? null)}>
                <div className={st.productImageContainer}>
                  <img src={it.image?.src} loading="lazy" alt="" role="presentation" />
                </div>
                <Typography.Paragraph center className={st.slideTitle}>
                  {it.title}
                </Typography.Paragraph>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
