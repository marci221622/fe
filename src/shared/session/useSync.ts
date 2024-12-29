import { StoreValue } from 'effector';
import { useUnit } from 'effector-react';
import { useIsomorphicLayoutEffect } from 'react-spring';

import { TokenResponse } from '@/generated/customer_hub/methods/auth/auth_by_code.v1';

import { useMount } from '@/lib/hooks';

import { $isAuthorized, $session, logout, setSession } from './models';

export function useSyncSession() {
  const onLogout = useUnit(logout);
  const onSession = useUnit(setSession);
  const session = useUnit($session);
  const isAuthorized = useUnit($isAuthorized);

  useIsomorphicLayoutEffect(() => {
    const cb = (event: StorageEvent) => {
      if (event.key === 'jwt') {
        const session = event.newValue ? (JSON.parse(event.newValue) as TokenResponse) : null;

        if (session?.accessToken && session?.refreshToken) {
          onSession(session);
        } else {
          onLogout();
        }
      }
    };

    window.addEventListener('storage', cb);

    return () => window.removeEventListener('storage', cb);
  }, [onLogout, onSession]);

  // Может быть так что как то разлогинили
  // Но в лс остался jwt
  // Не критично, но лучше удалить
  useMount(() => {
    const jwt = localStorage.getItem('jwt') as StoreValue<typeof $session> | null;

    if (!isAuthorized && jwt) {
      localStorage.removeItem('jwt');
    }
  });

  // Когда пользователь отрывает несколько вкладок
  // и перезагружает одну из них обновляя токен на сервере
  // этот токен не прокидывается на другие вкладки
  // Для фикса просто синканем их через LS
  useMount(() => {
    try {
      const jwt = localStorage.getItem('jwt');

      if (isAuthorized && jwt) {
        localStorage.setItem('jwt', JSON.stringify(session));
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[useSyncSession]: jwt not valid');
      }
    }
  });
}
