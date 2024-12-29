import { sample } from 'effector';
import { debounce } from 'patronum/macro';

import { DeliveryContact } from '@/generated/customer_hub/entities/delivery.v1';

import { createField } from '@/lib/createField';
import { createMutation, FxParams } from '@/lib/createMutation';
import { digestPhone, phoneIsValid } from '@/lib/string';

import { updateUser } from '../api';

import { checkoutReset } from './actions';

export const phoneField = createField('');
export const nameField = createField('');

const changePhoneDebounced = debounce({ source: phoneField.change, timeout: 600 });
const changeNameDebounced = debounce({ source: nameField.change, timeout: 600 });

export const recipientMutation = createMutation({
  handler: async ([recipient]: FxParams<DeliveryContact>) => {
    const rs = await updateUser({
      body: {
        recipient,
      },
    });

    return rs;
  },
});

sample({
  source: nameField.$value,
  clock: changePhoneDebounced,
  fn: (name, phone) => ({
    phone: `+${digestPhone(phone)}`,
    personName: name,
  }),
  filter: (_, phone) => phoneIsValid(digestPhone(phone)),
  target: recipientMutation.start,
});

sample({
  source: phoneField.$value,
  clock: changeNameDebounced,
  fn: (phone, name) => ({
    personName: name,
    phone: phoneIsValid(digestPhone(phone)) ? `+${digestPhone(phone)}` : '',
  }),
  target: recipientMutation.start,
});

sample({ clock: checkoutReset, target: [nameField.reset, phoneField.reset, recipientMutation.reset] });
