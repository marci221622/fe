import { useEffect } from 'react';

export function useScrollRestoration() {
  // Trigger manual scroll restoration while we're active
  useEffect(() => {
    window.history.scrollRestoration = 'manual';

    return () => {
      window.history.scrollRestoration = 'auto';
    };
  }, []);
}
