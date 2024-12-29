import cn from 'classnames';
import { useUnit } from 'effector-react';

import { $appIsShort } from '@/shared/configs';

import { Faq, landingSeo } from '@/features/landings';

import st from './styles.module.scss';

export default function FaqProfSeller() {
  const appIsShort = useUnit($appIsShort);

  return (
    <>
      <landingSeo.Seo />

      <Faq titleClassName={cn({ [st.navigationDisabled]: appIsShort })} onlyTab="profsell" hideListTitles />
    </>
  );
}
