import { useUnit } from 'effector-react';
import { ReactNode } from 'react';

import { createField } from '@/lib/createField';

export enum AppVariant {
  short = 'short',
  full = 'full',
}

export const appVarriant = createField<AppVariant>(AppVariant.full);

export const $appIsShort = appVarriant.$value.map(variant => variant === AppVariant.short);
export const $appIsFull = appVarriant.$value.map(variant => variant === AppVariant.full);

export function OnlyFullVariant({ children }: { children: ReactNode }) {
  const appIsShort = useUnit($appIsShort);

  if (!appIsShort) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }

  return null;
}

export function OnlyShortVariant({ children }: { children: ReactNode }) {
  const appIsShort = useUnit($appIsShort);

  if (appIsShort) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }

  return null;
}
