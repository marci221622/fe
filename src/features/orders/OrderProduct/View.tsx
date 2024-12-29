import { useUnit } from 'effector-react';
import { Link } from 'react-router-dom';

import { Order_Item } from '@/generated/customer_hub/entities/order.v1';
import { $mappedStrings } from '@/shared/configs';
import { BrandLogo, ProductLabels } from '@/shared/ui';
import { isPriceByRequest } from '@/shared/watches';

import { paths } from '@/constants/paths';

import { createReaddableSize, getPriceFromOrderItem } from '@/lib/transformers';

import { Price, Typography } from '@/ui/index';

import { ReadableOrderLotStatus } from '../statuses';

import st from './styles.module.scss';

export function OrderProductCard({ order, withLabels }: { order: Order_Item; withLabels?: boolean }) {
  const size = createReaddableSize(order.size);
  const texts = useUnit($mappedStrings);
  const status = ReadableOrderLotStatus.create(order.status);

  return (
    <Link className={st.order} to={paths.product(order.itemCode)}>
      <div className={st.products}>
        <div className={st.aloneProduct}>
          <img src={order.image?.src} alt={order.title} className={st.produtImage} />
          <div className={st.details}>
            <BrandLogo brand={order.brand} />
            {withLabels && <ProductLabels labels={order.labels} className={st.labels} />}
            <Typography.Paragraph className={st.orderTitle}>
              {order.title}
              {size ? `, ${size}` : ''}
            </Typography.Paragraph>
            <Price
              {...getPriceFromOrderItem(order)}
              className={st.price}
              byRequestDescription={isPriceByRequest(order) ? texts.orderDetails.price.hide : undefined}
            />
            <Typography.Paragraph className={st.status}>{status}</Typography.Paragraph>
          </div>
        </div>
      </div>
    </Link>
  );
}
