import { fireEvent, render, waitFor } from '@testing-library/react';
import { fork } from 'effector';

import { CaptchaProvider } from '@/generated/customer_hub/enums/captcha_provider';
import { baseRequestFx } from '@/shared/request';

import { CaptchaServiceGate } from '@/lib/services';

import { TestsWrapper, watchEffect } from '../../../tests/index';

import { AuthFlow } from './View';

const validPhoneNumbers = ['79951120767', '89951120767', '8 995 112 07 67', '+7 (995) 112-07-67', '9951120767'];

describe('auth/AuthModal', () => {
  it('should works corretly when type and submit', async () => {
    const mockCaptchaFn = jest.fn().mockImplementation(() => 'captcha');
    const ctrl = new AbortController();

    const scope = fork({
      values: new Map().set(CaptchaServiceGate.state, mockCaptchaFn),
      handlers: new Map().set(baseRequestFx, () => 'done'),
    });

    const baseFxWatchers = watchEffect(baseRequestFx, scope);

    const { container } = render(<AuthFlow source="any" />, {
      wrapper: ({ children }) => <TestsWrapper scope={scope}>{children}</TestsWrapper>,
    });

    const input = container.querySelector('[data-test="phoneInput"]')!;
    const submit = container.querySelector('[data-test="submit"]')!;

    await waitFor(() => {
      fireEvent.change(input, { target: { value: validPhoneNumbers[validPhoneNumbers.length - 1] } });
    });

    await waitFor(() => {
      fireEvent(
        submit,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });

    expect(input).toBeDefined();
    expect(submit).toBeDefined();
    expect(baseFxWatchers.listeners.onCall).toHaveBeenCalledTimes(1);
    expect(baseFxWatchers.listeners.onCall).toHaveBeenCalledWith({
      body: {
        verificationInfo: { provider: CaptchaProvider.CAPTCHA_PROVIDER_GOOGLE, response: 'captcha' },
        contact: {
          type: 1,
          value: '+79951120767',
        },
      },
      method: 'GetAuthenticationCodeWeb',
      mock: undefined,
      signal: ctrl.signal,
    });
  });

  validPhoneNumbers.forEach(number => {
    it(`should paste corretly ${number}`, async () => {
      const mockCaptchaFn = jest.fn().mockImplementation(() => 'captcha');
      const ctrl = new AbortController();

      const scope = fork({
        values: new Map().set(CaptchaServiceGate.state, mockCaptchaFn),
        handlers: new Map().set(baseRequestFx, () => 'done'),
      });

      const baseFxWatchers = watchEffect(baseRequestFx, scope);

      const { container } = render(<AuthFlow source="any" />, {
        wrapper: ({ children }) => <TestsWrapper scope={scope}>{children}</TestsWrapper>,
      });

      const input = container.querySelector('[data-test="phoneInput"]')!;
      const submit = container.querySelector('[data-test="submit"]')!;

      await waitFor(() => {
        fireEvent.focus(input);
        fireEvent.paste(input, {
          clipboardData: {
            getData: () => number,
          },
        });
      });

      await waitFor(() => {
        fireEvent(
          submit,
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          }),
        );
      });

      expect(input).toBeDefined();
      expect(submit).toBeDefined();
      expect(baseFxWatchers.listeners.onCall).toHaveBeenCalledTimes(1);
      expect(baseFxWatchers.listeners.onCall).toHaveBeenCalledWith({
        body: {
          verificationInfo: { provider: CaptchaProvider.CAPTCHA_PROVIDER_GOOGLE, response: 'captcha' },
          contact: {
            type: 1,
            value: '+79951120767',
          },
        },
        method: 'GetAuthenticationCodeWeb',
        mock: undefined,
        signal: ctrl.signal,
      });
    });
  });
});
