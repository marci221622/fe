import { Action } from 'history';
import { createContext, useCallback, useContext, useEffect } from 'react';

export const CATALOG_RESTORATION_KEY = 'scroll-position-product-id-marker';

// Контекст что бы не потерять тип
// Я сам для префетча управляю стейтом
// Отсюда не корректное поведение для роутов внутри <Routes>
export const restorationCtx = createContext<Action>(Action.Push);

export function useCatalogRestorationSyncActions() {
  const persistScrollPosition = useCallback((id: string) => {
    sessionStorage.setItem(CATALOG_RESTORATION_KEY, id);
  }, []);

  return {
    persistScrollPosition,
  };
}

export function useCatalogRestorationSync() {
  const navType = useContext(restorationCtx);

  useEffect(() => {
    const id = sessionStorage.getItem(CATALOG_RESTORATION_KEY);

    if (navType === Action.Pop && id) {
      const element = document.querySelector(`[data-dig-product-code=${id}]`);

      element?.scrollIntoView?.({ behavior: 'auto', block: 'center' });
      sessionStorage.removeItem(CATALOG_RESTORATION_KEY);
    }
  }, [navType]);
}
