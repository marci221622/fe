/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { AddressData } from "../../entities/address.v1";
import { SessionData } from "../../entities/session_data.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Установка выбора города клиента */
export interface SetCustomerCityRequest {
  /** Контекст текущей сессии */
  sessionData:
    | SessionData
    | undefined;
  /**
   * Данные адреса. При необходимости, название города из FB через SuggestAddress
   * трансформируется в AddressData
   */
  addressData: AddressData | undefined;
}

export interface SetCustomerCityResponse {
}

function createBaseSetCustomerCityRequest(): SetCustomerCityRequest {
  return { sessionData: undefined, addressData: undefined };
}

export const SetCustomerCityRequest = {
  encode(message: SetCustomerCityRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(10).fork()).ldelim();
    }
    if (message.addressData !== undefined) {
      AddressData.encode(message.addressData, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetCustomerCityRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetCustomerCityRequest();
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

          message.addressData = AddressData.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SetCustomerCityRequest {
    return {
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      addressData: isSet(object.addressData) ? AddressData.fromJSON(object.addressData) : undefined,
    };
  },

  toJSON(message: SetCustomerCityRequest): unknown {
    const obj: any = {};
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.addressData !== undefined) {
      obj.addressData = AddressData.toJSON(message.addressData);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SetCustomerCityRequest>, I>>(base?: I): SetCustomerCityRequest {
    return SetCustomerCityRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SetCustomerCityRequest>, I>>(object: I): SetCustomerCityRequest {
    const message = createBaseSetCustomerCityRequest();
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.addressData = (object.addressData !== undefined && object.addressData !== null)
      ? AddressData.fromPartial(object.addressData)
      : undefined;
    return message;
  },
};

function createBaseSetCustomerCityResponse(): SetCustomerCityResponse {
  return {};
}

export const SetCustomerCityResponse = {
  encode(_: SetCustomerCityResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetCustomerCityResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetCustomerCityResponse();
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

  fromJSON(_: any): SetCustomerCityResponse {
    return {};
  },

  toJSON(_: SetCustomerCityResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<SetCustomerCityResponse>, I>>(base?: I): SetCustomerCityResponse {
    return SetCustomerCityResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SetCustomerCityResponse>, I>>(_: I): SetCustomerCityResponse {
    const message = createBaseSetCustomerCityResponse();
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
