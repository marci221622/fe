import { useLingui } from '@lingui/react';
import { useUnit } from 'effector-react';
import { useNavigate } from 'react-router-dom';

import { $mappedStrings } from '@/shared/configs';
import { useDescriptionModals, DescriptionModals } from '@/shared/description-modals';

import { paths } from '@/constants/paths';

import { List, Space, Typography } from '@/ui/index';

import {
  AgreementIcon,
  ArrowRightIcon,
  DeliveryIcon,
  FaqIcon,
  GarantiIcon,
  PaymentIcon,
  PolicyIcon,
  ReturnIcon,
} from '@/ui/assets/icons';

import st from './styles.module.scss';

export function MobileTemplate() {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();
  const descriptionModals = useDescriptionModals();
  const navigate = useNavigate();

  return (
    <>
      <Space stretch className={st.header}>
        <ArrowRightIcon onClick={() => navigate(paths.profile.main())} />
        <Typography.PageTitle className={st.pageTitle}>{texts.profile.info}</Typography.PageTitle>
      </Space>
      <List
        className={st.list}
        items={[
          {
            command: () => descriptionModals.setCurrentModal(DescriptionModals.Garantie),
            label: texts.help.authenticityGuarantee.title,
            icon: <GarantiIcon />,
          },
          {
            command: () => descriptionModals.setCurrentModal(DescriptionModals.Delivery),
            label: texts.help.delivery,
            icon: <DeliveryIcon />,
          },
          {
            command: () => descriptionModals.setCurrentModal(DescriptionModals.Payment),
            label: texts.help.payment,
            icon: <PaymentIcon />,
          },
          {
            command: () => descriptionModals.setCurrentModal(DescriptionModals.Returns),
            label: texts.help.return,
            icon: <ReturnIcon />,
          },
          {
            to: paths.landings.faq(),
            label: texts.help.faq,
            icon: <FaqIcon />,
          },
          {
            to: paths.landings.privacyPolicy(),
            label: texts.help.privacyPolicy,
            icon: <PolicyIcon />,
          },
          {
            to: paths.landings.terms(),
            label: texts.help.userAgreement,
            icon: <AgreementIcon />,
          },
        ]}
      />
    </>
  );
}
