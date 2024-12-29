/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { AddressData } from "../../entities/address.v1";
import { SessionData } from "../../entities/session_data.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Запрос на поиск предполагаемого адреса */
export interface SuggestAddressRequest {
  /** Строка запроса адреса */
  query: string;
  /** Контекст текущей сессии */
  sessionData:
    | SessionData
    | undefined;
  /** Тип локации. Для поиска городов, содержащих в названии query следует указать LOCATION_TYPE_CITY */
  type?: SuggestAddressRequest_LocationType | undefined;
}

export enum SuggestAddressRequest_LocationType {
  /** LOCATION_TYPE_UNSPECIFIED - Неуказан */
  LOCATION_TYPE_UNSPECIFIED = 0,
  /** LOCATION_TYPE_REGION - Регион */
  LOCATION_TYPE_REGION = 1,
  /** LOCATION_TYPE_AREA - Область */
  LOCATION_TYPE_AREA = 2,
  /** LOCATION_TYPE_CITY - Город */
  LOCATION_TYPE_CITY = 3,
  /** LOCATION_TYPE_SETTLEMENT - Населённый пункт */
  LOCATION_TYPE_SETTLEMENT = 4,
  UNRECOGNIZED = -1,
}

export function suggestAddressRequest_LocationTypeFromJSON(object: any): SuggestAddressRequest_LocationType {
  switch (object) {
    case 0:
    case "LOCATION_TYPE_UNSPECIFIED":
      return SuggestAddressRequest_LocationType.LOCATION_TYPE_UNSPECIFIED;
    case 1:
    case "LOCATION_TYPE_REGION":
      return SuggestAddressRequest_LocationType.LOCATION_TYPE_REGION;
    case 2:
    case "LOCATION_TYPE_AREA":
      return SuggestAddressRequest_LocationType.LOCATION_TYPE_AREA;
    case 3:
    case "LOCATION_TYPE_CITY":
      return SuggestAddressRequest_LocationType.LOCATION_TYPE_CITY;
    case 4:
    case "LOCATION_TYPE_SETTLEMENT":
      return SuggestAddressRequest_LocationType.LOCATION_TYPE_SETTLEMENT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SuggestAddressRequest_LocationType.UNRECOGNIZED;
  }
}

export function suggestAddressRequest_LocationTypeToJSON(object: SuggestAddressRequest_LocationType): string {
  switch (object) {
    case SuggestAddressRequest_LocationType.LOCATION_TYPE_UNSPECIFIED:
      return "LOCATION_TYPE_UNSPECIFIED";
    case SuggestAddressRequest_LocationType.LOCATION_TYPE_REGION:
      return "LOCATION_TYPE_REGION";
    case SuggestAddressRequest_LocationType.LOCATION_TYPE_AREA:
      return "LOCATION_TYPE_AREA";
    case SuggestAddressRequest_LocationType.LOCATION_TYPE_CITY:
      return "LOCATION_TYPE_CITY";
    case SuggestAddressRequest_LocationType.LOCATION_TYPE_SETTLEMENT:
      return "LOCATION_TYPE_SETTLEMENT";
    case SuggestAddressRequest_LocationType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Ответ по поиску адреса */
export interface SuggestAddressResponse {
  /** Данные адресов */
  data: AddressData[];
}

function createBaseSuggestAddressRequest(): SuggestAddressRequest {
  return { query: "", sessionData: undefined, type: undefined };
}

export const SuggestAddressRequest = {
  encode(message: SuggestAddressRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.query !== "") {
      writer.uint32(10).string(message.query);
    }
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(18).fork()).ldelim();
    }
    if (message.type !== undefined) {
      writer.uint32(24).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SuggestAddressRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSuggestAddressRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.query = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sessionData = SessionData.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SuggestAddressRequest {
    return {
      query: isSet(object.query) ? globalThis.String(object.query) : "",
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      type: isSet(object.type) ? suggestAddressRequest_LocationTypeFromJSON(object.type) : undefined,
    };
  },

  toJSON(message: SuggestAddressRequest): unknown {
    const obj: any = {};
    if (message.query !== "") {
      obj.query = message.query;
    }
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.type !== undefined) {
      obj.type = suggestAddressRequest_LocationTypeToJSON(message.type);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SuggestAddressRequest>, I>>(base?: I): SuggestAddressRequest {
    return SuggestAddressRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SuggestAddressRequest>, I>>(object: I): SuggestAddressRequest {
    const message = createBaseSuggestAddressRequest();
    message.query = object.query ?? "";
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.type = object.type ?? undefined;
    return message;
  },
};

function createBaseSuggestAddressResponse(): SuggestAddressResponse {
  return { data: [] };
}

export const SuggestAddressResponse = {
  encode(message: SuggestAddressResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.data) {
      AddressData.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SuggestAddressResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSuggestAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.data.push(AddressData.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SuggestAddressResponse {
    return { data: globalThis.Array.isArray(object?.data) ? object.data.map((e: any) => AddressData.fromJSON(e)) : [] };
  },

  toJSON(message: SuggestAddressResponse): unknown {
    const obj: any = {};
    if (message.data?.length) {
      obj.data = message.data.map((e) => AddressData.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SuggestAddressResponse>, I>>(base?: I): SuggestAddressResponse {
    return SuggestAddressResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SuggestAddressResponse>, I>>(object: I): SuggestAddressResponse {
    const message = createBaseSuggestAddressResponse();
    message.data = object.data?.map((e) => AddressData.fromPartial(e)) || [];
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
