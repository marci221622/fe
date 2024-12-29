/* eslint-disable */

export const protobufPackage = "utp.customer_hub_service.v1";

/** Экран/страница фронт-приложения */
export enum Place {
  /** PLACE_UNSPECIFIED - Не определено */
  PLACE_UNSPECIFIED = 0,
  /** PLACE_MAIN - Главный экран приложений */
  PLACE_MAIN = 1,
  /** PLACE_ITEM_DETAILS - Карточка товара */
  PLACE_ITEM_DETAILS = 3,
  /** PLACE_CART - Корзина */
  PLACE_CART = 4,
  /** PLACE_ADD_TO_CART_RESULTS - Модалка добавления товара в корзину */
  PLACE_ADD_TO_CART_RESULTS = 5,
  /** PLACE_CHECKOUT - Чекаут */
  PLACE_CHECKOUT = 6,
  /** PLACE_ITEMS_LIST - Выдача товаров */
  PLACE_ITEMS_LIST = 7,
  UNRECOGNIZED = -1,
}

export function placeFromJSON(object: any): Place {
  switch (object) {
    case 0:
    case "PLACE_UNSPECIFIED":
      return Place.PLACE_UNSPECIFIED;
    case 1:
    case "PLACE_MAIN":
      return Place.PLACE_MAIN;
    case 3:
    case "PLACE_ITEM_DETAILS":
      return Place.PLACE_ITEM_DETAILS;
    case 4:
    case "PLACE_CART":
      return Place.PLACE_CART;
    case 5:
    case "PLACE_ADD_TO_CART_RESULTS":
      return Place.PLACE_ADD_TO_CART_RESULTS;
    case 6:
    case "PLACE_CHECKOUT":
      return Place.PLACE_CHECKOUT;
    case 7:
    case "PLACE_ITEMS_LIST":
      return Place.PLACE_ITEMS_LIST;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Place.UNRECOGNIZED;
  }
}

export function placeToJSON(object: Place): string {
  switch (object) {
    case Place.PLACE_UNSPECIFIED:
      return "PLACE_UNSPECIFIED";
    case Place.PLACE_MAIN:
      return "PLACE_MAIN";
    case Place.PLACE_ITEM_DETAILS:
      return "PLACE_ITEM_DETAILS";
    case Place.PLACE_CART:
      return "PLACE_CART";
    case Place.PLACE_ADD_TO_CART_RESULTS:
      return "PLACE_ADD_TO_CART_RESULTS";
    case Place.PLACE_CHECKOUT:
      return "PLACE_CHECKOUT";
    case Place.PLACE_ITEMS_LIST:
      return "PLACE_ITEMS_LIST";
    case Place.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
