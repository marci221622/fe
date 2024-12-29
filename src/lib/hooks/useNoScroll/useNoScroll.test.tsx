import { act, renderHook } from '@testing-library/react-hooks';
import { fork, Scope } from 'effector';
import { Provider } from 'effector-react';
import { ReactNode } from 'react';

import { useNoScroll, lockBodyFx, $stack } from './useNoScroll';

function Wrapper({ children, scope }: { children?: ReactNode; scope: Scope }) {
  return <Provider value={scope}>{children}</Provider>;
}

describe('@/lib/useNoScroll', () => {
  it('should works correctly', async () => {
    const lockMocked = jest.fn();

    const scope = fork({
      handlers: new Map().set(lockBodyFx, lockMocked),
    });

    const h1 = renderHook(() => useNoScroll(false), {
      wrapper: Wrapper,
      initialProps: {
        scope,
      },
    });

    expect(scope.getState($stack)).toBe(0);
    expect(lockMocked).toHaveBeenCalledTimes(0);

    const h2 = renderHook(() => useNoScroll(true), {
      wrapper: Wrapper,
      initialProps: {
        scope,
      },
    });

    expect(scope.getState($stack)).toBe(1);
    expect(lockMocked).toHaveBeenCalledTimes(1);

    await act(() => h1.unmount());

    expect(scope.getState($stack)).toBe(1);
    expect(lockMocked).toHaveBeenCalledTimes(1);

    await act(() => h2.unmount());

    expect(scope.getState($stack)).toBe(0);
    expect(lockMocked).toHaveBeenCalledTimes(2);
  });
});
