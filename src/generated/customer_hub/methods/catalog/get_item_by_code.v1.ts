/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Item } from "../../entities/item.v1";
import { Loyalty } from "../../entities/loyalty.v1";
import { SessionData } from "../../entities/session_data.v1";
import { Section, sectionFromJSON, sectionToJSON } from "../../enums/section";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Запрос на получение товара по коду */
export interface GetItemByCodeRequest {
  /** Код товара */
  code: string;
  /** Контекст текущей сессии */
  sessionData:
    | SessionData
    | undefined;
  /** Секция */
  section?:
    | Section
    | undefined;
  /**
   * @exclude deprecated at 25.10.2023, delete after 01.10.2023
   *
   * @deprecated
   */
  accessToken?: string | undefined;
}

/** Ответ на запрос товара по коду */
export interface GetItemByCodeResponse {
  /** Товар */
  item:
    | Item
    | undefined;
  /** Описание промо-акций */
  loyalty?: Loyalty | undefined;
}

function createBaseGetItemByCodeRequest(): GetItemByCodeRequest {
  return { code: "", sessionData: undefined, section: undefined, accessToken: undefined };
}

export const GetItemByCodeRequest = {
  encode(message: GetItemByCodeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== "") {
      writer.uint32(18).string(message.code);
    }
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(26).fork()).ldelim();
    }
    if (message.section !== undefined) {
      writer.uint32(32).int32(message.section);
    }
    if (message.accessToken !== undefined) {
      writer.uint32(10).string(message.accessToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetItemByCodeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetItemByCodeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.code = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.sessionData = SessionData.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.section = reader.int32() as any;
          continue;
        case 1:
          if (tag !== 10) {
            break;
          }

          message.accessToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetItemByCodeRequest {
    return {
      code: isSet(object.code) ? globalThis.String(object.code) : "",
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      section: isSet(object.section) ? sectionFromJSON(object.section) : undefined,
      accessToken: isSet(object.accessToken) ? globalThis.String(object.accessToken) : undefined,
    };
  },

  toJSON(message: GetItemByCodeRequest): unknown {
    const obj: any = {};
    if (message.code !== "") {
      obj.code = message.code;
    }
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.section !== undefined) {
      obj.section = sectionToJSON(message.section);
    }
    if (message.accessToken !== undefined) {
      obj.accessToken = message.accessToken;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetItemByCodeRequest>, I>>(base?: I): GetItemByCodeRequest {
    return GetItemByCodeRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetItemByCodeRequest>, I>>(object: I): GetItemByCodeRequest {
    const message = createBaseGetItemByCodeRequest();
    message.code = object.code ?? "";
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.section = object.section ?? undefined;
    message.accessToken = object.accessToken ?? undefined;
    return message;
  },
};

function createBaseGetItemByCodeResponse(): GetItemByCodeResponse {
  return { item: undefined, loyalty: undefined };
}

export const GetItemByCodeResponse = {
  encode(message: GetItemByCodeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.item !== undefined) {
      Item.encode(message.item, writer.uint32(10).fork()).ldelim();
    }
    if (message.loyalty !== undefined) {
      Loyalty.encode(message.loyalty, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetItemByCodeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetItemByCodeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.item = Item.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): GetItemByCodeResponse {
    return {
      item: isSet(object.item) ? Item.fromJSON(object.item) : undefined,
      loyalty: isSet(object.loyalty) ? Loyalty.fromJSON(object.loyalty) : undefined,
    };
  },

  toJSON(message: GetItemByCodeResponse): unknown {
    const obj: any = {};
    if (message.item !== undefined) {
      obj.item = Item.toJSON(message.item);
    }
    if (message.loyalty !== undefined) {
      obj.loyalty = Loyalty.toJSON(message.loyalty);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetItemByCodeResponse>, I>>(base?: I): GetItemByCodeResponse {
    return GetItemByCodeResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetItemByCodeResponse>, I>>(object: I): GetItemByCodeResponse {
    const message = createBaseGetItemByCodeResponse();
    message.item = (object.item !== undefined && object.item !== null) ? Item.fromPartial(object.item) : undefined;
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
