import { useState } from 'react';

import { DescriptionModals } from './constants';
import { DescriptionModal } from './DescriptionModal';
import { GarantiModal } from './GarantiModal';
import { RoomModal } from './RoomModal';

const handledByDescriptionModalComponent: string[] = [
  DescriptionModals.Delivery,
  DescriptionModals.Returns,
  DescriptionModals.PrivateReturns,
  DescriptionModals.WatchesReturns,
  DescriptionModals.PrivateWatchesReturns,
  DescriptionModals.Payment,
];

export function useOngoingModalsInternal() {
  const [currentModal, setCurrentModal] = useState<string | null>(null);

  const closeDescriptionModal = () => {
    setCurrentModal(null);
  };

  return {
    currentModal,
    setCurrentModal,
    content: (
      <>
        <DescriptionModal
          closeModal={closeDescriptionModal}
          isOpen={handledByDescriptionModalComponent.includes(currentModal ?? '')}
          type={currentModal ?? ''}
          changeModal={setCurrentModal}
        />
        <GarantiModal closeModal={closeDescriptionModal} isOpen={currentModal === DescriptionModals.Garantie} />
        <RoomModal closeModal={closeDescriptionModal} isOpen={currentModal === DescriptionModals.Room} />
      </>
    ),
    closeDescriptionModal,
  };
}
