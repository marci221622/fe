import { combine, createEvent, createStore, Effect } from 'effector';

import { GrpcWebError } from '@/generated/customer_hub/customer-hub-service';
import { CheckoutData } from '@/generated/customer_hub/entities/checkout_data.v1';
import { RequestParams } from '@/shared/request';

import { createQuery, FxParams } from '@/lib/createQuery';

type Props = {
  fx: Effect<Omit<RequestParams<'FindCheckout'>['body'], 'method' | 'mock'>, CheckoutData, GrpcWebError>;
};

type Temporary = {
  removed: string[];
  selected: { id: string; selected: boolean }[];
  selectedInProgress: string[];
};

// eslint-disable-next-line no-use-before-define -- специально расчёт на hoisting, так код нагляднее и эргономичнее
export type BaseCartFactoryResult = ReturnType<typeof createBaseCart>;

const initialPrice = { currency: 'RUB', withDiscount: 0, original: 0 };

// Базовый набор стейтов и ивентов для оперирования айтемами в корзине
export function createBaseCart({ fx }: Props) {
  // Пролема всплыла
  // ЗАпросы не в порядке очереди обрабатывает бек
  // Отсюда не верный каунтер на цифре заказа при оплате в виджете клаудов
  // После любого тугла - применяется стейт и чистится селектед поле
  // Так как уже бек даст стейт
  // Вариант убирать от ответа от бека не поркатит
  // Потому что в мутациях нету гарантированного порядка
  // При быстром переключении в любом случае можно поймать момент не правильно
  // Выставленного селека
  // 1) верно на клиенте, не верно цена
  // 2) верная цена, но не верное поведение на ui (что то выставляется кливо по селектам)
  const clearSelected = createEvent<void>();

  const $temporaryState = createStore<Temporary>({
    removed: [],
    // Фактически для одного раза
    // Запрос - ui покрасили
    // Ответ от запроса - скинули
    selected: [],
    // Что бы не давать подрят снимать и ставить селект
    // На фронте храним те иды которые пошли на сервер
    selectedInProgress: [],
  });

  const cartQuery = createQuery({
    initialData: null,
    // onNavigate - так можно понять в какой момент вызывали
    // По переходу или какой то другой триггер
    handler: async ([_, ctrl]: FxParams<{ onNavigate?: string }>) => {
      const rs = await fx({
        body: {},
        signal: ctrl.signal,
      });

      return rs;
    },
  });

  const $cartPending = cartQuery.$pending;
  const $cartData = cartQuery.$result.map(cart => cart?.cartData ?? null);

  const $cartNotLoaded = cartQuery.$result.map(cart => cart === null);
  const $filteredCartItems = combine({ statuses: $temporaryState, cart: $cartData }).map(({ statuses, cart }) =>
    cart
      ? cart.items
          .filter(it => !statuses.removed.find(removed => removed === it.id))
          .map(it => {
            const selectedItem = statuses.selected.find(selected => selected.id === it.id);

            if (selectedItem) {
              return {
                ...it,
                selected: selectedItem.selected,
              };
            }

            return it;
          })
      : [],
  );

  const $existedProducts = $filteredCartItems.map(list => list?.filter(item => +(item.item?.quantity ?? 0) > 0) ?? []);
  const $notExistedProducts = $filteredCartItems.map(
    list => list?.filter(item => +(item.item?.quantity ?? 0) === 0) ?? [],
  );
  const $notSelectedProducts = $existedProducts.map(list => list.filter(item => !item.selected));
  const $hasNoSelectedItems = $notSelectedProducts.map(list => list.length > 0);
  const $selectedProductsCounter = $existedProducts.map(list => list.filter(item => item.selected).length);
  // Нужно что бы выделить товар (если он остался последний и не выделенный)
  const $lastExistedItemNotSelected = $existedProducts.map(list => list.length === 1 && !list[0].selected);

  const $cartCounter = $existedProducts.map(cartData => {
    const counter = cartData.length;

    if (counter === 0) {
      return null;
    }

    return counter < 100 ? `${counter}` : `99+`;
  });

  const $cartPrice = $existedProducts.map(items => {
    return items
      ?.filter(it => it.selected)
      ?.reduce(
        (acc, it) => ({
          ...acc,
          original: acc.original + Number(it.item?.itemOffers[0]?.price?.units) || 0,
          withDiscount: acc.withDiscount + Number(it.finalPrice?.units) || 0,
        }),
        initialPrice,
      );
  });

  const $discount = $existedProducts.map(items => {
    const price = items?.reduce(
      (acc, it) => ({
        ...acc,
        original: acc.original + Number(it.price?.units) || 0,
        withDiscount: acc.withDiscount + Number(it.finalPrice?.units) || 0,
      }),
      initialPrice,
    );

    return { currency: price.currency, sum: (price.original ?? 0) - (price.withDiscount ?? 0) };
  });

  const $deliveryData = cartQuery.$result.map(it => it?.deliveryData ?? null);

  const $totalPayable = combine({ cartPrice: $cartPrice, deliveryData: $deliveryData }).map(
    ({ cartPrice, deliveryData }) => {
      const service = deliveryData?.selectedDeliveries[0]?.serviceItem;

      return +(cartPrice?.withDiscount ?? cartPrice?.original ?? 0) + +(service?.price?.units ?? 0);
    },
  );

  const $currency = $cartPrice.map(price => price?.currency);

  const $cartActivePromocode = $cartData.map(
    cartData => cartData?.privileges?.find(it => it.promoCode)?.promoCode ?? '',
  );

  const $cartBySelectedCounter = $existedProducts.map(items => items?.filter(it => it.selected)?.length ?? 0);

  $temporaryState.on(clearSelected, state => ({ ...state, selected: [] })).reset(cartQuery.fx.doneData);

  return {
    $notSelectedProducts,
    $selectedProductsCounter,
    $cartCounter,
    $cartNotLoaded,
    $cartPending,
    $cartPrice,
    $totalPayable,
    $currency,
    $discount,
    $temporaryState,
    $filteredCartItems,
    $deliveryData,
    $existedProducts,
    $notExistedProducts,
    $cartActivePromocode,
    $lastExistedItemNotSelected,
    $hasNoSelectedItems,
    cartQuery,
    clearSelected,
    $cartBySelectedCounter,
  };
}
