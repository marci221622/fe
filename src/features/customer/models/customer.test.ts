import { allSettled, fork } from 'effector';

import { UserData } from '@/generated/customer_hub/entities/user_data.v1';
import { TokenResponse } from '@/generated/customer_hub/methods/auth/auth_by_code.v1';
import { CustomerProfileResponse } from '@/generated/customer_hub/methods/customer/get_customer_profile.v1';
import { baseRequestFx } from '@/shared/request';
import { $session, setSession } from '@/shared/session';
import { $isServer, appStarted } from '@/shared/start';

import { watchEffect } from '../../../tests/index';

import { customerQuery } from './customer';

const defaulCustomer = UserData.create({});

describe('features/customer', () => {
  it('customer should fetch on appstarted', async () => {
    const scope = fork({
      values: new Map()
        .set($isServer, false)
        .set($session, { refreshToken: 'refreshToken', accessToken: 'accessToken' }),
      handlers: new Map().set(baseRequestFx, () => 'done'),
    });

    const fxWatcher = watchEffect(customerQuery.fx, scope);

    await allSettled(appStarted, { scope, params: {} });

    expect(fxWatcher.listeners.onCall).toHaveBeenCalledTimes(1);
  });

  it('customer not be fetched on setsession (set from params)', async () => {
    const scope = fork({
      values: new Map()
        .set($isServer, false)
        .set($session, { refreshToken: 'refreshToken', accessToken: 'accessToken' }),
      handlers: new Map().set(baseRequestFx, () => 'done'),
    });

    const fxWatcher = watchEffect(customerQuery.fx, scope);

    await allSettled(setSession, {
      scope,
      params: TokenResponse.create({
        refreshToken: 'refreshToken',
        accessToken: 'accessToken',
        customerProfile: defaulCustomer,
      }),
    });

    expect(fxWatcher.listeners.onCall).toHaveBeenCalledTimes(0);
    expect(scope.getState(customerQuery.$result)).toEqual(CustomerProfileResponse.create({}));
  });
});
