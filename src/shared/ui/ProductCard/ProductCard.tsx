import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { forwardRef, memo } from 'react';
import { Link } from 'react-router-dom';

import { SHORT_VERSION_TAG } from '@/constants/hardcode';
import { paths } from '@/constants/paths';

import { createReaddableSize, getPrice } from '@/lib/transformers';

import { Typography } from '@/ui/index';
import { Price } from '@/ui/Price';

import { CloseIcon, StarIcon } from '@/ui/assets/icons';

import { $appIsShort, $mappedStrings, OnlyFullVariant, OnlyShortVariant } from '../../configs';

import { ProductCardImage as Image } from './Image';
import { ProductCardProps } from './types';

import st from './styles.module.scss';

export const ProductCard = memo(
  forwardRef<HTMLAnchorElement, ProductCardProps>(
    (
      {
        className,
        product,
        type = 'large',
        hasItem = true,
        isCollected = false,
        inFavorite,
        handleFavorite,
        tagsVisibility = true,
        sizeVisibility = true,
        brandVisibility = true,
        priceVisibility = true,
        priceDirection,
        hasComments,
        hasDiscountInRow = true,
        titleOnlyOneRow = true,
        /* Добавить в корзину и так далее */
        action,
        priceByRequestDescription,
        openInNewTab,
        onClick,
        ...props
      },
      ref,
    ) => {
      const { i18n } = useLingui();
      const appIsShort = useUnit($appIsShort);
      const texts = useUnit($mappedStrings);
      const size = createReaddableSize(product.size);

      const favoriteParams = {
        id: product.code,
        isActive: !!inFavorite,
        price: product.itemOffers[0]?.finalPrice ?? product.itemOffers[0]?.price,
        title: product.title,
        size,
        offerId: product.itemOffers[0]?.offerCode,
      };

      const imagePrimary = {
        small: product.imagesSmall[0]?.src,
        middle: product.imagesMiddle[0]?.src,
        large: product.imagesLarge[0]?.src,
      };
      const imageSecondary = !!product.imagesSmall[1] && {
        small: product.imagesSmall[1]?.src,
        middle: product.imagesMiddle[1]?.src,
        large: product.imagesLarge[1]?.src,
      };

      const brandText = product.brand?.title ?? '';
      const brandImage = product.brand?.logoLink?.src;
      const newTabParams = openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {};

      return (
        <Link
          ref={ref}
          className={cn(st.ProductCard, className, st[type])}
          to={paths.product(product.code)}
          {...newTabParams}
          {...props}
          onClick={() => onClick?.(product)}
        >
          <div className={st.content}>
            {handleFavorite && !action && !appIsShort && (
              <div
                className={st.star}
                onClick={e => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleFavorite(favoriteParams);
                }}
              >
                <StarIcon active={inFavorite} />
              </div>
            )}

            {action && (
              <div
                className={st.star}
                onClick={e => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleFavorite?.({ ...favoriteParams, isActive: true });
                }}
              >
                <CloseIcon />
              </div>
            )}

            <div className={cn(st.photoContainer, st.opacity, { [st.hasSecondImage]: !!imageSecondary })}>
              <div className={st.photoContent}>
                <Image photo={imagePrimary} className={st.photo} alt="" itemProp="image" />
                {!!imageSecondary && <Image photo={imageSecondary} className={st.photo} alt="" itemProp="image" />}
              </div>
            </div>
          </div>

          <div className={st.info}>
            <div className={st.shortInfo}>
              {brandVisibility &&
                (brandImage ? (
                  <img className={st.brandImage} src={brandImage} alt={brandText} />
                ) : (
                  <p className={st.brandText}>{brandText}</p>
                ))}

              <div
                className={cn(st.productTitlesWrapper, {
                  [st.titleOnlyOneRow]: titleOnlyOneRow && size,
                })}
              >
                <p
                  className={cn(st.title, st.productTitle, st.visibled, {
                    [st.titleOnlyOneRow]: titleOnlyOneRow && size,
                  })}
                >
                  {product.title}
                </p>
                {/*
                  Дает размер родителю (потому что не абсолютная позиция)
                  Тайтл всегда в 2 строки по умолчанию
                  Стиль titleOnlyOneRow делает тайтл в одну строку
                  Если хоть в одном товаре в строке есть размер, значит тайтлы мы пишем
                  В одну строчку
                  Но если нету размера у конкретного товара
                  Тогда мы делаем тайтл в 1 строчку
                  И это будет работать за счет того что абсолютный тайтл вылезет за рамки родителя
                */}
                <p
                  className={cn(st.title, st.productTitle, st.hidden, {
                    [st.titleOnlyOneRow]: titleOnlyOneRow,
                  })}
                >
                  {product.title}
                </p>
              </div>

              <p
                className={cn(st.title, st.size, {
                  [st.visibled]: sizeVisibility,
                })}
              >
                {size}
              </p>

              <OnlyFullVariant>
                <p
                  className={cn(st.tag, {
                    [st.visibled]: tagsVisibility,
                  })}
                >
                  {product.labels[0]?.value ?? ''}
                </p>
              </OnlyFullVariant>

              <OnlyShortVariant>
                <p
                  className={cn(st.tag, st.shortTag, {
                    [st.visibled]: tagsVisibility,
                  })}
                >
                  {SHORT_VERSION_TAG}
                </p>
              </OnlyShortVariant>
            </div>

            <div
              className={cn(st.prices, {
                [st.visibled]: priceVisibility,
                [st.hasDiscountInRow]: hasDiscountInRow,
                [st.priceVertical]: priceDirection === 'vertical',
              })}
            >
              {(hasItem || isCollected) && (
                <Price
                  revert
                  {...getPrice({ tsumPrice: product.tsumPrice, itemOffers: product.itemOffers })}
                  className={st.price}
                  discountBelow
                  discountPercent={product.discountPercent}
                  direction={priceDirection}
                  byRequestDescription={priceByRequestDescription}
                />
              )}
            </div>

            {action
              ? action({
                  className: cn(st.addToCartAction, {
                    [st.hidden]: isCollected || !hasItem,
                  }),
                })
              : hasComments && (
                  <div className={st.comment}>
                    {isCollected && (
                      <Typography.Paragraph className={st.noExistsLabel} center>
                        {texts.itemDetails.reserved}
                      </Typography.Paragraph>
                    )}

                    {!isCollected && !hasItem && (
                      <Typography.Paragraph className={st.noExistsLabel} center>
                        {texts.itemDetails.outOfStock}
                      </Typography.Paragraph>
                    )}
                  </div>
                )}
          </div>
        </Link>
      );
    },
  ),
);
