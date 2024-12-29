import { useCallback, useEffect, useState } from 'react';

export function useShare({
  done,
  title = 'Поделиться',
  text = '',
}: {
  done?: () => void;
  title?: string;
  text?: string;
}) {
  const [available, setAvailable] = useState(false);

  const share = useCallback(
    async (path: string) => {
      if (available) {
        try {
          await window.navigator.share({
            title,
            text,
            url: `${window.location.protocol}//${window.location.hostname}${path}`,
          });
          done?.();
        } catch (e) {
          // eslint-disable-next-line no-console
          console.warn(e);
        }
      }
    },
    [available, done, text, title],
  );

  useEffect(() => {
    setAvailable(!!window.navigator.share);
  }, []);

  return {
    available,
    share,
  };
}
