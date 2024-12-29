import cn from 'classnames';
import { useUnit } from 'effector-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper as SwiperInstance } from 'swiper';
import { Mousewheel, FreeMode, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Button } from '@/generated/customer_hub/entities/button.v1';
import { Item } from '@/generated/customer_hub/entities/item.v1';
import { ItemsBlock } from '@/generated/customer_hub/entities/items_block.v1';
import { Payload } from '@/generated/customer_hub/entities/payload.v1';
import { SlugType } from '@/generated/customer_hub/entities/slug.v1';
import { Type } from '@/generated/customer_hub/enums/type';
import { WithProductShowAnalytic } from '@/shared/analytics';
import { $mappedStrings } from '@/shared/configs';
import { BrandLogo, MinimalProductCard } from '@/shared/ui';
import { isPriceByRequest } from '@/shared/watches';

import { getPrice } from '@/lib/transformers';

import { Price, Typography, CarouselArrow, MoreAction } from '@/ui/index';

import { useHomeBannersLink } from '../transformers';

import st from './styles.module.scss';

const bannersPerView = {
  mobile: 3,
  desktop: 5,
};

type Props = {
  item: Omit<ItemsBlock, 'button'> & {
    button?: Omit<Button, 'payload'> & {
      payload?: Omit<Payload, 'type'> & { type: Type | 'lastViewed' | 'favoritebrands' };
    };
  };
  device: Device;
  onProductClicked?: (item: Item | 'all_view_action') => void;
  // Что бы выводить не карточки текущие, а минимальную продукта
  asMinimal?: boolean;
  // Управление позицией кнопки
  centered?: boolean;
  // Если большая цена и дисконт цена, то пишем в столбик
  verticalPriceAlignment?: boolean;
};

export function Items({ item, device, onProductClicked, asMinimal, centered, verticalPriceAlignment = false }: Props) {
  const linkClicked = useHomeBannersLink();
  const prevBtnRef = useRef<HTMLDivElement>(null);
  const nextBtnRef = useRef<HTMLDivElement>(null);
  const texts = useUnit($mappedStrings);

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
      className={cn(st.items, {
        [st.carousel]: device === 'desktop' && item.itemsList.length > bannersPerView.desktop,
      })}
    >
      <Typography.Paragraph className={st.title} center>
        {item.title}
      </Typography.Paragraph>

      {device === 'desktop' && item.itemsList.length > bannersPerView[device] ? (
        <div
          className={cn(st.item, {
            [st.hasArrows]: item.itemsList.length > bannersPerView[device],
          })}
        >
          <CarouselArrow ref={prevBtnRef} direction="left" />
          <CarouselArrow ref={nextBtnRef} direction="right" />

          <Swiper
            navigation
            pagination={{ clickable: true }}
            slidesPerView={bannersPerView[device]}
            modules={[Pagination, Navigation, FreeMode, Mousewheel]}
            freeMode
            mousewheel={{ forceToAxis: true }}
            onBeforeInit={onBeforeInit}
            spaceBetween={16}
          >
            {item.itemsList.map(it => (
              <SwiperSlide key={it.code} className={st.slide}>
                <WithProductShowAnalytic list={item.title} item={it}>
                  <Link
                    {...linkClicked({
                      title: it.title,
                      type: Type.ITEM,
                      value: it.code,
                      slug: { type: SlugType.UNRECOGNIZED, slug: it.slug },
                    })}
                    onClick={() => onProductClicked?.(it)}
                  >
                    <div className={st.productImageContainer}>
                      <img
                        src={it.imagesLarge[0]?.src}
                        loading="lazy"
                        alt=""
                        role="presentation"
                        className={cn(st.itemImage, st.productImage)}
                      />
                    </div>
                  </Link>
                </WithProductShowAnalytic>
                <BrandLogo brand={it.brand} />
                <Price
                  {...getPrice(it)}
                  revert
                  className={st.price}
                  discountPercent={it.discountPercent}
                  discountBelow
                  byRequestDescription={isPriceByRequest(it) ? texts.homeScreen.price.hide : undefined}
                />
              </SwiperSlide>
            ))}

            {item.button && (
              <SwiperSlide key="action" className={cn(st.slide, st.actionSlide)}>
                <MoreAction
                  {...linkClicked(item.button?.payload ?? null)}
                  title={item.button?.title}
                  centered
                  onClick={() => onProductClicked?.('all_view_action')}
                />
              </SwiperSlide>
            )}
          </Swiper>
        </div>
      ) : (
        <div className={st.item}>
          {item.itemsList.map(it => (
            <div key={it.code} className={st.slide}>
              {asMinimal ? (
                <WithProductShowAnalytic list={item.title} item={it}>
                  <MinimalProductCard
                    code={it.code}
                    onClick={() => onProductClicked?.(it)}
                    imagePrimary={{
                      small: it.imagesSmall[0]?.src,
                      middle: it.imagesMiddle[0]?.src,
                      large: it.imagesLarge[0]?.src,
                    }}
                    imageSecondary={{
                      small: it.imagesSmall[1]?.src,
                      middle: it.imagesMiddle[1]?.src,
                      large: it.imagesLarge[1]?.src,
                    }}
                    brandText={it.brand?.title ?? ''}
                    brandImage={it.brand?.logoLink?.src}
                  />
                </WithProductShowAnalytic>
              ) : (
                <>
                  <WithProductShowAnalytic list={item.title} item={it}>
                    <Link
                      {...linkClicked({
                        title: it.title,
                        type: Type.ITEM,
                        value: it.code,
                        slug: { type: SlugType.UNRECOGNIZED, slug: it.slug },
                      })}
                      onClick={() => onProductClicked?.(it)}
                    >
                      <div className={st.productImageContainer}>
                        <img
                          src={it.imagesLarge[0]?.src}
                          loading="lazy"
                          alt=""
                          role="presentation"
                          className={st.itemImage}
                        />
                      </div>
                    </Link>
                  </WithProductShowAnalytic>
                  <BrandLogo brand={it.brand} />
                  <Price
                    {...getPrice(it)}
                    verticalPriceAlignment={verticalPriceAlignment}
                    revert
                    className={st.price}
                    discountPercent={it.discountPercent}
                    discountBelow
                    byRequestDescription={isPriceByRequest(it) ? texts.homeScreen.price.hide : undefined}
                  />
                </>
              )}
            </div>
          ))}

          {item.button && (
            <div key="action" className={cn(st.slide, st.actionSlide)}>
              <MoreAction
                {...linkClicked(item.button?.payload ?? null)}
                title={item.button?.title}
                centered={centered}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
