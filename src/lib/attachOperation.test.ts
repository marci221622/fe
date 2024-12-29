import { invoke } from '@withease/factories';
import { allSettled, fork } from 'effector';

import { attachOperation } from './attachOperation';
import { createQuery } from './createQuery';

describe('attachOperation', () => {
  it('should be attach original', async () => {
    const scope = fork();

    const query = createQuery({
      initialData: 'initial',
      handler: async () => 'queryResult_initial',
    });

    const attachedQuery = invoke(() => attachOperation(query));
    const attachedQuery1 = invoke(() => attachOperation(query));

    expect([...new Set([query.$result.sid, attachedQuery.$result.sid, attachedQuery1.$result.sid])].length).toBe(3);

    await allSettled(query.start, { scope, params: {} });

    expect(scope.getState(query.$result)).toBe('queryResult_initial');
    expect(scope.getState(attachedQuery.$result)).toBe('initial');
    expect(scope.getState(attachedQuery1.$result)).toBe('initial');

    await allSettled(attachedQuery1.start, { scope, params: {} });

    expect(scope.getState(query.$result)).toBe('queryResult_initial');
    expect(scope.getState(attachedQuery.$result)).toBe('initial');
    expect(scope.getState(attachedQuery1.$result)).toBe('queryResult_initial');
  });

  it('should be attach original (when call direction reversed)', async () => {
    const scope = fork();

    const query = createQuery({
      initialData: 'initial',
      handler: async () => 'queryResult_initial',
    });

    const attachedQuery = invoke(() => attachOperation(query));

    await allSettled(attachedQuery.start, { scope, params: {} });

    expect(scope.getState(query.$result)).toBe('initial');
    expect(scope.getState(attachedQuery.$result)).toBe('queryResult_initial');
  });
});
