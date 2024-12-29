import { combine } from 'effector';

import { recipientValidation } from '../../helpers';
import { GuardSteps } from '../../types';

import { nameField, phoneField } from './recipient';
import { draftSuggestField } from './suggests';

export const $requiredFields = combine({
  name: nameField.$value,
  phone: phoneField.$value,
  address: draftSuggestField.$value,
}).map(scheme => {
  return [
    { type: GuardSteps.address, setted: recipientValidation(scheme, 'address') },
    { type: GuardSteps.phone, setted: recipientValidation(scheme, 'phone') },
    { type: GuardSteps.name, setted: recipientValidation(scheme, 'name') },
  ];
});

export const $allFieldSettled = $requiredFields.map(values => values.every(it => it.setted));

export const $addressSettled = $requiredFields.map(
  values => values.find(it => it.type === GuardSteps.address)?.setted || true,
);
