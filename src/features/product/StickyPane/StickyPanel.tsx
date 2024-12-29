import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { Link } from 'react-router-dom';

import { Item } from '@/generated/customer_hub/entities/item.v1';
import { useStickyHeaderClassnames } from '@/shared/animations';
import { $mappedStrings, OnlyFullVariant } from '@/shared/configs';
import { BrandLogo } from '@/shared/ui';
import { isPriceByRequest } from '@/shared/watches';

import { paths } from '@/constants/paths';

import { globalCart } from '@/features/basket';

import { createReaddableSize, getPrice } from '@/lib/transformers';

import { BadgeCounter, Price, Typography } from '@/ui/index';

import { ArrowRightIcon, BasketIcon, CloseIcon } from '@/ui/assets/icons';

import { CommonActions } from '../CommonActions';

import st from './styles.module.scss';

type Props = {
  inView: boolean;
  loaded: boolean;
  product: Item;
  galleryOpened?: boolean;
  closeGallery: () => void;
  notExists: boolean;
};

export function StickyPanel({ loaded, inView, product, galleryOpened, closeGallery, notExists }: Props) {
  const { i18n } = useLingui();
  const cartCounter = useUnit(globalCart.$cartCounter);
  const classname = useStickyHeaderClassnames();
  const texts = useUnit($mappedStrings);

  return (
    <div
      className={cn(st.pane, classname, {
        [st.visible]: galleryOpened || (loaded && !inView),
        [st.compactOnly]: true,
        [st.galleryOpened]: galleryOpened,
      })}
    >
      {galleryOpened && (
        <>
          <ArrowRightIcon className={st.back} onClick={closeGallery} />
          <CloseIcon className={st.close} onClick={closeGallery} />
        </>
      )}

      <div className={st.compact}>
        <div className={cn(st.leftSide)}>
          <img src={product.imagesSmall[0]?.src} className={st.productLogo} alt="" />

          <div className={st.info}>
            <BrandLogo brand={product.brand} className={st.brandLogo} />
            <Typography.Paragraph>{product.title}</Typography.Paragraph>
            <Typography.Paragraph>{createReaddableSize(product.size)}</Typography.Paragraph>
          </div>
        </div>

        <div className={st.actions}>
          {+product.quantity !== 0 && (
            <Price
              {...getPrice(product)}
              revert
              byRequestDescription={isPriceByRequest(product) ? texts.itemDetails.price.hide : undefined}
            />
          )}

          <div className={st.controlls}>
            <CommonActions
              product={product}
              notExists={notExists}
              actionSize="S"
              actionsStretch={false}
              onAction={type => {
                if (type === 'click' || type === 'quickBy') {
                  closeGallery();
                }
              }}
            />
          </div>

          <OnlyFullVariant>
            <Link to={paths.basket()}>
              {cartCounter && <BadgeCounter counter={cartCounter} className={st.counter} />}
              <BasketIcon />
            </Link>
          </OnlyFullVariant>
        </div>
      </div>
    </div>
  );
}
