import { useUnit } from 'effector-react';
import { useRef } from 'react';
import { Swiper as SwiperInstance } from 'swiper';
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { $mappedStrings, $showroomAdditional } from '@/shared/configs';
import { Modal } from '@/shared/ui';

import { CarouselArrow } from '@/ui/index';

import { ClockIcon, LocationPoint } from '@/ui/assets/icons';

import st from './styles.module.scss';

export function RoomModal({ closeModal, isOpen }: { closeModal: () => void; isOpen: boolean }) {
  const texts = useUnit($mappedStrings);
  const { images } = useUnit($showroomAdditional);

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

  if (!texts.itemDetails.showroom.text) {
    return null;
  }

  return (
    <Modal
      open={isOpen}
      onChange={closeModal}
      header=""
      wrapClassName={st.modalContainer}
      bodyClassName={st.body}
      modalSwipeableProps={{ autoHeight: true }}
    >
      <div className={st.showRoomModalWrapper}>
        <CarouselArrow ref={prevBtnRef} direction="left" size="normal" />
        <CarouselArrow ref={nextBtnRef} direction="right" size="normal" />

        <Swiper
          navigation
          pagination={{ clickable: true }}
          slidesPerView={1}
          modules={[Pagination, Navigation]}
          spaceBetween={16}
          onBeforeInit={onBeforeInit}
        >
          {images.map(image => (
            <SwiperSlide key={image} className={st.slide}>
              <img src={image} loading="lazy" alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={st.addressWrapper}>
        <LocationPoint />
        <div>
          <p className={st.title}>{texts.aboutShowroom.title.line1}</p>
          <p className={st.description}>{texts.aboutShowroom.text.line1}</p>
        </div>
      </div>

      <div className={st.roomAdditionalAddress}>
        <p className={st.description}>{texts.aboutShowroom.text.line2}</p>
      </div>

      <div className={st.addressWrapper}>
        <ClockIcon />
        <div>
          <p className={st.title}>{texts.aboutShowroom.title.line3}</p>

          <p className={st.description}>{texts.aboutShowroom.text.line3}</p>
        </div>
      </div>
    </Modal>
  );
}
