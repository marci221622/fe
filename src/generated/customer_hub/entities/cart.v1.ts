/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Image } from "../../common/image.v1";
import { Money } from "../../common/money.v1";
import { AvailableAction, availableActionFromJSON, availableActionToJSON } from "../enums/item";
import { Brand } from "./brand.v1";
import { AttributesGroup, Item } from "./item.v1";
import { Label } from "./label.v1";
import { Size } from "./size.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Описывает привилегии пользователя, за которые ему могут быть начислены скидки */
export interface CustomerPrivileges {
  /** Промокод */
  promoCode: string;
}

/** Описывает состояние корзины */
export interface CartState {
  /** Набор позиций корзины */
  items: CartItem[];
  /** Сводная информация по корзине */
  cartMeta:
    | CartMeta
    | undefined;
  /** Применённые промокоды/бонусы/пр. */
  privileges: CustomerPrivileges[];
}

/** Описывает сводную информацию по корзине */
export interface CartMeta {
  /** Общее кол-во позиций в корзине */
  itemsCount: string;
  /** Общая стоимость товаров в корзине */
  sum: string;
  /** Общая стоимость с учетом скидок товаров в корзине */
  sumWithDiscount: string;
}

/** Начисленные скидки для позиции корзины */
export interface CartItemPrivileges {
  /** Идентификатор транзакции программы лояльности */
  loyaltyTransactionId: string;
  /** Сумма скидки по программе */
  amount: Money | undefined;
}

/** Описывает позицию корзины */
export interface CartItem {
  /** Идентификатор позиции корзины */
  id: string;
  /** Код оффера */
  offerCode: string;
  /** Цена товара в корзине (например, на момент добавления в корзину) */
  price:
    | Money
    | undefined;
  /** Цена с учетом всех скидок в корзине */
  finalPrice:
    | Money
    | undefined;
  /** Флаг выбора для оформления заказа */
  selected: boolean;
  /** Данные по скидке на позицию */
  privileges: CartItemPrivileges[];
  /** Модель товара */
  item:
    | Item
    | undefined;
  /**
   * Размер скидки в процентах (целое число), например: 20
   * Содержит итоговый процент скидки на товар с учетом всех скидок
   */
  discountPercent?:
    | number
    | undefined;
  /**
   * @exclude deprecated at 25.10.2023, delete after 01.12.2023
   *
   * @deprecated
   */
  stockQuantity: number;
  /** @deprecated */
  favorite: boolean;
  /** @deprecated */
  title: string;
  /** @deprecated */
  brand:
    | Brand
    | undefined;
  /** @deprecated */
  size:
    | Size
    | undefined;
  /** @deprecated */
  image:
    | Image
    | undefined;
  /** @deprecated */
  itemCode: string;
  /** @deprecated */
  tsumPrice?:
    | Money
    | undefined;
  /** @deprecated */
  isUsed?:
    | boolean
    | undefined;
  /** @deprecated */
  labels: Label[];
  /** @deprecated */
  availableToCollect: boolean;
  /** @deprecated */
  attributesGroups: AttributesGroup[];
  /** @deprecated */
  availableActions: AvailableAction[];
}

function createBaseCustomerPrivileges(): CustomerPrivileges {
  return { promoCode: "" };
}

export const CustomerPrivileges = {
  encode(message: CustomerPrivileges, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.promoCode !== "") {
      writer.uint32(10).string(message.promoCode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CustomerPrivileges {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCustomerPrivileges();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.promoCode = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CustomerPrivileges {
    return { promoCode: isSet(object.promoCode) ? globalThis.String(object.promoCode) : "" };
  },

  toJSON(message: CustomerPrivileges): unknown {
    const obj: any = {};
    if (message.promoCode !== "") {
      obj.promoCode = message.promoCode;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CustomerPrivileges>, I>>(base?: I): CustomerPrivileges {
    return CustomerPrivileges.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CustomerPrivileges>, I>>(object: I): CustomerPrivileges {
    const message = createBaseCustomerPrivileges();
    message.promoCode = object.promoCode ?? "";
    return message;
  },
};

function createBaseCartState(): CartState {
  return { items: [], cartMeta: undefined, privileges: [] };
}

export const CartState = {
  encode(message: CartState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.items) {
      CartItem.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.cartMeta !== undefined) {
      CartMeta.encode(message.cartMeta, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.privileges) {
      CustomerPrivileges.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CartState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCartState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.items.push(CartItem.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.cartMeta = CartMeta.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.privileges.push(CustomerPrivileges.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CartState {
    return {
      items: globalThis.Array.isArray(object?.items) ? object.items.map((e: any) => CartItem.fromJSON(e)) : [],
      cartMeta: isSet(object.cartMeta) ? CartMeta.fromJSON(object.cartMeta) : undefined,
      privileges: globalThis.Array.isArray(object?.privileges)
        ? object.privileges.map((e: any) => CustomerPrivileges.fromJSON(e))
        : [],
    };
  },

  toJSON(message: CartState): unknown {
    const obj: any = {};
    if (message.items?.length) {
      obj.items = message.items.map((e) => CartItem.toJSON(e));
    }
    if (message.cartMeta !== undefined) {
      obj.cartMeta = CartMeta.toJSON(message.cartMeta);
    }
    if (message.privileges?.length) {
      obj.privileges = message.privileges.map((e) => CustomerPrivileges.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CartState>, I>>(base?: I): CartState {
    return CartState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CartState>, I>>(object: I): CartState {
    const message = createBaseCartState();
    message.items = object.items?.map((e) => CartItem.fromPartial(e)) || [];
    message.cartMeta = (object.cartMeta !== undefined && object.cartMeta !== null)
      ? CartMeta.fromPartial(object.cartMeta)
      : undefined;
    message.privileges = object.privileges?.map((e) => CustomerPrivileges.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCartMeta(): CartMeta {
  return { itemsCount: "0", sum: "0", sumWithDiscount: "0" };
}

export const CartMeta = {
  encode(message: CartMeta, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.itemsCount !== "0") {
      writer.uint32(8).int64(message.itemsCount);
    }
    if (message.sum !== "0") {
      writer.uint32(16).int64(message.sum);
    }
    if (message.sumWithDiscount !== "0") {
      writer.uint32(24).int64(message.sumWithDiscount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CartMeta {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCartMeta();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.itemsCount = longToString(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.sum = longToString(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.sumWithDiscount = longToString(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CartMeta {
    return {
      itemsCount: isSet(object.itemsCount) ? globalThis.String(object.itemsCount) : "0",
      sum: isSet(object.sum) ? globalThis.String(object.sum) : "0",
      sumWithDiscount: isSet(object.sumWithDiscount) ? globalThis.String(object.sumWithDiscount) : "0",
    };
  },

  toJSON(message: CartMeta): unknown {
    const obj: any = {};
    if (message.itemsCount !== "0") {
      obj.itemsCount = message.itemsCount;
    }
    if (message.sum !== "0") {
      obj.sum = message.sum;
    }
    if (message.sumWithDiscount !== "0") {
      obj.sumWithDiscount = message.sumWithDiscount;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CartMeta>, I>>(base?: I): CartMeta {
    return CartMeta.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CartMeta>, I>>(object: I): CartMeta {
    const message = createBaseCartMeta();
    message.itemsCount = object.itemsCount ?? "0";
    message.sum = object.sum ?? "0";
    message.sumWithDiscount = object.sumWithDiscount ?? "0";
    return message;
  },
};

function createBaseCartItemPrivileges(): CartItemPrivileges {
  return { loyaltyTransactionId: "", amount: undefined };
}

export const CartItemPrivileges = {
  encode(message: CartItemPrivileges, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.loyaltyTransactionId !== "") {
      writer.uint32(10).string(message.loyaltyTransactionId);
    }
    if (message.amount !== undefined) {
      Money.encode(message.amount, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CartItemPrivileges {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCartItemPrivileges();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.loyaltyTransactionId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.amount = Money.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CartItemPrivileges {
    return {
      loyaltyTransactionId: isSet(object.loyaltyTransactionId) ? globalThis.String(object.loyaltyTransactionId) : "",
      amount: isSet(object.amount) ? Money.fromJSON(object.amount) : undefined,
    };
  },

  toJSON(message: CartItemPrivileges): unknown {
    const obj: any = {};
    if (message.loyaltyTransactionId !== "") {
      obj.loyaltyTransactionId = message.loyaltyTransactionId;
    }
    if (message.amount !== undefined) {
      obj.amount = Money.toJSON(message.amount);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CartItemPrivileges>, I>>(base?: I): CartItemPrivileges {
    return CartItemPrivileges.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CartItemPrivileges>, I>>(object: I): CartItemPrivileges {
    const message = createBaseCartItemPrivileges();
    message.loyaltyTransactionId = object.loyaltyTransactionId ?? "";
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Money.fromPartial(object.amount)
      : undefined;
    return message;
  },
};

function createBaseCartItem(): CartItem {
  return {
    id: "",
    offerCode: "",
    price: undefined,
    finalPrice: undefined,
    selected: false,
    privileges: [],
    item: undefined,
    discountPercent: undefined,
    stockQuantity: 0,
    favorite: false,
    title: "",
    brand: undefined,
    size: undefined,
    image: undefined,
    itemCode: "",
    tsumPrice: undefined,
    isUsed: undefined,
    labels: [],
    availableToCollect: false,
    attributesGroups: [],
    availableActions: [],
  };
}

export const CartItem = {
  encode(message: CartItem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.offerCode !== "") {
      writer.uint32(18).string(message.offerCode);
    }
    if (message.price !== undefined) {
      Money.encode(message.price, writer.uint32(26).fork()).ldelim();
    }
    if (message.finalPrice !== undefined) {
      Money.encode(message.finalPrice, writer.uint32(34).fork()).ldelim();
    }
    if (message.selected === true) {
      writer.uint32(48).bool(message.selected);
    }
    for (const v of message.privileges) {
      CartItemPrivileges.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    if (message.item !== undefined) {
      Item.encode(message.item, writer.uint32(170).fork()).ldelim();
    }
    if (message.discountPercent !== undefined) {
      writer.uint32(176).int32(message.discountPercent);
    }
    if (message.stockQuantity !== 0) {
      writer.uint32(40).int32(message.stockQuantity);
    }
    if (message.favorite === true) {
      writer.uint32(64).bool(message.favorite);
    }
    if (message.title !== "") {
      writer.uint32(74).string(message.title);
    }
    if (message.brand !== undefined) {
      Brand.encode(message.brand, writer.uint32(82).fork()).ldelim();
    }
    if (message.size !== undefined) {
      Size.encode(message.size, writer.uint32(90).fork()).ldelim();
    }
    if (message.image !== undefined) {
      Image.encode(message.image, writer.uint32(98).fork()).ldelim();
    }
    if (message.itemCode !== "") {
      writer.uint32(106).string(message.itemCode);
    }
    if (message.tsumPrice !== undefined) {
      Money.encode(message.tsumPrice, writer.uint32(114).fork()).ldelim();
    }
    if (message.isUsed !== undefined) {
      writer.uint32(128).bool(message.isUsed);
    }
    for (const v of message.labels) {
      Label.encode(v!, writer.uint32(138).fork()).ldelim();
    }
    if (message.availableToCollect === true) {
      writer.uint32(144).bool(message.availableToCollect);
    }
    for (const v of message.attributesGroups) {
      AttributesGroup.encode(v!, writer.uint32(154).fork()).ldelim();
    }
    writer.uint32(162).fork();
    for (const v of message.availableActions) {
      writer.int32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CartItem {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCartItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.offerCode = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.price = Money.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.finalPrice = Money.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.selected = reader.bool();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.privileges.push(CartItemPrivileges.decode(reader, reader.uint32()));
          continue;
        case 21:
          if (tag !== 170) {
            break;
          }

          message.item = Item.decode(reader, reader.uint32());
          continue;
        case 22:
          if (tag !== 176) {
            break;
          }

          message.discountPercent = reader.int32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.stockQuantity = reader.int32();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.favorite = reader.bool();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.title = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.brand = Brand.decode(reader, reader.uint32());
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.size = Size.decode(reader, reader.uint32());
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.image = Image.decode(reader, reader.uint32());
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.itemCode = reader.string();
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.tsumPrice = Money.decode(reader, reader.uint32());
          continue;
        case 16:
          if (tag !== 128) {
            break;
          }

          message.isUsed = reader.bool();
          continue;
        case 17:
          if (tag !== 138) {
            break;
          }

          message.labels.push(Label.decode(reader, reader.uint32()));
          continue;
        case 18:
          if (tag !== 144) {
            break;
          }

          message.availableToCollect = reader.bool();
          continue;
        case 19:
          if (tag !== 154) {
            break;
          }

          message.attributesGroups.push(AttributesGroup.decode(reader, reader.uint32()));
          continue;
        case 20:
          if (tag === 160) {
            message.availableActions.push(reader.int32() as any);

            continue;
          }

          if (tag === 162) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.availableActions.push(reader.int32() as any);
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CartItem {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      offerCode: isSet(object.offerCode) ? globalThis.String(object.offerCode) : "",
      price: isSet(object.price) ? Money.fromJSON(object.price) : undefined,
      finalPrice: isSet(object.finalPrice) ? Money.fromJSON(object.finalPrice) : undefined,
      selected: isSet(object.selected) ? globalThis.Boolean(object.selected) : false,
      privileges: globalThis.Array.isArray(object?.privileges)
        ? object.privileges.map((e: any) => CartItemPrivileges.fromJSON(e))
        : [],
      item: isSet(object.item) ? Item.fromJSON(object.item) : undefined,
      discountPercent: isSet(object.discountPercent) ? globalThis.Number(object.discountPercent) : undefined,
      stockQuantity: isSet(object.stockQuantity) ? globalThis.Number(object.stockQuantity) : 0,
      favorite: isSet(object.favorite) ? globalThis.Boolean(object.favorite) : false,
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      brand: isSet(object.brand) ? Brand.fromJSON(object.brand) : undefined,
      size: isSet(object.size) ? Size.fromJSON(object.size) : undefined,
      image: isSet(object.image) ? Image.fromJSON(object.image) : undefined,
      itemCode: isSet(object.itemCode) ? globalThis.String(object.itemCode) : "",
      tsumPrice: isSet(object.tsumPrice) ? Money.fromJSON(object.tsumPrice) : undefined,
      isUsed: isSet(object.isUsed) ? globalThis.Boolean(object.isUsed) : undefined,
      labels: globalThis.Array.isArray(object?.labels) ? object.labels.map((e: any) => Label.fromJSON(e)) : [],
      availableToCollect: isSet(object.availableToCollect) ? globalThis.Boolean(object.availableToCollect) : false,
      attributesGroups: globalThis.Array.isArray(object?.attributesGroups)
        ? object.attributesGroups.map((e: any) => AttributesGroup.fromJSON(e))
        : [],
      availableActions: globalThis.Array.isArray(object?.availableActions)
        ? object.availableActions.map((e: any) => availableActionFromJSON(e))
        : [],
    };
  },

  toJSON(message: CartItem): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.offerCode !== "") {
      obj.offerCode = message.offerCode;
    }
    if (message.price !== undefined) {
      obj.price = Money.toJSON(message.price);
    }
    if (message.finalPrice !== undefined) {
      obj.finalPrice = Money.toJSON(message.finalPrice);
    }
    if (message.selected === true) {
      obj.selected = message.selected;
    }
    if (message.privileges?.length) {
      obj.privileges = message.privileges.map((e) => CartItemPrivileges.toJSON(e));
    }
    if (message.item !== undefined) {
      obj.item = Item.toJSON(message.item);
    }
    if (message.discountPercent !== undefined) {
      obj.discountPercent = Math.round(message.discountPercent);
    }
    if (message.stockQuantity !== 0) {
      obj.stockQuantity = Math.round(message.stockQuantity);
    }
    if (message.favorite === true) {
      obj.favorite = message.favorite;
    }
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.brand !== undefined) {
      obj.brand = Brand.toJSON(message.brand);
    }
    if (message.size !== undefined) {
      obj.size = Size.toJSON(message.size);
    }
    if (message.image !== undefined) {
      obj.image = Image.toJSON(message.image);
    }
    if (message.itemCode !== "") {
      obj.itemCode = message.itemCode;
    }
    if (message.tsumPrice !== undefined) {
      obj.tsumPrice = Money.toJSON(message.tsumPrice);
    }
    if (message.isUsed !== undefined) {
      obj.isUsed = message.isUsed;
    }
    if (message.labels?.length) {
      obj.labels = message.labels.map((e) => Label.toJSON(e));
    }
    if (message.availableToCollect === true) {
      obj.availableToCollect = message.availableToCollect;
    }
    if (message.attributesGroups?.length) {
      obj.attributesGroups = message.attributesGroups.map((e) => AttributesGroup.toJSON(e));
    }
    if (message.availableActions?.length) {
      obj.availableActions = message.availableActions.map((e) => availableActionToJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CartItem>, I>>(base?: I): CartItem {
    return CartItem.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CartItem>, I>>(object: I): CartItem {
    const message = createBaseCartItem();
    message.id = object.id ?? "";
    message.offerCode = object.offerCode ?? "";
    message.price = (object.price !== undefined && object.price !== null) ? Money.fromPartial(object.price) : undefined;
    message.finalPrice = (object.finalPrice !== undefined && object.finalPrice !== null)
      ? Money.fromPartial(object.finalPrice)
      : undefined;
    message.selected = object.selected ?? false;
    message.privileges = object.privileges?.map((e) => CartItemPrivileges.fromPartial(e)) || [];
    message.item = (object.item !== undefined && object.item !== null) ? Item.fromPartial(object.item) : undefined;
    message.discountPercent = object.discountPercent ?? undefined;
    message.stockQuantity = object.stockQuantity ?? 0;
    message.favorite = object.favorite ?? false;
    message.title = object.title ?? "";
    message.brand = (object.brand !== undefined && object.brand !== null) ? Brand.fromPartial(object.brand) : undefined;
    message.size = (object.size !== undefined && object.size !== null) ? Size.fromPartial(object.size) : undefined;
    message.image = (object.image !== undefined && object.image !== null) ? Image.fromPartial(object.image) : undefined;
    message.itemCode = object.itemCode ?? "";
    message.tsumPrice = (object.tsumPrice !== undefined && object.tsumPrice !== null)
      ? Money.fromPartial(object.tsumPrice)
      : undefined;
    message.isUsed = object.isUsed ?? undefined;
    message.labels = object.labels?.map((e) => Label.fromPartial(e)) || [];
    message.availableToCollect = object.availableToCollect ?? false;
    message.attributesGroups = object.attributesGroups?.map((e) => AttributesGroup.fromPartial(e)) || [];
    message.availableActions = object.availableActions?.map((e) => e) || [];
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToString(long: Long) {
  return long.toString();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
