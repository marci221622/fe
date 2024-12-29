import cn from 'classnames';
import { useRef, useEffect } from 'react';

import { useMousePosition } from '@/lib/hooks';

import { InternalPhotoProps } from './types';

import st from './ZoomableImage.module.scss';

export function Photo({
  img,
  isOpen,
  isActive,
  isZoomed,
  resetTransform,
  setIsZoomed,
  onMouseMove,
}: InternalPhotoProps) {
  const mousePosition = useMousePosition({ disabled: !isOpen, onMouseMove });

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) {
      resetTransform();
      setIsZoomed(false);
    }
  }, [isActive, setIsZoomed, resetTransform]);

  const handleClick = () => {
    if (isZoomed) {
      resetTransform();
      setIsZoomed(false);
    } else {
      const event = new MouseEvent('dblclick', {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: mousePosition.x,
        clientY: mousePosition.y,
      });

      wrapperRef.current?.dispatchEvent(event);
      setIsZoomed(true);
    }
  };

  const classNames = cn(st.slide, {
    [st.zoomedIn]: isOpen && isZoomed,
    [st.zoomedOut]: isOpen && !isZoomed,
  });

  return (
    <div ref={wrapperRef} className={classNames} onClick={handleClick}>
      <img src={img} alt="" loading="lazy" />
    </div>
  );
}
