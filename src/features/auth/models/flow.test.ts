import { allSettled, fork } from 'effector';

import { CaptchaProvider } from '@/generated/customer_hub/enums/captcha_provider';
import { ContactType } from '@/generated/customer_hub/enums/contact_type';
import { baseRequestFx } from '@/shared/request';

import { CaptchaServiceGate } from '@/lib/services';

import { watchEffect } from '../../../tests';

import { authCodeMutation } from './flow';

describe('auth/flow', () => {
  describe('authCodeMutation', () => {
    it('sholud be call captcha and send code with it', async () => {
      const mockCaptchaFn = jest.fn().mockImplementation(() => 'captcha');

      const ctrl = new AbortController();
      const scope = fork({
        values: new Map().set(CaptchaServiceGate.state, mockCaptchaFn),
        handlers: new Map().set(baseRequestFx, () => 'done'),
      });

      const baseFxWatchers = watchEffect(baseRequestFx, scope);

      await allSettled(authCodeMutation.start, {
        params: { value: '79990000000', type: ContactType.CONTACT_TYPE_PHONE, ctrl },
        scope,
      });

      expect(baseFxWatchers.listeners.onDoneData).toHaveBeenCalledWith('done');
      expect(baseFxWatchers.listeners.onCall).toHaveBeenCalledWith({
        body: {
          verificationInfo: { provider: CaptchaProvider.CAPTCHA_PROVIDER_GOOGLE, response: 'captcha' },
          contact: {
            type: 1,
            value: '79990000000',
            ctrl,
          },
        },
        method: 'GetAuthenticationCodeWeb',
        mock: undefined,
        signal: ctrl.signal,
      });
      expect(mockCaptchaFn).toHaveBeenCalledTimes(1);
    });

    it('sholud be call captcha (when it failed) and send code with it', async () => {
      const mockCaptchaFn = jest.fn().mockImplementation(() => {
        throw new Error('somth whent wrong');
      });

      const ctrl = new AbortController();
      const scope = fork({
        values: new Map().set(CaptchaServiceGate.state, mockCaptchaFn),
        handlers: new Map().set(baseRequestFx, () => 'done'),
      });

      const baseFxWatchers = watchEffect(baseRequestFx, scope);

      await allSettled(authCodeMutation.start, {
        params: { value: '79990000000', type: ContactType.CONTACT_TYPE_PHONE, ctrl },
        scope,
      });

      expect(baseFxWatchers.listeners.onDoneData).toHaveBeenCalledWith('done');
      expect(baseFxWatchers.listeners.onCall).toHaveBeenCalledWith({
        body: {
          verificationInfo: { provider: CaptchaProvider.CAPTCHA_PROVIDER_GOOGLE, response: '' },
          contact: {
            type: 1,
            value: '79990000000',
            ctrl,
          },
        },
        method: 'GetAuthenticationCodeWeb',
        mock: undefined,
        signal: ctrl.signal,
      });
      expect(mockCaptchaFn).toHaveBeenCalledTimes(1);
    });
  });
});
