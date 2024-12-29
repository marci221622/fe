import cn from 'classnames';
import { useUnit } from 'effector-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper as SwiperInstance } from 'swiper';
import { FreeMode, Mousewheel, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Brand } from '@/generated/customer_hub/entities/brand.v1';
import { Item } from '@/generated/customer_hub/entities/item.v1';
import { Section } from '@/generated/customer_hub/enums/section';
import { Sort } from '@/generated/customer_hub/enums/sort';
import { $mappedStrings } from '@/shared/configs';
import { useLinkBuilder } from '@/shared/pageRouting';

import { ITEMS_BY_BRANDS_LENGTH, filtersCodes } from '@/constants/hardcode';
import { paths } from '@/constants/paths';

import { CarouselArrow } from '@/ui/CarouselArrow';
import { MoreAction, ImageWithPlaceholder } from '@/ui/index';

import st from './styles.module.scss';

type Props = {
  items: Item[];
  brand: Brand;
  activeGender?: Section;
  hasSidebar?: boolean;
};

const BANNER_PER_VIEW = {
  withSidebar: 4,
  noSidebar: 5,
};

export function Carousel({ items, brand, activeGender, hasSidebar }: Props) {
  const texts = useUnit($mappedStrings);
  const prevBtnRef = useRef<HTMLDivElement>(null);
  const nextBtnRef = useRef<HTMLDivElement>(null);
  const builder = useLinkBuilder(activeGender);

  const onBeforeInit = (swiper: SwiperInstance) => {
    if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
      // eslint-disable-next-line no-param-reassign
      swiper.params.navigation.prevEl = prevBtnRef.current!;
      // eslint-disable-next-line no-param-reassign
      swiper.params.navigation.nextEl = nextBtnRef.current!;
    }
  };

  const perView = hasSidebar ? BANNER_PER_VIEW.withSidebar : BANNER_PER_VIEW.noSidebar;

  const hasArrows = items.length > perView;

  return (
    <div className={cn(st.items, st.carousel)}>
      <div
        className={cn(st.item, {
          [st.hasArrows]: true,
        })}
      >
        {hasArrows && (
          <>
            <CarouselArrow ref={prevBtnRef} direction="left" />
            <CarouselArrow ref={nextBtnRef} direction="right" />
          </>
        )}

        <Swiper
          spaceBetween={8}
          navigation
          pagination={{ clickable: true }}
          slidesPerView={perView}
          modules={[Pagination, Navigation, FreeMode, Mousewheel]}
          freeMode
          mousewheel={{ forceToAxis: true }}
          onBeforeInit={onBeforeInit}
        >
          {items.map(it => (
            <SwiperSlide
              key={it.code}
              className={cn(st.slide, {
                [st.noSidebar]: !hasSidebar,
              })}
            >
              <Link to={paths.product(it.code)}>
                <div className={st.productImageContainer}>
                  <ImageWithPlaceholder src={it.imagesMiddle[0]?.src} loading="lazy" alt={it.title} />
                </div>
              </Link>
            </SwiperSlide>
          ))}

          {items.length === +ITEMS_BY_BRANDS_LENGTH && (
            <SwiperSlide key="action" className={cn(st.slide, st.actionSlide)}>
              <MoreAction
                title={texts.viewedItems.allViewedItemsButton.title}
                to={{
                  pathname: builder(paths.catalog.withSlug.brand({ slug: brand.slug })),
                  search: `${filtersCodes.sort}=${Sort.SORT_NOVELTY}`,
                }}
                centered
                className={st.moreAction}
              />
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </div>
  );
}
