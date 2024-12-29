import { useCallback, useState } from 'react';

interface Props {
  initialKey?: string;
  initialKeys?: string[];
  isMultiply?: boolean;
  needCloseCurrent?: boolean;
}

type HookReturnType = [
  string[],
  { changePanels: (key: string) => void; closePanels: () => void; openInitial: () => void },
];

export function useAccordionTrigger({
  initialKey,
  initialKeys,
  isMultiply = false,
  needCloseCurrent,
}: Props = {}): HookReturnType {
  const initial = initialKey ? [initialKey] : initialKeys;
  const [activePanels, setActivePanels] = useState(initial ?? []);

  const changePanels = useCallback(
    (key: string) => {
      if (key) {
        if (needCloseCurrent) {
          setActivePanels([key]);

          return;
        }

        if (isMultiply) {
          setActivePanels(prev => {
            const wasOpened = prev.find(it => key === it);

            if (wasOpened) {
              return prev.filter(it => it !== key);
            }

            return [...prev, key];
          });
        } else {
          setActivePanels(prev => (prev.length > 0 ? [] : [key]));
        }
      }
    },
    [isMultiply, needCloseCurrent],
  );

  const closePanels = useCallback(() => {
    setActivePanels([]);
  }, []);

  const openInitial = useCallback(() => {
    if (initialKey) {
      setActivePanels([initialKey]);
    } else {
      setActivePanels([]);
    }
  }, [initialKey]);

  return [activePanels, { changePanels, closePanels, openInitial }];
}
