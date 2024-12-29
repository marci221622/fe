import { Header } from '@/generated/customer_hub/entities/header.v1';
import { Loyalty } from '@/generated/customer_hub/entities/loyalty.v1';
import { BrandLogo } from '@/shared/ui';
import { LoyaltyBody } from '@/shared/ui/LoyaltyBanners';

import { PageTitle } from '@/features/catalog';

import { Responsive } from '@/ui/Responsive';
import { Typography } from '@/ui/Typography';

import st from './styles.module.scss';

type Props = {
  header: Header | null;
  title: string;
  loyalty?: Loyalty;
};

export function CatalogTitle({ header, title, loyalty }: Props) {
  return (
    <>
      <Typography.HiddenPageTitle>{title}</Typography.HiddenPageTitle>

      <Responsive.Desktop>
        <LoyaltyBody loyalty={loyalty} place="catalog" />
        {header?.brand ? (
          <div className={st.logoWrapper}>
            <BrandLogo brand={header.brand} className={st.brandLogo} />
          </div>
        ) : (
          <PageTitle asBlock title={title} />
        )}
      </Responsive.Desktop>
    </>
  );
}
