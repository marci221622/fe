import { useRef, useEffect, type MutableRefObject } from 'react';

export function useInitialValue<T>(value: T, isOpened: boolean): MutableRefObject<T | undefined>['current'] {
  const ref = useRef<T>();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isOpened) {
      ref.current = value;

      return () => {
        ref.current = value;
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpened]);

  return ref.current;
}
