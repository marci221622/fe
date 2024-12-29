import { useLingui } from '@lingui/react';
import { useUnit } from 'effector-react';
import { useNavigate } from 'react-router-dom';

import { $mappedStrings } from '@/shared/configs';
import { isPriceByRequest } from '@/shared/watches';

import { paths } from '@/constants/paths';

import { formatWithRULocale } from '@/lib/format';
import { moneyToPrice } from '@/lib/string';
import { readDateSafely } from '@/lib/transformers';

import { Responsive, Space, Typography } from '@/ui/index';

import { ArrowRightIcon } from '@/ui/assets/icons';

import { DesktopTemplate } from './DesktopTemplate';
import { MobileTemplate } from './MobileTemplate';
import { orderQuery } from './model';

import st from './styles.module.scss';

export default function OrderDetailPage() {
  const { i18n } = useLingui();
  const navigate = useNavigate();
  const order = useUnit(orderQuery.$result);
  const texts = useUnit($mappedStrings);

  if (!order) {
    return null;
  }

  const startDate = formatWithRULocale({
    date: readDateSafely(order.createdAt) ?? 0,
    template: 'd MMMM',
  });

  const description = order.deliveries[0].items.some(isPriceByRequest) ? (
    <span className={st.description}>{texts.orderDetails.subtitleWithoutPrice.replace('%@', startDate)}</span>
  ) : (
    <span className={st.description}>
      От {startDate} на сумму {moneyToPrice(order.price?.units ?? '0', order.price?.currencyCode)}
    </span>
  );

  return (
    <>
      <Space stretch className={st.header}>
        <ArrowRightIcon onClick={() => navigate(paths.profile.orders())} />
        <Typography.PageTitle className={st.pageTitle}>
          <span>{texts.orders.ordercard.titleWithoutPrice.replace('%@', order.code)}</span>
          {description}
        </Typography.PageTitle>
      </Space>

      <Responsive.Desktop className={st.wrapper}>
        <DesktopTemplate order={order} />
      </Responsive.Desktop>

      <Responsive.TabletAndBelow className={st.wrapper}>
        <MobileTemplate order={order} />
      </Responsive.TabletAndBelow>

      {/* <BreadcrumbsPane noMargin compact>
        <BreadcrumbsUI breadcrumbs={breadcrumbs} />
      </BreadcrumbsPane> */}
    </>
  );
}
