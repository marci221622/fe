import { Store } from 'effector';
import { useUnit } from 'effector-react';

import { $mappedStrings } from '@/shared/configs';
import { Modal } from '@/shared/ui';

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
export default function CheckoutRequiredFieldsModal({ stepField, initiator, $pending }: Props) {
  const step = useUnit(stepField);
  const name = useUnit(nameField);
  const phone = useUnit(phoneField);
  const someChekoutActionInProgress = useUnit($pending);
  const texts = useUnit($mappedStrings);

  const scheme = {
    desciptions: {
      phone: texts.web.enterPhoneToLogin,
      name: texts.web.enterNameAndSurname,
    },

    title: {
      phone: texts.checkout.validation.phone.title,
      name: texts.checkout.validation.name.title,
    },
  };

  const additional = {
    header: step.value === GuardSteps.phone ? scheme.title.phone : scheme.title.name,
    description: step.value === GuardSteps.phone ? scheme.desciptions.phone : scheme.desciptions.name,
  };

  return (
    <Modal
      onlyDesktop
      open={![GuardSteps.initial, GuardSteps.done, GuardSteps.address].includes(step.value)}
      header={additional.header}
      onChange={() => step.onChange(GuardSteps.initial)}
      bodyClassName={st.body}
    >
      <Typography.Paragraph center>{additional.description}</Typography.Paragraph>

      {step.value === GuardSteps.phone ? (
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
      ) : (
        <Input bordered value={name.value} onChange={e => name.onChange(e.target.value)} />
      )}

      <Button
        pending={someChekoutActionInProgress}
        disabled={step.value === GuardSteps.phone ? !phoneIsValid(digestPhone(phone.value)) : !name.value}
        size="L"
        onClick={() => {
          initiator({ guarded: true });
        }}
      >
        {texts.sellerItems.priceOnApproval.confirmButton}
      </Button>
    </Modal>
  );
}
