import { createEvent, sample } from 'effector';

import { ContactData } from '@/generated/customer_hub/entities/contact_data.v1';
import { CaptchaProvider } from '@/generated/customer_hub/enums/captcha_provider';
import { TokenResponse } from '@/generated/customer_hub/methods/auth/auth_by_code.v1';
import { favoriteBrandsQuery, lastFavoriteBrandId } from '@/shared/brands';
import { $appIsFull, updatedCartCode } from '@/shared/configs';
import { $currentGender, setSession, wasLogouted } from '@/shared/session';

import { analytics, bridge } from '@/lib/bridge';
import { createField } from '@/lib/createField';
import { createMutation } from '@/lib/createMutation';
import { FxParams } from '@/lib/createQuery';
import { parseJwt } from '@/lib/jwt';
import { getCaptchaTokenFx } from '@/lib/services';

import { sendCode, checkAuthCode } from '../api';

import { authAnalytics } from './analytics';

export enum Steps {
  set,
  check,
}

export const resetAuthFlow = createEvent();

// Точки открытия модалки
// Что бы показать разные текста
export const modal = createField<'favorites' | 'any' | 'brands' | null>(null);
export const timeoutField = createField(0);
export const authStep = createField(Steps.set);
export const phoneNumber = createField('');
export const codeNumber = createField('');

export const authCodeMutation = createMutation({
  handler: async ([{ isResend: _, ...contact }, ctrl]: FxParams<ContactData & { isResend?: boolean }>) => {
    const token = await getCaptchaTokenFx('Auth');

    return sendCode({
      body: { contact, verificationInfo: { provider: CaptchaProvider.CAPTCHA_PROVIDER_GOOGLE, response: token } },
      signal: ctrl.signal,
    });
  },
});

export const checkAuthCodeMutation = createMutation({
  handler: ([{ code, value }, ctrl]: FxParams<{ code: string; value: string }>) =>
    checkAuthCode({
      body: {
        code,
        contactValue: value,
      },
      signal: ctrl.signal,
    }),
});

export const logged = checkAuthCodeMutation.fx.doneData;

sample({
  clock: logged,
  target: [
    setSession.prepend((data: TokenResponse) => data),
    modal.change.prepend(() => null),
    updatedCartCode.prepend(() => ''),
  ],
});

sample({ clock: authCodeMutation.fx.doneData, fn: () => Steps.check, target: authStep.change });

sample({
  clock: resetAuthFlow,
  target: [
    authCodeMutation.reset,
    checkAuthCodeMutation.reset,
    phoneNumber.reinit,
    codeNumber.reinit,
    modal.reinit,
    timeoutField.reinit,
    authStep.reinit,
  ],
});

sample({
  clock: authCodeMutation.fx.doneData,
  fn: ({ meta }) => Number(meta?.timeoutSeconds) || 60,
  target: timeoutField.change,
});

sample({
  clock: authCodeMutation.fx.doneData,
  fn: ({ code }) => code,
  filter: ({ code }) => !!code,
  target: codeNumber.change,
});

sample({ clock: checkAuthCodeMutation.fx.done, target: resetAuthFlow });

bridge(() => {
  sample({
    source: $currentGender,
    clock: logged,
    fn: section => ({ section }),
    filter: $appIsFull,
    target: favoriteBrandsQuery.start,
  });

  sample({
    clock: lastFavoriteBrandId.change,
    fn: () => 'brands' as const,
    target: modal.change,
  });
});

analytics(() => {
  sample({
    clock: modal.change,
    filter: Boolean,
    target: authAnalytics.loginPopupOpened,
  });

  sample({
    source: modal.$value,
    clock: logged,
    fn: (place, data) => ({ place, data }),
    target: authAnalytics.logged,
  });

  sample({
    source: modal.$value,
    clock: authCodeMutation.fx.done,
    filter: (_, { params }) => isFirstCodeTry(params[0].isResend),
    fn: place => ({ place }),
    target: authAnalytics.confirmPhone,
  });

  sample({
    source: modal.$value,
    clock: authCodeMutation.fx.done,
    filter: (_, { params }) => !isFirstCodeTry(params[0].isResend),
    fn: place => ({ place }),
    target: authAnalytics.coeResended,
  });

  sample({
    clock: wasLogouted,
    fn: ({ params }) => {
      const { sub } = parseJwt(params);

      return sub ?? '';
    },
    target: authAnalytics.logouted,
  });
});

function isFirstCodeTry(isResend?: boolean) {
  return !isResend;
}
