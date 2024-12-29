import { attach } from 'effector';
import { createGate } from 'effector-react';

export type CaptchaService = ((action?: string) => Promise<string>) | null;

export const CaptchaServiceGate = createGate<CaptchaService>();

export const getCaptchaTokenFx = attach({
  source: CaptchaServiceGate.state,
  effect: (service, action: string) => {
    if (!service) {
      return '';
    }

    try {
      return service(action);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.log('getCaptchaTokenFx failed', { error });
      }

      return '';
    }
  },
});
