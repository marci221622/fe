import React from 'react';
import { Pagination, Mousewheel, Zoom } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Image } from '@/generated/common/image.v1';
import { Modal, ZoomableImage } from '@/shared/ui';

import { Responsive } from '@/ui/index';

import st from './styles.module.scss';

type Props = {
  slideIndex: number | null;
  setSlideIndex: (index: number | null) => void;
  actions: React.JSX.Element;
  images: Image[];
};

export function ProductGallery({ slideIndex, setSlideIndex, actions, images }: Props) {
  return (
    <Modal
      fullScreen
      open={slideIndex !== null}
      onChange={() => setSlideIndex(null)}
      headerClassName={st.modalHeader}
      bodyClassName={st.modalBody}
      modalSwipeableProps={{
        withBorderRadius: false,
        fullScreenHeight: 100,
        bottomAction: actions,
      }}
    >
      <Responsive.Desktop className={st.responsive}>
        <div className={st.modalContentWrapper}>
          <Swiper
            mousewheel
            navigation={false}
            pagination={{ clickable: true, dynamicBullets: true, dynamicMainBullets: 5 }}
            initialSlide={slideIndex ?? 0}
            slidesPerView={1}
            modules={[Pagination, Mousewheel]}
            loop
          >
            {images.map(image => (
              <SwiperSlide key={image.src} style={{ aspectRatio: `${image.width} / ${image.height}` }}>
                {({ isActive }) => (
                  <ZoomableImage key={image.src} img={image.src} isOpen={slideIndex !== null} isActive={isActive} />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Responsive.Desktop>

      <Responsive.TabletAndBelow className={st.responsive}>
        <div className={st.modalContentWrapper}>
          <Swiper
            loop
            zoom
            mousewheel
            navigation={false}
            pagination={{ clickable: true, dynamicBullets: true, dynamicMainBullets: 5 }}
            initialSlide={slideIndex ?? 0}
            slidesPerView={1}
            modules={[Pagination, Mousewheel, Zoom]}
          >
            {images.map(image => (
              <SwiperSlide key={image.src} style={{ aspectRatio: `${image.width} / ${image.height}` }} zoom>
                <img src={image.src} loading="lazy" alt="" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Responsive.TabletAndBelow>
    </Modal>
  );
}
