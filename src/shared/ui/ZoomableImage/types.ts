import { Dispatch, SetStateAction } from 'react';
import { useControls } from 'react-zoom-pan-pinch';

export type ZoomablePhotoProps = {
  img: string;
  isOpen: boolean;
  isActive: boolean;
};

export type InternalPhotoProps = ZoomablePhotoProps &
  Pick<ReturnType<typeof useControls>, 'resetTransform'> & {
    isZoomed: boolean;
    setIsZoomed: Dispatch<SetStateAction<boolean>>;
    onMouseMove: (event: MouseEvent) => void;
  };
