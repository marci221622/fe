/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { AddressData } from "../../entities/address.v1";
import { SessionData } from "../../entities/session_data.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Поиск адреса по ip клиента. IP адрес определяется из http запроса */
export interface FindAddressByIPRequest {
  /** Контекст текущей сессии */
  sessionData: SessionData | undefined;
}

/** Ответ по адресам */
export interface FindAddressByIPResponse {
  /** Данные адресов */
  data: AddressData[];
}

function createBaseFindAddressByIPRequest(): FindAddressByIPRequest {
  return { sessionData: undefined };
}

export const FindAddressByIPRequest = {
  encode(message: FindAddressByIPRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FindAddressByIPRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFindAddressByIPRequest();
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

  fromJSON(object: any): FindAddressByIPRequest {
    return { sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined };
  },

  toJSON(message: FindAddressByIPRequest): unknown {
    const obj: any = {};
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FindAddressByIPRequest>, I>>(base?: I): FindAddressByIPRequest {
    return FindAddressByIPRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FindAddressByIPRequest>, I>>(object: I): FindAddressByIPRequest {
    const message = createBaseFindAddressByIPRequest();
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    return message;
  },
};

function createBaseFindAddressByIPResponse(): FindAddressByIPResponse {
  return { data: [] };
}

export const FindAddressByIPResponse = {
  encode(message: FindAddressByIPResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.data) {
      AddressData.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FindAddressByIPResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFindAddressByIPResponse();
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

  fromJSON(object: any): FindAddressByIPResponse {
    return { data: globalThis.Array.isArray(object?.data) ? object.data.map((e: any) => AddressData.fromJSON(e)) : [] };
  },

  toJSON(message: FindAddressByIPResponse): unknown {
    const obj: any = {};
    if (message.data?.length) {
      obj.data = message.data.map((e) => AddressData.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FindAddressByIPResponse>, I>>(base?: I): FindAddressByIPResponse {
    return FindAddressByIPResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FindAddressByIPResponse>, I>>(object: I): FindAddressByIPResponse {
    const message = createBaseFindAddressByIPResponse();
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
