/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { DeliveryContact } from "../../entities/delivery.v1";
import { SessionData } from "../../entities/session_data.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Описывает запрос на установку контактных данных получателя заказа */
export interface SetDeliveryRecipientRequest {
  /** Контекст текущей сессии */
  sessionData:
    | SessionData
    | undefined;
  /** Данные получателя заказа */
  recipient: DeliveryContact | undefined;
}

function createBaseSetDeliveryRecipientRequest(): SetDeliveryRecipientRequest {
  return { sessionData: undefined, recipient: undefined };
}

export const SetDeliveryRecipientRequest = {
  encode(message: SetDeliveryRecipientRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(10).fork()).ldelim();
    }
    if (message.recipient !== undefined) {
      DeliveryContact.encode(message.recipient, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetDeliveryRecipientRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetDeliveryRecipientRequest();
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

          message.recipient = DeliveryContact.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SetDeliveryRecipientRequest {
    return {
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      recipient: isSet(object.recipient) ? DeliveryContact.fromJSON(object.recipient) : undefined,
    };
  },

  toJSON(message: SetDeliveryRecipientRequest): unknown {
    const obj: any = {};
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.recipient !== undefined) {
      obj.recipient = DeliveryContact.toJSON(message.recipient);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SetDeliveryRecipientRequest>, I>>(base?: I): SetDeliveryRecipientRequest {
    return SetDeliveryRecipientRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SetDeliveryRecipientRequest>, I>>(object: I): SetDeliveryRecipientRequest {
    const message = createBaseSetDeliveryRecipientRequest();
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.recipient = (object.recipient !== undefined && object.recipient !== null)
      ? DeliveryContact.fromPartial(object.recipient)
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
