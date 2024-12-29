import loadable from '@loadable/component';

import { useViewport } from '@/lib/hooks';
import { RemoteBoundary } from '@/lib/RemoteBoundary';

import { ModalSwipeableProps } from './ModalSwipeable';

export type { ModalSwipeableProps };

const RemoteModal = loadable<ModalSwipeableProps>(() => import('./ModalSwipeable'), { ssr: false });

export function ModalSwipeable(props: ModalSwipeableProps) {
  const { isTabletAndBelow } = useViewport();

  if (!isTabletAndBelow) {
    return null;
  }

  return (
    <RemoteBoundary>
      <RemoteModal {...props} />
    </RemoteBoundary>
  );
}
