import { useUnit } from 'effector-react';

import { $appIsShort, $mappedStrings } from '@/shared/configs';

import { Disclamer } from '@/ui/index';

import st from './styles.module.scss';

export function ShowroomDescription({ openModal }: { openModal: () => void }) {
  const texts = useUnit($mappedStrings);
  const appIsShort = useUnit($appIsShort);

  if (appIsShort) {
    return (
      <Disclamer className={st.wrapper} stretch>
        {texts.product.description}
        <span onClick={openModal}>{texts.itemDetails.infoBlock.condition.linkTitle}</span>
      </Disclamer>
    );
  }

  if (texts.itemDetails.showroomDisclaimer.text) {
    return (
      <Disclamer className={st.wrapper} stretch>
        {texts.itemDetails.showroomDisclaimer.text}
        <span onClick={openModal}>{texts.itemDetails.infoBlock.condition.linkTitle}</span>
      </Disclamer>
    );
  }

  return null;
}
