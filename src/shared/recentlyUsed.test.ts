import { fork, allSettled } from 'effector';

import { appStarted } from '@/shared/start';

import { createRecentlyUsed } from './recentlyUsed';

type LocalStorageMock = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
  clear: () => void;
};

const localStorageMock: LocalStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('shared/recentlyUsed', () => {
  beforeEach(() => {
    localStorage.clear(); // очищаем мок перед каждым тестом
  });

  it('should initialize with an empty array', () => {
    const utility = createRecentlyUsed({ key: 'testKey' });
    const scope = fork();

    expect(scope.getState(utility.field.$value)).toEqual([]);
  });

  it('should persist value correctly', async () => {
    const utility = createRecentlyUsed({ key: 'testKey' });
    const scope = fork();

    await allSettled(utility.persist, { scope, params: 'testValue' });

    expect(localStorage.getItem('testKey')).toEqual(JSON.stringify(['testValue']));
    expect(scope.getState(utility.field.$value)).toEqual(['testValue']);
  });

  it('should restore values correctly', async () => {
    localStorage.setItem('testKey', JSON.stringify(['testValue1', 'testValue2']));
    const utility = createRecentlyUsed({ key: 'testKey' });
    const scope = fork();
    const scopedCtrl = new AbortController();

    // Эмулируем старт приложения (сначала appStarted, потом persist из lc)
    await allSettled(appStarted, { scope, params: { ctrl: scopedCtrl } });

    await allSettled(utility.persist, { scope, params: 'testValue3' });
    expect(scope.getState(utility.field.$value)).toEqual(['testValue3', 'testValue1', 'testValue2']);
  });

  it('should clear values correctly', async () => {
    const utility = createRecentlyUsed({ key: 'testKey' });
    const scope = fork();

    await allSettled(utility.persist, { scope, params: 'testValue' });
    await allSettled(utility.clear, { scope });

    expect(localStorage.getItem('testKey')).toBeNull();
    expect(scope.getState(utility.field.$value)).toEqual([]);
  });

  it('should limit the number of persisted values', async () => {
    const utility = createRecentlyUsed({ key: 'testKey', maxLen: 2 });
    const scope = fork();

    await allSettled(utility.persist, { scope, params: 'testValue1' });
    await allSettled(utility.persist, { scope, params: 'testValue2' });
    await allSettled(utility.persist, { scope, params: 'testValue3' });

    expect(scope.getState(utility.field.$value)).toEqual(['testValue3', 'testValue2']);
  });
});
