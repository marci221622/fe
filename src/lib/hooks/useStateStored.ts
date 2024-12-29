import { useCallback, useState } from 'react';

import { prodLoggerEnabled } from '@/constants/runtimeConfig';

const runningInBrowser = typeof window !== 'undefined'; // otherwise SSR

class localStorageApi {
  static get<T>(key: string, defaultValue: T): T {
    if (runningInBrowser) {
      const valueAsString = localStorage.getItem(key);

      if (valueAsString === null) {
        return defaultValue;
      }

      try {
        const value: T = JSON.parse(valueAsString);
        const ret = value ?? defaultValue;

        return ret;
      } catch (error) {
        if (prodLoggerEnabled()) {
          const defaultAsString = JSON.stringify(defaultValue);
          const msg = ` LOCALSTORAGE_VALUE_CAN_NOT_BE_PARSED => returning defaultValue[${defaultAsString}]`;

          console.error(`GET(${key}): ${valueAsString} ${msg}`, error);
        }
        return defaultValue;
      }
    }

    return defaultValue;
  }

  static set<T>(key: string, value: T): void {
    if (runningInBrowser) {
      const valueAsString = JSON.stringify(value);

      localStorage.setItem(key, valueAsString);
    }
  }

  static remove(key: string): void {
    if (runningInBrowser) {
      localStorage.removeItem(key);
    }
  }
}

export function useStateStored<T>(
  storageKey: string,
  defaultValue: T,
): [value: T, setter: (newValue: T) => void, remove: () => void] {
  const storageValue = localStorageApi.get<T>(storageKey, defaultValue);
  const [value, setValue] = useState(storageValue);

  const setValueWrapped = useCallback(
    (newValue: T) => {
      setValue(newValue); // re-renders the parent
      localStorageApi.set<T>(storageKey, newValue);
    },
    [storageKey],
  );

  const removeValueWrapped = useCallback(() => {
    setValue(defaultValue); // re-renders the parent
    localStorageApi.remove(storageKey);
  }, [defaultValue, storageKey]);

  return [value, setValueWrapped, removeValueWrapped];
}
