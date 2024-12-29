import { useUnit } from 'effector-react';
import { uniq } from 'lodash';
import { useCallback, useEffect } from 'react';

import { catalogAnalytics } from '../models';

export const useOpenFilterAnalytics = ({
  isOpen,
  title,
  prevTitles,
  isSorting = false,
}: {
  isOpen: boolean;
  title: string;
  prevTitles?: string[];
  isSorting?: boolean;
}) => {
  const opened = useUnit(catalogAnalytics.filterOpened);

  useEffect(() => {
    if (isOpen) {
      const rootCategory = prevTitles && prevTitles?.length > 0 ? uniq(prevTitles).join('|') : '';

      opened({ title, rootCategory, isSorting });
    }
  }, [prevTitles, isOpen, opened, title, isSorting]);
};

export const useCloseEvent = ({ title, closePopup }: { title: string; closePopup: () => void }) => {
  const onClosed = useUnit(catalogAnalytics.filteClosed);

  const close = useCallback(
    (method: 'tap' | 'button', skip?: boolean) => (e?: any) => {
      e?.stopPropagation?.();
      closePopup();

      if (!skip) {
        onClosed({
          title,
          method,
        });
      }
    },
    [closePopup, onClosed, title],
  );

  return { close };
};

export const useOpenedEvent = ({
  title,
  openPopup,
  prevTitles,
  isSorting,
}: {
  title: string;
  openPopup: () => void;
  prevTitles?: string[];
  isSorting?: boolean;
}) => {
  const onOpened = useUnit(catalogAnalytics.filterOpened);

  const open = useCallback(() => {
    openPopup();

    const rootCategory = prevTitles && prevTitles?.length > 0 ? uniq(prevTitles).join('|') : '';

    onOpened({
      title,
      rootCategory,
      isSorting,
    });
  }, [isSorting, onOpened, openPopup, prevTitles, title]);

  return { open };
};
