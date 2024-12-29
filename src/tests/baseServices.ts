import { noop } from 'lodash';

import { CookieServiceFactory } from '@/lib/services';

export const createTestBaseServices = (isTest = process.env.NODE_ENV === 'test') => {
  const mocks = isTest ? { set: jest.fn(), get: jest.fn() } : { set: noop, get: noop };
  const fetchMock = isTest ? jest.fn().mockImplementation(() => Promise.resolve('{}')) : () => Promise.resolve('{}');

  class Firebase {
    fetchConfig = fetchMock;
  }

  return {
    cookiesMocks: mocks as { set: jest.Mock<any, any, any>; get: jest.Mock<any, any, any> },
    services: {
      cookies: new CookieServiceFactory(mocks),
      firebase: new Firebase(),
    },
  };
};
