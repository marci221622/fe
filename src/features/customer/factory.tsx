import { sample } from 'effector';

import { UserData } from '@/generated/customer_hub/entities/user_data.v1';
import { $isClient } from '@/shared/start';

import { createMutation, FxParams } from '@/lib/createMutation';

import { updateCustomer } from './api';
import { $customer, cutomerAnalytics } from './models';

export function createCustomerUpdater() {
  const mutation = createMutation({
    handler: async ([userData]: FxParams<UserData>) => {
      const rs = await updateCustomer({
        body: {
          userData,
        },
      });

      return rs;
    },
  });

  sample({
    source: $customer,
    clock: mutation.fx.doneData,
    filter: Boolean,
    fn: (customer, updated) => ({
      ...customer,
      lastName: updated.userData?.lastName ?? customer.lastName,
      firstName: updated.userData?.firstName ?? customer.firstName,
      contacts: updated.contacts || customer.contacts,
    }),
    target: $customer,
  });

  sample({
    filter: $isClient,
    clock: mutation.fx.doneData,
    target: cutomerAnalytics.profileChanged,
  });

  return {
    mutation,
  };
}
