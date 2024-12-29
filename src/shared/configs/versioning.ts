import { createStore } from 'effector';

import { AppInfoField } from '@/generated/customer_hub/entities/session_data.v1';

import { runtimeConfig } from '@/constants/runtimeConfig';

export const $versioning = createStore([
  {
    key: AppInfoField.APP_INFO_FIELD_APP_VERSION,
    value: runtimeConfig.APP_VERSION,
  },
]);
