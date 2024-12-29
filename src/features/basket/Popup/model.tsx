import { createEvent, createStore } from 'effector';

export const decrement = createEvent<void>();
export const increment = createEvent<void>();

// Поменять z-index формы
// Если хоть какой то попап открыли
export const $checkoutPopupOpenedCounter = createStore(0);

$checkoutPopupOpenedCounter.on(decrement, prev => Math.max(prev - 1, 0)).on(increment, prev => prev + 1);
