import { createEffect, createEvent, createStore, sample } from 'effector';
import { not } from 'patronum/macro';

import { timeoutField, resetAuthFlow, authStep, Steps, codeNumber } from './flow';

export const resetTimer = createEvent<void>();

const decrementTimerFx = createEffect<void, void>(
  () =>
    new Promise((res, rej) => {
      let id: NodeJS.Timeout | null = null;

      const unbind = resetTimer.watch(() => {
        rej(new Error('aborted'));

        if (id) {
          clearTimeout(id);
        }
      });

      id = setTimeout(() => {
        res();
        unbind();
      }, 1000);
    }),
);

export const $expiredTimer = createStore(0)
  .on(timeoutField.change, (_, timer) => timer)
  .on(decrementTimerFx.done, timer => timer - 1)
  .reset(resetTimer);

export const $expiredTimerIsEmpty = $expiredTimer.map(t => t <= 0);

export const $expiredTimerIsNotEmpty = not($expiredTimerIsEmpty);

sample({
  clock: resetTimer,
  target: codeNumber.reset,
});

sample({
  source: decrementTimerFx.done,
  filter: $expiredTimerIsNotEmpty,
  fn: () => ({}),
  target: decrementTimerFx,
});

sample({
  source: timeoutField.change,
  target: decrementTimerFx,
});

sample({
  clock: resetAuthFlow,
  target: resetTimer,
});

sample({
  clock: authStep.change,
  filter: value => value === Steps.set,
  target: resetTimer,
});
