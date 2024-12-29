import axios, { AxiosInstance } from 'axios';
import { attach, createStore, Store } from 'effector';
import { useUnit } from 'effector-react';

import { CustomerHubService, CustomerHubServiceClientImpl } from '@/generated/customer_hub/customer-hub-service';

import { runtimeConfig } from '@/constants/runtimeConfig';

import { GrpcPreownedClient } from '@/lib/grpc';

import { CookieServiceFactory, ICookieService } from './cookies';
import { Firebase } from './firebase';

export type BaseServices = {
  api?: { mindbox: AxiosInstance };
  cookies: CookieServiceFactory;
  grpc: {
    client: GrpcPreownedClient;
    hub: CustomerHubService;
  };
  firebase?: Firebase;
};

export function createBaseServices({
  cookies,
  grpc,
  firebase,
}: {
  cookies: ICookieService;
  grpc: GrpcPreownedClient;
  firebase?: Firebase;
}): BaseServices {
  return {
    api: {
      mindbox: axios.create({
        baseURL: `https://api.mindbox.ru/v3`,
        withCredentials: false,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
          Authorization: `Mindbox secretKey="${runtimeConfig.MINDBOX_API_KEY}"`,
        },
      }),
    },
    grpc: {
      client: grpc,
      hub: new CustomerHubServiceClientImpl(grpc),
    },
    cookies: new CookieServiceFactory(cookies),
    firebase,
  };
}

export const $baseServices = createStore<BaseServices | null>(null, { serialize: 'ignore' });

export function createFx<Params, Done>(handler: (params: Params, services: BaseServices) => Promise<Done> | Done) {
  return attach({
    source: $baseServices as Store<BaseServices>,
    effect: (services, params: Params) => handler(params, services),
  });
}

export function useBaseServices() {
  const services = useUnit($baseServices);

  return services;
}
