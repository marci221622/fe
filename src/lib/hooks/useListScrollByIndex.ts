import { RefObject, useEffect } from 'react';

export type RefsListScrollByIndexProps<T> = {
  listRef: RefObject<T>;
  selectedIndex: number;
};

export function useListScrollByIndex<T extends HTMLElement>({
  listRef: parent,
  selectedIndex,
}: RefsListScrollByIndexProps<T>) {
  useEffect(() => {
    const parentElement = parent.current;

    if (!parentElement || selectedIndex < 0) {
      return;
    }

    const selectedElement = parentElement.childNodes[selectedIndex];

    if (!selectedElement || !(selectedElement instanceof HTMLElement)) {
      return;
    }

    const selectedRectangle = selectedElement.getBoundingClientRect();
    const parentRectangle = parentElement.getBoundingClientRect();

    const isNotVisible =
      selectedRectangle.top < parentRectangle.top || selectedRectangle.bottom > parentRectangle.bottom;

    if (isNotVisible) {
      selectedElement?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
    }
  }, [parent, selectedIndex]);
}
