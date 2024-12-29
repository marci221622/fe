// Просто функция что бы разграничить связи по группам
export function bridge(invoke: () => void) {
  invoke();
}

/**
 * Тоже что и bridge, но для разграничения связей аналитики
*/
export function analytics(invoke: () => void) {
  bridge(invoke);
}

/**
 * Тоже что и bridge, но для разграничения логики по абтестам
*/
export function abtest(invoke: () => void) {
  bridge(invoke);
}
