/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "utp.customer_hub_service.v1";

/** CustomerInfo объект который содержит данные покупателя */
export interface CustomerInfo {
  /** Идентификатор покупателя */
  customerId: string;
}

function createBaseCustomerInfo(): CustomerInfo {
  return { customerId: "" };
}

export const CustomerInfo = {
  encode(message: CustomerInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.customerId !== "") {
      writer.uint32(10).string(message.customerId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CustomerInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCustomerInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.customerId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CustomerInfo {
    return { customerId: isSet(object.customerId) ? globalThis.String(object.customerId) : "" };
  },

  toJSON(message: CustomerInfo): unknown {
    const obj: any = {};
    if (message.customerId !== "") {
      obj.customerId = message.customerId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CustomerInfo>, I>>(base?: I): CustomerInfo {
    return CustomerInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CustomerInfo>, I>>(object: I): CustomerInfo {
    const message = createBaseCustomerInfo();
    message.customerId = object.customerId ?? "";
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
