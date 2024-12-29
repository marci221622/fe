import { act, renderHook } from '@testing-library/react-hooks';

import { delay } from '@/lib/delay';

import { LOADING_STATUS } from './types';
import { useRequest } from './useRequest';

describe('useRequest', () => {
  it('should have a useRequest hook', () => {
    expect(useRequest).toBeDefined();
  });

  const successData = 'success';
  const errors = [{ email: 'invalid email' }, { phone: 'invalid phone' }];

  const mockFnResolve = jest.fn().mockImplementation(() => Promise.resolve(successData));
  // eslint-disable-next-line prefer-promise-reject-errors
  const mockFnReject = jest.fn().mockImplementation(() => Promise.reject(errors));

  it('should return a valid value after call', async () => {
    const { result } = renderHook(options => useRequest(options), {
      initialProps: {
        request: mockFnResolve,
      },
    });

    const [{ request }, { status }] = result.current;

    expect(status).toBe(LOADING_STATUS.initial);

    await act(async () => {
      await request({});
    });

    const [, state] = result.current;

    expect(state.data).toBe(successData);
    expect(state.status).toBe(LOADING_STATUS.ready);
    expect(state.error).toBe(null);
  });

  it('should return an error on reject', async () => {
    const { result } = renderHook(options => useRequest(options), {
      initialProps: {
        request: mockFnReject,
      },
    });

    const [{ request }, { status }] = result.current;

    expect(status).toBe(LOADING_STATUS.initial);

    await act(async () => {
      await request({});
    });

    const [, state] = result.current;

    expect(state.error).toBe(errors);
    expect(state.status).toBe(LOADING_STATUS.failed);
  });

  it('should abort previous request', async () => {
    const { result } = renderHook(options => useRequest(options), {
      initialProps: {
        request: () => delay(4000),
      },
    });

    const abortSpy = jest.spyOn(AbortController.prototype, 'abort');

    const [{ request }] = result.current;

    act(() => {
      request({});
    });

    expect(abortSpy).toHaveBeenCalledTimes(0);

    act(() => {
      request({});
    });

    expect(abortSpy).toHaveBeenCalledTimes(1);
  });

  it('should call onRejected', async () => {
    const error = new Error('some_msg');
    const onRejected = jest.fn();

    const { result, waitForNextUpdate } = renderHook(() =>
      useRequest({
        request: () => Promise.reject(error),
        onRejected,
      }),
    );

    const [{ request }] = result.current;

    act(() => {
      request({});
    });

    await waitForNextUpdate();

    const state = result.current[1];

    expect(state.error).toBe(error);
  });

  it('should call onFulFilled', async () => {
    const onFulFilled = jest.fn();

    const { result, waitForNextUpdate } = renderHook(() =>
      useRequest({
        request: () => Promise.resolve('result'),
        onFulFilled,
      }),
    );

    const [{ request }] = result.current;

    act(() => {
      request({});
    });

    await waitForNextUpdate();

    const state = result.current[1];

    expect(state.data).toBe('result');
  });
});
