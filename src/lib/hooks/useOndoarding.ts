import { useCallback, useEffect, useState } from 'react';

import { useMountLayout } from './useMount';
import { usePopupState } from './usePopupState';

type Props = {
  key: string;
  // Для доп условий
  condition?: boolean;
};

// Что бы показать онбординг, если он еще не был показан
// Это на 1 раз
export function useOnboarding({ key, condition = true }: Props) {
  const popup = usePopupState(false);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const onboardingWasClosed = !!localStorage.getItem(key);

    if (!onboardingWasClosed && condition) {
      const id = requestAnimationFrame(() => {
        popup.openPopup();
      });

      return () => {
        cancelAnimationFrame(id);
      };
    }
  }, [popup.openPopup, condition]);

  const closePopup = () => {
    popup.closePopup();
    localStorage.setItem(key, 'true');
  };

  return {
    popup,
    closePopup,
  };
}

type ByCounterProps = {
  key: string;
  counter: number;
  condition?: boolean;
};

// Что бы показывать что либо n раз
export function useOnboardingByTimes({ key, counter, condition = true }: ByCounterProps) {
  const popup = usePopupState(false);

  const incrementCounterToMax = useCallback(() => {
    localStorage.setItem(key, String(counter + 1));
  }, [counter, key]);

  useMountLayout(() => {
    const value = localStorage.getItem(key);
    const viewedCounter = value ? +value : 0;

    if (viewedCounter < counter && condition) {
      popup.openPopup();
      localStorage.setItem(key, String(viewedCounter + 1));
    }
  }, [condition]);

  return {
    popup,
    closePopup: popup.closePopup,
    incrementCounterToMax,
  };
}

export function useOnboardingTrigger({ key, counter }: ByCounterProps) {
  const [times, setTimes] = useState(1);

  const incrementCounter = useCallback(() => {
    const value = localStorage.getItem(key);
    const viewedCounter = value ? +value : 1;
    const nextCounter = viewedCounter + 1;

    if (viewedCounter < counter + 1) {
      setTimes(nextCounter);
      localStorage.setItem(key, String(nextCounter));
    }
  }, [counter, key]);

  const incrementCounterToMax = useCallback(() => {
    setTimes(counter + 1);
    localStorage.setItem(key, String(counter + 1));
  }, [counter, key]);

  useEffect(() => {
    const value = localStorage.getItem(key);
    const viewedCounter = value ? +value : 1;

    setTimes(viewedCounter);
  }, [key]);

  return { times, incrementCounter, incrementCounterToMax };
}
