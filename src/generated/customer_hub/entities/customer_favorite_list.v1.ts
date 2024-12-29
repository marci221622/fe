/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { CustomerInfo } from "./customer_info.v1";
import { FavoriteList } from "./favorite_list.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/**
 * @exclude deprecated at 25.10.2023, delete after 01.12.2023
 *
 * @deprecated
 */
export interface CustomerFavoriteList {
  /** Данные по покупателю */
  customer:
    | CustomerInfo
    | undefined;
  /** Список избранного */
  favoriteList:
    | FavoriteList
    | undefined;
  /** Является ли списком по умолчанию */
  isDefault: boolean;
}

function createBaseCustomerFavoriteList(): CustomerFavoriteList {
  return { customer: undefined, favoriteList: undefined, isDefault: false };
}

export const CustomerFavoriteList = {
  encode(message: CustomerFavoriteList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.customer !== undefined) {
      CustomerInfo.encode(message.customer, writer.uint32(10).fork()).ldelim();
    }
    if (message.favoriteList !== undefined) {
      FavoriteList.encode(message.favoriteList, writer.uint32(18).fork()).ldelim();
    }
    if (message.isDefault === true) {
      writer.uint32(24).bool(message.isDefault);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CustomerFavoriteList {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCustomerFavoriteList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.customer = CustomerInfo.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.favoriteList = FavoriteList.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.isDefault = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CustomerFavoriteList {
    return {
      customer: isSet(object.customer) ? CustomerInfo.fromJSON(object.customer) : undefined,
      favoriteList: isSet(object.favoriteList) ? FavoriteList.fromJSON(object.favoriteList) : undefined,
      isDefault: isSet(object.isDefault) ? globalThis.Boolean(object.isDefault) : false,
    };
  },

  toJSON(message: CustomerFavoriteList): unknown {
    const obj: any = {};
    if (message.customer !== undefined) {
      obj.customer = CustomerInfo.toJSON(message.customer);
    }
    if (message.favoriteList !== undefined) {
      obj.favoriteList = FavoriteList.toJSON(message.favoriteList);
    }
    if (message.isDefault === true) {
      obj.isDefault = message.isDefault;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CustomerFavoriteList>, I>>(base?: I): CustomerFavoriteList {
    return CustomerFavoriteList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CustomerFavoriteList>, I>>(object: I): CustomerFavoriteList {
    const message = createBaseCustomerFavoriteList();
    message.customer = (object.customer !== undefined && object.customer !== null)
      ? CustomerInfo.fromPartial(object.customer)
      : undefined;
    message.favoriteList = (object.favoriteList !== undefined && object.favoriteList !== null)
      ? FavoriteList.fromPartial(object.favoriteList)
      : undefined;
    message.isDefault = object.isDefault ?? false;
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
