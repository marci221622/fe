/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { AddressData } from "../../entities/address.v1";
import { SessionData } from "../../entities/session_data.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Поиск адреса по координатам */
export interface FindAddressByCoordsRequest {
  /** Широта [-90.0000000; 90.0000000] */
  latitude: number;
  /** Долгота [-180.0000000 to 180.0000000] */
  longitude: number;
  /** Контекст текущей сессии */
  sessionData: SessionData | undefined;
}

/** Ответ по адресам */
export interface FindAddressByCoordsResponse {
  /** Данные адресов */
  data: AddressData[];
}

function createBaseFindAddressByCoordsRequest(): FindAddressByCoordsRequest {
  return { latitude: 0, longitude: 0, sessionData: undefined };
}

export const FindAddressByCoordsRequest = {
  encode(message: FindAddressByCoordsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.latitude !== 0) {
      writer.uint32(9).double(message.latitude);
    }
    if (message.longitude !== 0) {
      writer.uint32(17).double(message.longitude);
    }
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FindAddressByCoordsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFindAddressByCoordsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.latitude = reader.double();
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.longitude = reader.double();
          continue;
        case 3:
          if (tag !== 26) {
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

  fromJSON(object: any): FindAddressByCoordsRequest {
    return {
      latitude: isSet(object.latitude) ? globalThis.Number(object.latitude) : 0,
      longitude: isSet(object.longitude) ? globalThis.Number(object.longitude) : 0,
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
    };
  },

  toJSON(message: FindAddressByCoordsRequest): unknown {
    const obj: any = {};
    if (message.latitude !== 0) {
      obj.latitude = message.latitude;
    }
    if (message.longitude !== 0) {
      obj.longitude = message.longitude;
    }
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FindAddressByCoordsRequest>, I>>(base?: I): FindAddressByCoordsRequest {
    return FindAddressByCoordsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FindAddressByCoordsRequest>, I>>(object: I): FindAddressByCoordsRequest {
    const message = createBaseFindAddressByCoordsRequest();
    message.latitude = object.latitude ?? 0;
    message.longitude = object.longitude ?? 0;
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    return message;
  },
};

function createBaseFindAddressByCoordsResponse(): FindAddressByCoordsResponse {
  return { data: [] };
}

export const FindAddressByCoordsResponse = {
  encode(message: FindAddressByCoordsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.data) {
      AddressData.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FindAddressByCoordsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFindAddressByCoordsResponse();
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

  fromJSON(object: any): FindAddressByCoordsResponse {
    return { data: globalThis.Array.isArray(object?.data) ? object.data.map((e: any) => AddressData.fromJSON(e)) : [] };
  },

  toJSON(message: FindAddressByCoordsResponse): unknown {
    const obj: any = {};
    if (message.data?.length) {
      obj.data = message.data.map((e) => AddressData.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FindAddressByCoordsResponse>, I>>(base?: I): FindAddressByCoordsResponse {
    return FindAddressByCoordsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FindAddressByCoordsResponse>, I>>(object: I): FindAddressByCoordsResponse {
    const message = createBaseFindAddressByCoordsResponse();
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
