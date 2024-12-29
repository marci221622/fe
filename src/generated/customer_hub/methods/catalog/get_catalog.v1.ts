/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Catalog } from "../../entities/catalog.v1";
import { SessionData } from "../../entities/session_data.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Запрос каталога */
export interface GetCatalogRequest {
  /** Контекст текущей сессии */
  sessionData:
    | SessionData
    | undefined;
  /**
   * @exclude deprecated at 25.10.2023, delete after 01.10.2023
   *
   * @deprecated
   */
  accessToken?: string | undefined;
}

/** Ответ на запрос каталога */
export interface GetCatalogResponse {
  /** Каталоги */
  catalogs: Catalog[];
}

function createBaseGetCatalogRequest(): GetCatalogRequest {
  return { sessionData: undefined, accessToken: undefined };
}

export const GetCatalogRequest = {
  encode(message: GetCatalogRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(8194).fork()).ldelim();
    }
    if (message.accessToken !== undefined) {
      writer.uint32(10).string(message.accessToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetCatalogRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCatalogRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetCatalogRequest {
    return {
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      accessToken: isSet(object.accessToken) ? globalThis.String(object.accessToken) : undefined,
    };
  },

  toJSON(message: GetCatalogRequest): unknown {
    const obj: any = {};
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.accessToken !== undefined) {
      obj.accessToken = message.accessToken;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetCatalogRequest>, I>>(base?: I): GetCatalogRequest {
    return GetCatalogRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetCatalogRequest>, I>>(object: I): GetCatalogRequest {
    const message = createBaseGetCatalogRequest();
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.accessToken = object.accessToken ?? undefined;
    return message;
  },
};

function createBaseGetCatalogResponse(): GetCatalogResponse {
  return { catalogs: [] };
}

export const GetCatalogResponse = {
  encode(message: GetCatalogResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.catalogs) {
      Catalog.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetCatalogResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCatalogResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.catalogs.push(Catalog.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetCatalogResponse {
    return {
      catalogs: globalThis.Array.isArray(object?.catalogs) ? object.catalogs.map((e: any) => Catalog.fromJSON(e)) : [],
    };
  },

  toJSON(message: GetCatalogResponse): unknown {
    const obj: any = {};
    if (message.catalogs?.length) {
      obj.catalogs = message.catalogs.map((e) => Catalog.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetCatalogResponse>, I>>(base?: I): GetCatalogResponse {
    return GetCatalogResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetCatalogResponse>, I>>(object: I): GetCatalogResponse {
    const message = createBaseGetCatalogResponse();
    message.catalogs = object.catalogs?.map((e) => Catalog.fromPartial(e)) || [];
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
