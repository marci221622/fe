/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Money } from "../../common/money.v1";
import { SellerData } from "./seller_data.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Предложение по товару */
export interface ItemOffer {
  /** Код предложения */
  offerCode: string;
  /** Цена */
  price:
    | Money
    | undefined;
  /** Окончательная цена */
  finalPrice:
    | Money
    | undefined;
  /** Данные продавца */
  sellerData: SellerData | undefined;
}

function createBaseItemOffer(): ItemOffer {
  return { offerCode: "", price: undefined, finalPrice: undefined, sellerData: undefined };
}

export const ItemOffer = {
  encode(message: ItemOffer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.offerCode !== "") {
      writer.uint32(10).string(message.offerCode);
    }
    if (message.price !== undefined) {
      Money.encode(message.price, writer.uint32(18).fork()).ldelim();
    }
    if (message.finalPrice !== undefined) {
      Money.encode(message.finalPrice, writer.uint32(26).fork()).ldelim();
    }
    if (message.sellerData !== undefined) {
      SellerData.encode(message.sellerData, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ItemOffer {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseItemOffer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.offerCode = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.price = Money.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.finalPrice = Money.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.sellerData = SellerData.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ItemOffer {
    return {
      offerCode: isSet(object.offerCode) ? globalThis.String(object.offerCode) : "",
      price: isSet(object.price) ? Money.fromJSON(object.price) : undefined,
      finalPrice: isSet(object.finalPrice) ? Money.fromJSON(object.finalPrice) : undefined,
      sellerData: isSet(object.sellerData) ? SellerData.fromJSON(object.sellerData) : undefined,
    };
  },

  toJSON(message: ItemOffer): unknown {
    const obj: any = {};
    if (message.offerCode !== "") {
      obj.offerCode = message.offerCode;
    }
    if (message.price !== undefined) {
      obj.price = Money.toJSON(message.price);
    }
    if (message.finalPrice !== undefined) {
      obj.finalPrice = Money.toJSON(message.finalPrice);
    }
    if (message.sellerData !== undefined) {
      obj.sellerData = SellerData.toJSON(message.sellerData);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ItemOffer>, I>>(base?: I): ItemOffer {
    return ItemOffer.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ItemOffer>, I>>(object: I): ItemOffer {
    const message = createBaseItemOffer();
    message.offerCode = object.offerCode ?? "";
    message.price = (object.price !== undefined && object.price !== null) ? Money.fromPartial(object.price) : undefined;
    message.finalPrice = (object.finalPrice !== undefined && object.finalPrice !== null)
      ? Money.fromPartial(object.finalPrice)
      : undefined;
    message.sellerData = (object.sellerData !== undefined && object.sellerData !== null)
      ? SellerData.fromPartial(object.sellerData)
      : undefined;
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
