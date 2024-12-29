import { RefObject, useEffect, useRef } from 'react';

export function useClickOutside(ref: RefObject<HTMLElement>, onClickOutside?: () => void) {
  const fnRef = useRef<(() => void) | void>(onClickOutside);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (fnRef.current) {
          fnRef.current();
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  if (onClickOutside !== fnRef.current) {
    fnRef.current = onClickOutside;
  }
}
