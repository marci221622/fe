/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { SessionData } from "../../entities/session_data.v1";
import { Section, sectionFromJSON, sectionToJSON } from "../../enums/section";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Поиск по вводимым пользователем данным в строку поиска */
export interface SuggestRequest {
  /** Запрос */
  query: string;
  /** Контекст текущей сессии */
  sessionData:
    | SessionData
    | undefined;
  /** гендер */
  section: Section;
}

/** Ответ по поиску */
export interface SuggestResponse {
  /** Данные */
  data: string[];
}

function createBaseSuggestRequest(): SuggestRequest {
  return { query: "", sessionData: undefined, section: 0 };
}

export const SuggestRequest = {
  encode(message: SuggestRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.query !== "") {
      writer.uint32(10).string(message.query);
    }
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(8194).fork()).ldelim();
    }
    if (message.section !== 0) {
      writer.uint32(16).int32(message.section);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SuggestRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSuggestRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.query = reader.string();
          continue;
        case 1024:
          if (tag !== 8194) {
            break;
          }

          message.sessionData = SessionData.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.section = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SuggestRequest {
    return {
      query: isSet(object.query) ? globalThis.String(object.query) : "",
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      section: isSet(object.section) ? sectionFromJSON(object.section) : 0,
    };
  },

  toJSON(message: SuggestRequest): unknown {
    const obj: any = {};
    if (message.query !== "") {
      obj.query = message.query;
    }
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.section !== 0) {
      obj.section = sectionToJSON(message.section);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SuggestRequest>, I>>(base?: I): SuggestRequest {
    return SuggestRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SuggestRequest>, I>>(object: I): SuggestRequest {
    const message = createBaseSuggestRequest();
    message.query = object.query ?? "";
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.section = object.section ?? 0;
    return message;
  },
};

function createBaseSuggestResponse(): SuggestResponse {
  return { data: [] };
}

export const SuggestResponse = {
  encode(message: SuggestResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.data) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SuggestResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSuggestResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.data.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SuggestResponse {
    return { data: globalThis.Array.isArray(object?.data) ? object.data.map((e: any) => globalThis.String(e)) : [] };
  },

  toJSON(message: SuggestResponse): unknown {
    const obj: any = {};
    if (message.data?.length) {
      obj.data = message.data;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SuggestResponse>, I>>(base?: I): SuggestResponse {
    return SuggestResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SuggestResponse>, I>>(object: I): SuggestResponse {
    const message = createBaseSuggestResponse();
    message.data = object.data?.map((e) => e) || [];
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
