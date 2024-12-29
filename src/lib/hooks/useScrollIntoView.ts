import { RefObject, useEffect } from 'react';

function isElementInViewport(rect: DOMRect) {
  const { top, bottom } = rect;

  return top >= 0 && bottom <= window.innerHeight;
}

export function useScrollIntoView(ref: RefObject<HTMLElement>, condition: boolean) {
  useEffect(() => {
    if (condition) {
      requestAnimationFrame(() => {
        const targetEl = ref.current;
        const targetElRect = targetEl?.getBoundingClientRect();

        if (targetEl && targetElRect && !isElementInViewport(targetElRect)) {
          window.scrollTo({
            behavior: 'smooth',
            top: window.scrollY + targetElRect.top + targetEl.clientHeight - window.innerHeight,
          });
        }
      });
    }
  }, [condition, ref]);
}
