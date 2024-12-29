import { act, renderHook } from '@testing-library/react-hooks';
import { useCallback, useState } from 'react';

import { usePrevious } from './usePrevious';

function useCounter() {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount(x => x + 1), []);
  const decrement = useCallback(() => setCount(x => x - 1), []);
  const prev = usePrevious(count);

  return { count, increment, decrement, prev };
}

describe('lib/usePrevious', () => {
  it('should work correctly', () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);
    expect(result.current.prev).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
    expect(result.current.prev).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(2);
    expect(result.current.prev).toBe(1);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(3);
    expect(result.current.prev).toBe(2);

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(2);
    expect(result.current.prev).toBe(3);

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(1);
    expect(result.current.prev).toBe(2);
  });
});
