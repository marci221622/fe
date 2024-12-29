import { createStore, Event, sample, Store } from 'effector';
import { every } from 'patronum/macro';

import { GrpcWebError } from '@/generated/customer_hub/customer-hub-service';
import { $isClient } from '@/shared/start';

import { createQuery } from './createQuery';

type Options<Params> = {
  triggers: Event<any>[];
  source?: Store<Params>;
  if: Store<boolean>;
};

// Перезапросит кверю по каким то тригерам
export function keepFresh<Params, Result, Err = GrpcWebError>(
  query: ReturnType<typeof createQuery<Params, Result, Err>>,
  { source = createStore({} as any), ...options }: Options<Params>,
) {
  sample({
    source,
    clock: options.triggers,
    filter: every({ stores: [options.if, $isClient], predicate: Boolean }),
    fn: params => ({ ...params, ctrl: undefined }),
    target: query.start,
  });
}
