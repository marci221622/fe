import { useLingui } from '@lingui/react';
import { useUnit } from 'effector-react';
import { Fragment } from 'react';

import { $mappedStrings, $stateConditionalList } from '@/shared/configs';
import { Modal } from '@/shared/ui';

import { usePopupState } from '@/lib/hooks';

import { Typography } from '@/ui/index';

import st from './styles.module.scss';

export function StateConditionModal({ popup }: { popup: ReturnType<typeof usePopupState> }) {
  const { i18n } = useLingui();
  const texts = useUnit($mappedStrings);
  const groups = useUnit($stateConditionalList);

  return (
    <Modal
      open={popup.isOpen}
      onChange={popup.closePopup}
      header={texts.itemDetails.condition.title}
      wrapClassName={st.StateConditionModal}
      modalSwipeableProps={{
        autoHeight: true,
      }}
    >
      <div className={st.wrapper}>
        {groups.map((state, id) => (
          <Fragment key={id}>
            <Typography.Paragraph>{state.title}</Typography.Paragraph>

            <ul>
              {state.list.map((info, idx) => (
                // eslint-disable-next-line react/no-array-index-key
                <li key={idx}>{info}</li>
              ))}
            </ul>
          </Fragment>
        ))}

        {texts.itemDetails.condition.disclaimer && (
          <div className={st.disclamer}>{texts.itemDetails.condition.disclaimer}</div>
        )}
      </div>
    </Modal>
  );
}
