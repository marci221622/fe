import { createEffect, createEvent, createStore, sample } from 'effector';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { lock, clearBodyLocks } from 'tua-body-scroll-lock';

const increment = createEvent();
const decrement = createEvent();

export const $stack = createStore(0);

export const lockBodyFx = createEffect((stack: number) => {
  requestAnimationFrame(() => {
    if (stack > 0) {
      const allowedToScroll = Array.from(document.querySelectorAll('[data-scroll="allow"]')) as HTMLElement[];

      clearBodyLocks();
      lock(allowedToScroll);
    } else {
      clearBodyLocks();
    }
  });
});

$stack.on(increment, prev => prev + 1).on(decrement, prev => Math.max(prev - 1, 0));

sample({
  source: $stack,
  clock: [decrement, increment],
  target: lockBodyFx,
});

export const useNoScroll = (isOpen: boolean) => {
  const lock = useUnit(increment);
  const unlock = useUnit(decrement);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isOpen) {
      lock();

      return () => {
        unlock();
      };
    }
  }, [isOpen, lock, unlock]);
};
