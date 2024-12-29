import { clamp } from 'lodash';
import { useCallback, useState } from 'react';

import { useKeyPress } from './useKeyPress';

export type KeyboardIndexSelectionProps = {
  onSelect: (index: number) => void;
  maxLength: number;
  inputRef: React.MutableRefObject<HTMLElement | null>;
};

const DEFAULT_UNSELECTED_INDEX = -1;

export function useKeyboardListIndex({ onSelect, maxLength, inputRef }: KeyboardIndexSelectionProps) {
  const [selectedIndex, setSelectedIndex] = useState(DEFAULT_UNSELECTED_INDEX);

  const getIndexClamped = useCallback(
    (value: number) => clamp(value, DEFAULT_UNSELECTED_INDEX, maxLength - 1),
    [maxLength],
  );

  const resetIndex = useCallback(() => setSelectedIndex(DEFAULT_UNSELECTED_INDEX), []);

  // keep index within bounds when maxLength has changed
  const newIndex = getIndexClamped(selectedIndex);

  if (selectedIndex !== newIndex) {
    setSelectedIndex(newIndex);
  }

  const keyPressCallback = useCallback(
    (code: string, event: KeyboardEvent) => {
      if (code === 'ArrowUp') {
        event.preventDefault();
        setSelectedIndex(getIndexClamped(selectedIndex - 1));
      }

      if (code === 'ArrowDown') {
        event.preventDefault();
        setSelectedIndex(getIndexClamped(selectedIndex + 1));
      }

      if (code === 'Enter') {
        event.preventDefault();
        onSelect(selectedIndex);
        resetIndex();
      }
    },
    [getIndexClamped, onSelect, selectedIndex, resetIndex],
  );

  useKeyPress(keyPressCallback, inputRef);

  return {
    selectedIndex,
    resetIndex,
  };
}
