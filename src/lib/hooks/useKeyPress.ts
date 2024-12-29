import { useCallback, useEffect } from 'react';

export type KeyListenerCallback = (event: KeyboardEvent) => void;
export type KeyPressProps = Record<string, KeyListenerCallback>;

export function useKeyPress(
  callback: (code: string, event: KeyboardEvent) => void,
  inputRef: React.MutableRefObject<HTMLElement | null>
) {
  const handleKeydown = useCallback((event: KeyboardEvent) => callback(event.code, event), [callback]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const ref = inputRef.current;

    if (ref) {
      ref.addEventListener('keydown', handleKeydown);

      return () => ref.removeEventListener('keydown', handleKeydown);
    }
  }, [handleKeydown, inputRef]);
}
