import { useEffect, EffectCallback, DependencyList } from 'react';
import { useIsomorphicLayoutEffect } from 'react-spring';

export function useMount(effect: EffectCallback, deps: DependencyList = []) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, deps);
}

export function useMountLayout(effect: EffectCallback, deps: DependencyList = []) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useIsomorphicLayoutEffect(effect, deps);
}
