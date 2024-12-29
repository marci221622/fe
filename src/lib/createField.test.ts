import { fork, allSettled } from 'effector';

import { createField } from './createField';

describe('lib/createField', () => {
  it('should initialize with the given value', () => {
    const field = createField('initial');
    const scope = fork();

    expect(scope.getState(field.$value)).toBe('initial');
  });

  it('should change value correctly', async () => {
    const field = createField('initial');
    const scope = fork();

    await allSettled(field.change, { scope, params: 'changed' });

    expect(scope.getState(field.$value)).toBe('changed');
  });

  it('should reset value to initial state', async () => {
    const field = createField('initial');
    const scope = fork();

    await allSettled(field.change, { scope, params: 'changed' });
    await allSettled(field.reset, { scope });

    expect(scope.getState(field.$value)).toBe('initial');
  });
});
