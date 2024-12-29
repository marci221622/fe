import { useEffect } from 'react';

import { FeatureDevKey, featuresFlagsDev } from '@/constants/features';

import { usePopupState } from './usePopupState';

// Для того что бы выкатить фичи для дев теста
export function useDevFF(key: FeatureDevKey) {
  const { isOpen, openPopup } = usePopupState(featuresFlagsDev[key].enabled);

  useEffect(() => {
    const flag = featuresFlagsDev[key];
    const result = localStorage.getItem(flag.key);

    if (result === 'true') {
      openPopup();
    }
  }, [key, openPopup]);

  return isOpen;
}
