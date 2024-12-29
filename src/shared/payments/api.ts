
import { attach } from 'effector';

import { $sessionData } from '@/shared/configs';
import { RequestParams, RequestReturn } from '@/shared/request';
import { authRequestFx } from '@/shared/session';

export const processCheckoutFx = attach({
  source: $sessionData,
  effect: async (sessionData, params: Omit<RequestParams<'ProcessCheckout'>, 'method' | 'mock'>) => {
    const rs = (await authRequestFx({
      ...params,
      method: 'ProcessCheckout',
      body: { sessionData, ...params.body },
    })) as Await<RequestReturn<'ProcessCheckout'>>;

    return rs;
  },
});

export const setPaymentResultFx = attach({
  source: $sessionData,
  effect: async (sessionData, params: Omit<RequestParams<'SetPaymentResult'>, 'method' | 'mock'>) => {
    const rs = (await authRequestFx({
      ...params,
      method: 'SetPaymentResult',
      body: { sessionData, ...params.body },
    })) as Await<RequestReturn<'SetPaymentResult'>>;

    return rs;
  },
});
