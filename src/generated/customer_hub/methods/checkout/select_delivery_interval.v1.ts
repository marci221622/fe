/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { SessionData } from "../../entities/session_data.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Описывает запрос выбора варианта ранее рассчитанной доставки */
export interface SelectDeliveryIntervalRequest {
  /** Контекст текущей сессии */
  sessionData:
    | SessionData
    | undefined;
  /** Код выбранного интервала или интервалов при нескольких доставках */
  deliveryIntervalCodes: string[];
  /**
   * @exclude deprecated at 25.10.2023, delete after 01.10.2023
   *
   * @deprecated
   */
  deliveryIntervalCode: string;
}

function createBaseSelectDeliveryIntervalRequest(): SelectDeliveryIntervalRequest {
  return { sessionData: undefined, deliveryIntervalCodes: [], deliveryIntervalCode: "" };
}

export const SelectDeliveryIntervalRequest = {
  encode(message: SelectDeliveryIntervalRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.deliveryIntervalCodes) {
      writer.uint32(26).string(v!);
    }
    if (message.deliveryIntervalCode !== "") {
      writer.uint32(18).string(message.deliveryIntervalCode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SelectDeliveryIntervalRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSelectDeliveryIntervalRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sessionData = SessionData.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.deliveryIntervalCodes.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.deliveryIntervalCode = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SelectDeliveryIntervalRequest {
    return {
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      deliveryIntervalCodes: globalThis.Array.isArray(object?.deliveryIntervalCodes)
        ? object.deliveryIntervalCodes.map((e: any) => globalThis.String(e))
        : [],
      deliveryIntervalCode: isSet(object.deliveryIntervalCode) ? globalThis.String(object.deliveryIntervalCode) : "",
    };
  },

  toJSON(message: SelectDeliveryIntervalRequest): unknown {
    const obj: any = {};
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.deliveryIntervalCodes?.length) {
      obj.deliveryIntervalCodes = message.deliveryIntervalCodes;
    }
    if (message.deliveryIntervalCode !== "") {
      obj.deliveryIntervalCode = message.deliveryIntervalCode;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SelectDeliveryIntervalRequest>, I>>(base?: I): SelectDeliveryIntervalRequest {
    return SelectDeliveryIntervalRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SelectDeliveryIntervalRequest>, I>>(
    object: I,
  ): SelectDeliveryIntervalRequest {
    const message = createBaseSelectDeliveryIntervalRequest();
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.deliveryIntervalCodes = object.deliveryIntervalCodes?.map((e) => e) || [];
    message.deliveryIntervalCode = object.deliveryIntervalCode ?? "";
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
