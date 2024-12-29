/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { CustomerPrivileges } from "../../entities/cart.v1";
import { SessionData } from "../../entities/session_data.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Описывает запрос на применение привилегий (промокоды, бонусы и пр.) и пересчёт итоговой стоимости корзины */
export interface CalculateDiscountsRequest {
  /** Контекст текущей сессии */
  sessionData:
    | SessionData
    | undefined;
  /** Указанные пользователем привилегии */
  customerPrivileges: CustomerPrivileges[];
}

function createBaseCalculateDiscountsRequest(): CalculateDiscountsRequest {
  return { sessionData: undefined, customerPrivileges: [] };
}

export const CalculateDiscountsRequest = {
  encode(message: CalculateDiscountsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.customerPrivileges) {
      CustomerPrivileges.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CalculateDiscountsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCalculateDiscountsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sessionData = SessionData.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.customerPrivileges.push(CustomerPrivileges.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CalculateDiscountsRequest {
    return {
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      customerPrivileges: globalThis.Array.isArray(object?.customerPrivileges)
        ? object.customerPrivileges.map((e: any) => CustomerPrivileges.fromJSON(e))
        : [],
    };
  },

  toJSON(message: CalculateDiscountsRequest): unknown {
    const obj: any = {};
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.customerPrivileges?.length) {
      obj.customerPrivileges = message.customerPrivileges.map((e) => CustomerPrivileges.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CalculateDiscountsRequest>, I>>(base?: I): CalculateDiscountsRequest {
    return CalculateDiscountsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CalculateDiscountsRequest>, I>>(object: I): CalculateDiscountsRequest {
    const message = createBaseCalculateDiscountsRequest();
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.customerPrivileges = object.customerPrivileges?.map((e) => CustomerPrivileges.fromPartial(e)) || [];
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
