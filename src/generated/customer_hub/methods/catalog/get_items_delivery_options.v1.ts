/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { AddressData } from "../../entities/address.v1";
import { DeliveriesByType } from "../../entities/delivery.v1";
import { SessionData } from "../../entities/session_data.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Запрос на получение вариантов доставки товаров */
export interface GetItemsDeliveryOptionsRequest {
  /** Контекст текущей сессии */
  sessionData:
    | SessionData
    | undefined;
  /** Коды товаров */
  codes: string[];
  /**
   * Данные адреса для расчета опций доставки. Может быть получено из:
   * * GetInitializationInfoResponse
   * * FindAddressByCoordsResponse
   * * FindAddressByIPResponse
   * * SuggestAddressResponse
   */
  addressData: AddressData | undefined;
}

/** Ответ на запрос на получение вариантов доставки товаров */
export interface GetItemsDeliveryOptionsResponse {
  /** Сгруппированные по типам варианты доставки */
  deliveriesByType: DeliveriesByType[];
}

function createBaseGetItemsDeliveryOptionsRequest(): GetItemsDeliveryOptionsRequest {
  return { sessionData: undefined, codes: [], addressData: undefined };
}

export const GetItemsDeliveryOptionsRequest = {
  encode(message: GetItemsDeliveryOptionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.codes) {
      writer.uint32(18).string(v!);
    }
    if (message.addressData !== undefined) {
      AddressData.encode(message.addressData, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetItemsDeliveryOptionsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetItemsDeliveryOptionsRequest();
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

          message.codes.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
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

  fromJSON(object: any): GetItemsDeliveryOptionsRequest {
    return {
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      codes: globalThis.Array.isArray(object?.codes) ? object.codes.map((e: any) => globalThis.String(e)) : [],
      addressData: isSet(object.addressData) ? AddressData.fromJSON(object.addressData) : undefined,
    };
  },

  toJSON(message: GetItemsDeliveryOptionsRequest): unknown {
    const obj: any = {};
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.codes?.length) {
      obj.codes = message.codes;
    }
    if (message.addressData !== undefined) {
      obj.addressData = AddressData.toJSON(message.addressData);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetItemsDeliveryOptionsRequest>, I>>(base?: I): GetItemsDeliveryOptionsRequest {
    return GetItemsDeliveryOptionsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetItemsDeliveryOptionsRequest>, I>>(
    object: I,
  ): GetItemsDeliveryOptionsRequest {
    const message = createBaseGetItemsDeliveryOptionsRequest();
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.codes = object.codes?.map((e) => e) || [];
    message.addressData = (object.addressData !== undefined && object.addressData !== null)
      ? AddressData.fromPartial(object.addressData)
      : undefined;
    return message;
  },
};

function createBaseGetItemsDeliveryOptionsResponse(): GetItemsDeliveryOptionsResponse {
  return { deliveriesByType: [] };
}

export const GetItemsDeliveryOptionsResponse = {
  encode(message: GetItemsDeliveryOptionsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.deliveriesByType) {
      DeliveriesByType.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetItemsDeliveryOptionsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetItemsDeliveryOptionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.deliveriesByType.push(DeliveriesByType.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetItemsDeliveryOptionsResponse {
    return {
      deliveriesByType: globalThis.Array.isArray(object?.deliveriesByType)
        ? object.deliveriesByType.map((e: any) => DeliveriesByType.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetItemsDeliveryOptionsResponse): unknown {
    const obj: any = {};
    if (message.deliveriesByType?.length) {
      obj.deliveriesByType = message.deliveriesByType.map((e) => DeliveriesByType.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetItemsDeliveryOptionsResponse>, I>>(base?: I): GetItemsDeliveryOptionsResponse {
    return GetItemsDeliveryOptionsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetItemsDeliveryOptionsResponse>, I>>(
    object: I,
  ): GetItemsDeliveryOptionsResponse {
    const message = createBaseGetItemsDeliveryOptionsResponse();
    message.deliveriesByType = object.deliveriesByType?.map((e) => DeliveriesByType.fromPartial(e)) || [];
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
