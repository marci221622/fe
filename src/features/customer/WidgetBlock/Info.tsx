import { CustomerProfileResponse } from '@/generated/customer_hub/methods/customer/get_customer_profile.v1';

import { paths } from '@/constants/paths';

import { formatPhone } from '@/lib/string';

import { Space, Typography } from '@/ui/index';

import { ProfileIcon } from '@/ui/assets/icons';

import { WidgetBlock } from './View';

import st from './styles.module.scss';

export function InfoWidget({
  customer,
  phone,
  mail,
}: {
  customer: CustomerProfileResponse | null;
  phone: string;
  mail: string;
}) {
  if (!customer) {
    return null;
  }

  return (
    <WidgetBlock icon={<ProfileIcon />} headerTitle="Мои данные" navLink={paths.profile.contacts()}>
      <Space className={st.info} stretch direction="vertical">
        <Typography.Paragraph>
          {customer.firstName} {customer.lastName}
        </Typography.Paragraph>
        <Typography.Paragraph>{formatPhone(phone)}</Typography.Paragraph>
        <Typography.Paragraph>{mail}</Typography.Paragraph>
      </Space>
    </WidgetBlock>
  );
}
