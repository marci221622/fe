import { createStore } from 'effector';

// A - old ui
// B - new ui
export type ABtest = 'variationB' | 'variationA';

// тест для товарного мульти чекаут
const $multiClickAndCollect = createStore<ABtest>('variationA');

export const AB_TESTS = {
  $multiClickAndCollect,
};

export function isVariationA(test: ABtest) {
  return test === 'variationA';
}

export function isVariationB(test: ABtest) {
  return test === 'variationB';
}
