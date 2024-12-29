import { useUnit } from 'effector-react';
import { useMemo } from 'react';

import { globalCart } from './models';

export function useInCart() {
  const cartItems = useUnit(globalCart.$filteredCartItems);

  const scheme = useMemo(
    () => cartItems.reduce((acc, item) => ({ ...acc, [item.item?.code ?? '']: true }), {} as Record<string, boolean>),
    [cartItems],
  );

  return (code: string) => scheme[code] ?? false;
}
