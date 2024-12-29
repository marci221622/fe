import cn from 'classnames';
import { useUnit } from 'effector-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper as SwiperInstance } from 'swiper';
import { Mousewheel, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { FavoriteBrandsBannersBlock } from '@/generated/customer_hub/entities/banners_block.v1';
import { Sort } from '@/generated/customer_hub/enums/sort';
import { $brandsListScheme, $favoriteBrandsPageLink } from '@/shared/brands';
import { $mappedStrings } from '@/shared/configs';
import { useLinkBuilder } from '@/shared/pageRouting';
import { BrandLogo } from '@/shared/ui';

import { filtersCodes } from '@/constants/hardcode';
import { paths } from '@/constants/paths';

import { CarouselArrow, Typography } from '@/ui/index';

import st from './styles.module.scss';

type Props = {
  block: FavoriteBrandsBannersBlock;
  device: Device;
};

const perGroup = {
  mobile: 1,
  desktop: 2,
};

const gap = 16;
const itemsLength = 2;
const modules = {
  desktop: [Pagination, Navigation, Mousewheel],
  mobile: [Pagination],
};

export function FavoriteBrands({ device, block }: Props) {
  const texts = useUnit($mappedStrings);
  const prevBtnRef = useRef<HTMLDivElement>(null);
  const nextBtnRef = useRef<HTMLDivElement>(null);
  const brandsScheme = useUnit($brandsListScheme);
  const pageLink = useUnit($favoriteBrandsPageLink);
  const builder = useLinkBuilder();

  const slidesPerView = device === 'desktop' ? perGroup.desktop : perGroup.mobile;

  const onBeforeInit = (swiper: SwiperInstance) => {
    if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
      // eslint-disable-next-line no-param-reassign
      swiper.params.navigation.prevEl = prevBtnRef.current!;
      // eslint-disable-next-line no-param-reassign
      swiper.params.navigation.nextEl = nextBtnRef.current!;
    }
  };

  const title = texts.homeScreen.favoriteBrands.banner.title || block.title;

  return (
    <div className={cn(st.banners, { [st.carousel]: true })} data-homeblock>
      {title && (
        <Link to={builder(pageLink)}>
          <Typography.Paragraph className={st.title} center>
            {title}
          </Typography.Paragraph>
        </Link>
      )}

      <div
        className={cn(st.banner, {
          [st.hasArrows]: true,
        })}
      >
        <CarouselArrow ref={prevBtnRef} direction="left" />
        <CarouselArrow ref={nextBtnRef} direction="right" />

        <Swiper
          navigation
          pagination={{ clickable: true }}
          slidesPerView={slidesPerView}
          modules={device === 'desktop' ? modules.desktop : modules.mobile}
          mousewheel={device === 'desktop' ? { forceToAxis: true } : false}
          spaceBetween={gap}
          slidesPerGroup={1}
          onBeforeInit={onBeforeInit}
        >
          {block.brandsItems.map(banner => {
            const brand = brandsScheme[banner.brandCode];

            if (!brand || banner.items.length < itemsLength) {
              return null;
            }

            const itemLink = builder(paths.catalog.withSlug.brand({ slug: brand.slug }));

            return (
              <SwiperSlide key={banner.brandCode}>
                <div className={st.imagesWrapper}>
                  {banner.items.map(item => {
                    return (
                      <Link
                        key={item.code}
                        to={{ pathname: itemLink, search: `?${filtersCodes.sort}=${Sort.SORT_PRESORTED}` }}
                      >
                        <img
                          src={item.imagesMiddle[0]?.src}
                          loading="lazy"
                          alt=""
                          role="presentation"
                          className={st.productImage}
                        />
                      </Link>
                    );
                  })}
                </div>

                <BrandLogo brand={brandsScheme[banner.brandCode]} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
