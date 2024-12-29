import { createStore } from 'effector';

// Принимаем заголовки с данными
// Если в клик колект пусто придет
// Проставим получателя из этих данных
// На событие клика и получаения чекаута
export const $additionalUserData = createStore({
  name: '',
  phone: '',
});
