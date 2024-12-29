/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Image } from "../../common/image.v1";
import { Money } from "../../common/money.v1";
import { ItemOffer } from "./item_offer.v1";
import { Label } from "./label.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/**
 * @exclude deprecated at 25.10.2023, delete after 01.10.2023
 *
 * @deprecated
 */
export interface ItemMin {
  /** Код */
  code: string;
  /** Заголовок */
  title: string;
  /** Индентификатор модели */
  modelId?:
    | string
    | undefined;
  /** Идентификатор продукта */
  productId?:
    | string
    | undefined;
  /** Идентификатор бренда */
  brandId: string;
  /** Изображение */
  images: Image[];
  /** Метки/Шильдики */
  labels: Label[];
  /** Находится ли в стоке. Вычисляемое из модели оффера по полю date_to */
  inStock: boolean;
  /** Находится ли в списке избранного */
  favorite: boolean;
  /** Предложения по товару у продавцов */
  itemOffers: ItemOffer[];
  /** Цена */
  price:
    | Money
    | undefined;
  /** Цена со скидкой */
  priceDiscount:
    | Money
    | undefined;
  /** Цена товара в ЦУМе */
  tsumPrice?:
    | Money
    | undefined;
  /** Б/у или нет товар */
  isUsed?:
    | boolean
    | undefined;
  /** Код бренда */
  brandCode: string;
}

function createBaseItemMin(): ItemMin {
  return {
    code: "",
    title: "",
    modelId: undefined,
    productId: undefined,
    brandId: "0",
    images: [],
    labels: [],
    inStock: false,
    favorite: false,
    itemOffers: [],
    price: undefined,
    priceDiscount: undefined,
    tsumPrice: undefined,
    isUsed: undefined,
    brandCode: "",
  };
}

export const ItemMin = {
  encode(message: ItemMin, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== "") {
      writer.uint32(10).string(message.code);
    }
    if (message.title !== "") {
      writer.uint32(18).string(message.title);
    }
    if (message.modelId !== undefined) {
      writer.uint32(24).int64(message.modelId);
    }
    if (message.productId !== undefined) {
      writer.uint32(32).int64(message.productId);
    }
    if (message.brandId !== "0") {
      writer.uint32(40).int64(message.brandId);
    }
    for (const v of message.images) {
      Image.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.labels) {
      Label.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    if (message.inStock === true) {
      writer.uint32(64).bool(message.inStock);
    }
    if (message.favorite === true) {
      writer.uint32(72).bool(message.favorite);
    }
    for (const v of message.itemOffers) {
      ItemOffer.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    if (message.price !== undefined) {
      Money.encode(message.price, writer.uint32(90).fork()).ldelim();
    }
    if (message.priceDiscount !== undefined) {
      Money.encode(message.priceDiscount, writer.uint32(98).fork()).ldelim();
    }
    if (message.tsumPrice !== undefined) {
      Money.encode(message.tsumPrice, writer.uint32(106).fork()).ldelim();
    }
    if (message.isUsed !== undefined) {
      writer.uint32(112).bool(message.isUsed);
    }
    if (message.brandCode !== "") {
      writer.uint32(122).string(message.brandCode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ItemMin {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseItemMin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.code = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.title = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.modelId = longToString(reader.int64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.productId = longToString(reader.int64() as Long);
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.brandId = longToString(reader.int64() as Long);
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.images.push(Image.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.labels.push(Label.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.inStock = reader.bool();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.favorite = reader.bool();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.itemOffers.push(ItemOffer.decode(reader, reader.uint32()));
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.price = Money.decode(reader, reader.uint32());
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.priceDiscount = Money.decode(reader, reader.uint32());
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.tsumPrice = Money.decode(reader, reader.uint32());
          continue;
        case 14:
          if (tag !== 112) {
            break;
          }

          message.isUsed = reader.bool();
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.brandCode = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ItemMin {
    return {
      code: isSet(object.code) ? globalThis.String(object.code) : "",
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      modelId: isSet(object.modelId) ? globalThis.String(object.modelId) : undefined,
      productId: isSet(object.productId) ? globalThis.String(object.productId) : undefined,
      brandId: isSet(object.brandId) ? globalThis.String(object.brandId) : "0",
      images: globalThis.Array.isArray(object?.images) ? object.images.map((e: any) => Image.fromJSON(e)) : [],
      labels: globalThis.Array.isArray(object?.labels) ? object.labels.map((e: any) => Label.fromJSON(e)) : [],
      inStock: isSet(object.inStock) ? globalThis.Boolean(object.inStock) : false,
      favorite: isSet(object.favorite) ? globalThis.Boolean(object.favorite) : false,
      itemOffers: globalThis.Array.isArray(object?.itemOffers)
        ? object.itemOffers.map((e: any) => ItemOffer.fromJSON(e))
        : [],
      price: isSet(object.price) ? Money.fromJSON(object.price) : undefined,
      priceDiscount: isSet(object.priceDiscount) ? Money.fromJSON(object.priceDiscount) : undefined,
      tsumPrice: isSet(object.tsumPrice) ? Money.fromJSON(object.tsumPrice) : undefined,
      isUsed: isSet(object.isUsed) ? globalThis.Boolean(object.isUsed) : undefined,
      brandCode: isSet(object.brandCode) ? globalThis.String(object.brandCode) : "",
    };
  },

  toJSON(message: ItemMin): unknown {
    const obj: any = {};
    if (message.code !== "") {
      obj.code = message.code;
    }
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.modelId !== undefined) {
      obj.modelId = message.modelId;
    }
    if (message.productId !== undefined) {
      obj.productId = message.productId;
    }
    if (message.brandId !== "0") {
      obj.brandId = message.brandId;
    }
    if (message.images?.length) {
      obj.images = message.images.map((e) => Image.toJSON(e));
    }
    if (message.labels?.length) {
      obj.labels = message.labels.map((e) => Label.toJSON(e));
    }
    if (message.inStock === true) {
      obj.inStock = message.inStock;
    }
    if (message.favorite === true) {
      obj.favorite = message.favorite;
    }
    if (message.itemOffers?.length) {
      obj.itemOffers = message.itemOffers.map((e) => ItemOffer.toJSON(e));
    }
    if (message.price !== undefined) {
      obj.price = Money.toJSON(message.price);
    }
    if (message.priceDiscount !== undefined) {
      obj.priceDiscount = Money.toJSON(message.priceDiscount);
    }
    if (message.tsumPrice !== undefined) {
      obj.tsumPrice = Money.toJSON(message.tsumPrice);
    }
    if (message.isUsed !== undefined) {
      obj.isUsed = message.isUsed;
    }
    if (message.brandCode !== "") {
      obj.brandCode = message.brandCode;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ItemMin>, I>>(base?: I): ItemMin {
    return ItemMin.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ItemMin>, I>>(object: I): ItemMin {
    const message = createBaseItemMin();
    message.code = object.code ?? "";
    message.title = object.title ?? "";
    message.modelId = object.modelId ?? undefined;
    message.productId = object.productId ?? undefined;
    message.brandId = object.brandId ?? "0";
    message.images = object.images?.map((e) => Image.fromPartial(e)) || [];
    message.labels = object.labels?.map((e) => Label.fromPartial(e)) || [];
    message.inStock = object.inStock ?? false;
    message.favorite = object.favorite ?? false;
    message.itemOffers = object.itemOffers?.map((e) => ItemOffer.fromPartial(e)) || [];
    message.price = (object.price !== undefined && object.price !== null) ? Money.fromPartial(object.price) : undefined;
    message.priceDiscount = (object.priceDiscount !== undefined && object.priceDiscount !== null)
      ? Money.fromPartial(object.priceDiscount)
      : undefined;
    message.tsumPrice = (object.tsumPrice !== undefined && object.tsumPrice !== null)
      ? Money.fromPartial(object.tsumPrice)
      : undefined;
    message.isUsed = object.isUsed ?? undefined;
    message.brandCode = object.brandCode ?? "";
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
