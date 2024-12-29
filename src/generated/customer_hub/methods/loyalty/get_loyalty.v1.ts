/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Loyalty } from "../../entities/loyalty.v1";
import { SessionData } from "../../entities/session_data.v1";
import { Place, placeFromJSON, placeToJSON } from "../../enums/place";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Запрос акционных дисклеймеров для страницы */
export interface GetLoyaltyRequest {
  /** Контекст текущей сессии */
  sessionData:
    | SessionData
    | undefined;
  /** Страница */
  place: Place;
  itemCodes: string[];
  collectionCodes: string[];
}

/** Ответ на запрос акционных дисклеймеров для страницы */
export interface GetLoyaltyResponse {
  /** Описание промо-акций */
  loyalty: Loyalty | undefined;
}

function createBaseGetLoyaltyRequest(): GetLoyaltyRequest {
  return { sessionData: undefined, place: 0, itemCodes: [], collectionCodes: [] };
}

export const GetLoyaltyRequest = {
  encode(message: GetLoyaltyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(10).fork()).ldelim();
    }
    if (message.place !== 0) {
      writer.uint32(16).int32(message.place);
    }
    for (const v of message.itemCodes) {
      writer.uint32(26).string(v!);
    }
    for (const v of message.collectionCodes) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetLoyaltyRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetLoyaltyRequest();
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
          if (tag !== 16) {
            break;
          }

          message.place = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.itemCodes.push(reader.string());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.collectionCodes.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetLoyaltyRequest {
    return {
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      place: isSet(object.place) ? placeFromJSON(object.place) : 0,
      itemCodes: globalThis.Array.isArray(object?.itemCodes)
        ? object.itemCodes.map((e: any) => globalThis.String(e))
        : [],
      collectionCodes: globalThis.Array.isArray(object?.collectionCodes)
        ? object.collectionCodes.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: GetLoyaltyRequest): unknown {
    const obj: any = {};
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.place !== 0) {
      obj.place = placeToJSON(message.place);
    }
    if (message.itemCodes?.length) {
      obj.itemCodes = message.itemCodes;
    }
    if (message.collectionCodes?.length) {
      obj.collectionCodes = message.collectionCodes;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetLoyaltyRequest>, I>>(base?: I): GetLoyaltyRequest {
    return GetLoyaltyRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetLoyaltyRequest>, I>>(object: I): GetLoyaltyRequest {
    const message = createBaseGetLoyaltyRequest();
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.place = object.place ?? 0;
    message.itemCodes = object.itemCodes?.map((e) => e) || [];
    message.collectionCodes = object.collectionCodes?.map((e) => e) || [];
    return message;
  },
};

function createBaseGetLoyaltyResponse(): GetLoyaltyResponse {
  return { loyalty: undefined };
}

export const GetLoyaltyResponse = {
  encode(message: GetLoyaltyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.loyalty !== undefined) {
      Loyalty.encode(message.loyalty, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetLoyaltyResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetLoyaltyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 6:
          if (tag !== 50) {
            break;
          }

          message.loyalty = Loyalty.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetLoyaltyResponse {
    return { loyalty: isSet(object.loyalty) ? Loyalty.fromJSON(object.loyalty) : undefined };
  },

  toJSON(message: GetLoyaltyResponse): unknown {
    const obj: any = {};
    if (message.loyalty !== undefined) {
      obj.loyalty = Loyalty.toJSON(message.loyalty);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetLoyaltyResponse>, I>>(base?: I): GetLoyaltyResponse {
    return GetLoyaltyResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetLoyaltyResponse>, I>>(object: I): GetLoyaltyResponse {
    const message = createBaseGetLoyaltyResponse();
    message.loyalty = (object.loyalty !== undefined && object.loyalty !== null)
      ? Loyalty.fromPartial(object.loyalty)
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
