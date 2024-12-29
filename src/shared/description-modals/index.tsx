import { ReactNode, createContext, useContext } from 'react';

import { useOngoingModalsInternal } from './useOngoingModals';

export { DescriptionModals } from './constants';

const descriptionModalsContext = createContext<ReturnType<typeof useOngoingModalsInternal> | null>(null);

export function DescriptionModalsProvider({ children }: { children: ReactNode }) {
  const modals = useOngoingModalsInternal();

  return (
    <>
      <descriptionModalsContext.Provider value={modals}>{children}</descriptionModalsContext.Provider>
      {modals.content}
    </>
  );
}

export function useDescriptionModals() {
  const rs = useContext(descriptionModalsContext);

  if (!rs) {
    throw new Error('useDescriptionModals must be used inside DescriptionModalsProvider');
  }

  return rs;
}
