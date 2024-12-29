import * as ErrorDetailsPb from '@/generated/common/error_details.v1';
import { CartItem } from '@/generated/customer_hub/entities/cart.v1';
import { CheckoutData } from '@/generated/customer_hub/entities/checkout_data.v1';
import { CheckoutType } from '@/generated/customer_hub/enums/checkout_type';
import * as detailsError from '@/lib/services/grpc-web-details';

import { digestPhone, phoneIsValid } from '@/lib/string';

export type TypedErros =
  | {
      type: 'localized';
      error: ErrorDetailsPb.LocalizedMessage;
    }
  | {
      type: 'info';
      error: ErrorDetailsPb.ErrorInfo;
    }
  | {
      type: 'quota';
      error: ErrorDetailsPb.QuotaFailure;
    };

export const isOneClickCheckoutData = (data: CheckoutData) =>
  data.meta?.type === CheckoutType.CHECKOUT_TYPE_CLICK_AND_COLLECT_ONE_CLICK;

export const isQuickByCheckoutData = (data: CheckoutData) => data.meta?.type === CheckoutType.CHECKOUT_TYPE_ONE_CLICK;

export const isUsualCheckoutData = (data: CheckoutData) =>
  data.meta?.type === CheckoutType.CHECKOUT_TYPE_USUAL_UNSPECIFIED;

export const isMultyClickCheckoutData = (data: CheckoutData) =>
  data.meta?.type === CheckoutType.CHECKOUT_TYPE_CLICK_AND_COLLECT;

export function recipientValidation(scheme: Record<string, string>, type: string) {
  switch (type) {
    case 'phone':
      return phoneIsValid(digestPhone(scheme[type]));
    case 'address':
    case 'name':
      return !!scheme[type];
    default:
      return false;
  }
}

export function needToResolveDelivery(cart: CheckoutData) {
  return (
    !!cart.deliveryData?.destination &&
    (cart?.cartData?.items?.filter(item => +(item.item?.quantity ?? 0) > 0 && item.selected).length ?? 0) > 0
  );
}

// https://jira.int.tsum.com/browse/POWEB-514
// Условий пачка
export function getPriceFromCartItem(cart: CartItem) {
  const tsumPrice = cart.item?.tsumPrice;
  const finalPrice = cart.finalPrice;
  const price = cart.price;

  const currency = tsumPrice?.currencyCode ?? finalPrice?.currencyCode ?? price?.currencyCode;

  if (tsumPrice && finalPrice) {
    return {
      withDiscount: +finalPrice.units,
      original: +tsumPrice.units,
      currency,
    };
  }

  if (!tsumPrice && finalPrice && price && finalPrice?.units !== price?.units) {
    return {
      original: +price.units,
      withDiscount: +finalPrice.units,
      currency,
    };
  }

  if (!tsumPrice && finalPrice && price && finalPrice?.units === price?.units) {
    return {
      original: +finalPrice.units,
      currency,
    };
  }

  return {
    withDiscount: cart.item?.tsumPrice?.units ? Number(cart.item.tsumPrice.units) : undefined,
    original: cart?.price?.units ? Number(cart?.price?.units) : undefined,
    currency,
    revert: true,
  };
}

export function parseGrpcErrors(meta: detailsError.GrpcErrorDetails) {
  const [_, details] = meta;
  const typesErrors = [] as TypedErros[];

  if (details) {
    for (let i = 0; i < details.length; i++) {
      // @ts-ignore
      if (details[i].locale) {
        typesErrors.push({ type: 'localized', error: details[i] as ErrorDetailsPb.LocalizedMessage });
      }

      // @ts-ignore
      if (details[i].violations) {
        typesErrors.push({ type: 'quota', error: details[i] as ErrorDetailsPb.QuotaFailure });
      }

      // @ts-ignore
      if (details[i].reason && details[i].metadata) {
        typesErrors.push({ type: 'info', error: details[i] as ErrorDetailsPb.ErrorInfo });
      }
    }
  }

  return typesErrors;
}

export const clickAndCollectErrors = {
  parse: (errors: TypedErros[]) => {
    const ref = { limit: '', subject: '', productIds: [] as string[] };

    for (let i = 0; i < errors.length; i++) {
      const error = errors[i];

      if (error.type === 'info') {
        ref.limit = error.error.metadata.limit ?? ref.limit;
        ref.productIds =
          (error.error.metadata.cart_item_ids?.slice(0, -1)?.slice(1)?.split(' ') as string[]) ?? ref.productIds;
        ref.subject = error.error.reason ?? ref.subject;
      }

      if (error.type === 'quota' && error.error.violations) {
        ref.subject = error.error.violations[0]?.subject ?? '';
      }
    }

    return ref;
  },
};
