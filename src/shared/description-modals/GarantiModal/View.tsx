import { useLingui } from '@lingui/react';
import { useUnit } from 'effector-react';

import { $mappedStrings } from '@/shared/configs';
import { Modal } from '@/shared/ui';

import { Typography } from '@/ui/index';

import { GarantiIcon } from '@/ui/assets/icons';

import st from './styles.module.scss';

export function GarantiModal({ closeModal, isOpen }: { closeModal: () => void; isOpen: boolean }) {
  const { i18n } = useLingui();
  const texts = useUnit($mappedStrings);

  return (
    <Modal
      open={isOpen}
      onChange={closeModal}
      header={texts.help.authenticityGuarantee.title}
      wrapClassName={st.body}
      modalSwipeableProps={{ autoHeight: true }}
    >
      <div className={st.wrapper}>
        <GarantiIcon />

        <Typography.Paragraph className={st.text}>{texts.help.authenticityGuarantee.text}</Typography.Paragraph>
      </div>
    </Modal>
  );
}
