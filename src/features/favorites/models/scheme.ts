import { createStore } from 'effector';

import { wasLogouted } from '@/shared/session';

// Просто мапа для обновления состояния
// Возможно стоит вынести в вафорит от бека
// list.ts
// В корзине будет подобня тема
// Светить что товар в корзине
export const $favoritesScheme = createStore<Record<string, boolean>>({});

$favoritesScheme.reset(wasLogouted);
