import { useLingui } from '@lingui/react';
import { useUnit } from 'effector-react';
import { Link } from 'react-router-dom';

import { CheckoutData } from '@/generated/customer_hub/entities/checkout_data.v1';
import { $mappedStrings, OnlyFullVariant, OnlyShortVariant, useMobileAppDownloadLinks } from '@/shared/configs';

import { paths } from '@/constants/paths';

import { Button, Space, Typography } from '@/ui/index';

import { fullReset } from '../../models';

import st from './styles.module.scss';

export function ThanksContent({ order }: { order: CheckoutData }) {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();
  const reset = useUnit(fullReset);
  const mobileAppLinks = useMobileAppDownloadLinks();
  const handleLink = () => {
    window.open(mobileAppLinks.auto);
  };

  return (
    <div className={st.resultContent}>
      <div className={st.infoWrapper}>
        <Typography.Title className={st.title}>{texts.successCheckout.title}</Typography.Title>

        <Space direction="vertical" align="center">
          {!!order?.deliveryData?.description && (
            <Typography.Paragraph className={st.description}>{order.deliveryData.description}</Typography.Paragraph>
          )}
        </Space>

        <OnlyFullVariant>
          <Typography.Paragraph center className={st.additionalText}>
            {texts.successCheckout.profileDescription}{' '}
            <Link to={paths.profile.main()} className={st.link}>
              {texts.successCheckout.button.profile}
            </Link>
          </Typography.Paragraph>
        </OnlyFullVariant>

        <OnlyShortVariant>
          <Typography.Paragraph center className={st.additionalText}>
            {texts.web.observeOrderStatus}
          </Typography.Paragraph>

          <Button colored size="S" className={st.applicationLink} onClick={handleLink}>
            {texts.web.inApp}
          </Button>
        </OnlyShortVariant>
      </div>

      <Button stretch size="L" reverse bold onClick={reset}>
        {texts.proceedPurchases}
      </Button>
    </div>
  );
}
