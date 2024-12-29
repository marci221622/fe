import { useEffect } from 'react';

export function usePageHide(callback: (event: PageTransitionEvent) => unknown, options?: { capture?: boolean }): void {
  const { capture } = options || {};

  useEffect(() => {
    const opts = capture != null ? { capture } : undefined;

    window.addEventListener('pagehide', callback, opts);

    return () => {
      window.removeEventListener('pagehide', callback, opts);
    };
  }, [callback, capture]);
}

export function useBeforeUnload(
  callback: (event: BeforeUnloadEvent) => unknown,
  options?: { capture?: boolean },
): void {
  const { capture } = options || {};

  useEffect(() => {
    const opts = capture != null ? { capture } : undefined;

    window.addEventListener('beforeunload', callback, opts);

    return () => {
      window.removeEventListener('beforeunload', callback, opts);
    };
  }, [callback, capture]);
}
