/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { SessionData } from "../../entities/session_data.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** RemoveItemsFromFavoriteListRequest запрос на удаление товара из избранного */
export interface RemoveItemsFromFavoriteListRequest {
  /** Контекст текущей сессии */
  sessionData:
    | SessionData
    | undefined;
  /** Идентификатор списка избранного. Если favorite_list_id не передан - пытаемся удалить из дефолтного списка */
  favoriteListId?:
    | string
    | undefined;
  /** Коды товаров удаляемы из списка избранного */
  itemCodes: string[];
}

/** Ответ на удаление из списка избранного. Приходит пустой если товары удалены, иначе ошибка */
export interface RemoveItemsFromFavoriteListResponse {
}

function createBaseRemoveItemsFromFavoriteListRequest(): RemoveItemsFromFavoriteListRequest {
  return { sessionData: undefined, favoriteListId: undefined, itemCodes: [] };
}

export const RemoveItemsFromFavoriteListRequest = {
  encode(message: RemoveItemsFromFavoriteListRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(10).fork()).ldelim();
    }
    if (message.favoriteListId !== undefined) {
      writer.uint32(18).string(message.favoriteListId);
    }
    for (const v of message.itemCodes) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoveItemsFromFavoriteListRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveItemsFromFavoriteListRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sessionData = SessionData.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.favoriteListId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.itemCodes.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RemoveItemsFromFavoriteListRequest {
    return {
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      favoriteListId: isSet(object.favoriteListId) ? globalThis.String(object.favoriteListId) : undefined,
      itemCodes: globalThis.Array.isArray(object?.itemCodes)
        ? object.itemCodes.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: RemoveItemsFromFavoriteListRequest): unknown {
    const obj: any = {};
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.favoriteListId !== undefined) {
      obj.favoriteListId = message.favoriteListId;
    }
    if (message.itemCodes?.length) {
      obj.itemCodes = message.itemCodes;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoveItemsFromFavoriteListRequest>, I>>(
    base?: I,
  ): RemoveItemsFromFavoriteListRequest {
    return RemoveItemsFromFavoriteListRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RemoveItemsFromFavoriteListRequest>, I>>(
    object: I,
  ): RemoveItemsFromFavoriteListRequest {
    const message = createBaseRemoveItemsFromFavoriteListRequest();
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.favoriteListId = object.favoriteListId ?? undefined;
    message.itemCodes = object.itemCodes?.map((e) => e) || [];
    return message;
  },
};

function createBaseRemoveItemsFromFavoriteListResponse(): RemoveItemsFromFavoriteListResponse {
  return {};
}

export const RemoveItemsFromFavoriteListResponse = {
  encode(_: RemoveItemsFromFavoriteListResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoveItemsFromFavoriteListResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveItemsFromFavoriteListResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): RemoveItemsFromFavoriteListResponse {
    return {};
  },

  toJSON(_: RemoveItemsFromFavoriteListResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoveItemsFromFavoriteListResponse>, I>>(
    base?: I,
  ): RemoveItemsFromFavoriteListResponse {
    return RemoveItemsFromFavoriteListResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RemoveItemsFromFavoriteListResponse>, I>>(
    _: I,
  ): RemoveItemsFromFavoriteListResponse {
    const message = createBaseRemoveItemsFromFavoriteListResponse();
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
