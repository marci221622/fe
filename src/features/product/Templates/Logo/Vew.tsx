
import { Brand } from '@/generated/customer_hub/entities/brand.v1';

import st from './styles.module.scss';

export function BrandLogo({ brand }: { brand?: Brand }) {
  return brand?.logoLink ? (
    <img src={brand.logoLink.src} alt="brandLogo" className={st.logo} />
  ) : (
    <p className={st.logoText}>{brand?.title}</p>
  );
}
