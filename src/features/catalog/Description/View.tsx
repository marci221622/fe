import { useUnit } from 'effector-react';

import { Section } from '@/generated/customer_hub/enums/section';
import { $appIsShort, $mappedStrings } from '@/shared/configs';
import { $currentGender } from '@/shared/session';

import { Typography } from '@/ui/index';

import st from './styles.module.scss';

export function CatalogDescription() {
  const texts = useUnit($mappedStrings);
  const gender = useUnit($currentGender);
  const appIsShort = useUnit($appIsShort);

  if (!appIsShort || !texts.catalog.description) {
    return null;
  }

  return (
    <div className={st.wrapper}>
      <img src={gender === Section.SECTION_FEMALE ? texts.catalog.banner.w : texts.catalog.banner.m} alt="" />

      <div className={st.texts}>
        <Typography.Paragraph className={st.text}>{texts.catalog.description}</Typography.Paragraph>
      </div>
    </div>
  );
}
