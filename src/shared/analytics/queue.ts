import { createEvent, createStore, sample } from 'effector';
import { debounce } from 'patronum';

import { Item } from '@/generated/customer_hub/entities/item.v1';

import { ANALYTICS_PRODUCT_LEN_SSR } from '@/constants/analytics';

import { bridge } from '@/lib/bridge';

const TIMEOUT = 300;

type List = string;
type VisibledParams = { list: List; item: Item; page?: number };
type EnqueueParams = { list: List };

const $queue = createStore<Record<List, Item[]>>({});

export const productVisibled = createEvent<VisibledParams>();

const enqueue = createEvent<EnqueueParams>();
const enqueueDebouced = debounce({ source: enqueue, timeout: TIMEOUT });

// просмотры товаров
export const dequeue = createEvent<{ toAnalytics: Item[]; nextQueue: Record<List, Item[]>; list: List }>();

$queue
  .on(productVisibled, (queue, { list, item }) => ({ ...queue, [list]: [...new Set(queue[list] ?? []), item] }))
  .on(dequeue, (_, { nextQueue }) => nextQueue);

bridge(() => {
  sample({
    clock: productVisibled,
    target: enqueue,
  });

  // Что бы после отправки не четной пачки тригернуть
  // Еще раз отправку очереди
  sample({
    clock: dequeue,
    fn: params => {
      const firstNotEmptyGroup = Object.keys(params.nextQueue).find(key => params.nextQueue[key].length > 0);

      return { list: firstNotEmptyGroup ?? params.list };
    },
    target: enqueue,
  });
});

sample({
  source: $queue,
  clock: enqueueDebouced,
  filter: (queue, params) => queue[params?.list]?.length > 0,
  fn: (queue, { list }) => {
    const target = queue[list];
    const toShow = target.slice(0, ANALYTICS_PRODUCT_LEN_SSR);

    return {
      list,
      toAnalytics: toShow,
      nextQueue: {
        ...queue,
        [list]: target.slice(ANALYTICS_PRODUCT_LEN_SSR),
      },
    };
  },
  target: dequeue,
});
