const timers = {
  delay: 100,
};

export const delay = (timeout: number) =>
  new Promise<boolean>(rs => {
    setTimeout(() => {
      rs(true);
    }, timeout);
  });

// Для таймеров
// Что бы запросы старта стартовали чуть позже
export const createDelay = () => {
  if (typeof window !== 'undefined') {
    timers.delay += 100;
  }

  return timers.delay;
};
