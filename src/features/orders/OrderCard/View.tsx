import cn from 'classnames';
import { useUnit } from 'effector-react';
import { Link } from 'react-router-dom';

import { Order, Order_Status } from '@/generated/customer_hub/entities/order.v1';
import { $mappedStrings } from '@/shared/configs';
import { BrandLogo } from '@/shared/ui';
import { isPriceByRequest } from '@/shared/watches';

import { paths } from '@/constants/paths';

import { isClickCollectOrder } from '@/lib/orders';
import { moneyToPrice } from '@/lib/string';
import { createReaddableSize } from '@/lib/transformers';

import { Typography, BlurCounter } from '@/ui/index';

import { orderIcons, orderTitles, clickAndColelctOrderIcons, clickAndCollectOrderTitles } from '../statuses';

import st from './styles.module.scss';

// smallType для мелких картинок на десктопе
export function OrderCard({ order, maxView, smallType }: { order: Order; maxView?: number; smallType?: boolean }) {
  const texts = useUnit($mappedStrings);

  const [delivery] = order.deliveries;
  const isClick = isClickCollectOrder(order);
  const size = createReaddableSize(order.deliveries[0].items[0].size);

  const orderTitle = order.deliveries[0].items.some(isPriceByRequest)
    ? texts.orders.ordercard.titleWithoutPrice.replace('%@', order.code)
    : texts.orders.ordercard.title.replace('%@', order.code).replace('%@', moneyToPrice(order.price?.units ?? '0'));

  const icons = isClick ? clickAndColelctOrderIcons : orderIcons;
  const titles = isClick ? clickAndCollectOrderTitles : orderTitles;
  const counter = maxView ? delivery.items.length - maxView : 0;

  return (
    <Link className={st.order} to={paths.profile.orderDetail(order.code.trim().replace(' ', ''))}>
      <Typography.Paragraph className={st.title}>{orderTitle}</Typography.Paragraph>

      <div
        className={cn(st.delivery, {
          [st.rejected]: order.orderStatus === Order_Status.ORDER_STATUS_CANCELED,
        })}
      >
        {icons[order.orderStatus] || null}
        <div className={st.info}>
          <Typography.Paragraph bold className={st.deliveryTitle}>
            {titles[order.orderStatus] ?? ''}
          </Typography.Paragraph>
          {order.orderStatus !== Order_Status.ORDER_STATUS_CANCELED && (
            <Typography.Paragraph>{order.description ?? ''}</Typography.Paragraph>
          )}
        </div>
      </div>

      <div
        className={cn(st.products, {
          [st.smallType]: smallType,
        })}
      >
        {delivery.items.length > 1 ? (
          delivery.items.slice(0, maxView ?? delivery.items.length).map((item, idx, arr) => (
            <div className={st.imageContainer}>
              <img src={item.image?.src} alt={item.title} className={st.produtImage} key={item.itemCode} />

              {counter > 0 && idx === arr.length - 1 && <BlurCounter counter={counter} />}
            </div>
          ))
        ) : (
          <div className={st.aloneProduct}>
            <img src={delivery.items[0].image?.src} alt={delivery.items[0].title} className={st.produtImage} />
            <div className={st.details}>
              <BrandLogo brand={delivery.items[0].brand} />
              <Typography.Paragraph className={st.itemName}>
                {delivery.items[0].title}
                {size ? ` (${size})` : ''}
              </Typography.Paragraph>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
