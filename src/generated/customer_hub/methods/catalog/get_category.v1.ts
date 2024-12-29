/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Category } from "../../entities/category.v1";
import { SessionData } from "../../entities/session_data.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Запрос на категории каталога */
export interface GetCategoryRequest {
  /** Код категории */
  code: string;
  /**
   * TODO перевести на menu_code надо переводить когда перейдем на Меню
   * Контекст текущей сессии
   */
  sessionData:
    | SessionData
    | undefined;
  /**
   * @exclude deprecated at 25.10.2023, delete after 01.10.2023
   *
   * @deprecated
   */
  accessToken?:
    | string
    | undefined;
  /** @deprecated */
  id: string;
}

/** Ответ на запрос категорий каталога */
export interface GetCategoryResponse {
  /** Категории */
  categories: Category[];
}

function createBaseGetCategoryRequest(): GetCategoryRequest {
  return { code: "", sessionData: undefined, accessToken: undefined, id: "0" };
}

export const GetCategoryRequest = {
  encode(message: GetCategoryRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== "") {
      writer.uint32(26).string(message.code);
    }
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(8194).fork()).ldelim();
    }
    if (message.accessToken !== undefined) {
      writer.uint32(10).string(message.accessToken);
    }
    if (message.id !== "0") {
      writer.uint32(16).int64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetCategoryRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCategoryRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 3:
          if (tag !== 26) {
            break;
          }

          message.code = reader.string();
          continue;
        case 1024:
          if (tag !== 8194) {
            break;
          }

          message.sessionData = SessionData.decode(reader, reader.uint32());
          continue;
        case 1:
          if (tag !== 10) {
            break;
          }

          message.accessToken = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.id = longToString(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetCategoryRequest {
    return {
      code: isSet(object.code) ? globalThis.String(object.code) : "",
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      accessToken: isSet(object.accessToken) ? globalThis.String(object.accessToken) : undefined,
      id: isSet(object.id) ? globalThis.String(object.id) : "0",
    };
  },

  toJSON(message: GetCategoryRequest): unknown {
    const obj: any = {};
    if (message.code !== "") {
      obj.code = message.code;
    }
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.accessToken !== undefined) {
      obj.accessToken = message.accessToken;
    }
    if (message.id !== "0") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetCategoryRequest>, I>>(base?: I): GetCategoryRequest {
    return GetCategoryRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetCategoryRequest>, I>>(object: I): GetCategoryRequest {
    const message = createBaseGetCategoryRequest();
    message.code = object.code ?? "";
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.accessToken = object.accessToken ?? undefined;
    message.id = object.id ?? "0";
    return message;
  },
};

function createBaseGetCategoryResponse(): GetCategoryResponse {
  return { categories: [] };
}

export const GetCategoryResponse = {
  encode(message: GetCategoryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.categories) {
      Category.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetCategoryResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCategoryResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.categories.push(Category.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetCategoryResponse {
    return {
      categories: globalThis.Array.isArray(object?.categories)
        ? object.categories.map((e: any) => Category.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetCategoryResponse): unknown {
    const obj: any = {};
    if (message.categories?.length) {
      obj.categories = message.categories.map((e) => Category.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetCategoryResponse>, I>>(base?: I): GetCategoryResponse {
    return GetCategoryResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetCategoryResponse>, I>>(object: I): GetCategoryResponse {
    const message = createBaseGetCategoryResponse();
    message.categories = object.categories?.map((e) => Category.fromPartial(e)) || [];
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

function longToString(long: Long) {
  return long.toString();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
