import { useEffect, useState } from 'react';

type Props = {
  disabled: boolean;
  onMouseMove?: (event: MouseEvent) => void;
};

export function useMousePosition({ disabled, onMouseMove }: Props) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (disabled) return undefined;

    const listener = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      onMouseMove?.(event);
    };

    window.addEventListener('mousemove', listener);

    return () => {
      window.removeEventListener('mousemove', listener);
    };
  }, [disabled, onMouseMove]);

  return position;
}
