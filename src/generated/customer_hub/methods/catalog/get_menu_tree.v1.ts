/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Catalog } from "../../entities/catalog.v1";
import { SessionData } from "../../entities/session_data.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Получение "дерева" меню */
export interface GetMenuTreeRequest {
  /** Токен доступа */
  accessToken?:
    | string
    | undefined;
  /** Контекст текущей сессии */
  sessionData: SessionData | undefined;
}

/** "Дерево" меню */
export interface GetMenuTreeResponse {
  /** Каталоги */
  catalogs: Catalog[];
}

function createBaseGetMenuTreeRequest(): GetMenuTreeRequest {
  return { accessToken: undefined, sessionData: undefined };
}

export const GetMenuTreeRequest = {
  encode(message: GetMenuTreeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.accessToken !== undefined) {
      writer.uint32(10).string(message.accessToken);
    }
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetMenuTreeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetMenuTreeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.accessToken = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): GetMenuTreeRequest {
    return {
      accessToken: isSet(object.accessToken) ? globalThis.String(object.accessToken) : undefined,
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
    };
  },

  toJSON(message: GetMenuTreeRequest): unknown {
    const obj: any = {};
    if (message.accessToken !== undefined) {
      obj.accessToken = message.accessToken;
    }
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetMenuTreeRequest>, I>>(base?: I): GetMenuTreeRequest {
    return GetMenuTreeRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetMenuTreeRequest>, I>>(object: I): GetMenuTreeRequest {
    const message = createBaseGetMenuTreeRequest();
    message.accessToken = object.accessToken ?? undefined;
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    return message;
  },
};

function createBaseGetMenuTreeResponse(): GetMenuTreeResponse {
  return { catalogs: [] };
}

export const GetMenuTreeResponse = {
  encode(message: GetMenuTreeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.catalogs) {
      Catalog.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetMenuTreeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetMenuTreeResponse();
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

  fromJSON(object: any): GetMenuTreeResponse {
    return {
      catalogs: globalThis.Array.isArray(object?.catalogs) ? object.catalogs.map((e: any) => Catalog.fromJSON(e)) : [],
    };
  },

  toJSON(message: GetMenuTreeResponse): unknown {
    const obj: any = {};
    if (message.catalogs?.length) {
      obj.catalogs = message.catalogs.map((e) => Catalog.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetMenuTreeResponse>, I>>(base?: I): GetMenuTreeResponse {
    return GetMenuTreeResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetMenuTreeResponse>, I>>(object: I): GetMenuTreeResponse {
    const message = createBaseGetMenuTreeResponse();
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
