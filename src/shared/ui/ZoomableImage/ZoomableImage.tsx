import { useCallback, useRef, useState } from 'react';
import { TransformComponent, TransformWrapper, ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';

import { Photo } from './Photo';
import { ZoomablePhotoProps } from './types';

import st from './ZoomableImage.module.scss';

export function ZoomableImage(props: ZoomablePhotoProps) {
  const { isOpen, isActive } = props;

  const [isZoomed, setIsZoomed] = useState(false);

  const ref = useRef<ReactZoomPanPinchRef>(null);

  // чтобы зум следовал за курсором
  const onMouseMove = useCallback(
    (event: MouseEvent) => {
      const isMouseFollowNeeded = isOpen && isActive && isZoomed;
      const zoomWrapper = ref.current?.instance?.wrapperComponent;

      if (isMouseFollowNeeded && zoomWrapper) {
        const { left, top, width, height } = zoomWrapper.getBoundingClientRect();

        const posX = left + window.scrollX;
        const posY = top + window.scrollY;

        const elX = event.pageX - posX;
        const elY = event.pageY - posY;

        const isHovered = elX >= 0 && elY >= 0 && elX <= width && elY <= height;

        if (isHovered) {
          ref.current.setTransform(-elX, -elY, 2, 0);
        }
      }
    },
    [isActive, isOpen, isZoomed],
  );

  return (
    <TransformWrapper
      ref={ref}
      initialScale={1}
      minScale={1}
      maxScale={2}
      limitToBounds
      disablePadding
      wheel={{ disabled: true }}
      panning={{ disabled: true }}
      pinch={{ disabled: true }}
    >
      {({ resetTransform }) => (
        <TransformComponent wrapperClass={st.zoomWrapper}>
          <Photo
            {...props}
            onMouseMove={onMouseMove}
            isZoomed={isZoomed}
            setIsZoomed={setIsZoomed}
            resetTransform={resetTransform}
          />
        </TransformComponent>
      )}
    </TransformWrapper>
  );
}
