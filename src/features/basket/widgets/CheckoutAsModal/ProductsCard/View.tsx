import cn from 'classnames';
import { useUnit } from 'effector-react';

import { CartItem } from '@/generated/customer_hub/entities/cart.v1';
import { Delivery } from '@/generated/customer_hub/entities/delivery.v1';
import { $mappedStrings } from '@/shared/configs';
import { BrandLogo } from '@/shared/ui';

import { createReaddableSize } from '@/lib/transformers';

import { Disclamer, Typography } from '@/ui/index';

import { toggleSelectMutation } from '../../../cart';

import st from './styles.module.scss';

export function ProductsCard({ delivery, items }: { delivery: Delivery; items: CartItem[] }) {
  const texts = useUnit($mappedStrings);
  const toggleSelect = useUnit(toggleSelectMutation);
  const size = createReaddableSize(items[0].item?.size);

  return (
    <div className={st.wrapper}>
      <Typography.Paragraph className={st.title}>{delivery.title}</Typography.Paragraph>

      {delivery.description && (
        <Disclamer variant={delivery.available ? 'dark' : 'danger'}>
          {delivery.description} <br />
          {!delivery.available && (
            <span
              className={st.selectController}
              onClick={() => {
                toggleSelect.start({ items, selected: true });
              }}
            >
              {texts.web.removeFromOrder}
            </span>
          )}
        </Disclamer>
      )}

      <div className={cn(st.products)} data-scroll="allow">
        {items.length > 1 ? (
          items.map(item => (
            <div className={st.imageContainer}>
              <img
                src={item.item?.imagesSmall?.[0]?.src}
                alt={item.item?.title}
                className={st.produtImage}
                key={item.item?.code}
              />
            </div>
          ))
        ) : (
          <div className={st.aloneProduct}>
            <img src={items[0].item?.imagesMiddle?.[0]?.src} alt={items[0].item?.title} className={st.produtImage} />
            <div className={st.details}>
              <BrandLogo brand={items[0].item?.brand} />
              <Typography.Paragraph>
                {items[0].item?.title}
                {size ? ` (${size})` : ''}
              </Typography.Paragraph>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
