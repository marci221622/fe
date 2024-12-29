import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import React from 'react';
import { Link } from 'react-router-dom';

import { Item } from '@/generated/customer_hub/entities/item.v1';
import { Label } from '@/generated/customer_hub/entities/label.v1';
import { Loyalty } from '@/generated/customer_hub/entities/loyalty.v1';
import { AvailableAction } from '@/generated/customer_hub/enums/item';
import { useStickyClassnames } from '@/shared/animations';
import { $appIsShort, OnlyShortVariant, $mappedStrings } from '@/shared/configs';
import { DescriptionModals, useDescriptionModals } from '@/shared/description-modals';
import { BrandLogo } from '@/shared/ui';
import { LoyaltyBody } from '@/shared/ui/LoyaltyBanners';
import { isPriceByRequest } from '@/shared/watches';

import { SHORT_VERSION_TAG } from '@/constants/hardcode';

import { toggleFavorites, useInFavorite } from '@/features/favorites';

import { getPrice } from '@/lib/transformers';

import { Space, Price, Typography, COMPACT_HEADER_HEIGHT } from '@/ui/index';

import { StarIcon } from '@/ui/assets/icons';

import { BaseInfoList } from '../InfoList';
import { ShowroomDescription } from '../ShowroomDescription';
import { Sizes } from '../Sizes';
import { Tags } from '../Tags';
import { useAdditionalActions } from '../useAdditionalActions';

import st from '../styles.module.scss';

type Props = {
  product: Item;
  notExists: boolean;
  loyalty?: Loyalty | null;
  targetRef: React.MutableRefObject<HTMLDivElement | null>;
};

export function ShortInfo({ product, notExists, loyalty, targetRef }: Props) {
  const { i18n } = useLingui();
  const additional = useAdditionalActions(product);
  const favoriteAction = useUnit(toggleFavorites);
  const inFavorite = useInFavorite();
  const modals = useDescriptionModals();
  const classname = useStickyClassnames({ stuckedCn: st.stucked });
  const appIsShort = useUnit($appIsShort);
  const texts = useUnit($mappedStrings);
  const { isCollected } = product;

  const handleFavorite = () => {
    favoriteAction({
      id: product.code,
      isActive: inFavorite(product.code, product.favorite),
      price: product.itemOffers[0]?.finalPrice ?? product.itemOffers[0]?.price,
      title: product.title,
      place: 'ProductPage',
    });
  };

  return (
    <div className={cn(st.shortDescriptions, classname)}>
      <Space align="between" className={st.logoWithStar}>
        {appIsShort ? (
          <BrandLogo brand={product.brand} />
        ) : (
          <Link to={additional ? additional.brand.link : '/'} className={st.brandLogoLink}>
            <BrandLogo brand={product.brand} />
          </Link>
        )}

        {!appIsShort && <StarIcon onClick={handleFavorite} active={inFavorite(product.code, product.favorite)} />}
      </Space>
      <p className={st.title}>{product.title}</p>
      {product.labels.length > 0 && !appIsShort && <Tags labels={product.labels} className={st.labels} />}
      <OnlyShortVariant>
        <Tags labels={[Label.create({ value: SHORT_VERSION_TAG, id: 'short' })]} className={st.shortTags} />
      </OnlyShortVariant>

      {notExists && !isCollected ? (
        <Typography.Paragraph className={st.noExists}>{texts.itemDetails.outOfStock}</Typography.Paragraph>
      ) : (
        <>
          <Price
            revert
            size="large"
            {...getPrice(product)}
            discountPercent={product.discountPercent}
            byRequestDescription={isPriceByRequest(product) ? texts.itemDetails.price.hide : undefined}
            className={cn(st.price, {
              [st.noLabels]: product.labels.length === 0,
            })}
          />
          {isCollected && (
            <Typography.Paragraph className={st.reserved}>{texts.itemDetails.reserved}</Typography.Paragraph>
          )}
        </>
      )}

      <LoyaltyBody place="product" loyalty={loyalty} />

      {product.availableActions.includes(AvailableAction.AVAILABLE_ACTION_COLLECT) && (
        <ShowroomDescription openModal={() => modals?.setCurrentModal(DescriptionModals.Room)} />
      )}

      <Sizes relatedItemSizes={product.relatedItemSizes} />

      <BaseInfoList className={st.list} product={product} short />

      <p
        className={st.goToInfo}
        onClick={() => {
          window.scrollTo({
            top: (targetRef.current?.offsetTop ?? 0) + COMPACT_HEADER_HEIGHT,
            behavior: 'smooth',
          });
        }}
        role="presentation"
      >
        {texts.web.goToItemInfo}
      </p>
    </div>
  );
}
