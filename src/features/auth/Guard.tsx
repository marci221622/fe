import { useUnit } from 'effector-react';

import { $isAuthorized } from '@/shared/session';

type Props = {
  children: React.JSX.Element;
};

export function IfAuth({ children }: Props) {
  const isAuth = useUnit($isAuthorized);

  if (isAuth) {
    return children;
  }

  return null;
}

export function IfGuest({ children }: Props) {
  const isAuth = useUnit($isAuthorized);

  if (!isAuth) {
    return children;
  }

  return null;
}
