import { Store } from 'effector';
import { useUnit } from 'effector-react';

import { $mappedStrings } from '@/shared/configs';
import { $isAuthorized } from '@/shared/session';
import { Modal } from '@/shared/ui';

import { AuthFlow, AuthFlowHeader } from '@/features/auth';

import { createField } from '@/lib/createField';
import { digestPhone, phoneIsValid } from '@/lib/string';

import { Button, Input, MaskedInput, Typography } from '@/ui/index';

import { nameField, phoneField } from '../../checkout';
import { GuardSteps } from '../../types';

import st from './styles.module.scss';

type Props = {
  $pending: Store<boolean>;
  stepField: ReturnType<typeof createField<GuardSteps>>;
  initiator: (params: { guarded?: boolean | undefined }) => void;
};

// На клик колект свой флоу
// С принудительной авторизацией
export default function CollectRequiredFieldsModal({ stepField, initiator, $pending }: Props) {
  const step = useUnit(stepField);
  const name = useUnit(nameField);
  const someActionInProgress = useUnit($pending);
  const isAuthorized = useUnit($isAuthorized);
  const phone = useUnit(phoneField);
  const texts = useUnit($mappedStrings);
  const phoneValid = phoneIsValid(digestPhone(phone.value));

  const scheme = {
    desciptions: {
      name: texts.web.borrowNameFieldDescription,
      phone: texts.web.enterPhoneToBorrow,
    },

    title: {
      name: texts.checkout.validation.name.title,
    },
  };

  const additional = {
    header: step.value === GuardSteps.name ? scheme.title.name : <AuthFlowHeader />,
    description: step.value === GuardSteps.name ? scheme.desciptions.name : scheme.desciptions.phone,
  };

  const actionDisabled = GuardSteps.phone === step.value ? !phoneValid : !name.value;

  const handleInitiator = () => {
    if (!actionDisabled && !someActionInProgress) {
      initiator({ guarded: true });
    }
  };

  return (
    <Modal
      onlyDesktop
      open={![GuardSteps.initial, GuardSteps.done, GuardSteps.address].includes(step.value)}
      header={additional.header}
      onChange={() => step.onChange(GuardSteps.initial)}
      bodyClassName={st.body}
    >
      {isAuthorized && <Typography.Paragraph center>{additional.description}</Typography.Paragraph>}

      {step.value === GuardSteps.phone &&
        (!isAuthorized ? (
          <AuthFlow phoneField={phoneField} source="clickAndCollect" smsCodeOnly={phoneValid} />
        ) : (
          <MaskedInput
            isTelInput
            placeholder="+7"
            bordered
            maskProps={{
              mask: '+7 999 999-99-99',
            }}
            value={phone.value}
            onChange={e => phone.onChange(e.target.value)}
          />
        ))}

      {step.value === GuardSteps.name && (
        <Input
          bordered
          value={name.value}
          onChange={e => name.onChange(e.target.value)}
          onKeyUp={event => {
            if (event.code === 'Enter') {
              handleInitiator();
            }
          }}
        />
      )}

      {((!isAuthorized && GuardSteps.phone !== step.value) || isAuthorized) && (
        <Button pending={someActionInProgress} disabled={actionDisabled} onClick={handleInitiator} size="L">
          {texts.sellerItems.priceOnApproval.confirmButton}
        </Button>
      )}
    </Modal>
  );
}
