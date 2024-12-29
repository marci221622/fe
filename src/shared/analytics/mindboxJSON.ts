import { attach, createEffect, createEvent, sample } from 'effector';

import { $isClient } from '@/shared/start';

import { fingerprintCookieName } from '@/constants/cookies';
import { prodLoggerEnabled, runtimeConfig } from '@/constants/runtimeConfig';

import { $baseServices, BaseServices } from '@/lib/services';

import { MindboxType } from './types';

type FxParams = { params: MindboxType[]; services: BaseServices | null };

// Тот же mindbox sdk
// Но через json сами шлем данные
// Для тех методов которые не добавили в sdk
export const sendMindboxJSON = createEvent<any[]>();

export const sendMindboxJSONFx = attach({
  source: $baseServices,
  mapParams: (params: MindboxType[], services) => ({ services, params }),
  effect: createEffect<FxParams, any>(({ params, services }) => {
    const apiServices = services?.api;

    if (!apiServices) {
      return undefined;
    }

    if (prodLoggerEnabled()) {
      // eslint-disable-next-line no-console
      console.log('Mindbox:JSON:send ->', { params });
    }

    return Promise.allSettled(
      params.map(payload => {
        const searchParams = new URLSearchParams({
          endpointId: runtimeConfig.MINDBOXID as string,
          operation: payload.operation,
          deviceUUID: services.cookies.get(fingerprintCookieName) ?? '',
        });

        if (process?.env?.NODE_ENV === 'development') {
          return Promise.resolve(null);
        }

        return apiServices.mindbox.post(`/operations/async?${searchParams}`, payload.data);
      }),
    );
  }),
});

sample({
  filter: $isClient,
  clock: sendMindboxJSON,
  target: sendMindboxJSONFx,
});
