/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { BreadCrumbs } from "../../entities/breadcrumbs.v1";
import { SessionData } from "../../entities/session_data.v1";
import { Section, sectionFromJSON, sectionToJSON } from "../../enums/section";

export const protobufPackage = "utp.customer_hub_service.v1";

/** запрос на получение хлебных крошек */
export interface GetBreadCrumbsRequest {
  slug?: string | undefined;
  section: Section;
  itemCode?:
    | string
    | undefined;
  /** Контекст текущей сессии */
  sessionData: SessionData | undefined;
}

/** ответ, содержащий массив хлебных крошек */
export interface GetBreadCrumbsResponse {
  breadCrumbs: BreadCrumbs[];
}

function createBaseGetBreadCrumbsRequest(): GetBreadCrumbsRequest {
  return { slug: undefined, section: 0, itemCode: undefined, sessionData: undefined };
}

export const GetBreadCrumbsRequest = {
  encode(message: GetBreadCrumbsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.slug !== undefined) {
      writer.uint32(10).string(message.slug);
    }
    if (message.section !== 0) {
      writer.uint32(16).int32(message.section);
    }
    if (message.itemCode !== undefined) {
      writer.uint32(26).string(message.itemCode);
    }
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(8194).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetBreadCrumbsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetBreadCrumbsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.slug = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.section = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.itemCode = reader.string();
          continue;
        case 1024:
          if (tag !== 8194) {
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

  fromJSON(object: any): GetBreadCrumbsRequest {
    return {
      slug: isSet(object.slug) ? globalThis.String(object.slug) : undefined,
      section: isSet(object.section) ? sectionFromJSON(object.section) : 0,
      itemCode: isSet(object.itemCode) ? globalThis.String(object.itemCode) : undefined,
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
    };
  },

  toJSON(message: GetBreadCrumbsRequest): unknown {
    const obj: any = {};
    if (message.slug !== undefined) {
      obj.slug = message.slug;
    }
    if (message.section !== 0) {
      obj.section = sectionToJSON(message.section);
    }
    if (message.itemCode !== undefined) {
      obj.itemCode = message.itemCode;
    }
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetBreadCrumbsRequest>, I>>(base?: I): GetBreadCrumbsRequest {
    return GetBreadCrumbsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetBreadCrumbsRequest>, I>>(object: I): GetBreadCrumbsRequest {
    const message = createBaseGetBreadCrumbsRequest();
    message.slug = object.slug ?? undefined;
    message.section = object.section ?? 0;
    message.itemCode = object.itemCode ?? undefined;
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    return message;
  },
};

function createBaseGetBreadCrumbsResponse(): GetBreadCrumbsResponse {
  return { breadCrumbs: [] };
}

export const GetBreadCrumbsResponse = {
  encode(message: GetBreadCrumbsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.breadCrumbs) {
      BreadCrumbs.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetBreadCrumbsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetBreadCrumbsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.breadCrumbs.push(BreadCrumbs.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetBreadCrumbsResponse {
    return {
      breadCrumbs: globalThis.Array.isArray(object?.breadCrumbs)
        ? object.breadCrumbs.map((e: any) => BreadCrumbs.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetBreadCrumbsResponse): unknown {
    const obj: any = {};
    if (message.breadCrumbs?.length) {
      obj.breadCrumbs = message.breadCrumbs.map((e) => BreadCrumbs.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetBreadCrumbsResponse>, I>>(base?: I): GetBreadCrumbsResponse {
    return GetBreadCrumbsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetBreadCrumbsResponse>, I>>(object: I): GetBreadCrumbsResponse {
    const message = createBaseGetBreadCrumbsResponse();
    message.breadCrumbs = object.breadCrumbs?.map((e) => BreadCrumbs.fromPartial(e)) || [];
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
