import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { Link, useNavigate } from 'react-router-dom';

import {
  $appIsShort,
  $mappedStrings,
  OnlyFullVariant,
  OnlyShortVariant,
  useMobileAppDownloadLinks,
} from '@/shared/configs';
import { useLinkBuilder } from '@/shared/pageRouting';

import { paths } from '@/constants/paths';

import { Button, Space, Typography } from '@/ui/index';

import { orderQuery } from './model';

import st from './styles.module.scss';

export default function TYPPage() {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();
  const result = useUnit(orderQuery.$result);
  const navigate = useNavigate();
  const builder = useLinkBuilder();
  const appIsShort = useUnit($appIsShort);
  const mobileAppLinks = useMobileAppDownloadLinks();

  const handleLink = () => {
    window.open(mobileAppLinks.auto);
  };

  return (
    <div
      className={cn(st.wrapper, {
        [st.appIsShort]: appIsShort,
      })}
    >
      <Typography.PageTitle>{texts.web.thanksForOrder}</Typography.PageTitle>

      <div className={st.infoWrapper}>
        {!!result?.deliveryData?.description && (
          <Typography.Paragraph className={st.description}>{result.deliveryData.description}</Typography.Paragraph>
        )}
      </div>

      <OnlyFullVariant>
        <Typography.Paragraph center className={st.additionalText}>
          {texts.successCheckout.profileDescription}
          <Link to={paths.profile.main()} className={st.link}>
            {texts.successCheckout.button.profile}
          </Link>
        </Typography.Paragraph>

        <Button
          size="L"
          reverse
          bold
          onClick={() => {
            navigate(builder(paths.categories.root()));
          }}
        >
          {texts.itemDetails.subscribeGoods.button}
        </Button>
      </OnlyFullVariant>

      <OnlyShortVariant>
        <Space direction="vertical">
          <Typography.Paragraph center className={st.additionalText}>
            {texts.web.observeOrderStatus}
          </Typography.Paragraph>

          <Button colored size="S" className={st.applicationLink} onClick={handleLink}>
            {texts.web.inApp}
          </Button>
        </Space>
      </OnlyShortVariant>
    </div>
  );
}
