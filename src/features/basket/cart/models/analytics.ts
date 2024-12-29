import { createEvent } from 'effector';

// Связь для модулей
// Из cart в родители
// Родитель (basket) все агрегирует в себе
export const cartAnalytics = {
  selectPromocode: createEvent<void>(),
};
