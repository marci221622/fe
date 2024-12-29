import { $strings } from './firebase';

// copypaste from <PROTO repository>/checkout/enums/quotas.proto
// added quotes to match with GrpcError
export enum QuotaSubjects {
  'UNSPECIFIED' = 'UNSPECIFIED',
  // Превышено ограничение на кол-во активных бронирований
  'TOO_MANY_BOOKINGS' = 'TOO_MANY_BOOKINGS',
  // Превышено ограничение на кол-во позиций в заказе
  'TOO_MANY_ITEMS_IN_BOOKING' = 'TOO_MANY_ITEMS_IN_BOOKING',
  // Превышено ограничение на повторное бронирование
  'REBOOKING_PROHIBITED' = 'REBOOKING_PROHIBITED',
  // Доступно только авторизованному пользователю
  'AUTHORISATION_REQUIRED' = 'AUTHORISATION_REQUIRED',

  // Товар не доступен для примерки
  // Ошибки не связанные с one click
  'CHECKOUT_ERROR_REASON_NOT_AVAILABLE_TO_COLLECT' = 'CHECKOUT_ERROR_REASON_NOT_AVAILABLE_TO_COLLECT',
  // Товар не доступен для покупкки (только примерка)
  'CHECKOUT_ERROR_REASON_NOT_AVAILABLE_TO_BUY' = 'CHECKOUT_ERROR_REASON_NOT_AVAILABLE_TO_BUY',
}

const firebaseKeysForErrors = {
  oneClickAndCollect: {
    [QuotaSubjects.UNSPECIFIED]: '',
    [QuotaSubjects.TOO_MANY_BOOKINGS]: 'error.clickAndCollectOneClick.tooManyBookings.message',
    [QuotaSubjects.TOO_MANY_ITEMS_IN_BOOKING]: 'error.clickAndCollectOneClick.tooManyItemsInBooking.message',
    [QuotaSubjects.REBOOKING_PROHIBITED]: 'error.clickAndCollectOneClick.rebookingProhibited.message',
    [QuotaSubjects.AUTHORISATION_REQUIRED]: '',
    [QuotaSubjects.CHECKOUT_ERROR_REASON_NOT_AVAILABLE_TO_COLLECT]:
      'error.clickAndCollectOneClick.notAvailableToCollect.message',
    [QuotaSubjects.CHECKOUT_ERROR_REASON_NOT_AVAILABLE_TO_BUY]:
      'error.clickAndCollectOneClick.notAvailableToBuy.message',
  },
  multyClickAndCollect: {
    [QuotaSubjects.UNSPECIFIED]: 'error.clickAndCollectMultiitems.defaultError.message',
    [QuotaSubjects.TOO_MANY_BOOKINGS]: 'error.clickAndCollectMultiitems.tooManyBookings.message',
    [QuotaSubjects.TOO_MANY_ITEMS_IN_BOOKING]:
      'error.clickAndCollectMultiitems.tooManyItemsInBooking.messageWithFormat',
    [QuotaSubjects.REBOOKING_PROHIBITED]: 'error.clickAndCollectMultiitems.rebookingProhibited.message',
    [QuotaSubjects.AUTHORISATION_REQUIRED]: '',
    [QuotaSubjects.CHECKOUT_ERROR_REASON_NOT_AVAILABLE_TO_COLLECT]:
      'error.clickAndCollectMultiitems.notAvailableToCollect.message',
    [QuotaSubjects.CHECKOUT_ERROR_REASON_NOT_AVAILABLE_TO_BUY]: '',
  },
};

const defaultMessagesForQuotaSubjects: Record<string, string> = {
  [QuotaSubjects.UNSPECIFIED]: '',
  [QuotaSubjects.TOO_MANY_BOOKINGS]: '',
  [QuotaSubjects.TOO_MANY_ITEMS_IN_BOOKING]: '',
  [QuotaSubjects.REBOOKING_PROHIBITED]: '',
  [QuotaSubjects.AUTHORISATION_REQUIRED]: '',
  [QuotaSubjects.CHECKOUT_ERROR_REASON_NOT_AVAILABLE_TO_COLLECT]: '',
  [QuotaSubjects.CHECKOUT_ERROR_REASON_NOT_AVAILABLE_TO_BUY]: '',
};

export const $clickAndCollectGrpcErrorMessages = $strings.map(allFirebaseStrings => {
  const messages = {
    oneClickAndCollect: { ...defaultMessagesForQuotaSubjects },
    multyClickAndCollect: { ...defaultMessagesForQuotaSubjects },
  };

  const len = Object.keys(allFirebaseStrings).length;

  if (len === 0) {
    return messages;
  }

  // eslint-disable-next-line guard-for-in
  for (const errorAsString in firebaseKeysForErrors.oneClickAndCollect) {
    const typedError = errorAsString as QuotaSubjects;
    const firebaseKey = firebaseKeysForErrors.oneClickAndCollect[typedError];
    const fromFB = allFirebaseStrings[firebaseKey];

    if (firebaseKey.length > 0 && fromFB) {
      messages.oneClickAndCollect[typedError] = fromFB;
    }
  }

  // eslint-disable-next-line guard-for-in
  for (const errorAsString in firebaseKeysForErrors.multyClickAndCollect) {
    const typedError = errorAsString as QuotaSubjects;
    const firebaseKey = firebaseKeysForErrors.multyClickAndCollect[typedError];
    const fromFB = allFirebaseStrings[firebaseKey];

    if (firebaseKey.length > 0 && fromFB) {
      messages.multyClickAndCollect[typedError] = fromFB;
    }
  }

  return messages;
});
