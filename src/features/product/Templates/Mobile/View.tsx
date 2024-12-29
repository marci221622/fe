import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper as SwiperT } from 'swiper';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Item } from '@/generated/customer_hub/entities/item.v1';
import { Label } from '@/generated/customer_hub/entities/label.v1';
import { Loyalty } from '@/generated/customer_hub/entities/loyalty.v1';
import { AvailableAction } from '@/generated/customer_hub/enums/item';
import { buildDataAttrsFromItem } from '@/shared/analytics/diginetics';
import { $appIsShort, OnlyFullVariant, OnlyShortVariant } from '@/shared/configs';
import { DescriptionModals, useDescriptionModals } from '@/shared/description-modals';
import { BrandLogo } from '@/shared/ui';
import { LoyaltyBody } from '@/shared/ui/LoyaltyBanners';

import { SHORT_VERSION_TAG } from '@/constants/hardcode';

import { Space } from '@/ui/index';

import { productImagesProps } from '../../lib';
import { Actions } from '../Actions';
import { ShowroomDescription } from '../ShowroomDescription';
import { Sizes } from '../Sizes';
import { Tags } from '../Tags';
import { useAdditionalActions } from '../useAdditionalActions';

import { ProductInfo } from './Info';
import { Titles } from './Titles';

// TODO: lazy styles
import st from '../styles.module.scss';

type Props = {
  product: Item;
  openGallery: (idx: number) => void;
  notExists: boolean;
  loyalty?: Loyalty | null;
};

export function MobileProduct({ product, openGallery, notExists, loyalty }: Props) {
  const { i18n } = useLingui();
  const [activeSlide, setSlide] = useState(0);
  const [swiper, setSwiper] = useState<SwiperT | null>(null);
  const additional = useAdditionalActions(product);
  const modals = useDescriptionModals();
  const appIsShort = useUnit($appIsShort);

  useEffect(() => {
    if (swiper) {
      swiper.slideTo(activeSlide);
    }
  }, [activeSlide, swiper]);

  return (
    <>
      <div className={cn(st.mobile, st.pageWrapper)} {...buildDataAttrsFromItem(product)}>
        <div className={st.preview}>
          <Swiper
            navigation={false}
            pagination={{ clickable: true, dynamicBullets: true }}
            slidesPerView={1}
            modules={[Pagination]}
            loop
            onSlideChange={swiper => setSlide(swiper.activeIndex)}
            onSwiper={setSwiper}
          >
            {product.imagesMiddle.map((image, idx) => (
              <SwiperSlide key={image.src}>
                <img
                  data-clickable
                  src={image.src}
                  loading="lazy"
                  onClick={() => {
                    openGallery(idx);
                  }}
                  role="presentation"
                  {...productImagesProps(product, idx)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <OnlyFullVariant>
          <Tags labels={product.labels} />
        </OnlyFullVariant>

        <OnlyShortVariant>
          <Tags labels={[Label.create({ value: SHORT_VERSION_TAG, id: 'short' })]} className={st.shortTags} />
        </OnlyShortVariant>

        {appIsShort ? (
          <Space stretch align="center">
            <BrandLogo brand={product.brand} />
          </Space>
        ) : (
          <Link to={additional ? additional.brand.link : '/'} className={st.brandLogoLink}>
            <BrandLogo brand={product.brand} />
          </Link>
        )}

        <Titles product={product} notExists={notExists} />

        <LoyaltyBody place="product" loyalty={loyalty} />

        {product.availableActions.includes(AvailableAction.AVAILABLE_ACTION_COLLECT) && (
          <ShowroomDescription openModal={() => modals?.setCurrentModal(DescriptionModals.Room)} />
        )}

        <Sizes relatedItemSizes={product.relatedItemSizes} />

        <ProductInfo product={product} />

        <OnlyFullVariant>
          {additional && (
            <div className={st.showInCatalog}>
              {!!additional.brand.link && (
                <Link to={additional.brand.link} className={cn(st.active)}>
                  {additional.brand.title} {product.brand?.title}
                </Link>
              )}

              {!!additional.collection.link && (
                <Link to={additional.collection.link} className={cn(st.active)}>
                  {additional.collection.title}
                </Link>
              )}
            </div>
          )}
        </OnlyFullVariant>
      </div>

      <Actions product={product} notExists={notExists} className={st.actions} actionsSize="M" />
    </>
  );
}
