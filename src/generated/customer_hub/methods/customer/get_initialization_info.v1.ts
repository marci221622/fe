/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { AddressData } from "../../entities/address.v1";
import { Brand } from "../../entities/brand.v1";
import { SessionData } from "../../entities/session_data.v1";
import { Section, sectionFromJSON, sectionToJSON } from "../../enums/section";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Запрос на получение информации для инициализации приложения */
export interface GetInitializationInfoRequest {
  /** Контекст текущей сессии */
  sessionData:
    | SessionData
    | undefined;
  /** Псевдо идентификатор пользователя */
  userPseudoId?: string | undefined;
}

/** Ответ на запрос на получение информации для инициализации приложения */
export interface GetInitializationInfoResponse {
  /** Список избранных брендов для онбординга */
  onboardingBrands: OnboardingFavoriteBrands[];
  /** Определенный по ip адрес пользователя */
  addressData: AddressData | undefined;
}

/** Бренды для онбординга */
export interface OnboardingFavoriteBrands {
  /** Секция */
  section: Section;
  /** Список брендов */
  brands: Brand[];
}

function createBaseGetInitializationInfoRequest(): GetInitializationInfoRequest {
  return { sessionData: undefined, userPseudoId: undefined };
}

export const GetInitializationInfoRequest = {
  encode(message: GetInitializationInfoRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(10).fork()).ldelim();
    }
    if (message.userPseudoId !== undefined) {
      writer.uint32(18).string(message.userPseudoId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetInitializationInfoRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetInitializationInfoRequest();
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

          message.userPseudoId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetInitializationInfoRequest {
    return {
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      userPseudoId: isSet(object.userPseudoId) ? globalThis.String(object.userPseudoId) : undefined,
    };
  },

  toJSON(message: GetInitializationInfoRequest): unknown {
    const obj: any = {};
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.userPseudoId !== undefined) {
      obj.userPseudoId = message.userPseudoId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetInitializationInfoRequest>, I>>(base?: I): GetInitializationInfoRequest {
    return GetInitializationInfoRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetInitializationInfoRequest>, I>>(object: I): GetInitializationInfoRequest {
    const message = createBaseGetInitializationInfoRequest();
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.userPseudoId = object.userPseudoId ?? undefined;
    return message;
  },
};

function createBaseGetInitializationInfoResponse(): GetInitializationInfoResponse {
  return { onboardingBrands: [], addressData: undefined };
}

export const GetInitializationInfoResponse = {
  encode(message: GetInitializationInfoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.onboardingBrands) {
      OnboardingFavoriteBrands.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.addressData !== undefined) {
      AddressData.encode(message.addressData, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetInitializationInfoResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetInitializationInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.onboardingBrands.push(OnboardingFavoriteBrands.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.addressData = AddressData.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetInitializationInfoResponse {
    return {
      onboardingBrands: globalThis.Array.isArray(object?.onboardingBrands)
        ? object.onboardingBrands.map((e: any) => OnboardingFavoriteBrands.fromJSON(e))
        : [],
      addressData: isSet(object.addressData) ? AddressData.fromJSON(object.addressData) : undefined,
    };
  },

  toJSON(message: GetInitializationInfoResponse): unknown {
    const obj: any = {};
    if (message.onboardingBrands?.length) {
      obj.onboardingBrands = message.onboardingBrands.map((e) => OnboardingFavoriteBrands.toJSON(e));
    }
    if (message.addressData !== undefined) {
      obj.addressData = AddressData.toJSON(message.addressData);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetInitializationInfoResponse>, I>>(base?: I): GetInitializationInfoResponse {
    return GetInitializationInfoResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetInitializationInfoResponse>, I>>(
    object: I,
  ): GetInitializationInfoResponse {
    const message = createBaseGetInitializationInfoResponse();
    message.onboardingBrands = object.onboardingBrands?.map((e) => OnboardingFavoriteBrands.fromPartial(e)) || [];
    message.addressData = (object.addressData !== undefined && object.addressData !== null)
      ? AddressData.fromPartial(object.addressData)
      : undefined;
    return message;
  },
};

function createBaseOnboardingFavoriteBrands(): OnboardingFavoriteBrands {
  return { section: 0, brands: [] };
}

export const OnboardingFavoriteBrands = {
  encode(message: OnboardingFavoriteBrands, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.section !== 0) {
      writer.uint32(8).int32(message.section);
    }
    for (const v of message.brands) {
      Brand.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OnboardingFavoriteBrands {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOnboardingFavoriteBrands();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.section = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.brands.push(Brand.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OnboardingFavoriteBrands {
    return {
      section: isSet(object.section) ? sectionFromJSON(object.section) : 0,
      brands: globalThis.Array.isArray(object?.brands) ? object.brands.map((e: any) => Brand.fromJSON(e)) : [],
    };
  },

  toJSON(message: OnboardingFavoriteBrands): unknown {
    const obj: any = {};
    if (message.section !== 0) {
      obj.section = sectionToJSON(message.section);
    }
    if (message.brands?.length) {
      obj.brands = message.brands.map((e) => Brand.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<OnboardingFavoriteBrands>, I>>(base?: I): OnboardingFavoriteBrands {
    return OnboardingFavoriteBrands.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<OnboardingFavoriteBrands>, I>>(object: I): OnboardingFavoriteBrands {
    const message = createBaseOnboardingFavoriteBrands();
    message.section = object.section ?? 0;
    message.brands = object.brands?.map((e) => Brand.fromPartial(e)) || [];
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
