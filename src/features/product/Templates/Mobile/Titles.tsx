import { useLingui } from '@lingui/react';
import { useUnit } from 'effector-react';

import { Item } from '@/generated/customer_hub/entities/item.v1';
import { $appIsShort, $mappedStrings } from '@/shared/configs';
import { isPriceByRequest } from '@/shared/watches';

import { paths } from '@/constants/paths';

import { toggleFavorites, useInFavorite } from '@/features/favorites';

import { useShare } from '@/lib/share';
import { createReaddableSize, getPrice } from '@/lib/transformers';

import { Price, Space, Typography } from '@/ui/index';

import { ShareIcon, StarIcon } from '@/ui/assets/icons';

import st from '../styles.module.scss';

type Props = {
  product: Item;
  notExists: boolean;
};

export function Titles({ product, notExists }: Props) {
  const { i18n } = useLingui();
  const sharer = useShare({});
  const favoriteAction = useUnit(toggleFavorites);
  const inFavorite = useInFavorite();
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
    <div className={st.info}>
      {!appIsShort &&
        (sharer.available ? (
          <ShareIcon
            onClick={() => {
              sharer.share(paths.product(product.code));
            }}
          />
        ) : (
          <div className={st.spacer} />
        ))}
      <Space direction="vertical" align="center" stretch className={st.shortInfoWrapper}>
        <p className={st.text}>{product.title}</p>
        <p className={st.text}>{createReaddableSize(product.size)}</p>

        {notExists && !isCollected ? (
          <Typography.Paragraph className={st.noExists}>{texts.itemDetails.outOfStock}</Typography.Paragraph>
        ) : (
          <>
            <Price
              {...getPrice(product)}
              revert
              discountBelowOnMobile
              discountPercent={product.discountPercent}
              byRequestDescription={isPriceByRequest(product) ? texts.itemDetails.price.hide : undefined}
            />
            {isCollected && (
              <Typography.Paragraph className={st.reserved}>{texts.itemDetails.reserved}</Typography.Paragraph>
            )}
          </>
        )}
      </Space>

      {!appIsShort && <StarIcon onClick={handleFavorite} active={inFavorite(product.code, product.favorite)} />}
    </div>
  );
}
