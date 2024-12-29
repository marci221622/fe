import { createDefer } from './defer';
import { delay } from './delay';

describe('li/defer', () => {
  it('should work correctly', async () => {
    const defer = createDefer<string>();

    setTimeout(() => {
      defer.rs('result');
    }, 0);

    const rs1 = await defer.req;
    const rs2 = await defer.req;

    expect([rs1, rs2]).toEqual(['result', 'result']);
  });

  it('should work correctly with parent promise', async () => {
    const request = () => delay(10).then(() => 'result');

    const defer = createDefer<string>();
    const promise = request();

    promise.then(defer.rs, defer.rj);

    // Важно именно такое написание
    // Иначе будут ошибки
    // Тесты ниже
    const rs1 = await defer.req;
    const rs2 = await defer.req;
    const rs3 = await promise;

    expect([rs1, rs2, rs3]).toEqual(['result', 'result', 'result']);
  });

  it('should handle errors', async () => {
    let failedCount = 0;
    const request = () => delay(10).then(() => Promise.reject(new Error('error')));

    const defer = createDefer<string>();

    const promise = request();

    promise.then(defer.rs, defer.rj);

    try {
      await defer.req;
    } catch (error) {
      failedCount += 1;
    }

    expect(failedCount).toBe(1);
  });

  it('case when defer failed (no corretly used)', async () => {
    let failedCount = 0;

    const request = () => delay(10).then(() => Promise.reject(new Error('error')));

    const defer = createDefer<string>();

    defer.req.catch(() => {
      failedCount += 1;
    });

    const promise = request();

    promise.then(defer.rs, defer.rj);

    try {
      // Если ждать оригинал
      // Тогда будет падение в дефере
      await promise;
    } catch (error) {
      failedCount += 1;
    }

    await delay(10);

    expect(failedCount).toBe(2);
  });
});
