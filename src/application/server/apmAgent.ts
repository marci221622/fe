import apm from 'elastic-apm-node';

import { runtimeConfig } from '@/constants/runtimeConfig';

import { APM_DOMAIN } from './constants';

export const apmAgent = apm.start({
  serviceName: 'react-tsum-collect',
  serverUrl: APM_DOMAIN,
  active: process?.env?.NODE_ENV === 'production',
  environment: runtimeConfig.HOSTNAME,
  transactionSampleRate: 0.1,
});
