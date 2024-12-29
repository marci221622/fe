import { createEvent, createStore } from 'effector';
import { useUnit } from 'effector-react';
import { debounce } from 'patronum/macro';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { usePrevious } from './usePrevious';

export const setRedirect = createEvent<string>();
const redirectDebounced = debounce({ source: setRedirect, timeout: 100 });

export const $redirect = createStore<{ to: string } | null>(null);

$redirect.on(redirectDebounced, (_, to) => ({ to }));

export function Redirect() {
  const redirect = useUnit($redirect);
  const onRedirected = useUnit(setRedirect);
  const navigate = useNavigate();
  const prevRedirect = usePrevious(redirect);

  useEffect(() => {
    if (redirect?.to && prevRedirect !== redirect) {
      onRedirected('');
      navigate(redirect?.to, { replace: true });
    }
  }, [navigate, redirect?.to, onRedirected, redirect, prevRedirect]);

  return null;
}
