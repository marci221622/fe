import { sample } from 'effector';
import { debounce, every, not } from 'patronum/macro';

import { $appIsShort } from '@/shared/configs';
import { $isAuthorized } from '@/shared/session';
import { appStartedOnClient } from '@/shared/start';

import { logged } from '@/features/auth';

import { createDelay } from '@/lib/delay';

import { createFavorite } from './factory';

export const favoriteResults = createFavorite();

export const $favoriteCounter = favoriteResults.$counter.map(counter =>
  counter === 0 ? null : counter > 99 ? `99+` : `${counter}`,
);

sample({
  clock: debounce({ source: appStartedOnClient, timeout: createDelay() }),
  filter: every({
    stores: [$isAuthorized, not($appIsShort), favoriteResults.$dataNotLoaded],
    predicate: Boolean,
  }),
  fn: () => ({}),
  target: favoriteResults.query.start,
});

sample({
  clock: debounce({ source: logged, timeout: createDelay() }),
  filter: not($appIsShort),
  fn: () => ({}),
  target: favoriteResults.query.start,
});
