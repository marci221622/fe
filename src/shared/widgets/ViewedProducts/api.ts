import { createEffect } from 'effector';

import { createAuthRequest } from '@/shared/session';

type ViewedIdsResult = {
  ids: {
    mindboxId: number;
    website: string; // product code
  };
}[];

export const fetchItemsByCodes = createAuthRequest('GetItemsByCodes');

export const fetchViewedIdsFromMindbox = createEffect<{ size?: string }, string[]>(({ size }) => {
  return new Promise((rs, rj) => {
    window.mindbox?.('sync', {
      operation: 'WebsiteCollect.ViewedProducts',
      data: {
        recommendation: {
          limit: size,
        },
      },
      onSuccess: (response: { recommendations: ViewedIdsResult }) => {
        const list = response.recommendations?.map(product => product.ids.website) ?? [];

        if (list.length > 0) {
          rs(response.recommendations?.map(product => product.ids.website) ?? []);
        } else {
          rj(new Error('mindbox empty'));
        }
      },

      onValidationError: () => {
        rj(new Error('mindbox viewed failed'));
      },
      onError: () => {
        rj(new Error('mindbox viewed failed'));
      },
    });
  });
});
