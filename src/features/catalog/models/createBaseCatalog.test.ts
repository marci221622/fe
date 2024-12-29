import { allSettled, fork, sample } from 'effector';
import { Action } from 'history';

import { Item } from '@/generated/customer_hub/entities/item.v1';
import { Slug } from '@/generated/customer_hub/entities/slug.v1';
import { Section } from '@/generated/customer_hub/enums/section';
import { GetItemsResponse } from '@/generated/customer_hub/methods/catalog/get_items.v1';
import { createHooks } from '@/shared/pageRouting';
import { baseRequestFx } from '@/shared/request';

import { MINUTES5 } from '@/constants/days';

import { createField } from '@/lib/createField';

import { watchEffect } from '../../../tests/index';

import { buildKey, createBaseCatalog, prepareParamsToRequest } from './createBaseCatalog';

const results: Record<string, GetItemsResponse> = {
  slug1: GetItemsResponse.create({
    header: {
      collection: { slug: 'slug1' },
    },
    items: [Item.create({ code: 'code1', title: 'item1' })],
  }),
  slug2: GetItemsResponse.create({
    header: {
      collection: { slug: 'slug2' },
    },
    items: [Item.create({ code: 'code2', title: 'item2' })],
  }),
  slug3: GetItemsResponse.create({
    header: {
      collection: { slug: 'slug3' },
    },
    items: [Item.create({ code: 'code3', title: 'item3' })],
  }),
};

describe('catalog/createBaseCatalog', () => {
  const RealDate = Date.now;

  beforeAll(() => {
    global.Date.now = jest.fn(() => 10);
  });

  afterAll(() => {
    global.Date.now = RealDate;
  });

  it('should works correctly', async () => {
    const scope = fork({
      handlers: new Map().set(
        baseRequestFx,
        (_: any, { params }: { params: { body: ReturnType<typeof prepareParamsToRequest> } }) => {
          return results[buildKey(params.body.searchParams)];
        },
      ),
    });

    const baseFxWarchers = watchEffect(baseRequestFx, scope);

    const slugField = createField(Slug.create({ slug: 'slug1' }));

    const $catalogParams = slugField.$value.map(slug =>
      prepareParamsToRequest(
        {
          url: '/',
          slug,
        },
        { gender: Section.SECTION_FEMALE },
      ),
    );

    const pageHooks = createHooks({ pagename: 'CatalogPage' });

    const catalog = createBaseCatalog({
      $params: $catalogParams,
      hooks: pageHooks,
      getKey: params => buildKey(params) || 'test',
    });

    sample({
      source: $catalogParams,
      clock: pageHooks.enterGuarded,
      fn: (params, { navType, query }) => {
        return { ...params, navType, query };
      },
      target: catalog.query.start,
    });

    await allSettled(pageHooks.enter, { scope, params: { url: '/' } });

    expect(scope.getState(catalog.$products)).toEqual(results.slug1.items);
    expect(scope.getState(catalog.$header)).toEqual(results.slug1.header);
    expect(catalog.__.memory.inMemoryCache).toEqual({
      slug1: { data: { ...results.slug1, filters: {} }, lastUpdate: 10 + MINUTES5 * 1000 },
    });
    expect(baseFxWarchers.listeners.onCall).toHaveBeenCalledTimes(1);

    await allSettled(slugField.change, { scope, params: Slug.create({ slug: 'slug2' }) });
    await allSettled(pageHooks.enter, { scope, params: { url: '/' } });

    expect(scope.getState(catalog.$products)).toEqual(results.slug2.items);
    expect(scope.getState(catalog.$header)).toEqual(results.slug2.header);
    expect(catalog.__.memory.inMemoryCache).toEqual({
      slug1: { data: { ...results.slug1, filters: {} }, lastUpdate: 10 + MINUTES5 * 1000 },
      slug2: { data: { ...results.slug2, filters: {} }, lastUpdate: 10 + MINUTES5 * 1000 },
    });
    expect(baseFxWarchers.listeners.onCall).toHaveBeenCalledTimes(2);

    // Переход с Action POP на слаг 1
    // Данные из memory cache
    await allSettled(pageHooks.enter, { scope, params: { url: '/', navType: Action.Pop } });

    expect(scope.getState(catalog.$products)).toEqual(results.slug2.items);
    expect(scope.getState(catalog.$header)).toEqual(results.slug2.header);
    expect(catalog.__.memory.inMemoryCache).toEqual({
      slug1: { data: { ...results.slug1, filters: {} }, lastUpdate: 10 + MINUTES5 * 1000 },
      slug2: { data: { ...results.slug2, filters: {} }, lastUpdate: 10 + MINUTES5 * 1000 },
    });
    expect(baseFxWarchers.listeners.onCall).toHaveBeenCalledTimes(2);

    // Покидаем страницу
    // leave не скидывает стейт!
    await allSettled(pageHooks.leave, { scope });
    // Скинуть результат
    await allSettled(catalog.query.reset, { scope });

    expect(scope.getState(catalog.$products)).toEqual([]);
    expect(scope.getState(catalog.$header)).toEqual(null);
    expect(catalog.__.memory.inMemoryCache).toEqual({
      slug1: { data: { ...results.slug1, filters: {} }, lastUpdate: 10 + MINUTES5 * 1000 },
      slug2: { data: { ...results.slug2, filters: {} }, lastUpdate: 10 + MINUTES5 * 1000 },
    });
    expect(baseFxWarchers.listeners.onCall).toHaveBeenCalledTimes(2);

    // Еще раз на слаг 2 заходим, но уже с PUsh
    await allSettled(pageHooks.enter, { scope, params: { url: '/', navType: Action.Push } });

    expect(scope.getState(catalog.$products)).toEqual(results.slug2.items);
    expect(scope.getState(catalog.$header)).toEqual(results.slug2.header);
    expect(catalog.__.memory.inMemoryCache).toEqual({
      slug1: { data: { ...results.slug1, filters: {} }, lastUpdate: 10 + MINUTES5 * 1000 },
      slug2: { data: { ...results.slug2, filters: {} }, lastUpdate: 10 + MINUTES5 * 1000 },
    });
    expect(baseFxWarchers.listeners.onCall).toHaveBeenCalledTimes(3);
  });
});
