/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { CustomerFavoriteItemsList } from "../../entities/customer_favorite_items_list.v1";
import { CustomerFavoriteList } from "../../entities/customer_favorite_list.v1";
import { SessionData } from "../../entities/session_data.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** GetFavoriteListsRequest запрос списков избранного для пользователя */
export interface GetCustomerFavoriteListsRequest {
  /** Контекст текущей сессии */
  sessionData: SessionData | undefined;
}

/** GetFavoriteListsResponse списки избранного */
export interface GetCustomerFavoriteListsResponse {
  /** Списки избранных товаров */
  customerFavoriteItemsLists: CustomerFavoriteItemsList[];
  /**
   * @exclude deprecated at 25.10.2023, delete after 01.12.2023
   *
   * @deprecated
   */
  customerFavoriteLists: CustomerFavoriteList[];
}

function createBaseGetCustomerFavoriteListsRequest(): GetCustomerFavoriteListsRequest {
  return { sessionData: undefined };
}

export const GetCustomerFavoriteListsRequest = {
  encode(message: GetCustomerFavoriteListsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetCustomerFavoriteListsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCustomerFavoriteListsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sessionData = SessionData.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetCustomerFavoriteListsRequest {
    return { sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined };
  },

  toJSON(message: GetCustomerFavoriteListsRequest): unknown {
    const obj: any = {};
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetCustomerFavoriteListsRequest>, I>>(base?: I): GetCustomerFavoriteListsRequest {
    return GetCustomerFavoriteListsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetCustomerFavoriteListsRequest>, I>>(
    object: I,
  ): GetCustomerFavoriteListsRequest {
    const message = createBaseGetCustomerFavoriteListsRequest();
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    return message;
  },
};

function createBaseGetCustomerFavoriteListsResponse(): GetCustomerFavoriteListsResponse {
  return { customerFavoriteItemsLists: [], customerFavoriteLists: [] };
}

export const GetCustomerFavoriteListsResponse = {
  encode(message: GetCustomerFavoriteListsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.customerFavoriteItemsLists) {
      CustomerFavoriteItemsList.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.customerFavoriteLists) {
      CustomerFavoriteList.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetCustomerFavoriteListsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCustomerFavoriteListsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.customerFavoriteItemsLists.push(CustomerFavoriteItemsList.decode(reader, reader.uint32()));
          continue;
        case 1:
          if (tag !== 10) {
            break;
          }

          message.customerFavoriteLists.push(CustomerFavoriteList.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetCustomerFavoriteListsResponse {
    return {
      customerFavoriteItemsLists: globalThis.Array.isArray(object?.customerFavoriteItemsLists)
        ? object.customerFavoriteItemsLists.map((e: any) => CustomerFavoriteItemsList.fromJSON(e))
        : [],
      customerFavoriteLists: globalThis.Array.isArray(object?.customerFavoriteLists)
        ? object.customerFavoriteLists.map((e: any) => CustomerFavoriteList.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetCustomerFavoriteListsResponse): unknown {
    const obj: any = {};
    if (message.customerFavoriteItemsLists?.length) {
      obj.customerFavoriteItemsLists = message.customerFavoriteItemsLists.map((e) =>
        CustomerFavoriteItemsList.toJSON(e)
      );
    }
    if (message.customerFavoriteLists?.length) {
      obj.customerFavoriteLists = message.customerFavoriteLists.map((e) => CustomerFavoriteList.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetCustomerFavoriteListsResponse>, I>>(
    base?: I,
  ): GetCustomerFavoriteListsResponse {
    return GetCustomerFavoriteListsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetCustomerFavoriteListsResponse>, I>>(
    object: I,
  ): GetCustomerFavoriteListsResponse {
    const message = createBaseGetCustomerFavoriteListsResponse();
    message.customerFavoriteItemsLists =
      object.customerFavoriteItemsLists?.map((e) => CustomerFavoriteItemsList.fromPartial(e)) || [];
    message.customerFavoriteLists = object.customerFavoriteLists?.map((e) => CustomerFavoriteList.fromPartial(e)) || [];
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
