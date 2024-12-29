import { combine, sample } from 'effector';

import { $additionalUserData } from '@/shared/configs';

import { digestPhone, phoneIsValid } from '@/lib/string';

import { phoneField, nameField } from '../checkout';

import { calculateDeliveryClickAndCollectMutation } from './clickAndCollect';
import { quickByMutation } from './quickBy';

const $noPhoneAndAdditionalExists = combine(phoneField.$value, $additionalUserData).map(
  ([currentPhone, { phone }]) => !phoneIsValid(digestPhone(currentPhone)) && phoneIsValid(digestPhone(phone)),
);

const $noNameAndAdditionalExists = combine(nameField.$value, $additionalUserData).map(
  ([currentName, { name }]) => !currentName && !!name,
);

sample({
  source: $additionalUserData,
  clock: [calculateDeliveryClickAndCollectMutation.fx.doneData, quickByMutation.fx.doneData],
  filter: $noPhoneAndAdditionalExists,
  fn: ({ phone }) => phone,
  target: phoneField.change,
});

sample({
  source: $additionalUserData,
  clock: [calculateDeliveryClickAndCollectMutation.fx.doneData, quickByMutation.fx.doneData],
  filter: $noNameAndAdditionalExists,
  fn: ({ name }) => name,
  target: nameField.change,
});
