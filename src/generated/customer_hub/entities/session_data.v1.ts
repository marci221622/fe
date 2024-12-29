/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Platform, platformFromJSON, platformToJSON } from "../enums/platform";

export const protobufPackage = "utp.customer_hub_service.v1";

/** типа ключей информации о пользователе */
export enum AppInfoField {
  /** APP_INFO_FIELD_UNSPECIFIED - не указано */
  APP_INFO_FIELD_UNSPECIFIED = 0,
  /** APP_INFO_FIELD_APP_VERSION - semver версия приложения */
  APP_INFO_FIELD_APP_VERSION = 1,
  /** APP_INFO_FIELD_PLATFORM_OS_VERSION - версия операционное системы (для веба браузер) */
  APP_INFO_FIELD_PLATFORM_OS_VERSION = 2,
  /** APP_INFO_FIELD_BUILD - билд */
  APP_INFO_FIELD_BUILD = 3,
  /**
   * APP_INFO_FIELD_PLATFORM - дублирую уже имеющееся поле, мне кажется это логично, собрать такую инфу вместе
   * PlatformTypeIOS = "ios" PlatformTypeANDROID = "android" PlatformTypeWEB = "web"
   */
  APP_INFO_FIELD_PLATFORM = 4,
  /**
   * APP_INFO_FIELD_SOURCE - источник запроса
   * пустая строка или не передано - обычный запрос приложения Collect
   * tsum - запрос с соответствующей платформы ЦУМа
   */
  APP_INFO_FIELD_SOURCE = 5,
  UNRECOGNIZED = -1,
}

export function appInfoFieldFromJSON(object: any): AppInfoField {
  switch (object) {
    case 0:
    case "APP_INFO_FIELD_UNSPECIFIED":
      return AppInfoField.APP_INFO_FIELD_UNSPECIFIED;
    case 1:
    case "APP_INFO_FIELD_APP_VERSION":
      return AppInfoField.APP_INFO_FIELD_APP_VERSION;
    case 2:
    case "APP_INFO_FIELD_PLATFORM_OS_VERSION":
      return AppInfoField.APP_INFO_FIELD_PLATFORM_OS_VERSION;
    case 3:
    case "APP_INFO_FIELD_BUILD":
      return AppInfoField.APP_INFO_FIELD_BUILD;
    case 4:
    case "APP_INFO_FIELD_PLATFORM":
      return AppInfoField.APP_INFO_FIELD_PLATFORM;
    case 5:
    case "APP_INFO_FIELD_SOURCE":
      return AppInfoField.APP_INFO_FIELD_SOURCE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AppInfoField.UNRECOGNIZED;
  }
}

export function appInfoFieldToJSON(object: AppInfoField): string {
  switch (object) {
    case AppInfoField.APP_INFO_FIELD_UNSPECIFIED:
      return "APP_INFO_FIELD_UNSPECIFIED";
    case AppInfoField.APP_INFO_FIELD_APP_VERSION:
      return "APP_INFO_FIELD_APP_VERSION";
    case AppInfoField.APP_INFO_FIELD_PLATFORM_OS_VERSION:
      return "APP_INFO_FIELD_PLATFORM_OS_VERSION";
    case AppInfoField.APP_INFO_FIELD_BUILD:
      return "APP_INFO_FIELD_BUILD";
    case AppInfoField.APP_INFO_FIELD_PLATFORM:
      return "APP_INFO_FIELD_PLATFORM";
    case AppInfoField.APP_INFO_FIELD_SOURCE:
      return "APP_INFO_FIELD_SOURCE";
    case AppInfoField.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Описывает контекст текущей сессии */
export interface SessionData {
  /** Код сессии чекаута, сгенеренный фронт-приложением (см. https://jira.int.tsum.com/browse/PO-95) */
  code?:
    | string
    | undefined;
  /** Цифровой отпечаток устройства пользователя */
  deviceFingerprint: string;
  /** Идентификатор мобильной платформы, используемый для отправки push-уведомлений */
  deviceId?:
    | string
    | undefined;
  /** Маркер доступа, полученный при авторизации пользователя */
  accessToken?:
    | string
    | undefined;
  /** При наличии выбора региона (например, "Ваш регион Казань?"), выбор пользователя передается в этом поле */
  region?:
    | string
    | undefined;
  /** Название временной зоны на устройстве пользователя (см. TZ database name https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) */
  timezone?:
    | string
    | undefined;
  /** Локаль устройства/браузера в формате BCP 47 (ru-RU) или ISO 639-1 (ru) */
  locale?:
    | string
    | undefined;
  /** данные об устройстве пользователя */
  infoFields: InfoField[];
  /** аб тесты */
  ab:
    | ABtest
    | undefined;
  /** Ключ идемпотентности запроса, чтобы определять уникальные сообщения, uuid4 */
  requestToken: string;
  /**
   * @exclude deprecated at 25.10.2023, delete after 01.10.2023
   *
   * @deprecated
   */
  ip?:
    | string
    | undefined;
  /** @deprecated */
  platform: Platform;
}

/** поля с информацией об устройстве пользователя */
export interface InfoField {
  /** ключ */
  key: AppInfoField;
  /** значение */
  value: string;
}

/** ABtest мапа с аб тестами */
export interface ABtest {
  /** тесты */
  tests: { [key: string]: string };
}

export interface ABtest_TestsEntry {
  key: string;
  value: string;
}

function createBaseSessionData(): SessionData {
  return {
    code: undefined,
    deviceFingerprint: "",
    deviceId: undefined,
    accessToken: undefined,
    region: undefined,
    timezone: undefined,
    locale: undefined,
    infoFields: [],
    ab: undefined,
    requestToken: "",
    ip: undefined,
    platform: 0,
  };
}

export const SessionData = {
  encode(message: SessionData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== undefined) {
      writer.uint32(10).string(message.code);
    }
    if (message.deviceFingerprint !== "") {
      writer.uint32(18).string(message.deviceFingerprint);
    }
    if (message.deviceId !== undefined) {
      writer.uint32(26).string(message.deviceId);
    }
    if (message.accessToken !== undefined) {
      writer.uint32(34).string(message.accessToken);
    }
    if (message.region !== undefined) {
      writer.uint32(58).string(message.region);
    }
    if (message.timezone !== undefined) {
      writer.uint32(66).string(message.timezone);
    }
    if (message.locale !== undefined) {
      writer.uint32(74).string(message.locale);
    }
    for (const v of message.infoFields) {
      InfoField.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    if (message.ab !== undefined) {
      ABtest.encode(message.ab, writer.uint32(90).fork()).ldelim();
    }
    if (message.requestToken !== "") {
      writer.uint32(98).string(message.requestToken);
    }
    if (message.ip !== undefined) {
      writer.uint32(42).string(message.ip);
    }
    if (message.platform !== 0) {
      writer.uint32(48).int32(message.platform);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SessionData {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSessionData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.code = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.deviceFingerprint = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.deviceId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.accessToken = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.region = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.timezone = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.locale = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.infoFields.push(InfoField.decode(reader, reader.uint32()));
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.ab = ABtest.decode(reader, reader.uint32());
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.requestToken = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.ip = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.platform = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SessionData {
    return {
      code: isSet(object.code) ? globalThis.String(object.code) : undefined,
      deviceFingerprint: isSet(object.deviceFingerprint) ? globalThis.String(object.deviceFingerprint) : "",
      deviceId: isSet(object.deviceId) ? globalThis.String(object.deviceId) : undefined,
      accessToken: isSet(object.accessToken) ? globalThis.String(object.accessToken) : undefined,
      region: isSet(object.region) ? globalThis.String(object.region) : undefined,
      timezone: isSet(object.timezone) ? globalThis.String(object.timezone) : undefined,
      locale: isSet(object.locale) ? globalThis.String(object.locale) : undefined,
      infoFields: globalThis.Array.isArray(object?.infoFields)
        ? object.infoFields.map((e: any) => InfoField.fromJSON(e))
        : [],
      ab: isSet(object.ab) ? ABtest.fromJSON(object.ab) : undefined,
      requestToken: isSet(object.requestToken) ? globalThis.String(object.requestToken) : "",
      ip: isSet(object.ip) ? globalThis.String(object.ip) : undefined,
      platform: isSet(object.platform) ? platformFromJSON(object.platform) : 0,
    };
  },

  toJSON(message: SessionData): unknown {
    const obj: any = {};
    if (message.code !== undefined) {
      obj.code = message.code;
    }
    if (message.deviceFingerprint !== "") {
      obj.deviceFingerprint = message.deviceFingerprint;
    }
    if (message.deviceId !== undefined) {
      obj.deviceId = message.deviceId;
    }
    if (message.accessToken !== undefined) {
      obj.accessToken = message.accessToken;
    }
    if (message.region !== undefined) {
      obj.region = message.region;
    }
    if (message.timezone !== undefined) {
      obj.timezone = message.timezone;
    }
    if (message.locale !== undefined) {
      obj.locale = message.locale;
    }
    if (message.infoFields?.length) {
      obj.infoFields = message.infoFields.map((e) => InfoField.toJSON(e));
    }
    if (message.ab !== undefined) {
      obj.ab = ABtest.toJSON(message.ab);
    }
    if (message.requestToken !== "") {
      obj.requestToken = message.requestToken;
    }
    if (message.ip !== undefined) {
      obj.ip = message.ip;
    }
    if (message.platform !== 0) {
      obj.platform = platformToJSON(message.platform);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SessionData>, I>>(base?: I): SessionData {
    return SessionData.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SessionData>, I>>(object: I): SessionData {
    const message = createBaseSessionData();
    message.code = object.code ?? undefined;
    message.deviceFingerprint = object.deviceFingerprint ?? "";
    message.deviceId = object.deviceId ?? undefined;
    message.accessToken = object.accessToken ?? undefined;
    message.region = object.region ?? undefined;
    message.timezone = object.timezone ?? undefined;
    message.locale = object.locale ?? undefined;
    message.infoFields = object.infoFields?.map((e) => InfoField.fromPartial(e)) || [];
    message.ab = (object.ab !== undefined && object.ab !== null) ? ABtest.fromPartial(object.ab) : undefined;
    message.requestToken = object.requestToken ?? "";
    message.ip = object.ip ?? undefined;
    message.platform = object.platform ?? 0;
    return message;
  },
};

function createBaseInfoField(): InfoField {
  return { key: 0, value: "" };
}

export const InfoField = {
  encode(message: InfoField, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== 0) {
      writer.uint32(8).int32(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InfoField {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInfoField();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.key = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): InfoField {
    return {
      key: isSet(object.key) ? appInfoFieldFromJSON(object.key) : 0,
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: InfoField): unknown {
    const obj: any = {};
    if (message.key !== 0) {
      obj.key = appInfoFieldToJSON(message.key);
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<InfoField>, I>>(base?: I): InfoField {
    return InfoField.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<InfoField>, I>>(object: I): InfoField {
    const message = createBaseInfoField();
    message.key = object.key ?? 0;
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseABtest(): ABtest {
  return { tests: {} };
}

export const ABtest = {
  encode(message: ABtest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.tests).forEach(([key, value]) => {
      ABtest_TestsEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ABtest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseABtest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          const entry1 = ABtest_TestsEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.tests[entry1.key] = entry1.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ABtest {
    return {
      tests: isObject(object.tests)
        ? Object.entries(object.tests).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: ABtest): unknown {
    const obj: any = {};
    if (message.tests) {
      const entries = Object.entries(message.tests);
      if (entries.length > 0) {
        obj.tests = {};
        entries.forEach(([k, v]) => {
          obj.tests[k] = v;
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ABtest>, I>>(base?: I): ABtest {
    return ABtest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ABtest>, I>>(object: I): ABtest {
    const message = createBaseABtest();
    message.tests = Object.entries(object.tests ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = globalThis.String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseABtest_TestsEntry(): ABtest_TestsEntry {
  return { key: "", value: "" };
}

export const ABtest_TestsEntry = {
  encode(message: ABtest_TestsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ABtest_TestsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseABtest_TestsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ABtest_TestsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: ABtest_TestsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ABtest_TestsEntry>, I>>(base?: I): ABtest_TestsEntry {
    return ABtest_TestsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ABtest_TestsEntry>, I>>(object: I): ABtest_TestsEntry {
    const message = createBaseABtest_TestsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
