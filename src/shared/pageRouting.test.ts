import { allSettled, createStore, fork, sample } from 'effector';

import { Section } from '@/generated/customer_hub/enums/section';

import { $redirect } from '@/lib/redirect';

import { Analytics, sendAnalytic } from './analytics';
import { createHooks } from './pageRouting';
import { $currentGender, $session } from './session';

describe('shared/pageRouting', () => {
  describe('createHooks', () => {
    const baseHooksParams = { url: '/test-page' };

    it('should works correct', async () => {
      const scope = fork();
      const hooks = createHooks({ pagename: 'TestPage' });

      // Моделируем  поведение "вход на страницу"
      await allSettled(hooks.enter, { scope, params: baseHooksParams });
      await allSettled(hooks.loaded, { scope });

      expect(scope.getState(hooks.$onPage)).toBe(true);
      expect(scope.getState(hooks.$params)).toEqual({ url: '/test-page' });

      // Моделируем поведение "страницу покинули"
      await allSettled(hooks.leave, { scope });

      expect(scope.getState(hooks.$onPage)).toBe(false);
      expect(scope.getState(hooks.$params)).toEqual(null);
    });

    it('dy should be injected', async () => {
      const scope = fork();
      const $analytics = createStore<Analytics | null>(null);
      const hooks = createHooks({ pagename: 'TestPage', injectDYOther: true });

      sample({ clock: sendAnalytic, target: $analytics });

      await allSettled(hooks.enter, { scope, params: baseHooksParams });
      await allSettled(hooks.loaded, { scope });

      expect(scope.getState($analytics)).toEqual({ dy: { type: 'spa', ctx: { lng: 'ru', type: 'OTHER' } } });
    });

    // Если стоит waiting: false
    // Сраница откроется автоматически
    // Полезно если для страницы не нужны запросы
    it('waiting should work correct', async () => {
      const scope = fork();
      const hooks = createHooks({ pagename: 'TestPage', waiting: false });

      await allSettled(hooks.enter, { scope, params: baseHooksParams });

      expect(scope.getState(hooks.$onPage)).toBe(true);
      expect(scope.getState(hooks.$params)).toEqual({ url: '/test-page' });
    });

    // Если клиент авторизирован
    // Он не сможет попасть на страницу guestOnly
    it('guestOnly should work correct', async () => {
      const scope = fork({
        values: new Map().set($session, { refreshToken: 'refreshToken', accessToken: 'accessToken' }),
      });
      const hooks = createHooks({ pagename: 'TestPage', guestOnly: true });

      await allSettled(hooks.enter, { scope, params: baseHooksParams });

      expect(scope.getState(hooks.$onPage)).toBe(false);
      expect(scope.getState(hooks.$params)).toEqual(null);
      // На сраницу гостя всегда идет редирект на профиль
      expect(scope.getState($redirect)).toEqual({ to: '/profile' });
    });

    // Если клиент не авторизирован
    // Он не сможет попасть на страницу authOnly
    it('authOnly should work correct', async () => {
      const scope = fork();
      const hooks = createHooks({ pagename: 'TestPage', authOnly: true });

      await allSettled(hooks.enter, { scope, params: baseHooksParams });

      expect(scope.getState(hooks.$onPage)).toBe(false);
      expect(scope.getState(hooks.$params)).toEqual(null);
      expect(scope.getState($redirect)).toEqual({ to: '/login?backurl=/test-page' });
    });

    it('genderSwitcher should work correct', async () => {
      const scope = fork();
      const hooks = createHooks({ pagename: 'TestPage', needGenderSwitcher: true, waiting: false });

      await allSettled(hooks.enter, { scope, params: baseHooksParams });

      expect(scope.getState(hooks.$onPage)).toBe(true);
      expect(scope.getState(hooks.$params)).toEqual({ url: '/test-page' });
      // Дефолтный мен
      expect(scope.getState($currentGender)).toBe(Section.SECTION_MALE);

      await allSettled(hooks.enter, { scope, params: { ...baseHooksParams, url: '/women/catalog/slug' } });

      expect(scope.getState(hooks.$onPage)).toBe(true);
      expect(scope.getState(hooks.$params)).toEqual({ url: '/women/catalog/slug' });
      expect(scope.getState($currentGender)).toBe(Section.SECTION_FEMALE);
    });
  });
});
