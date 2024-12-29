import cn from 'classnames';
import { useUnit } from 'effector-react';
import { useCallback, useMemo, useRef } from 'react';
import { renderToString } from 'react-dom/server';
import { Swiper as SwiperInstance } from 'swiper';
import { Mousewheel, FreeMode, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Item } from '@/generated/customer_hub/entities/item.v1';
import { WithProductShowAnalytic } from '@/shared/analytics';
import { $mappedStrings } from '@/shared/configs';
import { ProductCard } from '@/shared/ui';
import { isPriceByRequest } from '@/shared/watches';

import { createRowScheme } from '@/lib/product';

import { Typography, CarouselArrow, MoreAction } from '@/ui/index';

import st from './styles.module.scss';

const bannersPerView = {
  mobile: 2,
  desktop: 5,
};

export type BaseProductWidgetProps = {
  items: Item[];
  device: Device;
  title?: React.JSX.Element | string;
  needAdditionalAction: boolean;
  link?: ((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void) | string;
  sizeVisibility?: boolean;
  brandVisibility?: boolean;
  pageType?: PageType;
  onProductClicked?: (params: { page: PageType; item: Item | 'all_view_action'; list: string }) => void;
  cardType?: 'middle' | 'desktopOnlyMinimal';
  nomargin?: boolean;
  itemsPerSlide?: {
    mobile: number;
    desktop: number;
  };
};

// Виджет продуктов для карточки товара
// И десктоп для избранного на пример
export function BaseProductsWidgetList({
  cardType = 'middle',
  items,
  device,
  title = '',
  needAdditionalAction,
  link,
  sizeVisibility,
  brandVisibility,
  pageType = 'ProductPage',
  onProductClicked,
  nomargin,
  itemsPerSlide = bannersPerView,
}: BaseProductWidgetProps) {
  const prevBtnRef = useRef<HTMLDivElement>(null);
  const nextBtnRef = useRef<HTMLDivElement>(null);
  // const priceByRequestTitles = useUnit($priceByRequestTitles);
  const texts = useUnit($mappedStrings);
  const titleList = typeof title === 'string' ? title : renderToString(title).replace(/\x3C!-- -->/gi, '');

  const hasArrows = items.length > itemsPerSlide[device];
  const asCarousel = device === 'desktop' && items.length >= itemsPerSlide.desktop;

  const onBeforeInit = (swiper: SwiperInstance) => {
    if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
      // eslint-disable-next-line no-param-reassign
      swiper.params.navigation.prevEl = prevBtnRef.current!;
      // eslint-disable-next-line no-param-reassign
      swiper.params.navigation.nextEl = nextBtnRef.current!;
    }
  };

  const onProduct = useCallback(
    (product: Item) => {
      onProductClicked?.({
        page: pageType,
        list: titleList,
        item: product,
      });
    },
    [onProductClicked, pageType, titleList],
  );

  const scheme = useMemo(
    () =>
      createRowScheme({
        items,
        noGroup: true,
        needToFullListPreparation: true,
        smallCard: true,
        sizeVisibility,
      }),
    [items, sizeVisibility],
  );

  return (
    <div
      className={cn(st.items, {
        [st.carousel]: asCarousel,
        [st.nomargin]: nomargin,
      })}
    >
      {title && (
        <Typography.Paragraph className={st.title} center>
          {title}
        </Typography.Paragraph>
      )}

      {device === 'desktop' && items.length >= itemsPerSlide.desktop ? (
        <div
          className={cn(st.item, {
            [st.hasArrows]: true,
          })}
        >
          <CarouselArrow ref={prevBtnRef} direction="left" hidden={!hasArrows} />
          <CarouselArrow ref={nextBtnRef} direction="right" hidden={!hasArrows} />

          <Swiper
            freeMode
            mousewheel={{ forceToAxis: true }}
            navigation
            pagination={{ clickable: true }}
            slidesPerView={itemsPerSlide[device]}
            modules={[Pagination, Navigation, FreeMode, Mousewheel]}
            onBeforeInit={onBeforeInit}
            spaceBetween={16}
          >
            {items.map(product => (
              <SwiperSlide key={product.code} className={st.slide}>
                <WithProductShowAnalytic item={product} list={titleList}>
                  <ProductCard
                    product={product}
                    onClick={onProduct}
                    className={st.card}
                    type={cardType}
                    tagsVisibility={false}
                    brandVisibility={brandVisibility}
                    sizeVisibility={scheme.__[product.code].sizeVisibility}
                    hasComments={scheme.__[product.code].hasComments}
                    hasDiscountInRow={scheme.__[product.code].hasDiscountInRow}
                    titleOnlyOneRow={scheme.__[product.code].titleOnlyOneRow}
                    priceDirection={scheme.__[product.code].priceVertical ? 'vertical' : 'horizontal'}
                    isCollected={product.isCollected}
                    hasItem={+product.quantity > 0}
                    priceByRequestDescription={isPriceByRequest(product) ? texts.viewedItems.price.hide : undefined}
                  />
                </WithProductShowAnalytic>
              </SwiperSlide>
            ))}

            {needAdditionalAction && link && (
              <SwiperSlide key="action" className={cn(st.slide, st.actionSlide)}>
                <MoreAction
                  to={link}
                  title={texts.viewedItems.allViewedItemsButton.title}
                  onClick={() =>
                    onProductClicked?.({
                      page: pageType,
                      list: titleList,
                      item: 'all_view_action',
                    })
                  }
                />
              </SwiperSlide>
            )}
          </Swiper>
        </div>
      ) : (
        <div
          className={cn(st.item, {
            [st.centered]: items.length <= itemsPerSlide[device],
          })}
        >
          {items.map(product => (
            <div key={product.code} className={st.slide}>
              <WithProductShowAnalytic item={product} list={titleList}>
                <ProductCard
                  product={product}
                  onClick={onProduct}
                  className={st.card}
                  type={device === 'mobile' ? 'minimal' : cardType}
                  tagsVisibility={false}
                  isCollected={product.isCollected}
                  sizeVisibility={sizeVisibility ? scheme.__[product.code].sizeVisibility : false}
                  brandVisibility={brandVisibility}
                  hasDiscountInRow={scheme.__[product.code].hasDiscountInRow}
                  titleOnlyOneRow={scheme.__[product.code].titleOnlyOneRow}
                  hasComments={scheme.__[product.code].hasComments}
                  priceDirection={scheme.__[product.code].priceVertical ? 'vertical' : 'horizontal'}
                  hasItem={+product.quantity > 0}
                  priceByRequestDescription={isPriceByRequest(product) ? texts.viewedItems.price.hide : undefined}
                />
              </WithProductShowAnalytic>
            </div>
          ))}

          {needAdditionalAction && link && (
            <div key="action" className={cn(st.slide, st.actionSlide)}>
              <MoreAction
                to={link}
                title={texts.viewedItems.allViewedItemsButton.title}
                onClick={() =>
                  onProductClicked?.({
                    page: pageType,
                    list: titleList,
                    item: 'all_view_action',
                  })
                }
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
