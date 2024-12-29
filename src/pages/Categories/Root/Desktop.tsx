import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper as SwiperInstance } from 'swiper';
import { Mousewheel, FreeMode, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Item } from '@/generated/customer_hub/entities/item.v1';
import { $mappedStrings } from '@/shared/configs';
import { useLinkBuilder } from '@/shared/pageRouting';
import { productsAnalytics } from '@/shared/products';
import { ProductCard } from '@/shared/ui';
import { isPriceByRequest } from '@/shared/watches';

import { paths } from '@/constants/paths';

import { ToggleFavoritesParams, toggleFavorites, useInFavorite } from '@/features/favorites';

import { Button, Typography } from '@/ui/index';

import { Chevron } from '@/ui/assets/icons';

import { $categoriesWithProducts } from './model';

import st from './styles.module.scss';

export function DesktopCategories() {
  const { i18n } = useLingui();
  const categoriesWithProducts = useUnit($categoriesWithProducts);
  const prevBtnRef = useRef<HTMLElement>(null);
  const nextBtnRef = useRef<HTMLElement>(null);
  const builder = useLinkBuilder();
  const onProductClicked = useUnit(productsAnalytics.productClicked);
  const favoriteAction = useUnit(toggleFavorites);
  const inFavorite = useInFavorite();
  const texts = useUnit($mappedStrings);

  const handleFavorite = useCallback(
    (params: Omit<ToggleFavoritesParams, 'place'>) => {
      favoriteAction({
        id: params.id,
        isActive: inFavorite(params.id, params.isActive),
        price: params.price,
        title: params.title,
        place: 'Catalog',
        offerId: params?.offerId,
        size: params?.size,
      });
    },
    [favoriteAction, inFavorite],
  );

  const onItemClicked = useCallback(
    (product: Item) => onProductClicked({ item: product, page: 'CategoryPage', list: product.title }),
    [onProductClicked],
  );

  const onBeforeInit = (swiper: SwiperInstance) => {
    if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
      // eslint-disable-next-line no-param-reassign
      swiper.params.navigation.prevEl = prevBtnRef.current!;
      // eslint-disable-next-line no-param-reassign
      swiper.params.navigation.nextEl = nextBtnRef.current!;
    }
  };

  return (
    <div className={cn(st.desktop, st.carousel)}>
      {categoriesWithProducts
        .filter(it => it.products.length > 0)
        .map(it => (
          <div className={st.categoryItems} key={it.collectionCode ?? it.slug}>
            <Typography.Paragraph className={st.title}>{it.title}</Typography.Paragraph>

            <div className={st.list}>
              <Chevron className={st.arrow} ref={prevBtnRef} direction="left" />
              <Chevron className={cn(st.arrow, st.right)} ref={nextBtnRef} direction="right" />

              <Swiper
                freeMode
                mousewheel={{ forceToAxis: true }}
                pagination={{ clickable: true }}
                modules={[Pagination, Navigation, FreeMode, Mousewheel]}
                onBeforeInit={onBeforeInit}
                spaceBetween={16}
                slidesPerView={5}
              >
                {it.products.map(product => (
                  <SwiperSlide key={product.code} className={st.slide}>
                    <ProductCard
                      type="middle"
                      key={product.code}
                      product={product}
                      onClick={onItemClicked}
                      inFavorite={inFavorite(product.code, product.favorite)}
                      handleFavorite={handleFavorite}
                      hasItem={+product.quantity > 0}
                      isCollected={!!product.isCollected}
                      priceByRequestDescription={isPriceByRequest(product) ? texts.itemsList.price.hide : undefined}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <Link className={st.action} to={builder(paths.catalog.withSlug.common({ slug: it.slug }))}>
              <Button size="L" reverse bold>
                {texts.web.revealMoreItems}
              </Button>
            </Link>
          </div>
        ))}
    </div>
  );
}
