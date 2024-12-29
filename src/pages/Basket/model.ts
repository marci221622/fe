import { createEffect, sample } from 'effector';
import { noop } from 'lodash';

import { CheckoutType } from '@/generated/customer_hub/enums/checkout_type';
import { AB_TESTS, ABtest, isVariationA } from '@/shared/configs/abTests';
import { createHooks, loaded } from '@/shared/pageRouting';

import { paths } from '@/constants/paths';

import { logged } from '@/features/auth';
import { checkout, basketAnalytics, cardPayment, switchCheckoutType, isUsualCheckoutData } from '@/features/basket';
import { additionalTitle } from '@/features/header';

import { analytics, bridge } from '@/lib/bridge';
import { setRedirect } from '@/lib/redirect';

export const pageHooks = createHooks({ pagename: 'BasketPage', injectDYOther: false });

const mainFx = createEffect(
  async ({ ctrl, variant }: { ctrl: AbortController; onNavigate?: boolean; variant?: ABtest }) => {
    if (!variant || isVariationA(variant)) {
      // https://jira.int.tsum.com/browse/POWEB-677
      // Временный костыль для того что бы работала корзина после мультиклика с ios
      // По идее нужно будет далее подумать над тем что вообще делать с чекаутом
      // Свич не нужен будет после доработок (он только для явного переключения пригодится)
      await switchCheckoutType({ body: { type: CheckoutType.CHECKOUT_TYPE_USUAL_UNSPECIFIED } }).catch(noop);
    }

    const rs = await checkout.cartQuery.fx([{}, ctrl]);

    return rs;
  },
);

bridge(() => {
  sample({
    source: AB_TESTS.$multiClickAndCollect,
    clock: pageHooks.enterGuarded,
    fn: (variant, { ctrl }) => {
      return {
        variant,
        ctrl: ctrl ?? new AbortController(),
        onNavigate: true,
      };
    },
    target: mainFx,
  });

  sample({
    source: AB_TESTS.$multiClickAndCollect,
    clock: logged,
    filter: pageHooks.$onPage,
    fn: variant => ({
      variant,
      ctrl: new AbortController(),
    }),
    target: mainFx,
  });
});

bridge(() => {
  sample({
    clock: pageHooks.loadedGuarded,
    fn: () => ({ type: 'text' as const, rows: ['Корзина'] }),
    target: additionalTitle.change,
  });

  // Отправляем на спасибо после заказа обычного
  // или мульти клика
  sample({
    clock: cardPayment.paymentSuccess,
    filter: data => !!data.orderCode && isUsualCheckoutData(data.data),
    fn: data => paths.typ({ orderCode: data.orderCode!.trim().replace(' ', '') }),
    target: setRedirect,
  });
});

loaded({
  effect: mainFx,
  hooks: pageHooks,
  condition: params => !!params.onNavigate,
});

analytics(() => {
  sample({
    source: checkout.cartQuery.$result,
    clock: pageHooks.loadedGuarded,
    fn: cart => cart?.cartData?.items ?? [],
    target: basketAnalytics.checkoutLoaded,
  });
});
