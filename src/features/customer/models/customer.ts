import { sample } from 'effector';
import { every } from 'patronum/macro';

import { ContactType } from '@/generated/customer_hub/enums/contact_type';
import { CustomerProfileResponse } from '@/generated/customer_hub/methods/customer/get_customer_profile.v1';
import { $isAuthorized, setSession, wasLogouted } from '@/shared/session';
import { appStartedOnClient } from '@/shared/start';

import { createQuery, FxParams } from '@/lib/createQuery';

import { fetchCustomer } from '../api';

export const customerQuery = createQuery({
  $isAuthorized,
  initialData: null,
  handler: ([_, ctrl]: FxParams<object>) => fetchCustomer({ body: {}, signal: ctrl.signal }),
});

export const $customer = customerQuery.$result;

export const $customerContacts = $customer.map(it => {
  return {
    phone: it?.contacts?.find(contact => contact.type === ContactType.CONTACT_TYPE_PHONE),
    mail: it?.contacts?.find(contact => contact.type === ContactType.CONTACT_TYPE_EMAIL),
  };
});

sample({
  clock: wasLogouted,
  target: customerQuery.reset,
});

sample({
  clock: appStartedOnClient,
  filter: every({ predicate: Boolean, stores: [$isAuthorized, $customer.map(it => !it)] }),
  fn: () => ({}),
  target: customerQuery.start,
});

sample({
  clock: setSession,
  filter: ({ customerProfile }) => !!customerProfile,
  fn: ({ customerProfile }) =>
    customerProfile
      ? CustomerProfileResponse.create({
          lastName: customerProfile.lastName,
          firstName: customerProfile.firstName,
          secondName: customerProfile.secondName,
          contacts: customerProfile.contacts,
          userId: customerProfile.userId,
          customerId: customerProfile.customerId,
          login: customerProfile.login,
          preferredContactId: customerProfile.preferredContactId,
        })
      : null,
  target: customerQuery.$result,
});
