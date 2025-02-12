/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Duration } from "../google/protobuf/duration";
import { Timestamp } from "../google/protobuf/timestamp";

export const protobufPackage = "validate";

/** WellKnownRegex contain some well-known patterns. */
export enum KnownRegex {
  UNKNOWN = 0,
  /** HTTP_HEADER_NAME - HTTP header name as defined by RFC 7230. */
  HTTP_HEADER_NAME = 1,
  /** HTTP_HEADER_VALUE - HTTP header value as defined by RFC 7230. */
  HTTP_HEADER_VALUE = 2,
  UNRECOGNIZED = -1,
}

export function knownRegexFromJSON(object: any): KnownRegex {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return KnownRegex.UNKNOWN;
    case 1:
    case "HTTP_HEADER_NAME":
      return KnownRegex.HTTP_HEADER_NAME;
    case 2:
    case "HTTP_HEADER_VALUE":
      return KnownRegex.HTTP_HEADER_VALUE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return KnownRegex.UNRECOGNIZED;
  }
}

export function knownRegexToJSON(object: KnownRegex): string {
  switch (object) {
    case KnownRegex.UNKNOWN:
      return "UNKNOWN";
    case KnownRegex.HTTP_HEADER_NAME:
      return "HTTP_HEADER_NAME";
    case KnownRegex.HTTP_HEADER_VALUE:
      return "HTTP_HEADER_VALUE";
    case KnownRegex.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * FieldRules encapsulates the rules for each type of field. Depending on the
 * field, the correct set should be used to ensure proper validations.
 */
export interface FieldRules {
  message?:
    | MessageRules
    | undefined;
  /** Scalar Field Types */
  float?: FloatRules | undefined;
  double?: DoubleRules | undefined;
  int32?: Int32Rules | undefined;
  int64?: Int64Rules | undefined;
  uint32?: UInt32Rules | undefined;
  uint64?: UInt64Rules | undefined;
  sint32?: SInt32Rules | undefined;
  sint64?: SInt64Rules | undefined;
  fixed32?: Fixed32Rules | undefined;
  fixed64?: Fixed64Rules | undefined;
  sfixed32?: SFixed32Rules | undefined;
  sfixed64?: SFixed64Rules | undefined;
  bool?: BoolRules | undefined;
  string?: StringRules | undefined;
  bytes?:
    | BytesRules
    | undefined;
  /** Complex Field Types */
  enum?: EnumRules | undefined;
  repeated?: RepeatedRules | undefined;
  map?:
    | MapRules
    | undefined;
  /** Well-Known Field Types */
  any?: AnyRules | undefined;
  duration?: DurationRules | undefined;
  timestamp?: TimestampRules | undefined;
}

/** FloatRules describes the constraints applied to `float` values */
export interface FloatRules {
  /** Const specifies that this field must be exactly the specified value */
  const?:
    | number
    | undefined;
  /**
   * Lt specifies that this field must be less than the specified value,
   * exclusive
   */
  lt?:
    | number
    | undefined;
  /**
   * Lte specifies that this field must be less than or equal to the
   * specified value, inclusive
   */
  lte?:
    | number
    | undefined;
  /**
   * Gt specifies that this field must be greater than the specified value,
   * exclusive. If the value of Gt is larger than a specified Lt or Lte, the
   * range is reversed.
   */
  gt?:
    | number
    | undefined;
  /**
   * Gte specifies that this field must be greater than or equal to the
   * specified value, inclusive. If the value of Gte is larger than a
   * specified Lt or Lte, the range is reversed.
   */
  gte?:
    | number
    | undefined;
  /**
   * In specifies that this field must be equal to one of the specified
   * values
   */
  in: number[];
  /**
   * NotIn specifies that this field cannot be equal to one of the specified
   * values
   */
  notIn: number[];
  /**
   * IgnoreEmpty specifies that the validation rules of this field should be
   * evaluated only if the field is not empty
   */
  ignoreEmpty?: boolean | undefined;
}

/** DoubleRules describes the constraints applied to `double` values */
export interface DoubleRules {
  /** Const specifies that this field must be exactly the specified value */
  const?:
    | number
    | undefined;
  /**
   * Lt specifies that this field must be less than the specified value,
   * exclusive
   */
  lt?:
    | number
    | undefined;
  /**
   * Lte specifies that this field must be less than or equal to the
   * specified value, inclusive
   */
  lte?:
    | number
    | undefined;
  /**
   * Gt specifies that this field must be greater than the specified value,
   * exclusive. If the value of Gt is larger than a specified Lt or Lte, the
   * range is reversed.
   */
  gt?:
    | number
    | undefined;
  /**
   * Gte specifies that this field must be greater than or equal to the
   * specified value, inclusive. If the value of Gte is larger than a
   * specified Lt or Lte, the range is reversed.
   */
  gte?:
    | number
    | undefined;
  /**
   * In specifies that this field must be equal to one of the specified
   * values
   */
  in: number[];
  /**
   * NotIn specifies that this field cannot be equal to one of the specified
   * values
   */
  notIn: number[];
  /**
   * IgnoreEmpty specifies that the validation rules of this field should be
   * evaluated only if the field is not empty
   */
  ignoreEmpty?: boolean | undefined;
  latitude?: boolean | undefined;
  longitude?: boolean | undefined;
}

/** Int32Rules describes the constraints applied to `int32` values */
export interface Int32Rules {
  /** Const specifies that this field must be exactly the specified value */
  const?:
    | number
    | undefined;
  /**
   * Lt specifies that this field must be less than the specified value,
   * exclusive
   */
  lt?:
    | number
    | undefined;
  /**
   * Lte specifies that this field must be less than or equal to the
   * specified value, inclusive
   */
  lte?:
    | number
    | undefined;
  /**
   * Gt specifies that this field must be greater than the specified value,
   * exclusive. If the value of Gt is larger than a specified Lt or Lte, the
   * range is reversed.
   */
  gt?:
    | number
    | undefined;
  /**
   * Gte specifies that this field must be greater than or equal to the
   * specified value, inclusive. If the value of Gte is larger than a
   * specified Lt or Lte, the range is reversed.
   */
  gte?:
    | number
    | undefined;
  /**
   * In specifies that this field must be equal to one of the specified
   * values
   */
  in: number[];
  /**
   * NotIn specifies that this field cannot be equal to one of the specified
   * values
   */
  notIn: number[];
  /**
   * IgnoreEmpty specifies that the validation rules of this field should be
   * evaluated only if the field is not empty
   */
  ignoreEmpty?: boolean | undefined;
}

/** Int64Rules describes the constraints applied to `int64` values */
export interface Int64Rules {
  /** Const specifies that this field must be exactly the specified value */
  const?:
    | string
    | undefined;
  /**
   * Lt specifies that this field must be less than the specified value,
   * exclusive
   */
  lt?:
    | string
    | undefined;
  /**
   * Lte specifies that this field must be less than or equal to the
   * specified value, inclusive
   */
  lte?:
    | string
    | undefined;
  /**
   * Gt specifies that this field must be greater than the specified value,
   * exclusive. If the value of Gt is larger than a specified Lt or Lte, the
   * range is reversed.
   */
  gt?:
    | string
    | undefined;
  /**
   * Gte specifies that this field must be greater than or equal to the
   * specified value, inclusive. If the value of Gte is larger than a
   * specified Lt or Lte, the range is reversed.
   */
  gte?:
    | string
    | undefined;
  /**
   * In specifies that this field must be equal to one of the specified
   * values
   */
  in: string[];
  /**
   * NotIn specifies that this field cannot be equal to one of the specified
   * values
   */
  notIn: string[];
  /**
   * IgnoreEmpty specifies that the validation rules of this field should be
   * evaluated only if the field is not empty
   */
  ignoreEmpty?: boolean | undefined;
}

/** UInt32Rules describes the constraints applied to `uint32` values */
export interface UInt32Rules {
  /** Const specifies that this field must be exactly the specified value */
  const?:
    | number
    | undefined;
  /**
   * Lt specifies that this field must be less than the specified value,
   * exclusive
   */
  lt?:
    | number
    | undefined;
  /**
   * Lte specifies that this field must be less than or equal to the
   * specified value, inclusive
   */
  lte?:
    | number
    | undefined;
  /**
   * Gt specifies that this field must be greater than the specified value,
   * exclusive. If the value of Gt is larger than a specified Lt or Lte, the
   * range is reversed.
   */
  gt?:
    | number
    | undefined;
  /**
   * Gte specifies that this field must be greater than or equal to the
   * specified value, inclusive. If the value of Gte is larger than a
   * specified Lt or Lte, the range is reversed.
   */
  gte?:
    | number
    | undefined;
  /**
   * In specifies that this field must be equal to one of the specified
   * values
   */
  in: number[];
  /**
   * NotIn specifies that this field cannot be equal to one of the specified
   * values
   */
  notIn: number[];
  /**
   * IgnoreEmpty specifies that the validation rules of this field should be
   * evaluated only if the field is not empty
   */
  ignoreEmpty?: boolean | undefined;
}

/** UInt64Rules describes the constraints applied to `uint64` values */
export interface UInt64Rules {
  /** Const specifies that this field must be exactly the specified value */
  const?:
    | string
    | undefined;
  /**
   * Lt specifies that this field must be less than the specified value,
   * exclusive
   */
  lt?:
    | string
    | undefined;
  /**
   * Lte specifies that this field must be less than or equal to the
   * specified value, inclusive
   */
  lte?:
    | string
    | undefined;
  /**
   * Gt specifies that this field must be greater than the specified value,
   * exclusive. If the value of Gt is larger than a specified Lt or Lte, the
   * range is reversed.
   */
  gt?:
    | string
    | undefined;
  /**
   * Gte specifies that this field must be greater than or equal to the
   * specified value, inclusive. If the value of Gte is larger than a
   * specified Lt or Lte, the range is reversed.
   */
  gte?:
    | string
    | undefined;
  /**
   * In specifies that this field must be equal to one of the specified
   * values
   */
  in: string[];
  /**
   * NotIn specifies that this field cannot be equal to one of the specified
   * values
   */
  notIn: string[];
  /**
   * IgnoreEmpty specifies that the validation rules of this field should be
   * evaluated only if the field is not empty
   */
  ignoreEmpty?: boolean | undefined;
}

/** SInt32Rules describes the constraints applied to `sint32` values */
export interface SInt32Rules {
  /** Const specifies that this field must be exactly the specified value */
  const?:
    | number
    | undefined;
  /**
   * Lt specifies that this field must be less than the specified value,
   * exclusive
   */
  lt?:
    | number
    | undefined;
  /**
   * Lte specifies that this field must be less than or equal to the
   * specified value, inclusive
   */
  lte?:
    | number
    | undefined;
  /**
   * Gt specifies that this field must be greater than the specified value,
   * exclusive. If the value of Gt is larger than a specified Lt or Lte, the
   * range is reversed.
   */
  gt?:
    | number
    | undefined;
  /**
   * Gte specifies that this field must be greater than or equal to the
   * specified value, inclusive. If the value of Gte is larger than a
   * specified Lt or Lte, the range is reversed.
   */
  gte?:
    | number
    | undefined;
  /**
   * In specifies that this field must be equal to one of the specified
   * values
   */
  in: number[];
  /**
   * NotIn specifies that this field cannot be equal to one of the specified
   * values
   */
  notIn: number[];
  /**
   * IgnoreEmpty specifies that the validation rules of this field should be
   * evaluated only if the field is not empty
   */
  ignoreEmpty?: boolean | undefined;
}

/** SInt64Rules describes the constraints applied to `sint64` values */
export interface SInt64Rules {
  /** Const specifies that this field must be exactly the specified value */
  const?:
    | string
    | undefined;
  /**
   * Lt specifies that this field must be less than the specified value,
   * exclusive
   */
  lt?:
    | string
    | undefined;
  /**
   * Lte specifies that this field must be less than or equal to the
   * specified value, inclusive
   */
  lte?:
    | string
    | undefined;
  /**
   * Gt specifies that this field must be greater than the specified value,
   * exclusive. If the value of Gt is larger than a specified Lt or Lte, the
   * range is reversed.
   */
  gt?:
    | string
    | undefined;
  /**
   * Gte specifies that this field must be greater than or equal to the
   * specified value, inclusive. If the value of Gte is larger than a
   * specified Lt or Lte, the range is reversed.
   */
  gte?:
    | string
    | undefined;
  /**
   * In specifies that this field must be equal to one of the specified
   * values
   */
  in: string[];
  /**
   * NotIn specifies that this field cannot be equal to one of the specified
   * values
   */
  notIn: string[];
  /**
   * IgnoreEmpty specifies that the validation rules of this field should be
   * evaluated only if the field is not empty
   */
  ignoreEmpty?: boolean | undefined;
}

/** Fixed32Rules describes the constraints applied to `fixed32` values */
export interface Fixed32Rules {
  /** Const specifies that this field must be exactly the specified value */
  const?:
    | number
    | undefined;
  /**
   * Lt specifies that this field must be less than the specified value,
   * exclusive
   */
  lt?:
    | number
    | undefined;
  /**
   * Lte specifies that this field must be less than or equal to the
   * specified value, inclusive
   */
  lte?:
    | number
    | undefined;
  /**
   * Gt specifies that this field must be greater than the specified value,
   * exclusive. If the value of Gt is larger than a specified Lt or Lte, the
   * range is reversed.
   */
  gt?:
    | number
    | undefined;
  /**
   * Gte specifies that this field must be greater than or equal to the
   * specified value, inclusive. If the value of Gte is larger than a
   * specified Lt or Lte, the range is reversed.
   */
  gte?:
    | number
    | undefined;
  /**
   * In specifies that this field must be equal to one of the specified
   * values
   */
  in: number[];
  /**
   * NotIn specifies that this field cannot be equal to one of the specified
   * values
   */
  notIn: number[];
  /**
   * IgnoreEmpty specifies that the validation rules of this field should be
   * evaluated only if the field is not empty
   */
  ignoreEmpty?: boolean | undefined;
}

/** Fixed64Rules describes the constraints applied to `fixed64` values */
export interface Fixed64Rules {
  /** Const specifies that this field must be exactly the specified value */
  const?:
    | string
    | undefined;
  /**
   * Lt specifies that this field must be less than the specified value,
   * exclusive
   */
  lt?:
    | string
    | undefined;
  /**
   * Lte specifies that this field must be less than or equal to the
   * specified value, inclusive
   */
  lte?:
    | string
    | undefined;
  /**
   * Gt specifies that this field must be greater than the specified value,
   * exclusive. If the value of Gt is larger than a specified Lt or Lte, the
   * range is reversed.
   */
  gt?:
    | string
    | undefined;
  /**
   * Gte specifies that this field must be greater than or equal to the
   * specified value, inclusive. If the value of Gte is larger than a
   * specified Lt or Lte, the range is reversed.
   */
  gte?:
    | string
    | undefined;
  /**
   * In specifies that this field must be equal to one of the specified
   * values
   */
  in: string[];
  /**
   * NotIn specifies that this field cannot be equal to one of the specified
   * values
   */
  notIn: string[];
  /**
   * IgnoreEmpty specifies that the validation rules of this field should be
   * evaluated only if the field is not empty
   */
  ignoreEmpty?: boolean | undefined;
}

/** SFixed32Rules describes the constraints applied to `sfixed32` values */
export interface SFixed32Rules {
  /** Const specifies that this field must be exactly the specified value */
  const?:
    | number
    | undefined;
  /**
   * Lt specifies that this field must be less than the specified value,
   * exclusive
   */
  lt?:
    | number
    | undefined;
  /**
   * Lte specifies that this field must be less than or equal to the
   * specified value, inclusive
   */
  lte?:
    | number
    | undefined;
  /**
   * Gt specifies that this field must be greater than the specified value,
   * exclusive. If the value of Gt is larger than a specified Lt or Lte, the
   * range is reversed.
   */
  gt?:
    | number
    | undefined;
  /**
   * Gte specifies that this field must be greater than or equal to the
   * specified value, inclusive. If the value of Gte is larger than a
   * specified Lt or Lte, the range is reversed.
   */
  gte?:
    | number
    | undefined;
  /**
   * In specifies that this field must be equal to one of the specified
   * values
   */
  in: number[];
  /**
   * NotIn specifies that this field cannot be equal to one of the specified
   * values
   */
  notIn: number[];
  /**
   * IgnoreEmpty specifies that the validation rules of this field should be
   * evaluated only if the field is not empty
   */
  ignoreEmpty?: boolean | undefined;
}

/** SFixed64Rules describes the constraints applied to `sfixed64` values */
export interface SFixed64Rules {
  /** Const specifies that this field must be exactly the specified value */
  const?:
    | string
    | undefined;
  /**
   * Lt specifies that this field must be less than the specified value,
   * exclusive
   */
  lt?:
    | string
    | undefined;
  /**
   * Lte specifies that this field must be less than or equal to the
   * specified value, inclusive
   */
  lte?:
    | string
    | undefined;
  /**
   * Gt specifies that this field must be greater than the specified value,
   * exclusive. If the value of Gt is larger than a specified Lt or Lte, the
   * range is reversed.
   */
  gt?:
    | string
    | undefined;
  /**
   * Gte specifies that this field must be greater than or equal to the
   * specified value, inclusive. If the value of Gte is larger than a
   * specified Lt or Lte, the range is reversed.
   */
  gte?:
    | string
    | undefined;
  /**
   * In specifies that this field must be equal to one of the specified
   * values
   */
  in: string[];
  /**
   * NotIn specifies that this field cannot be equal to one of the specified
   * values
   */
  notIn: string[];
  /**
   * IgnoreEmpty specifies that the validation rules of this field should be
   * evaluated only if the field is not empty
   */
  ignoreEmpty?: boolean | undefined;
}

/** BoolRules describes the constraints applied to `bool` values */
export interface BoolRules {
  /** Const specifies that this field must be exactly the specified value */
  const?: boolean | undefined;
}

/** StringRules describe the constraints applied to `string` values */
export interface StringRules {
  /** Const specifies that this field must be exactly the specified value */
  const?:
    | string
    | undefined;
  /**
   * Len specifies that this field must be the specified number of
   * characters (Unicode code points). Note that the number of
   * characters may differ from the number of bytes in the string.
   */
  len?:
    | string
    | undefined;
  /**
   * MinLen specifies that this field must be the specified number of
   * characters (Unicode code points) at a minimum. Note that the number of
   * characters may differ from the number of bytes in the string.
   */
  minLen?:
    | string
    | undefined;
  /**
   * MaxLen specifies that this field must be the specified number of
   * characters (Unicode code points) at a maximum. Note that the number of
   * characters may differ from the number of bytes in the string.
   */
  maxLen?:
    | string
    | undefined;
  /** LenBytes specifies that this field must be the specified number of bytes */
  lenBytes?:
    | string
    | undefined;
  /**
   * MinBytes specifies that this field must be the specified number of bytes
   * at a minimum
   */
  minBytes?:
    | string
    | undefined;
  /**
   * MaxBytes specifies that this field must be the specified number of bytes
   * at a maximum
   */
  maxBytes?:
    | string
    | undefined;
  /**
   * Pattern specifes that this field must match against the specified
   * regular expression (RE2 syntax). The included expression should elide
   * any delimiters.
   */
  pattern?:
    | string
    | undefined;
  /**
   * Prefix specifies that this field must have the specified substring at
   * the beginning of the string.
   */
  prefix?:
    | string
    | undefined;
  /**
   * Suffix specifies that this field must have the specified substring at
   * the end of the string.
   */
  suffix?:
    | string
    | undefined;
  /**
   * Contains specifies that this field must have the specified substring
   * anywhere in the string.
   */
  contains?:
    | string
    | undefined;
  /**
   * NotContains specifies that this field cannot have the specified substring
   * anywhere in the string.
   */
  notContains?:
    | string
    | undefined;
  /**
   * In specifies that this field must be equal to one of the specified
   * values
   */
  in: string[];
  /**
   * NotIn specifies that this field cannot be equal to one of the specified
   * values
   */
  notIn: string[];
  /**
   * Email specifies that the field must be a valid email address as
   * defined by RFC 5322
   */
  email?:
    | boolean
    | undefined;
  /**
   * Hostname specifies that the field must be a valid hostname as
   * defined by RFC 1034. This constraint does not support
   * internationalized domain names (IDNs).
   */
  hostname?:
    | boolean
    | undefined;
  /**
   * Ip specifies that the field must be a valid IP (v4 or v6) address.
   * Valid IPv6 addresses should not include surrounding square brackets.
   */
  ip?:
    | boolean
    | undefined;
  /** Ipv4 specifies that the field must be a valid IPv4 address. */
  ipv4?:
    | boolean
    | undefined;
  /**
   * Ipv6 specifies that the field must be a valid IPv6 address. Valid
   * IPv6 addresses should not include surrounding square brackets.
   */
  ipv6?:
    | boolean
    | undefined;
  /**
   * Uri specifies that the field must be a valid, absolute URI as defined
   * by RFC 3986
   */
  uri?:
    | boolean
    | undefined;
  /**
   * UriRef specifies that the field must be a valid URI as defined by RFC
   * 3986 and may be relative or absolute.
   */
  uriRef?:
    | boolean
    | undefined;
  /**
   * Address specifies that the field must be either a valid hostname as
   * defined by RFC 1034 (which does not support internationalized domain
   * names or IDNs), or it can be a valid IP (v4 or v6).
   */
  address?:
    | boolean
    | undefined;
  /**
   * Uuid specifies that the field must be a valid UUID as defined by
   * RFC 4122
   */
  uuid?:
    | boolean
    | undefined;
  /** WellKnownRegex specifies a common well known pattern defined as a regex. */
  wellKnownRegex?:
    | KnownRegex
    | undefined;
  /**
   * This applies to regexes HTTP_HEADER_NAME and HTTP_HEADER_VALUE to enable
   * strict header validation.
   * By default, this is true, and HTTP header validations are RFC-compliant.
   * Setting to false will enable a looser validations that only disallows
   * \r\n\0 characters, which can be used to bypass header matching rules.
   */
  strict?:
    | boolean
    | undefined;
  /**
   * IgnoreEmpty specifies that the validation rules of this field should be
   * evaluated only if the field is not empty
   */
  ignoreEmpty?: boolean | undefined;
}

/** BytesRules describe the constraints applied to `bytes` values */
export interface BytesRules {
  /** Const specifies that this field must be exactly the specified value */
  const?:
    | Uint8Array
    | undefined;
  /** Len specifies that this field must be the specified number of bytes */
  len?:
    | string
    | undefined;
  /**
   * MinLen specifies that this field must be the specified number of bytes
   * at a minimum
   */
  minLen?:
    | string
    | undefined;
  /**
   * MaxLen specifies that this field must be the specified number of bytes
   * at a maximum
   */
  maxLen?:
    | string
    | undefined;
  /**
   * Pattern specifes that this field must match against the specified
   * regular expression (RE2 syntax). The included expression should elide
   * any delimiters.
   */
  pattern?:
    | string
    | undefined;
  /**
   * Prefix specifies that this field must have the specified bytes at the
   * beginning of the string.
   */
  prefix?:
    | Uint8Array
    | undefined;
  /**
   * Suffix specifies that this field must have the specified bytes at the
   * end of the string.
   */
  suffix?:
    | Uint8Array
    | undefined;
  /**
   * Contains specifies that this field must have the specified bytes
   * anywhere in the string.
   */
  contains?:
    | Uint8Array
    | undefined;
  /**
   * In specifies that this field must be equal to one of the specified
   * values
   */
  in: Uint8Array[];
  /**
   * NotIn specifies that this field cannot be equal to one of the specified
   * values
   */
  notIn: Uint8Array[];
  /**
   * Ip specifies that the field must be a valid IP (v4 or v6) address in
   * byte format
   */
  ip?:
    | boolean
    | undefined;
  /**
   * Ipv4 specifies that the field must be a valid IPv4 address in byte
   * format
   */
  ipv4?:
    | boolean
    | undefined;
  /**
   * Ipv6 specifies that the field must be a valid IPv6 address in byte
   * format
   */
  ipv6?:
    | boolean
    | undefined;
  /**
   * IgnoreEmpty specifies that the validation rules of this field should be
   * evaluated only if the field is not empty
   */
  ignoreEmpty?: boolean | undefined;
}

/** EnumRules describe the constraints applied to enum values */
export interface EnumRules {
  /** Const specifies that this field must be exactly the specified value */
  const?:
    | number
    | undefined;
  /**
   * DefinedOnly specifies that this field must be only one of the defined
   * values for this enum, failing on any undefined value.
   */
  definedOnly?:
    | boolean
    | undefined;
  /**
   * In specifies that this field must be equal to one of the specified
   * values
   */
  in: number[];
  /**
   * NotIn specifies that this field cannot be equal to one of the specified
   * values
   */
  notIn: number[];
}

/**
 * MessageRules describe the constraints applied to embedded message values.
 * For message-type fields, validation is performed recursively.
 */
export interface MessageRules {
  /**
   * Skip specifies that the validation rules of this field should not be
   * evaluated
   */
  skip?:
    | boolean
    | undefined;
  /** Required specifies that this field must be set */
  required?: boolean | undefined;
}

/** RepeatedRules describe the constraints applied to `repeated` values */
export interface RepeatedRules {
  /**
   * MinItems specifies that this field must have the specified number of
   * items at a minimum
   */
  minItems?:
    | string
    | undefined;
  /**
   * MaxItems specifies that this field must have the specified number of
   * items at a maximum
   */
  maxItems?:
    | string
    | undefined;
  /**
   * Unique specifies that all elements in this field must be unique. This
   * contraint is only applicable to scalar and enum types (messages are not
   * supported).
   */
  unique?:
    | boolean
    | undefined;
  /**
   * Items specifies the contraints to be applied to each item in the field.
   * Repeated message fields will still execute validation against each item
   * unless skip is specified here.
   */
  items?:
    | FieldRules
    | undefined;
  /**
   * IgnoreEmpty specifies that the validation rules of this field should be
   * evaluated only if the field is not empty
   */
  ignoreEmpty?: boolean | undefined;
}

/** MapRules describe the constraints applied to `map` values */
export interface MapRules {
  /**
   * MinPairs specifies that this field must have the specified number of
   * KVs at a minimum
   */
  minPairs?:
    | string
    | undefined;
  /**
   * MaxPairs specifies that this field must have the specified number of
   * KVs at a maximum
   */
  maxPairs?:
    | string
    | undefined;
  /**
   * NoSparse specifies values in this field cannot be unset. This only
   * applies to map's with message value types.
   */
  noSparse?:
    | boolean
    | undefined;
  /** Keys specifies the constraints to be applied to each key in the field. */
  keys?:
    | FieldRules
    | undefined;
  /**
   * Values specifies the constraints to be applied to the value of each key
   * in the field. Message values will still have their validations evaluated
   * unless skip is specified here.
   */
  values?:
    | FieldRules
    | undefined;
  /**
   * IgnoreEmpty specifies that the validation rules of this field should be
   * evaluated only if the field is not empty
   */
  ignoreEmpty?: boolean | undefined;
}

/**
 * AnyRules describe constraints applied exclusively to the
 * `google.protobuf.Any` well-known type
 */
export interface AnyRules {
  /** Required specifies that this field must be set */
  required?:
    | boolean
    | undefined;
  /**
   * In specifies that this field's `type_url` must be equal to one of the
   * specified values.
   */
  in: string[];
  /**
   * NotIn specifies that this field's `type_url` must not be equal to any of
   * the specified values.
   */
  notIn: string[];
}

/**
 * DurationRules describe the constraints applied exclusively to the
 * `google.protobuf.Duration` well-known type
 */
export interface DurationRules {
  /** Required specifies that this field must be set */
  required?:
    | boolean
    | undefined;
  /** Const specifies that this field must be exactly the specified value */
  const?:
    | Duration
    | undefined;
  /**
   * Lt specifies that this field must be less than the specified value,
   * exclusive
   */
  lt?:
    | Duration
    | undefined;
  /**
   * Lt specifies that this field must be less than the specified value,
   * inclusive
   */
  lte?:
    | Duration
    | undefined;
  /**
   * Gt specifies that this field must be greater than the specified value,
   * exclusive
   */
  gt?:
    | Duration
    | undefined;
  /**
   * Gte specifies that this field must be greater than the specified value,
   * inclusive
   */
  gte?:
    | Duration
    | undefined;
  /**
   * In specifies that this field must be equal to one of the specified
   * values
   */
  in: Duration[];
  /**
   * NotIn specifies that this field cannot be equal to one of the specified
   * values
   */
  notIn: Duration[];
}

/**
 * TimestampRules describe the constraints applied exclusively to the
 * `google.protobuf.Timestamp` well-known type
 */
export interface TimestampRules {
  /** Required specifies that this field must be set */
  required?:
    | boolean
    | undefined;
  /** Const specifies that this field must be exactly the specified value */
  const?:
    | Date
    | undefined;
  /**
   * Lt specifies that this field must be less than the specified value,
   * exclusive
   */
  lt?:
    | Date
    | undefined;
  /**
   * Lte specifies that this field must be less than the specified value,
   * inclusive
   */
  lte?:
    | Date
    | undefined;
  /**
   * Gt specifies that this field must be greater than the specified value,
   * exclusive
   */
  gt?:
    | Date
    | undefined;
  /**
   * Gte specifies that this field must be greater than the specified value,
   * inclusive
   */
  gte?:
    | Date
    | undefined;
  /**
   * LtNow specifies that this must be less than the current time. LtNow
   * can only be used with the Within rule.
   */
  ltNow?:
    | boolean
    | undefined;
  /**
   * GtNow specifies that this must be greater than the current time. GtNow
   * can only be used with the Within rule.
   */
  gtNow?:
    | boolean
    | undefined;
  /**
   * Within specifies that this field must be within this duration of the
   * current time. This constraint can be used alone or with the LtNow and
   * GtNow rules.
   */
  within?: Duration | undefined;
}

function createBaseFieldRules(): FieldRules {
  return {
    message: undefined,
    float: undefined,
    double: undefined,
    int32: undefined,
    int64: undefined,
    uint32: undefined,
    uint64: undefined,
    sint32: undefined,
    sint64: undefined,
    fixed32: undefined,
    fixed64: undefined,
    sfixed32: undefined,
    sfixed64: undefined,
    bool: undefined,
    string: undefined,
    bytes: undefined,
    enum: undefined,
    repeated: undefined,
    map: undefined,
    any: undefined,
    duration: undefined,
    timestamp: undefined,
  };
}

export const FieldRules = {
  encode(message: FieldRules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== undefined) {
      MessageRules.encode(message.message, writer.uint32(138).fork()).ldelim();
    }
    if (message.float !== undefined) {
      FloatRules.encode(message.float, writer.uint32(10).fork()).ldelim();
    }
    if (message.double !== undefined) {
      DoubleRules.encode(message.double, writer.uint32(18).fork()).ldelim();
    }
    if (message.int32 !== undefined) {
      Int32Rules.encode(message.int32, writer.uint32(26).fork()).ldelim();
    }
    if (message.int64 !== undefined) {
      Int64Rules.encode(message.int64, writer.uint32(34).fork()).ldelim();
    }
    if (message.uint32 !== undefined) {
      UInt32Rules.encode(message.uint32, writer.uint32(42).fork()).ldelim();
    }
    if (message.uint64 !== undefined) {
      UInt64Rules.encode(message.uint64, writer.uint32(50).fork()).ldelim();
    }
    if (message.sint32 !== undefined) {
      SInt32Rules.encode(message.sint32, writer.uint32(58).fork()).ldelim();
    }
    if (message.sint64 !== undefined) {
      SInt64Rules.encode(message.sint64, writer.uint32(66).fork()).ldelim();
    }
    if (message.fixed32 !== undefined) {
      Fixed32Rules.encode(message.fixed32, writer.uint32(74).fork()).ldelim();
    }
    if (message.fixed64 !== undefined) {
      Fixed64Rules.encode(message.fixed64, writer.uint32(82).fork()).ldelim();
    }
    if (message.sfixed32 !== undefined) {
      SFixed32Rules.encode(message.sfixed32, writer.uint32(90).fork()).ldelim();
    }
    if (message.sfixed64 !== undefined) {
      SFixed64Rules.encode(message.sfixed64, writer.uint32(98).fork()).ldelim();
    }
    if (message.bool !== undefined) {
      BoolRules.encode(message.bool, writer.uint32(106).fork()).ldelim();
    }
    if (message.string !== undefined) {
      StringRules.encode(message.string, writer.uint32(114).fork()).ldelim();
    }
    if (message.bytes !== undefined) {
      BytesRules.encode(message.bytes, writer.uint32(122).fork()).ldelim();
    }
    if (message.enum !== undefined) {
      EnumRules.encode(message.enum, writer.uint32(130).fork()).ldelim();
    }
    if (message.repeated !== undefined) {
      RepeatedRules.encode(message.repeated, writer.uint32(146).fork()).ldelim();
    }
    if (message.map !== undefined) {
      MapRules.encode(message.map, writer.uint32(154).fork()).ldelim();
    }
    if (message.any !== undefined) {
      AnyRules.encode(message.any, writer.uint32(162).fork()).ldelim();
    }
    if (message.duration !== undefined) {
      DurationRules.encode(message.duration, writer.uint32(170).fork()).ldelim();
    }
    if (message.timestamp !== undefined) {
      TimestampRules.encode(message.timestamp, writer.uint32(178).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FieldRules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFieldRules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 17:
          if (tag !== 138) {
            break;
          }

          message.message = MessageRules.decode(reader, reader.uint32());
          continue;
        case 1:
          if (tag !== 10) {
            break;
          }

          message.float = FloatRules.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.double = DoubleRules.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.int32 = Int32Rules.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.int64 = Int64Rules.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.uint32 = UInt32Rules.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.uint64 = UInt64Rules.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.sint32 = SInt32Rules.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.sint64 = SInt64Rules.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.fixed32 = Fixed32Rules.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.fixed64 = Fixed64Rules.decode(reader, reader.uint32());
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.sfixed32 = SFixed32Rules.decode(reader, reader.uint32());
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.sfixed64 = SFixed64Rules.decode(reader, reader.uint32());
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.bool = BoolRules.decode(reader, reader.uint32());
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.string = StringRules.decode(reader, reader.uint32());
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.bytes = BytesRules.decode(reader, reader.uint32());
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.enum = EnumRules.decode(reader, reader.uint32());
          continue;
        case 18:
          if (tag !== 146) {
            break;
          }

          message.repeated = RepeatedRules.decode(reader, reader.uint32());
          continue;
        case 19:
          if (tag !== 154) {
            break;
          }

          message.map = MapRules.decode(reader, reader.uint32());
          continue;
        case 20:
          if (tag !== 162) {
            break;
          }

          message.any = AnyRules.decode(reader, reader.uint32());
          continue;
        case 21:
          if (tag !== 170) {
            break;
          }

          message.duration = DurationRules.decode(reader, reader.uint32());
          continue;
        case 22:
          if (tag !== 178) {
            break;
          }

          message.timestamp = TimestampRules.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FieldRules {
    return {
      message: isSet(object.message) ? MessageRules.fromJSON(object.message) : undefined,
      float: isSet(object.float) ? FloatRules.fromJSON(object.float) : undefined,
      double: isSet(object.double) ? DoubleRules.fromJSON(object.double) : undefined,
      int32: isSet(object.int32) ? Int32Rules.fromJSON(object.int32) : undefined,
      int64: isSet(object.int64) ? Int64Rules.fromJSON(object.int64) : undefined,
      uint32: isSet(object.uint32) ? UInt32Rules.fromJSON(object.uint32) : undefined,
      uint64: isSet(object.uint64) ? UInt64Rules.fromJSON(object.uint64) : undefined,
      sint32: isSet(object.sint32) ? SInt32Rules.fromJSON(object.sint32) : undefined,
      sint64: isSet(object.sint64) ? SInt64Rules.fromJSON(object.sint64) : undefined,
      fixed32: isSet(object.fixed32) ? Fixed32Rules.fromJSON(object.fixed32) : undefined,
      fixed64: isSet(object.fixed64) ? Fixed64Rules.fromJSON(object.fixed64) : undefined,
      sfixed32: isSet(object.sfixed32) ? SFixed32Rules.fromJSON(object.sfixed32) : undefined,
      sfixed64: isSet(object.sfixed64) ? SFixed64Rules.fromJSON(object.sfixed64) : undefined,
      bool: isSet(object.bool) ? BoolRules.fromJSON(object.bool) : undefined,
      string: isSet(object.string) ? StringRules.fromJSON(object.string) : undefined,
      bytes: isSet(object.bytes) ? BytesRules.fromJSON(object.bytes) : undefined,
      enum: isSet(object.enum) ? EnumRules.fromJSON(object.enum) : undefined,
      repeated: isSet(object.repeated) ? RepeatedRules.fromJSON(object.repeated) : undefined,
      map: isSet(object.map) ? MapRules.fromJSON(object.map) : undefined,
      any: isSet(object.any) ? AnyRules.fromJSON(object.any) : undefined,
      duration: isSet(object.duration) ? DurationRules.fromJSON(object.duration) : undefined,
      timestamp: isSet(object.timestamp) ? TimestampRules.fromJSON(object.timestamp) : undefined,
    };
  },

  toJSON(message: FieldRules): unknown {
    const obj: any = {};
    if (message.message !== undefined) {
      obj.message = MessageRules.toJSON(message.message);
    }
    if (message.float !== undefined) {
      obj.float = FloatRules.toJSON(message.float);
    }
    if (message.double !== undefined) {
      obj.double = DoubleRules.toJSON(message.double);
    }
    if (message.int32 !== undefined) {
      obj.int32 = Int32Rules.toJSON(message.int32);
    }
    if (message.int64 !== undefined) {
      obj.int64 = Int64Rules.toJSON(message.int64);
    }
    if (message.uint32 !== undefined) {
      obj.uint32 = UInt32Rules.toJSON(message.uint32);
    }
    if (message.uint64 !== undefined) {
      obj.uint64 = UInt64Rules.toJSON(message.uint64);
    }
    if (message.sint32 !== undefined) {
      obj.sint32 = SInt32Rules.toJSON(message.sint32);
    }
    if (message.sint64 !== undefined) {
      obj.sint64 = SInt64Rules.toJSON(message.sint64);
    }
    if (message.fixed32 !== undefined) {
      obj.fixed32 = Fixed32Rules.toJSON(message.fixed32);
    }
    if (message.fixed64 !== undefined) {
      obj.fixed64 = Fixed64Rules.toJSON(message.fixed64);
    }
    if (message.sfixed32 !== undefined) {
      obj.sfixed32 = SFixed32Rules.toJSON(message.sfixed32);
    }
    if (message.sfixed64 !== undefined) {
      obj.sfixed64 = SFixed64Rules.toJSON(message.sfixed64);
    }
    if (message.bool !== undefined) {
      obj.bool = BoolRules.toJSON(message.bool);
    }
    if (message.string !== undefined) {
      obj.string = StringRules.toJSON(message.string);
    }
    if (message.bytes !== undefined) {
      obj.bytes = BytesRules.toJSON(message.bytes);
    }
    if (message.enum !== undefined) {
      obj.enum = EnumRules.toJSON(message.enum);
    }
    if (message.repeated !== undefined) {
      obj.repeated = RepeatedRules.toJSON(message.repeated);
    }
    if (message.map !== undefined) {
      obj.map = MapRules.toJSON(message.map);
    }
    if (message.any !== undefined) {
      obj.any = AnyRules.toJSON(message.any);
    }
    if (message.duration !== undefined) {
      obj.duration = DurationRules.toJSON(message.duration);
    }
    if (message.timestamp !== undefined) {
      obj.timestamp = TimestampRules.toJSON(message.timestamp);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FieldRules>, I>>(base?: I): FieldRules {
    return FieldRules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FieldRules>, I>>(object: I): FieldRules {
    const message = createBaseFieldRules();
    message.message = (object.message !== undefined && object.message !== null)
      ? MessageRules.fromPartial(object.message)
      : undefined;
    message.float = (object.float !== undefined && object.float !== null)
      ? FloatRules.fromPartial(object.float)
      : undefined;
    message.double = (object.double !== undefined && object.double !== null)
      ? DoubleRules.fromPartial(object.double)
      : undefined;
    message.int32 = (object.int32 !== undefined && object.int32 !== null)
      ? Int32Rules.fromPartial(object.int32)
      : undefined;
    message.int64 = (object.int64 !== undefined && object.int64 !== null)
      ? Int64Rules.fromPartial(object.int64)
      : undefined;
    message.uint32 = (object.uint32 !== undefined && object.uint32 !== null)
      ? UInt32Rules.fromPartial(object.uint32)
      : undefined;
    message.uint64 = (object.uint64 !== undefined && object.uint64 !== null)
      ? UInt64Rules.fromPartial(object.uint64)
      : undefined;
    message.sint32 = (object.sint32 !== undefined && object.sint32 !== null)
      ? SInt32Rules.fromPartial(object.sint32)
      : undefined;
    message.sint64 = (object.sint64 !== undefined && object.sint64 !== null)
      ? SInt64Rules.fromPartial(object.sint64)
      : undefined;
    message.fixed32 = (object.fixed32 !== undefined && object.fixed32 !== null)
      ? Fixed32Rules.fromPartial(object.fixed32)
      : undefined;
    message.fixed64 = (object.fixed64 !== undefined && object.fixed64 !== null)
      ? Fixed64Rules.fromPartial(object.fixed64)
      : undefined;
    message.sfixed32 = (object.sfixed32 !== undefined && object.sfixed32 !== null)
      ? SFixed32Rules.fromPartial(object.sfixed32)
      : undefined;
    message.sfixed64 = (object.sfixed64 !== undefined && object.sfixed64 !== null)
      ? SFixed64Rules.fromPartial(object.sfixed64)
      : undefined;
    message.bool = (object.bool !== undefined && object.bool !== null) ? BoolRules.fromPartial(object.bool) : undefined;
    message.string = (object.string !== undefined && object.string !== null)
      ? StringRules.fromPartial(object.string)
      : undefined;
    message.bytes = (object.bytes !== undefined && object.bytes !== null)
      ? BytesRules.fromPartial(object.bytes)
      : undefined;
    message.enum = (object.enum !== undefined && object.enum !== null) ? EnumRules.fromPartial(object.enum) : undefined;
    message.repeated = (object.repeated !== undefined && object.repeated !== null)
      ? RepeatedRules.fromPartial(object.repeated)
      : undefined;
    message.map = (object.map !== undefined && object.map !== null) ? MapRules.fromPartial(object.map) : undefined;
    message.any = (object.any !== undefined && object.any !== null) ? AnyRules.fromPartial(object.any) : undefined;
    message.duration = (object.duration !== undefined && object.duration !== null)
      ? DurationRules.fromPartial(object.duration)
      : undefined;
    message.timestamp = (object.timestamp !== undefined && object.timestamp !== null)
      ? TimestampRules.fromPartial(object.timestamp)
      : undefined;
    return message;
  },
};

function createBaseFloatRules(): FloatRules {
  return {
    const: undefined,
    lt: undefined,
    lte: undefined,
    gt: undefined,
    gte: undefined,
    in: [],
    notIn: [],
    ignoreEmpty: undefined,
  };
}

export const FloatRules = {
  encode(message: FloatRules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.const !== undefined) {
      writer.uint32(13).float(message.const);
    }
    if (message.lt !== undefined) {
      writer.uint32(21).float(message.lt);
    }
    if (message.lte !== undefined) {
      writer.uint32(29).float(message.lte);
    }
    if (message.gt !== undefined) {
      writer.uint32(37).float(message.gt);
    }
    if (message.gte !== undefined) {
      writer.uint32(45).float(message.gte);
    }
    writer.uint32(50).fork();
    for (const v of message.in) {
      writer.float(v);
    }
    writer.ldelim();
    writer.uint32(58).fork();
    for (const v of message.notIn) {
      writer.float(v);
    }
    writer.ldelim();
    if (message.ignoreEmpty !== undefined) {
      writer.uint32(64).bool(message.ignoreEmpty);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FloatRules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFloatRules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }

          message.const = reader.float();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }

          message.lt = reader.float();
          continue;
        case 3:
          if (tag !== 29) {
            break;
          }

          message.lte = reader.float();
          continue;
        case 4:
          if (tag !== 37) {
            break;
          }

          message.gt = reader.float();
          continue;
        case 5:
          if (tag !== 45) {
            break;
          }

          message.gte = reader.float();
          continue;
        case 6:
          if (tag === 53) {
            message.in.push(reader.float());

            continue;
          }

          if (tag === 50) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.in.push(reader.float());
            }

            continue;
          }

          break;
        case 7:
          if (tag === 61) {
            message.notIn.push(reader.float());

            continue;
          }

          if (tag === 58) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.notIn.push(reader.float());
            }

            continue;
          }

          break;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.ignoreEmpty = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FloatRules {
    return {
      const: isSet(object.const) ? globalThis.Number(object.const) : undefined,
      lt: isSet(object.lt) ? globalThis.Number(object.lt) : undefined,
      lte: isSet(object.lte) ? globalThis.Number(object.lte) : undefined,
      gt: isSet(object.gt) ? globalThis.Number(object.gt) : undefined,
      gte: isSet(object.gte) ? globalThis.Number(object.gte) : undefined,
      in: globalThis.Array.isArray(object?.in) ? object.in.map((e: any) => globalThis.Number(e)) : [],
      notIn: globalThis.Array.isArray(object?.notIn) ? object.notIn.map((e: any) => globalThis.Number(e)) : [],
      ignoreEmpty: isSet(object.ignoreEmpty) ? globalThis.Boolean(object.ignoreEmpty) : undefined,
    };
  },

  toJSON(message: FloatRules): unknown {
    const obj: any = {};
    if (message.const !== undefined) {
      obj.const = message.const;
    }
    if (message.lt !== undefined) {
      obj.lt = message.lt;
    }
    if (message.lte !== undefined) {
      obj.lte = message.lte;
    }
    if (message.gt !== undefined) {
      obj.gt = message.gt;
    }
    if (message.gte !== undefined) {
      obj.gte = message.gte;
    }
    if (message.in?.length) {
      obj.in = message.in;
    }
    if (message.notIn?.length) {
      obj.notIn = message.notIn;
    }
    if (message.ignoreEmpty !== undefined) {
      obj.ignoreEmpty = message.ignoreEmpty;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FloatRules>, I>>(base?: I): FloatRules {
    return FloatRules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FloatRules>, I>>(object: I): FloatRules {
    const message = createBaseFloatRules();
    message.const = object.const ?? undefined;
    message.lt = object.lt ?? undefined;
    message.lte = object.lte ?? undefined;
    message.gt = object.gt ?? undefined;
    message.gte = object.gte ?? undefined;
    message.in = object.in?.map((e) => e) || [];
    message.notIn = object.notIn?.map((e) => e) || [];
    message.ignoreEmpty = object.ignoreEmpty ?? undefined;
    return message;
  },
};

function createBaseDoubleRules(): DoubleRules {
  return {
    const: undefined,
    lt: undefined,
    lte: undefined,
    gt: undefined,
    gte: undefined,
    in: [],
    notIn: [],
    ignoreEmpty: undefined,
    latitude: undefined,
    longitude: undefined,
  };
}

export const DoubleRules = {
  encode(message: DoubleRules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.const !== undefined) {
      writer.uint32(9).double(message.const);
    }
    if (message.lt !== undefined) {
      writer.uint32(17).double(message.lt);
    }
    if (message.lte !== undefined) {
      writer.uint32(25).double(message.lte);
    }
    if (message.gt !== undefined) {
      writer.uint32(33).double(message.gt);
    }
    if (message.gte !== undefined) {
      writer.uint32(41).double(message.gte);
    }
    writer.uint32(50).fork();
    for (const v of message.in) {
      writer.double(v);
    }
    writer.ldelim();
    writer.uint32(58).fork();
    for (const v of message.notIn) {
      writer.double(v);
    }
    writer.ldelim();
    if (message.ignoreEmpty !== undefined) {
      writer.uint32(64).bool(message.ignoreEmpty);
    }
    if (message.latitude !== undefined) {
      writer.uint32(72).bool(message.latitude);
    }
    if (message.longitude !== undefined) {
      writer.uint32(80).bool(message.longitude);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DoubleRules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDoubleRules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.const = reader.double();
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.lt = reader.double();
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.lte = reader.double();
          continue;
        case 4:
          if (tag !== 33) {
            break;
          }

          message.gt = reader.double();
          continue;
        case 5:
          if (tag !== 41) {
            break;
          }

          message.gte = reader.double();
          continue;
        case 6:
          if (tag === 49) {
            message.in.push(reader.double());

            continue;
          }

          if (tag === 50) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.in.push(reader.double());
            }

            continue;
          }

          break;
        case 7:
          if (tag === 57) {
            message.notIn.push(reader.double());

            continue;
          }

          if (tag === 58) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.notIn.push(reader.double());
            }

            continue;
          }

          break;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.ignoreEmpty = reader.bool();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.latitude = reader.bool();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.longitude = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DoubleRules {
    return {
      const: isSet(object.const) ? globalThis.Number(object.const) : undefined,
      lt: isSet(object.lt) ? globalThis.Number(object.lt) : undefined,
      lte: isSet(object.lte) ? globalThis.Number(object.lte) : undefined,
      gt: isSet(object.gt) ? globalThis.Number(object.gt) : undefined,
      gte: isSet(object.gte) ? globalThis.Number(object.gte) : undefined,
      in: globalThis.Array.isArray(object?.in) ? object.in.map((e: any) => globalThis.Number(e)) : [],
      notIn: globalThis.Array.isArray(object?.notIn) ? object.notIn.map((e: any) => globalThis.Number(e)) : [],
      ignoreEmpty: isSet(object.ignoreEmpty) ? globalThis.Boolean(object.ignoreEmpty) : undefined,
      latitude: isSet(object.latitude) ? globalThis.Boolean(object.latitude) : undefined,
      longitude: isSet(object.longitude) ? globalThis.Boolean(object.longitude) : undefined,
    };
  },

  toJSON(message: DoubleRules): unknown {
    const obj: any = {};
    if (message.const !== undefined) {
      obj.const = message.const;
    }
    if (message.lt !== undefined) {
      obj.lt = message.lt;
    }
    if (message.lte !== undefined) {
      obj.lte = message.lte;
    }
    if (message.gt !== undefined) {
      obj.gt = message.gt;
    }
    if (message.gte !== undefined) {
      obj.gte = message.gte;
    }
    if (message.in?.length) {
      obj.in = message.in;
    }
    if (message.notIn?.length) {
      obj.notIn = message.notIn;
    }
    if (message.ignoreEmpty !== undefined) {
      obj.ignoreEmpty = message.ignoreEmpty;
    }
    if (message.latitude !== undefined) {
      obj.latitude = message.latitude;
    }
    if (message.longitude !== undefined) {
      obj.longitude = message.longitude;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DoubleRules>, I>>(base?: I): DoubleRules {
    return DoubleRules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DoubleRules>, I>>(object: I): DoubleRules {
    const message = createBaseDoubleRules();
    message.const = object.const ?? undefined;
    message.lt = object.lt ?? undefined;
    message.lte = object.lte ?? undefined;
    message.gt = object.gt ?? undefined;
    message.gte = object.gte ?? undefined;
    message.in = object.in?.map((e) => e) || [];
    message.notIn = object.notIn?.map((e) => e) || [];
    message.ignoreEmpty = object.ignoreEmpty ?? undefined;
    message.latitude = object.latitude ?? undefined;
    message.longitude = object.longitude ?? undefined;
    return message;
  },
};

function createBaseInt32Rules(): Int32Rules {
  return {
    const: undefined,
    lt: undefined,
    lte: undefined,
    gt: undefined,
    gte: undefined,
    in: [],
    notIn: [],
    ignoreEmpty: undefined,
  };
}

export const Int32Rules = {
  encode(message: Int32Rules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.const !== undefined) {
      writer.uint32(8).int32(message.const);
    }
    if (message.lt !== undefined) {
      writer.uint32(16).int32(message.lt);
    }
    if (message.lte !== undefined) {
      writer.uint32(24).int32(message.lte);
    }
    if (message.gt !== undefined) {
      writer.uint32(32).int32(message.gt);
    }
    if (message.gte !== undefined) {
      writer.uint32(40).int32(message.gte);
    }
    writer.uint32(50).fork();
    for (const v of message.in) {
      writer.int32(v);
    }
    writer.ldelim();
    writer.uint32(58).fork();
    for (const v of message.notIn) {
      writer.int32(v);
    }
    writer.ldelim();
    if (message.ignoreEmpty !== undefined) {
      writer.uint32(64).bool(message.ignoreEmpty);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Int32Rules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInt32Rules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.const = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.lt = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.lte = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.gt = reader.int32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.gte = reader.int32();
          continue;
        case 6:
          if (tag === 48) {
            message.in.push(reader.int32());

            continue;
          }

          if (tag === 50) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.in.push(reader.int32());
            }

            continue;
          }

          break;
        case 7:
          if (tag === 56) {
            message.notIn.push(reader.int32());

            continue;
          }

          if (tag === 58) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.notIn.push(reader.int32());
            }

            continue;
          }

          break;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.ignoreEmpty = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Int32Rules {
    return {
      const: isSet(object.const) ? globalThis.Number(object.const) : undefined,
      lt: isSet(object.lt) ? globalThis.Number(object.lt) : undefined,
      lte: isSet(object.lte) ? globalThis.Number(object.lte) : undefined,
      gt: isSet(object.gt) ? globalThis.Number(object.gt) : undefined,
      gte: isSet(object.gte) ? globalThis.Number(object.gte) : undefined,
      in: globalThis.Array.isArray(object?.in) ? object.in.map((e: any) => globalThis.Number(e)) : [],
      notIn: globalThis.Array.isArray(object?.notIn) ? object.notIn.map((e: any) => globalThis.Number(e)) : [],
      ignoreEmpty: isSet(object.ignoreEmpty) ? globalThis.Boolean(object.ignoreEmpty) : undefined,
    };
  },

  toJSON(message: Int32Rules): unknown {
    const obj: any = {};
    if (message.const !== undefined) {
      obj.const = Math.round(message.const);
    }
    if (message.lt !== undefined) {
      obj.lt = Math.round(message.lt);
    }
    if (message.lte !== undefined) {
      obj.lte = Math.round(message.lte);
    }
    if (message.gt !== undefined) {
      obj.gt = Math.round(message.gt);
    }
    if (message.gte !== undefined) {
      obj.gte = Math.round(message.gte);
    }
    if (message.in?.length) {
      obj.in = message.in.map((e) => Math.round(e));
    }
    if (message.notIn?.length) {
      obj.notIn = message.notIn.map((e) => Math.round(e));
    }
    if (message.ignoreEmpty !== undefined) {
      obj.ignoreEmpty = message.ignoreEmpty;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Int32Rules>, I>>(base?: I): Int32Rules {
    return Int32Rules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Int32Rules>, I>>(object: I): Int32Rules {
    const message = createBaseInt32Rules();
    message.const = object.const ?? undefined;
    message.lt = object.lt ?? undefined;
    message.lte = object.lte ?? undefined;
    message.gt = object.gt ?? undefined;
    message.gte = object.gte ?? undefined;
    message.in = object.in?.map((e) => e) || [];
    message.notIn = object.notIn?.map((e) => e) || [];
    message.ignoreEmpty = object.ignoreEmpty ?? undefined;
    return message;
  },
};

function createBaseInt64Rules(): Int64Rules {
  return {
    const: undefined,
    lt: undefined,
    lte: undefined,
    gt: undefined,
    gte: undefined,
    in: [],
    notIn: [],
    ignoreEmpty: undefined,
  };
}

export const Int64Rules = {
  encode(message: Int64Rules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.const !== undefined) {
      writer.uint32(8).int64(message.const);
    }
    if (message.lt !== undefined) {
      writer.uint32(16).int64(message.lt);
    }
    if (message.lte !== undefined) {
      writer.uint32(24).int64(message.lte);
    }
    if (message.gt !== undefined) {
      writer.uint32(32).int64(message.gt);
    }
    if (message.gte !== undefined) {
      writer.uint32(40).int64(message.gte);
    }
    writer.uint32(50).fork();
    for (const v of message.in) {
      writer.int64(v);
    }
    writer.ldelim();
    writer.uint32(58).fork();
    for (const v of message.notIn) {
      writer.int64(v);
    }
    writer.ldelim();
    if (message.ignoreEmpty !== undefined) {
      writer.uint32(64).bool(message.ignoreEmpty);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Int64Rules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInt64Rules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.const = longToString(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.lt = longToString(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.lte = longToString(reader.int64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.gt = longToString(reader.int64() as Long);
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.gte = longToString(reader.int64() as Long);
          continue;
        case 6:
          if (tag === 48) {
            message.in.push(longToString(reader.int64() as Long));

            continue;
          }

          if (tag === 50) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.in.push(longToString(reader.int64() as Long));
            }

            continue;
          }

          break;
        case 7:
          if (tag === 56) {
            message.notIn.push(longToString(reader.int64() as Long));

            continue;
          }

          if (tag === 58) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.notIn.push(longToString(reader.int64() as Long));
            }

            continue;
          }

          break;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.ignoreEmpty = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Int64Rules {
    return {
      const: isSet(object.const) ? globalThis.String(object.const) : undefined,
      lt: isSet(object.lt) ? globalThis.String(object.lt) : undefined,
      lte: isSet(object.lte) ? globalThis.String(object.lte) : undefined,
      gt: isSet(object.gt) ? globalThis.String(object.gt) : undefined,
      gte: isSet(object.gte) ? globalThis.String(object.gte) : undefined,
      in: globalThis.Array.isArray(object?.in) ? object.in.map((e: any) => globalThis.String(e)) : [],
      notIn: globalThis.Array.isArray(object?.notIn) ? object.notIn.map((e: any) => globalThis.String(e)) : [],
      ignoreEmpty: isSet(object.ignoreEmpty) ? globalThis.Boolean(object.ignoreEmpty) : undefined,
    };
  },

  toJSON(message: Int64Rules): unknown {
    const obj: any = {};
    if (message.const !== undefined) {
      obj.const = message.const;
    }
    if (message.lt !== undefined) {
      obj.lt = message.lt;
    }
    if (message.lte !== undefined) {
      obj.lte = message.lte;
    }
    if (message.gt !== undefined) {
      obj.gt = message.gt;
    }
    if (message.gte !== undefined) {
      obj.gte = message.gte;
    }
    if (message.in?.length) {
      obj.in = message.in;
    }
    if (message.notIn?.length) {
      obj.notIn = message.notIn;
    }
    if (message.ignoreEmpty !== undefined) {
      obj.ignoreEmpty = message.ignoreEmpty;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Int64Rules>, I>>(base?: I): Int64Rules {
    return Int64Rules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Int64Rules>, I>>(object: I): Int64Rules {
    const message = createBaseInt64Rules();
    message.const = object.const ?? undefined;
    message.lt = object.lt ?? undefined;
    message.lte = object.lte ?? undefined;
    message.gt = object.gt ?? undefined;
    message.gte = object.gte ?? undefined;
    message.in = object.in?.map((e) => e) || [];
    message.notIn = object.notIn?.map((e) => e) || [];
    message.ignoreEmpty = object.ignoreEmpty ?? undefined;
    return message;
  },
};

function createBaseUInt32Rules(): UInt32Rules {
  return {
    const: undefined,
    lt: undefined,
    lte: undefined,
    gt: undefined,
    gte: undefined,
    in: [],
    notIn: [],
    ignoreEmpty: undefined,
  };
}

export const UInt32Rules = {
  encode(message: UInt32Rules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.const !== undefined) {
      writer.uint32(8).uint32(message.const);
    }
    if (message.lt !== undefined) {
      writer.uint32(16).uint32(message.lt);
    }
    if (message.lte !== undefined) {
      writer.uint32(24).uint32(message.lte);
    }
    if (message.gt !== undefined) {
      writer.uint32(32).uint32(message.gt);
    }
    if (message.gte !== undefined) {
      writer.uint32(40).uint32(message.gte);
    }
    writer.uint32(50).fork();
    for (const v of message.in) {
      writer.uint32(v);
    }
    writer.ldelim();
    writer.uint32(58).fork();
    for (const v of message.notIn) {
      writer.uint32(v);
    }
    writer.ldelim();
    if (message.ignoreEmpty !== undefined) {
      writer.uint32(64).bool(message.ignoreEmpty);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UInt32Rules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUInt32Rules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.const = reader.uint32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.lt = reader.uint32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.lte = reader.uint32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.gt = reader.uint32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.gte = reader.uint32();
          continue;
        case 6:
          if (tag === 48) {
            message.in.push(reader.uint32());

            continue;
          }

          if (tag === 50) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.in.push(reader.uint32());
            }

            continue;
          }

          break;
        case 7:
          if (tag === 56) {
            message.notIn.push(reader.uint32());

            continue;
          }

          if (tag === 58) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.notIn.push(reader.uint32());
            }

            continue;
          }

          break;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.ignoreEmpty = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UInt32Rules {
    return {
      const: isSet(object.const) ? globalThis.Number(object.const) : undefined,
      lt: isSet(object.lt) ? globalThis.Number(object.lt) : undefined,
      lte: isSet(object.lte) ? globalThis.Number(object.lte) : undefined,
      gt: isSet(object.gt) ? globalThis.Number(object.gt) : undefined,
      gte: isSet(object.gte) ? globalThis.Number(object.gte) : undefined,
      in: globalThis.Array.isArray(object?.in) ? object.in.map((e: any) => globalThis.Number(e)) : [],
      notIn: globalThis.Array.isArray(object?.notIn) ? object.notIn.map((e: any) => globalThis.Number(e)) : [],
      ignoreEmpty: isSet(object.ignoreEmpty) ? globalThis.Boolean(object.ignoreEmpty) : undefined,
    };
  },

  toJSON(message: UInt32Rules): unknown {
    const obj: any = {};
    if (message.const !== undefined) {
      obj.const = Math.round(message.const);
    }
    if (message.lt !== undefined) {
      obj.lt = Math.round(message.lt);
    }
    if (message.lte !== undefined) {
      obj.lte = Math.round(message.lte);
    }
    if (message.gt !== undefined) {
      obj.gt = Math.round(message.gt);
    }
    if (message.gte !== undefined) {
      obj.gte = Math.round(message.gte);
    }
    if (message.in?.length) {
      obj.in = message.in.map((e) => Math.round(e));
    }
    if (message.notIn?.length) {
      obj.notIn = message.notIn.map((e) => Math.round(e));
    }
    if (message.ignoreEmpty !== undefined) {
      obj.ignoreEmpty = message.ignoreEmpty;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UInt32Rules>, I>>(base?: I): UInt32Rules {
    return UInt32Rules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UInt32Rules>, I>>(object: I): UInt32Rules {
    const message = createBaseUInt32Rules();
    message.const = object.const ?? undefined;
    message.lt = object.lt ?? undefined;
    message.lte = object.lte ?? undefined;
    message.gt = object.gt ?? undefined;
    message.gte = object.gte ?? undefined;
    message.in = object.in?.map((e) => e) || [];
    message.notIn = object.notIn?.map((e) => e) || [];
    message.ignoreEmpty = object.ignoreEmpty ?? undefined;
    return message;
  },
};

function createBaseUInt64Rules(): UInt64Rules {
  return {
    const: undefined,
    lt: undefined,
    lte: undefined,
    gt: undefined,
    gte: undefined,
    in: [],
    notIn: [],
    ignoreEmpty: undefined,
  };
}

export const UInt64Rules = {
  encode(message: UInt64Rules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.const !== undefined) {
      writer.uint32(8).uint64(message.const);
    }
    if (message.lt !== undefined) {
      writer.uint32(16).uint64(message.lt);
    }
    if (message.lte !== undefined) {
      writer.uint32(24).uint64(message.lte);
    }
    if (message.gt !== undefined) {
      writer.uint32(32).uint64(message.gt);
    }
    if (message.gte !== undefined) {
      writer.uint32(40).uint64(message.gte);
    }
    writer.uint32(50).fork();
    for (const v of message.in) {
      writer.uint64(v);
    }
    writer.ldelim();
    writer.uint32(58).fork();
    for (const v of message.notIn) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (message.ignoreEmpty !== undefined) {
      writer.uint32(64).bool(message.ignoreEmpty);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UInt64Rules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUInt64Rules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.const = longToString(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.lt = longToString(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.lte = longToString(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.gt = longToString(reader.uint64() as Long);
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.gte = longToString(reader.uint64() as Long);
          continue;
        case 6:
          if (tag === 48) {
            message.in.push(longToString(reader.uint64() as Long));

            continue;
          }

          if (tag === 50) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.in.push(longToString(reader.uint64() as Long));
            }

            continue;
          }

          break;
        case 7:
          if (tag === 56) {
            message.notIn.push(longToString(reader.uint64() as Long));

            continue;
          }

          if (tag === 58) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.notIn.push(longToString(reader.uint64() as Long));
            }

            continue;
          }

          break;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.ignoreEmpty = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UInt64Rules {
    return {
      const: isSet(object.const) ? globalThis.String(object.const) : undefined,
      lt: isSet(object.lt) ? globalThis.String(object.lt) : undefined,
      lte: isSet(object.lte) ? globalThis.String(object.lte) : undefined,
      gt: isSet(object.gt) ? globalThis.String(object.gt) : undefined,
      gte: isSet(object.gte) ? globalThis.String(object.gte) : undefined,
      in: globalThis.Array.isArray(object?.in) ? object.in.map((e: any) => globalThis.String(e)) : [],
      notIn: globalThis.Array.isArray(object?.notIn) ? object.notIn.map((e: any) => globalThis.String(e)) : [],
      ignoreEmpty: isSet(object.ignoreEmpty) ? globalThis.Boolean(object.ignoreEmpty) : undefined,
    };
  },

  toJSON(message: UInt64Rules): unknown {
    const obj: any = {};
    if (message.const !== undefined) {
      obj.const = message.const;
    }
    if (message.lt !== undefined) {
      obj.lt = message.lt;
    }
    if (message.lte !== undefined) {
      obj.lte = message.lte;
    }
    if (message.gt !== undefined) {
      obj.gt = message.gt;
    }
    if (message.gte !== undefined) {
      obj.gte = message.gte;
    }
    if (message.in?.length) {
      obj.in = message.in;
    }
    if (message.notIn?.length) {
      obj.notIn = message.notIn;
    }
    if (message.ignoreEmpty !== undefined) {
      obj.ignoreEmpty = message.ignoreEmpty;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UInt64Rules>, I>>(base?: I): UInt64Rules {
    return UInt64Rules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UInt64Rules>, I>>(object: I): UInt64Rules {
    const message = createBaseUInt64Rules();
    message.const = object.const ?? undefined;
    message.lt = object.lt ?? undefined;
    message.lte = object.lte ?? undefined;
    message.gt = object.gt ?? undefined;
    message.gte = object.gte ?? undefined;
    message.in = object.in?.map((e) => e) || [];
    message.notIn = object.notIn?.map((e) => e) || [];
    message.ignoreEmpty = object.ignoreEmpty ?? undefined;
    return message;
  },
};

function createBaseSInt32Rules(): SInt32Rules {
  return {
    const: undefined,
    lt: undefined,
    lte: undefined,
    gt: undefined,
    gte: undefined,
    in: [],
    notIn: [],
    ignoreEmpty: undefined,
  };
}

export const SInt32Rules = {
  encode(message: SInt32Rules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.const !== undefined) {
      writer.uint32(8).sint32(message.const);
    }
    if (message.lt !== undefined) {
      writer.uint32(16).sint32(message.lt);
    }
    if (message.lte !== undefined) {
      writer.uint32(24).sint32(message.lte);
    }
    if (message.gt !== undefined) {
      writer.uint32(32).sint32(message.gt);
    }
    if (message.gte !== undefined) {
      writer.uint32(40).sint32(message.gte);
    }
    writer.uint32(50).fork();
    for (const v of message.in) {
      writer.sint32(v);
    }
    writer.ldelim();
    writer.uint32(58).fork();
    for (const v of message.notIn) {
      writer.sint32(v);
    }
    writer.ldelim();
    if (message.ignoreEmpty !== undefined) {
      writer.uint32(64).bool(message.ignoreEmpty);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SInt32Rules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSInt32Rules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.const = reader.sint32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.lt = reader.sint32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.lte = reader.sint32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.gt = reader.sint32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.gte = reader.sint32();
          continue;
        case 6:
          if (tag === 48) {
            message.in.push(reader.sint32());

            continue;
          }

          if (tag === 50) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.in.push(reader.sint32());
            }

            continue;
          }

          break;
        case 7:
          if (tag === 56) {
            message.notIn.push(reader.sint32());

            continue;
          }

          if (tag === 58) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.notIn.push(reader.sint32());
            }

            continue;
          }

          break;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.ignoreEmpty = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SInt32Rules {
    return {
      const: isSet(object.const) ? globalThis.Number(object.const) : undefined,
      lt: isSet(object.lt) ? globalThis.Number(object.lt) : undefined,
      lte: isSet(object.lte) ? globalThis.Number(object.lte) : undefined,
      gt: isSet(object.gt) ? globalThis.Number(object.gt) : undefined,
      gte: isSet(object.gte) ? globalThis.Number(object.gte) : undefined,
      in: globalThis.Array.isArray(object?.in) ? object.in.map((e: any) => globalThis.Number(e)) : [],
      notIn: globalThis.Array.isArray(object?.notIn) ? object.notIn.map((e: any) => globalThis.Number(e)) : [],
      ignoreEmpty: isSet(object.ignoreEmpty) ? globalThis.Boolean(object.ignoreEmpty) : undefined,
    };
  },

  toJSON(message: SInt32Rules): unknown {
    const obj: any = {};
    if (message.const !== undefined) {
      obj.const = Math.round(message.const);
    }
    if (message.lt !== undefined) {
      obj.lt = Math.round(message.lt);
    }
    if (message.lte !== undefined) {
      obj.lte = Math.round(message.lte);
    }
    if (message.gt !== undefined) {
      obj.gt = Math.round(message.gt);
    }
    if (message.gte !== undefined) {
      obj.gte = Math.round(message.gte);
    }
    if (message.in?.length) {
      obj.in = message.in.map((e) => Math.round(e));
    }
    if (message.notIn?.length) {
      obj.notIn = message.notIn.map((e) => Math.round(e));
    }
    if (message.ignoreEmpty !== undefined) {
      obj.ignoreEmpty = message.ignoreEmpty;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SInt32Rules>, I>>(base?: I): SInt32Rules {
    return SInt32Rules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SInt32Rules>, I>>(object: I): SInt32Rules {
    const message = createBaseSInt32Rules();
    message.const = object.const ?? undefined;
    message.lt = object.lt ?? undefined;
    message.lte = object.lte ?? undefined;
    message.gt = object.gt ?? undefined;
    message.gte = object.gte ?? undefined;
    message.in = object.in?.map((e) => e) || [];
    message.notIn = object.notIn?.map((e) => e) || [];
    message.ignoreEmpty = object.ignoreEmpty ?? undefined;
    return message;
  },
};

function createBaseSInt64Rules(): SInt64Rules {
  return {
    const: undefined,
    lt: undefined,
    lte: undefined,
    gt: undefined,
    gte: undefined,
    in: [],
    notIn: [],
    ignoreEmpty: undefined,
  };
}

export const SInt64Rules = {
  encode(message: SInt64Rules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.const !== undefined) {
      writer.uint32(8).sint64(message.const);
    }
    if (message.lt !== undefined) {
      writer.uint32(16).sint64(message.lt);
    }
    if (message.lte !== undefined) {
      writer.uint32(24).sint64(message.lte);
    }
    if (message.gt !== undefined) {
      writer.uint32(32).sint64(message.gt);
    }
    if (message.gte !== undefined) {
      writer.uint32(40).sint64(message.gte);
    }
    writer.uint32(50).fork();
    for (const v of message.in) {
      writer.sint64(v);
    }
    writer.ldelim();
    writer.uint32(58).fork();
    for (const v of message.notIn) {
      writer.sint64(v);
    }
    writer.ldelim();
    if (message.ignoreEmpty !== undefined) {
      writer.uint32(64).bool(message.ignoreEmpty);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SInt64Rules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSInt64Rules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.const = longToString(reader.sint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.lt = longToString(reader.sint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.lte = longToString(reader.sint64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.gt = longToString(reader.sint64() as Long);
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.gte = longToString(reader.sint64() as Long);
          continue;
        case 6:
          if (tag === 48) {
            message.in.push(longToString(reader.sint64() as Long));

            continue;
          }

          if (tag === 50) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.in.push(longToString(reader.sint64() as Long));
            }

            continue;
          }

          break;
        case 7:
          if (tag === 56) {
            message.notIn.push(longToString(reader.sint64() as Long));

            continue;
          }

          if (tag === 58) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.notIn.push(longToString(reader.sint64() as Long));
            }

            continue;
          }

          break;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.ignoreEmpty = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SInt64Rules {
    return {
      const: isSet(object.const) ? globalThis.String(object.const) : undefined,
      lt: isSet(object.lt) ? globalThis.String(object.lt) : undefined,
      lte: isSet(object.lte) ? globalThis.String(object.lte) : undefined,
      gt: isSet(object.gt) ? globalThis.String(object.gt) : undefined,
      gte: isSet(object.gte) ? globalThis.String(object.gte) : undefined,
      in: globalThis.Array.isArray(object?.in) ? object.in.map((e: any) => globalThis.String(e)) : [],
      notIn: globalThis.Array.isArray(object?.notIn) ? object.notIn.map((e: any) => globalThis.String(e)) : [],
      ignoreEmpty: isSet(object.ignoreEmpty) ? globalThis.Boolean(object.ignoreEmpty) : undefined,
    };
  },

  toJSON(message: SInt64Rules): unknown {
    const obj: any = {};
    if (message.const !== undefined) {
      obj.const = message.const;
    }
    if (message.lt !== undefined) {
      obj.lt = message.lt;
    }
    if (message.lte !== undefined) {
      obj.lte = message.lte;
    }
    if (message.gt !== undefined) {
      obj.gt = message.gt;
    }
    if (message.gte !== undefined) {
      obj.gte = message.gte;
    }
    if (message.in?.length) {
      obj.in = message.in;
    }
    if (message.notIn?.length) {
      obj.notIn = message.notIn;
    }
    if (message.ignoreEmpty !== undefined) {
      obj.ignoreEmpty = message.ignoreEmpty;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SInt64Rules>, I>>(base?: I): SInt64Rules {
    return SInt64Rules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SInt64Rules>, I>>(object: I): SInt64Rules {
    const message = createBaseSInt64Rules();
    message.const = object.const ?? undefined;
    message.lt = object.lt ?? undefined;
    message.lte = object.lte ?? undefined;
    message.gt = object.gt ?? undefined;
    message.gte = object.gte ?? undefined;
    message.in = object.in?.map((e) => e) || [];
    message.notIn = object.notIn?.map((e) => e) || [];
    message.ignoreEmpty = object.ignoreEmpty ?? undefined;
    return message;
  },
};

function createBaseFixed32Rules(): Fixed32Rules {
  return {
    const: undefined,
    lt: undefined,
    lte: undefined,
    gt: undefined,
    gte: undefined,
    in: [],
    notIn: [],
    ignoreEmpty: undefined,
  };
}

export const Fixed32Rules = {
  encode(message: Fixed32Rules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.const !== undefined) {
      writer.uint32(13).fixed32(message.const);
    }
    if (message.lt !== undefined) {
      writer.uint32(21).fixed32(message.lt);
    }
    if (message.lte !== undefined) {
      writer.uint32(29).fixed32(message.lte);
    }
    if (message.gt !== undefined) {
      writer.uint32(37).fixed32(message.gt);
    }
    if (message.gte !== undefined) {
      writer.uint32(45).fixed32(message.gte);
    }
    writer.uint32(50).fork();
    for (const v of message.in) {
      writer.fixed32(v);
    }
    writer.ldelim();
    writer.uint32(58).fork();
    for (const v of message.notIn) {
      writer.fixed32(v);
    }
    writer.ldelim();
    if (message.ignoreEmpty !== undefined) {
      writer.uint32(64).bool(message.ignoreEmpty);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Fixed32Rules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFixed32Rules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }

          message.const = reader.fixed32();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }

          message.lt = reader.fixed32();
          continue;
        case 3:
          if (tag !== 29) {
            break;
          }

          message.lte = reader.fixed32();
          continue;
        case 4:
          if (tag !== 37) {
            break;
          }

          message.gt = reader.fixed32();
          continue;
        case 5:
          if (tag !== 45) {
            break;
          }

          message.gte = reader.fixed32();
          continue;
        case 6:
          if (tag === 53) {
            message.in.push(reader.fixed32());

            continue;
          }

          if (tag === 50) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.in.push(reader.fixed32());
            }

            continue;
          }

          break;
        case 7:
          if (tag === 61) {
            message.notIn.push(reader.fixed32());

            continue;
          }

          if (tag === 58) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.notIn.push(reader.fixed32());
            }

            continue;
          }

          break;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.ignoreEmpty = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Fixed32Rules {
    return {
      const: isSet(object.const) ? globalThis.Number(object.const) : undefined,
      lt: isSet(object.lt) ? globalThis.Number(object.lt) : undefined,
      lte: isSet(object.lte) ? globalThis.Number(object.lte) : undefined,
      gt: isSet(object.gt) ? globalThis.Number(object.gt) : undefined,
      gte: isSet(object.gte) ? globalThis.Number(object.gte) : undefined,
      in: globalThis.Array.isArray(object?.in) ? object.in.map((e: any) => globalThis.Number(e)) : [],
      notIn: globalThis.Array.isArray(object?.notIn) ? object.notIn.map((e: any) => globalThis.Number(e)) : [],
      ignoreEmpty: isSet(object.ignoreEmpty) ? globalThis.Boolean(object.ignoreEmpty) : undefined,
    };
  },

  toJSON(message: Fixed32Rules): unknown {
    const obj: any = {};
    if (message.const !== undefined) {
      obj.const = Math.round(message.const);
    }
    if (message.lt !== undefined) {
      obj.lt = Math.round(message.lt);
    }
    if (message.lte !== undefined) {
      obj.lte = Math.round(message.lte);
    }
    if (message.gt !== undefined) {
      obj.gt = Math.round(message.gt);
    }
    if (message.gte !== undefined) {
      obj.gte = Math.round(message.gte);
    }
    if (message.in?.length) {
      obj.in = message.in.map((e) => Math.round(e));
    }
    if (message.notIn?.length) {
      obj.notIn = message.notIn.map((e) => Math.round(e));
    }
    if (message.ignoreEmpty !== undefined) {
      obj.ignoreEmpty = message.ignoreEmpty;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Fixed32Rules>, I>>(base?: I): Fixed32Rules {
    return Fixed32Rules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Fixed32Rules>, I>>(object: I): Fixed32Rules {
    const message = createBaseFixed32Rules();
    message.const = object.const ?? undefined;
    message.lt = object.lt ?? undefined;
    message.lte = object.lte ?? undefined;
    message.gt = object.gt ?? undefined;
    message.gte = object.gte ?? undefined;
    message.in = object.in?.map((e) => e) || [];
    message.notIn = object.notIn?.map((e) => e) || [];
    message.ignoreEmpty = object.ignoreEmpty ?? undefined;
    return message;
  },
};

function createBaseFixed64Rules(): Fixed64Rules {
  return {
    const: undefined,
    lt: undefined,
    lte: undefined,
    gt: undefined,
    gte: undefined,
    in: [],
    notIn: [],
    ignoreEmpty: undefined,
  };
}

export const Fixed64Rules = {
  encode(message: Fixed64Rules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.const !== undefined) {
      writer.uint32(9).fixed64(message.const);
    }
    if (message.lt !== undefined) {
      writer.uint32(17).fixed64(message.lt);
    }
    if (message.lte !== undefined) {
      writer.uint32(25).fixed64(message.lte);
    }
    if (message.gt !== undefined) {
      writer.uint32(33).fixed64(message.gt);
    }
    if (message.gte !== undefined) {
      writer.uint32(41).fixed64(message.gte);
    }
    writer.uint32(50).fork();
    for (const v of message.in) {
      writer.fixed64(v);
    }
    writer.ldelim();
    writer.uint32(58).fork();
    for (const v of message.notIn) {
      writer.fixed64(v);
    }
    writer.ldelim();
    if (message.ignoreEmpty !== undefined) {
      writer.uint32(64).bool(message.ignoreEmpty);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Fixed64Rules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFixed64Rules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.const = longToString(reader.fixed64() as Long);
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.lt = longToString(reader.fixed64() as Long);
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.lte = longToString(reader.fixed64() as Long);
          continue;
        case 4:
          if (tag !== 33) {
            break;
          }

          message.gt = longToString(reader.fixed64() as Long);
          continue;
        case 5:
          if (tag !== 41) {
            break;
          }

          message.gte = longToString(reader.fixed64() as Long);
          continue;
        case 6:
          if (tag === 49) {
            message.in.push(longToString(reader.fixed64() as Long));

            continue;
          }

          if (tag === 50) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.in.push(longToString(reader.fixed64() as Long));
            }

            continue;
          }

          break;
        case 7:
          if (tag === 57) {
            message.notIn.push(longToString(reader.fixed64() as Long));

            continue;
          }

          if (tag === 58) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.notIn.push(longToString(reader.fixed64() as Long));
            }

            continue;
          }

          break;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.ignoreEmpty = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Fixed64Rules {
    return {
      const: isSet(object.const) ? globalThis.String(object.const) : undefined,
      lt: isSet(object.lt) ? globalThis.String(object.lt) : undefined,
      lte: isSet(object.lte) ? globalThis.String(object.lte) : undefined,
      gt: isSet(object.gt) ? globalThis.String(object.gt) : undefined,
      gte: isSet(object.gte) ? globalThis.String(object.gte) : undefined,
      in: globalThis.Array.isArray(object?.in) ? object.in.map((e: any) => globalThis.String(e)) : [],
      notIn: globalThis.Array.isArray(object?.notIn) ? object.notIn.map((e: any) => globalThis.String(e)) : [],
      ignoreEmpty: isSet(object.ignoreEmpty) ? globalThis.Boolean(object.ignoreEmpty) : undefined,
    };
  },

  toJSON(message: Fixed64Rules): unknown {
    const obj: any = {};
    if (message.const !== undefined) {
      obj.const = message.const;
    }
    if (message.lt !== undefined) {
      obj.lt = message.lt;
    }
    if (message.lte !== undefined) {
      obj.lte = message.lte;
    }
    if (message.gt !== undefined) {
      obj.gt = message.gt;
    }
    if (message.gte !== undefined) {
      obj.gte = message.gte;
    }
    if (message.in?.length) {
      obj.in = message.in;
    }
    if (message.notIn?.length) {
      obj.notIn = message.notIn;
    }
    if (message.ignoreEmpty !== undefined) {
      obj.ignoreEmpty = message.ignoreEmpty;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Fixed64Rules>, I>>(base?: I): Fixed64Rules {
    return Fixed64Rules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Fixed64Rules>, I>>(object: I): Fixed64Rules {
    const message = createBaseFixed64Rules();
    message.const = object.const ?? undefined;
    message.lt = object.lt ?? undefined;
    message.lte = object.lte ?? undefined;
    message.gt = object.gt ?? undefined;
    message.gte = object.gte ?? undefined;
    message.in = object.in?.map((e) => e) || [];
    message.notIn = object.notIn?.map((e) => e) || [];
    message.ignoreEmpty = object.ignoreEmpty ?? undefined;
    return message;
  },
};

function createBaseSFixed32Rules(): SFixed32Rules {
  return {
    const: undefined,
    lt: undefined,
    lte: undefined,
    gt: undefined,
    gte: undefined,
    in: [],
    notIn: [],
    ignoreEmpty: undefined,
  };
}

export const SFixed32Rules = {
  encode(message: SFixed32Rules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.const !== undefined) {
      writer.uint32(13).sfixed32(message.const);
    }
    if (message.lt !== undefined) {
      writer.uint32(21).sfixed32(message.lt);
    }
    if (message.lte !== undefined) {
      writer.uint32(29).sfixed32(message.lte);
    }
    if (message.gt !== undefined) {
      writer.uint32(37).sfixed32(message.gt);
    }
    if (message.gte !== undefined) {
      writer.uint32(45).sfixed32(message.gte);
    }
    writer.uint32(50).fork();
    for (const v of message.in) {
      writer.sfixed32(v);
    }
    writer.ldelim();
    writer.uint32(58).fork();
    for (const v of message.notIn) {
      writer.sfixed32(v);
    }
    writer.ldelim();
    if (message.ignoreEmpty !== undefined) {
      writer.uint32(64).bool(message.ignoreEmpty);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SFixed32Rules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSFixed32Rules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }

          message.const = reader.sfixed32();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }

          message.lt = reader.sfixed32();
          continue;
        case 3:
          if (tag !== 29) {
            break;
          }

          message.lte = reader.sfixed32();
          continue;
        case 4:
          if (tag !== 37) {
            break;
          }

          message.gt = reader.sfixed32();
          continue;
        case 5:
          if (tag !== 45) {
            break;
          }

          message.gte = reader.sfixed32();
          continue;
        case 6:
          if (tag === 53) {
            message.in.push(reader.sfixed32());

            continue;
          }

          if (tag === 50) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.in.push(reader.sfixed32());
            }

            continue;
          }

          break;
        case 7:
          if (tag === 61) {
            message.notIn.push(reader.sfixed32());

            continue;
          }

          if (tag === 58) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.notIn.push(reader.sfixed32());
            }

            continue;
          }

          break;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.ignoreEmpty = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SFixed32Rules {
    return {
      const: isSet(object.const) ? globalThis.Number(object.const) : undefined,
      lt: isSet(object.lt) ? globalThis.Number(object.lt) : undefined,
      lte: isSet(object.lte) ? globalThis.Number(object.lte) : undefined,
      gt: isSet(object.gt) ? globalThis.Number(object.gt) : undefined,
      gte: isSet(object.gte) ? globalThis.Number(object.gte) : undefined,
      in: globalThis.Array.isArray(object?.in) ? object.in.map((e: any) => globalThis.Number(e)) : [],
      notIn: globalThis.Array.isArray(object?.notIn) ? object.notIn.map((e: any) => globalThis.Number(e)) : [],
      ignoreEmpty: isSet(object.ignoreEmpty) ? globalThis.Boolean(object.ignoreEmpty) : undefined,
    };
  },

  toJSON(message: SFixed32Rules): unknown {
    const obj: any = {};
    if (message.const !== undefined) {
      obj.const = Math.round(message.const);
    }
    if (message.lt !== undefined) {
      obj.lt = Math.round(message.lt);
    }
    if (message.lte !== undefined) {
      obj.lte = Math.round(message.lte);
    }
    if (message.gt !== undefined) {
      obj.gt = Math.round(message.gt);
    }
    if (message.gte !== undefined) {
      obj.gte = Math.round(message.gte);
    }
    if (message.in?.length) {
      obj.in = message.in.map((e) => Math.round(e));
    }
    if (message.notIn?.length) {
      obj.notIn = message.notIn.map((e) => Math.round(e));
    }
    if (message.ignoreEmpty !== undefined) {
      obj.ignoreEmpty = message.ignoreEmpty;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SFixed32Rules>, I>>(base?: I): SFixed32Rules {
    return SFixed32Rules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SFixed32Rules>, I>>(object: I): SFixed32Rules {
    const message = createBaseSFixed32Rules();
    message.const = object.const ?? undefined;
    message.lt = object.lt ?? undefined;
    message.lte = object.lte ?? undefined;
    message.gt = object.gt ?? undefined;
    message.gte = object.gte ?? undefined;
    message.in = object.in?.map((e) => e) || [];
    message.notIn = object.notIn?.map((e) => e) || [];
    message.ignoreEmpty = object.ignoreEmpty ?? undefined;
    return message;
  },
};

function createBaseSFixed64Rules(): SFixed64Rules {
  return {
    const: undefined,
    lt: undefined,
    lte: undefined,
    gt: undefined,
    gte: undefined,
    in: [],
    notIn: [],
    ignoreEmpty: undefined,
  };
}

export const SFixed64Rules = {
  encode(message: SFixed64Rules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.const !== undefined) {
      writer.uint32(9).sfixed64(message.const);
    }
    if (message.lt !== undefined) {
      writer.uint32(17).sfixed64(message.lt);
    }
    if (message.lte !== undefined) {
      writer.uint32(25).sfixed64(message.lte);
    }
    if (message.gt !== undefined) {
      writer.uint32(33).sfixed64(message.gt);
    }
    if (message.gte !== undefined) {
      writer.uint32(41).sfixed64(message.gte);
    }
    writer.uint32(50).fork();
    for (const v of message.in) {
      writer.sfixed64(v);
    }
    writer.ldelim();
    writer.uint32(58).fork();
    for (const v of message.notIn) {
      writer.sfixed64(v);
    }
    writer.ldelim();
    if (message.ignoreEmpty !== undefined) {
      writer.uint32(64).bool(message.ignoreEmpty);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SFixed64Rules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSFixed64Rules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.const = longToString(reader.sfixed64() as Long);
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.lt = longToString(reader.sfixed64() as Long);
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.lte = longToString(reader.sfixed64() as Long);
          continue;
        case 4:
          if (tag !== 33) {
            break;
          }

          message.gt = longToString(reader.sfixed64() as Long);
          continue;
        case 5:
          if (tag !== 41) {
            break;
          }

          message.gte = longToString(reader.sfixed64() as Long);
          continue;
        case 6:
          if (tag === 49) {
            message.in.push(longToString(reader.sfixed64() as Long));

            continue;
          }

          if (tag === 50) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.in.push(longToString(reader.sfixed64() as Long));
            }

            continue;
          }

          break;
        case 7:
          if (tag === 57) {
            message.notIn.push(longToString(reader.sfixed64() as Long));

            continue;
          }

          if (tag === 58) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.notIn.push(longToString(reader.sfixed64() as Long));
            }

            continue;
          }

          break;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.ignoreEmpty = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SFixed64Rules {
    return {
      const: isSet(object.const) ? globalThis.String(object.const) : undefined,
      lt: isSet(object.lt) ? globalThis.String(object.lt) : undefined,
      lte: isSet(object.lte) ? globalThis.String(object.lte) : undefined,
      gt: isSet(object.gt) ? globalThis.String(object.gt) : undefined,
      gte: isSet(object.gte) ? globalThis.String(object.gte) : undefined,
      in: globalThis.Array.isArray(object?.in) ? object.in.map((e: any) => globalThis.String(e)) : [],
      notIn: globalThis.Array.isArray(object?.notIn) ? object.notIn.map((e: any) => globalThis.String(e)) : [],
      ignoreEmpty: isSet(object.ignoreEmpty) ? globalThis.Boolean(object.ignoreEmpty) : undefined,
    };
  },

  toJSON(message: SFixed64Rules): unknown {
    const obj: any = {};
    if (message.const !== undefined) {
      obj.const = message.const;
    }
    if (message.lt !== undefined) {
      obj.lt = message.lt;
    }
    if (message.lte !== undefined) {
      obj.lte = message.lte;
    }
    if (message.gt !== undefined) {
      obj.gt = message.gt;
    }
    if (message.gte !== undefined) {
      obj.gte = message.gte;
    }
    if (message.in?.length) {
      obj.in = message.in;
    }
    if (message.notIn?.length) {
      obj.notIn = message.notIn;
    }
    if (message.ignoreEmpty !== undefined) {
      obj.ignoreEmpty = message.ignoreEmpty;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SFixed64Rules>, I>>(base?: I): SFixed64Rules {
    return SFixed64Rules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SFixed64Rules>, I>>(object: I): SFixed64Rules {
    const message = createBaseSFixed64Rules();
    message.const = object.const ?? undefined;
    message.lt = object.lt ?? undefined;
    message.lte = object.lte ?? undefined;
    message.gt = object.gt ?? undefined;
    message.gte = object.gte ?? undefined;
    message.in = object.in?.map((e) => e) || [];
    message.notIn = object.notIn?.map((e) => e) || [];
    message.ignoreEmpty = object.ignoreEmpty ?? undefined;
    return message;
  },
};

function createBaseBoolRules(): BoolRules {
  return { const: undefined };
}

export const BoolRules = {
  encode(message: BoolRules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.const !== undefined) {
      writer.uint32(8).bool(message.const);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BoolRules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBoolRules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.const = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BoolRules {
    return { const: isSet(object.const) ? globalThis.Boolean(object.const) : undefined };
  },

  toJSON(message: BoolRules): unknown {
    const obj: any = {};
    if (message.const !== undefined) {
      obj.const = message.const;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BoolRules>, I>>(base?: I): BoolRules {
    return BoolRules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BoolRules>, I>>(object: I): BoolRules {
    const message = createBaseBoolRules();
    message.const = object.const ?? undefined;
    return message;
  },
};

function createBaseStringRules(): StringRules {
  return {
    const: undefined,
    len: undefined,
    minLen: undefined,
    maxLen: undefined,
    lenBytes: undefined,
    minBytes: undefined,
    maxBytes: undefined,
    pattern: undefined,
    prefix: undefined,
    suffix: undefined,
    contains: undefined,
    notContains: undefined,
    in: [],
    notIn: [],
    email: undefined,
    hostname: undefined,
    ip: undefined,
    ipv4: undefined,
    ipv6: undefined,
    uri: undefined,
    uriRef: undefined,
    address: undefined,
    uuid: undefined,
    wellKnownRegex: undefined,
    strict: undefined,
    ignoreEmpty: undefined,
  };
}

export const StringRules = {
  encode(message: StringRules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.const !== undefined) {
      writer.uint32(10).string(message.const);
    }
    if (message.len !== undefined) {
      writer.uint32(152).uint64(message.len);
    }
    if (message.minLen !== undefined) {
      writer.uint32(16).uint64(message.minLen);
    }
    if (message.maxLen !== undefined) {
      writer.uint32(24).uint64(message.maxLen);
    }
    if (message.lenBytes !== undefined) {
      writer.uint32(160).uint64(message.lenBytes);
    }
    if (message.minBytes !== undefined) {
      writer.uint32(32).uint64(message.minBytes);
    }
    if (message.maxBytes !== undefined) {
      writer.uint32(40).uint64(message.maxBytes);
    }
    if (message.pattern !== undefined) {
      writer.uint32(50).string(message.pattern);
    }
    if (message.prefix !== undefined) {
      writer.uint32(58).string(message.prefix);
    }
    if (message.suffix !== undefined) {
      writer.uint32(66).string(message.suffix);
    }
    if (message.contains !== undefined) {
      writer.uint32(74).string(message.contains);
    }
    if (message.notContains !== undefined) {
      writer.uint32(186).string(message.notContains);
    }
    for (const v of message.in) {
      writer.uint32(82).string(v!);
    }
    for (const v of message.notIn) {
      writer.uint32(90).string(v!);
    }
    if (message.email !== undefined) {
      writer.uint32(96).bool(message.email);
    }
    if (message.hostname !== undefined) {
      writer.uint32(104).bool(message.hostname);
    }
    if (message.ip !== undefined) {
      writer.uint32(112).bool(message.ip);
    }
    if (message.ipv4 !== undefined) {
      writer.uint32(120).bool(message.ipv4);
    }
    if (message.ipv6 !== undefined) {
      writer.uint32(128).bool(message.ipv6);
    }
    if (message.uri !== undefined) {
      writer.uint32(136).bool(message.uri);
    }
    if (message.uriRef !== undefined) {
      writer.uint32(144).bool(message.uriRef);
    }
    if (message.address !== undefined) {
      writer.uint32(168).bool(message.address);
    }
    if (message.uuid !== undefined) {
      writer.uint32(176).bool(message.uuid);
    }
    if (message.wellKnownRegex !== undefined) {
      writer.uint32(192).int32(message.wellKnownRegex);
    }
    if (message.strict !== undefined) {
      writer.uint32(200).bool(message.strict);
    }
    if (message.ignoreEmpty !== undefined) {
      writer.uint32(208).bool(message.ignoreEmpty);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StringRules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStringRules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.const = reader.string();
          continue;
        case 19:
          if (tag !== 152) {
            break;
          }

          message.len = longToString(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.minLen = longToString(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.maxLen = longToString(reader.uint64() as Long);
          continue;
        case 20:
          if (tag !== 160) {
            break;
          }

          message.lenBytes = longToString(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.minBytes = longToString(reader.uint64() as Long);
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.maxBytes = longToString(reader.uint64() as Long);
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.pattern = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.prefix = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.suffix = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.contains = reader.string();
          continue;
        case 23:
          if (tag !== 186) {
            break;
          }

          message.notContains = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.in.push(reader.string());
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.notIn.push(reader.string());
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }

          message.email = reader.bool();
          continue;
        case 13:
          if (tag !== 104) {
            break;
          }

          message.hostname = reader.bool();
          continue;
        case 14:
          if (tag !== 112) {
            break;
          }

          message.ip = reader.bool();
          continue;
        case 15:
          if (tag !== 120) {
            break;
          }

          message.ipv4 = reader.bool();
          continue;
        case 16:
          if (tag !== 128) {
            break;
          }

          message.ipv6 = reader.bool();
          continue;
        case 17:
          if (tag !== 136) {
            break;
          }

          message.uri = reader.bool();
          continue;
        case 18:
          if (tag !== 144) {
            break;
          }

          message.uriRef = reader.bool();
          continue;
        case 21:
          if (tag !== 168) {
            break;
          }

          message.address = reader.bool();
          continue;
        case 22:
          if (tag !== 176) {
            break;
          }

          message.uuid = reader.bool();
          continue;
        case 24:
          if (tag !== 192) {
            break;
          }

          message.wellKnownRegex = reader.int32() as any;
          continue;
        case 25:
          if (tag !== 200) {
            break;
          }

          message.strict = reader.bool();
          continue;
        case 26:
          if (tag !== 208) {
            break;
          }

          message.ignoreEmpty = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StringRules {
    return {
      const: isSet(object.const) ? globalThis.String(object.const) : undefined,
      len: isSet(object.len) ? globalThis.String(object.len) : undefined,
      minLen: isSet(object.minLen) ? globalThis.String(object.minLen) : undefined,
      maxLen: isSet(object.maxLen) ? globalThis.String(object.maxLen) : undefined,
      lenBytes: isSet(object.lenBytes) ? globalThis.String(object.lenBytes) : undefined,
      minBytes: isSet(object.minBytes) ? globalThis.String(object.minBytes) : undefined,
      maxBytes: isSet(object.maxBytes) ? globalThis.String(object.maxBytes) : undefined,
      pattern: isSet(object.pattern) ? globalThis.String(object.pattern) : undefined,
      prefix: isSet(object.prefix) ? globalThis.String(object.prefix) : undefined,
      suffix: isSet(object.suffix) ? globalThis.String(object.suffix) : undefined,
      contains: isSet(object.contains) ? globalThis.String(object.contains) : undefined,
      notContains: isSet(object.notContains) ? globalThis.String(object.notContains) : undefined,
      in: globalThis.Array.isArray(object?.in) ? object.in.map((e: any) => globalThis.String(e)) : [],
      notIn: globalThis.Array.isArray(object?.notIn) ? object.notIn.map((e: any) => globalThis.String(e)) : [],
      email: isSet(object.email) ? globalThis.Boolean(object.email) : undefined,
      hostname: isSet(object.hostname) ? globalThis.Boolean(object.hostname) : undefined,
      ip: isSet(object.ip) ? globalThis.Boolean(object.ip) : undefined,
      ipv4: isSet(object.ipv4) ? globalThis.Boolean(object.ipv4) : undefined,
      ipv6: isSet(object.ipv6) ? globalThis.Boolean(object.ipv6) : undefined,
      uri: isSet(object.uri) ? globalThis.Boolean(object.uri) : undefined,
      uriRef: isSet(object.uriRef) ? globalThis.Boolean(object.uriRef) : undefined,
      address: isSet(object.address) ? globalThis.Boolean(object.address) : undefined,
      uuid: isSet(object.uuid) ? globalThis.Boolean(object.uuid) : undefined,
      wellKnownRegex: isSet(object.wellKnownRegex) ? knownRegexFromJSON(object.wellKnownRegex) : undefined,
      strict: isSet(object.strict) ? globalThis.Boolean(object.strict) : undefined,
      ignoreEmpty: isSet(object.ignoreEmpty) ? globalThis.Boolean(object.ignoreEmpty) : undefined,
    };
  },

  toJSON(message: StringRules): unknown {
    const obj: any = {};
    if (message.const !== undefined) {
      obj.const = message.const;
    }
    if (message.len !== undefined) {
      obj.len = message.len;
    }
    if (message.minLen !== undefined) {
      obj.minLen = message.minLen;
    }
    if (message.maxLen !== undefined) {
      obj.maxLen = message.maxLen;
    }
    if (message.lenBytes !== undefined) {
      obj.lenBytes = message.lenBytes;
    }
    if (message.minBytes !== undefined) {
      obj.minBytes = message.minBytes;
    }
    if (message.maxBytes !== undefined) {
      obj.maxBytes = message.maxBytes;
    }
    if (message.pattern !== undefined) {
      obj.pattern = message.pattern;
    }
    if (message.prefix !== undefined) {
      obj.prefix = message.prefix;
    }
    if (message.suffix !== undefined) {
      obj.suffix = message.suffix;
    }
    if (message.contains !== undefined) {
      obj.contains = message.contains;
    }
    if (message.notContains !== undefined) {
      obj.notContains = message.notContains;
    }
    if (message.in?.length) {
      obj.in = message.in;
    }
    if (message.notIn?.length) {
      obj.notIn = message.notIn;
    }
    if (message.email !== undefined) {
      obj.email = message.email;
    }
    if (message.hostname !== undefined) {
      obj.hostname = message.hostname;
    }
    if (message.ip !== undefined) {
      obj.ip = message.ip;
    }
    if (message.ipv4 !== undefined) {
      obj.ipv4 = message.ipv4;
    }
    if (message.ipv6 !== undefined) {
      obj.ipv6 = message.ipv6;
    }
    if (message.uri !== undefined) {
      obj.uri = message.uri;
    }
    if (message.uriRef !== undefined) {
      obj.uriRef = message.uriRef;
    }
    if (message.address !== undefined) {
      obj.address = message.address;
    }
    if (message.uuid !== undefined) {
      obj.uuid = message.uuid;
    }
    if (message.wellKnownRegex !== undefined) {
      obj.wellKnownRegex = knownRegexToJSON(message.wellKnownRegex);
    }
    if (message.strict !== undefined) {
      obj.strict = message.strict;
    }
    if (message.ignoreEmpty !== undefined) {
      obj.ignoreEmpty = message.ignoreEmpty;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StringRules>, I>>(base?: I): StringRules {
    return StringRules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StringRules>, I>>(object: I): StringRules {
    const message = createBaseStringRules();
    message.const = object.const ?? undefined;
    message.len = object.len ?? undefined;
    message.minLen = object.minLen ?? undefined;
    message.maxLen = object.maxLen ?? undefined;
    message.lenBytes = object.lenBytes ?? undefined;
    message.minBytes = object.minBytes ?? undefined;
    message.maxBytes = object.maxBytes ?? undefined;
    message.pattern = object.pattern ?? undefined;
    message.prefix = object.prefix ?? undefined;
    message.suffix = object.suffix ?? undefined;
    message.contains = object.contains ?? undefined;
    message.notContains = object.notContains ?? undefined;
    message.in = object.in?.map((e) => e) || [];
    message.notIn = object.notIn?.map((e) => e) || [];
    message.email = object.email ?? undefined;
    message.hostname = object.hostname ?? undefined;
    message.ip = object.ip ?? undefined;
    message.ipv4 = object.ipv4 ?? undefined;
    message.ipv6 = object.ipv6 ?? undefined;
    message.uri = object.uri ?? undefined;
    message.uriRef = object.uriRef ?? undefined;
    message.address = object.address ?? undefined;
    message.uuid = object.uuid ?? undefined;
    message.wellKnownRegex = object.wellKnownRegex ?? undefined;
    message.strict = object.strict ?? undefined;
    message.ignoreEmpty = object.ignoreEmpty ?? undefined;
    return message;
  },
};

function createBaseBytesRules(): BytesRules {
  return {
    const: undefined,
    len: undefined,
    minLen: undefined,
    maxLen: undefined,
    pattern: undefined,
    prefix: undefined,
    suffix: undefined,
    contains: undefined,
    in: [],
    notIn: [],
    ip: undefined,
    ipv4: undefined,
    ipv6: undefined,
    ignoreEmpty: undefined,
  };
}

export const BytesRules = {
  encode(message: BytesRules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.const !== undefined) {
      writer.uint32(10).bytes(message.const);
    }
    if (message.len !== undefined) {
      writer.uint32(104).uint64(message.len);
    }
    if (message.minLen !== undefined) {
      writer.uint32(16).uint64(message.minLen);
    }
    if (message.maxLen !== undefined) {
      writer.uint32(24).uint64(message.maxLen);
    }
    if (message.pattern !== undefined) {
      writer.uint32(34).string(message.pattern);
    }
    if (message.prefix !== undefined) {
      writer.uint32(42).bytes(message.prefix);
    }
    if (message.suffix !== undefined) {
      writer.uint32(50).bytes(message.suffix);
    }
    if (message.contains !== undefined) {
      writer.uint32(58).bytes(message.contains);
    }
    for (const v of message.in) {
      writer.uint32(66).bytes(v!);
    }
    for (const v of message.notIn) {
      writer.uint32(74).bytes(v!);
    }
    if (message.ip !== undefined) {
      writer.uint32(80).bool(message.ip);
    }
    if (message.ipv4 !== undefined) {
      writer.uint32(88).bool(message.ipv4);
    }
    if (message.ipv6 !== undefined) {
      writer.uint32(96).bool(message.ipv6);
    }
    if (message.ignoreEmpty !== undefined) {
      writer.uint32(112).bool(message.ignoreEmpty);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BytesRules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBytesRules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.const = reader.bytes();
          continue;
        case 13:
          if (tag !== 104) {
            break;
          }

          message.len = longToString(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.minLen = longToString(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.maxLen = longToString(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.pattern = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.prefix = reader.bytes();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.suffix = reader.bytes();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.contains = reader.bytes();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.in.push(reader.bytes());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.notIn.push(reader.bytes());
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.ip = reader.bool();
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.ipv4 = reader.bool();
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }

          message.ipv6 = reader.bool();
          continue;
        case 14:
          if (tag !== 112) {
            break;
          }

          message.ignoreEmpty = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BytesRules {
    return {
      const: isSet(object.const) ? bytesFromBase64(object.const) : undefined,
      len: isSet(object.len) ? globalThis.String(object.len) : undefined,
      minLen: isSet(object.minLen) ? globalThis.String(object.minLen) : undefined,
      maxLen: isSet(object.maxLen) ? globalThis.String(object.maxLen) : undefined,
      pattern: isSet(object.pattern) ? globalThis.String(object.pattern) : undefined,
      prefix: isSet(object.prefix) ? bytesFromBase64(object.prefix) : undefined,
      suffix: isSet(object.suffix) ? bytesFromBase64(object.suffix) : undefined,
      contains: isSet(object.contains) ? bytesFromBase64(object.contains) : undefined,
      in: globalThis.Array.isArray(object?.in) ? object.in.map((e: any) => bytesFromBase64(e)) : [],
      notIn: globalThis.Array.isArray(object?.notIn) ? object.notIn.map((e: any) => bytesFromBase64(e)) : [],
      ip: isSet(object.ip) ? globalThis.Boolean(object.ip) : undefined,
      ipv4: isSet(object.ipv4) ? globalThis.Boolean(object.ipv4) : undefined,
      ipv6: isSet(object.ipv6) ? globalThis.Boolean(object.ipv6) : undefined,
      ignoreEmpty: isSet(object.ignoreEmpty) ? globalThis.Boolean(object.ignoreEmpty) : undefined,
    };
  },

  toJSON(message: BytesRules): unknown {
    const obj: any = {};
    if (message.const !== undefined) {
      obj.const = base64FromBytes(message.const);
    }
    if (message.len !== undefined) {
      obj.len = message.len;
    }
    if (message.minLen !== undefined) {
      obj.minLen = message.minLen;
    }
    if (message.maxLen !== undefined) {
      obj.maxLen = message.maxLen;
    }
    if (message.pattern !== undefined) {
      obj.pattern = message.pattern;
    }
    if (message.prefix !== undefined) {
      obj.prefix = base64FromBytes(message.prefix);
    }
    if (message.suffix !== undefined) {
      obj.suffix = base64FromBytes(message.suffix);
    }
    if (message.contains !== undefined) {
      obj.contains = base64FromBytes(message.contains);
    }
    if (message.in?.length) {
      obj.in = message.in.map((e) => base64FromBytes(e));
    }
    if (message.notIn?.length) {
      obj.notIn = message.notIn.map((e) => base64FromBytes(e));
    }
    if (message.ip !== undefined) {
      obj.ip = message.ip;
    }
    if (message.ipv4 !== undefined) {
      obj.ipv4 = message.ipv4;
    }
    if (message.ipv6 !== undefined) {
      obj.ipv6 = message.ipv6;
    }
    if (message.ignoreEmpty !== undefined) {
      obj.ignoreEmpty = message.ignoreEmpty;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BytesRules>, I>>(base?: I): BytesRules {
    return BytesRules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BytesRules>, I>>(object: I): BytesRules {
    const message = createBaseBytesRules();
    message.const = object.const ?? undefined;
    message.len = object.len ?? undefined;
    message.minLen = object.minLen ?? undefined;
    message.maxLen = object.maxLen ?? undefined;
    message.pattern = object.pattern ?? undefined;
    message.prefix = object.prefix ?? undefined;
    message.suffix = object.suffix ?? undefined;
    message.contains = object.contains ?? undefined;
    message.in = object.in?.map((e) => e) || [];
    message.notIn = object.notIn?.map((e) => e) || [];
    message.ip = object.ip ?? undefined;
    message.ipv4 = object.ipv4 ?? undefined;
    message.ipv6 = object.ipv6 ?? undefined;
    message.ignoreEmpty = object.ignoreEmpty ?? undefined;
    return message;
  },
};

function createBaseEnumRules(): EnumRules {
  return { const: undefined, definedOnly: undefined, in: [], notIn: [] };
}

export const EnumRules = {
  encode(message: EnumRules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.const !== undefined) {
      writer.uint32(8).int32(message.const);
    }
    if (message.definedOnly !== undefined) {
      writer.uint32(16).bool(message.definedOnly);
    }
    writer.uint32(26).fork();
    for (const v of message.in) {
      writer.int32(v);
    }
    writer.ldelim();
    writer.uint32(34).fork();
    for (const v of message.notIn) {
      writer.int32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EnumRules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEnumRules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.const = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.definedOnly = reader.bool();
          continue;
        case 3:
          if (tag === 24) {
            message.in.push(reader.int32());

            continue;
          }

          if (tag === 26) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.in.push(reader.int32());
            }

            continue;
          }

          break;
        case 4:
          if (tag === 32) {
            message.notIn.push(reader.int32());

            continue;
          }

          if (tag === 34) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.notIn.push(reader.int32());
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EnumRules {
    return {
      const: isSet(object.const) ? globalThis.Number(object.const) : undefined,
      definedOnly: isSet(object.definedOnly) ? globalThis.Boolean(object.definedOnly) : undefined,
      in: globalThis.Array.isArray(object?.in) ? object.in.map((e: any) => globalThis.Number(e)) : [],
      notIn: globalThis.Array.isArray(object?.notIn) ? object.notIn.map((e: any) => globalThis.Number(e)) : [],
    };
  },

  toJSON(message: EnumRules): unknown {
    const obj: any = {};
    if (message.const !== undefined) {
      obj.const = Math.round(message.const);
    }
    if (message.definedOnly !== undefined) {
      obj.definedOnly = message.definedOnly;
    }
    if (message.in?.length) {
      obj.in = message.in.map((e) => Math.round(e));
    }
    if (message.notIn?.length) {
      obj.notIn = message.notIn.map((e) => Math.round(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EnumRules>, I>>(base?: I): EnumRules {
    return EnumRules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EnumRules>, I>>(object: I): EnumRules {
    const message = createBaseEnumRules();
    message.const = object.const ?? undefined;
    message.definedOnly = object.definedOnly ?? undefined;
    message.in = object.in?.map((e) => e) || [];
    message.notIn = object.notIn?.map((e) => e) || [];
    return message;
  },
};

function createBaseMessageRules(): MessageRules {
  return { skip: undefined, required: undefined };
}

export const MessageRules = {
  encode(message: MessageRules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.skip !== undefined) {
      writer.uint32(8).bool(message.skip);
    }
    if (message.required !== undefined) {
      writer.uint32(16).bool(message.required);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageRules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageRules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.skip = reader.bool();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.required = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MessageRules {
    return {
      skip: isSet(object.skip) ? globalThis.Boolean(object.skip) : undefined,
      required: isSet(object.required) ? globalThis.Boolean(object.required) : undefined,
    };
  },

  toJSON(message: MessageRules): unknown {
    const obj: any = {};
    if (message.skip !== undefined) {
      obj.skip = message.skip;
    }
    if (message.required !== undefined) {
      obj.required = message.required;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MessageRules>, I>>(base?: I): MessageRules {
    return MessageRules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MessageRules>, I>>(object: I): MessageRules {
    const message = createBaseMessageRules();
    message.skip = object.skip ?? undefined;
    message.required = object.required ?? undefined;
    return message;
  },
};

function createBaseRepeatedRules(): RepeatedRules {
  return { minItems: undefined, maxItems: undefined, unique: undefined, items: undefined, ignoreEmpty: undefined };
}

export const RepeatedRules = {
  encode(message: RepeatedRules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.minItems !== undefined) {
      writer.uint32(8).uint64(message.minItems);
    }
    if (message.maxItems !== undefined) {
      writer.uint32(16).uint64(message.maxItems);
    }
    if (message.unique !== undefined) {
      writer.uint32(24).bool(message.unique);
    }
    if (message.items !== undefined) {
      FieldRules.encode(message.items, writer.uint32(34).fork()).ldelim();
    }
    if (message.ignoreEmpty !== undefined) {
      writer.uint32(40).bool(message.ignoreEmpty);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RepeatedRules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRepeatedRules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.minItems = longToString(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.maxItems = longToString(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.unique = reader.bool();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.items = FieldRules.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.ignoreEmpty = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RepeatedRules {
    return {
      minItems: isSet(object.minItems) ? globalThis.String(object.minItems) : undefined,
      maxItems: isSet(object.maxItems) ? globalThis.String(object.maxItems) : undefined,
      unique: isSet(object.unique) ? globalThis.Boolean(object.unique) : undefined,
      items: isSet(object.items) ? FieldRules.fromJSON(object.items) : undefined,
      ignoreEmpty: isSet(object.ignoreEmpty) ? globalThis.Boolean(object.ignoreEmpty) : undefined,
    };
  },

  toJSON(message: RepeatedRules): unknown {
    const obj: any = {};
    if (message.minItems !== undefined) {
      obj.minItems = message.minItems;
    }
    if (message.maxItems !== undefined) {
      obj.maxItems = message.maxItems;
    }
    if (message.unique !== undefined) {
      obj.unique = message.unique;
    }
    if (message.items !== undefined) {
      obj.items = FieldRules.toJSON(message.items);
    }
    if (message.ignoreEmpty !== undefined) {
      obj.ignoreEmpty = message.ignoreEmpty;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RepeatedRules>, I>>(base?: I): RepeatedRules {
    return RepeatedRules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RepeatedRules>, I>>(object: I): RepeatedRules {
    const message = createBaseRepeatedRules();
    message.minItems = object.minItems ?? undefined;
    message.maxItems = object.maxItems ?? undefined;
    message.unique = object.unique ?? undefined;
    message.items = (object.items !== undefined && object.items !== null)
      ? FieldRules.fromPartial(object.items)
      : undefined;
    message.ignoreEmpty = object.ignoreEmpty ?? undefined;
    return message;
  },
};

function createBaseMapRules(): MapRules {
  return {
    minPairs: undefined,
    maxPairs: undefined,
    noSparse: undefined,
    keys: undefined,
    values: undefined,
    ignoreEmpty: undefined,
  };
}

export const MapRules = {
  encode(message: MapRules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.minPairs !== undefined) {
      writer.uint32(8).uint64(message.minPairs);
    }
    if (message.maxPairs !== undefined) {
      writer.uint32(16).uint64(message.maxPairs);
    }
    if (message.noSparse !== undefined) {
      writer.uint32(24).bool(message.noSparse);
    }
    if (message.keys !== undefined) {
      FieldRules.encode(message.keys, writer.uint32(34).fork()).ldelim();
    }
    if (message.values !== undefined) {
      FieldRules.encode(message.values, writer.uint32(42).fork()).ldelim();
    }
    if (message.ignoreEmpty !== undefined) {
      writer.uint32(48).bool(message.ignoreEmpty);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MapRules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMapRules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.minPairs = longToString(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.maxPairs = longToString(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.noSparse = reader.bool();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.keys = FieldRules.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.values = FieldRules.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.ignoreEmpty = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MapRules {
    return {
      minPairs: isSet(object.minPairs) ? globalThis.String(object.minPairs) : undefined,
      maxPairs: isSet(object.maxPairs) ? globalThis.String(object.maxPairs) : undefined,
      noSparse: isSet(object.noSparse) ? globalThis.Boolean(object.noSparse) : undefined,
      keys: isSet(object.keys) ? FieldRules.fromJSON(object.keys) : undefined,
      values: isSet(object.values) ? FieldRules.fromJSON(object.values) : undefined,
      ignoreEmpty: isSet(object.ignoreEmpty) ? globalThis.Boolean(object.ignoreEmpty) : undefined,
    };
  },

  toJSON(message: MapRules): unknown {
    const obj: any = {};
    if (message.minPairs !== undefined) {
      obj.minPairs = message.minPairs;
    }
    if (message.maxPairs !== undefined) {
      obj.maxPairs = message.maxPairs;
    }
    if (message.noSparse !== undefined) {
      obj.noSparse = message.noSparse;
    }
    if (message.keys !== undefined) {
      obj.keys = FieldRules.toJSON(message.keys);
    }
    if (message.values !== undefined) {
      obj.values = FieldRules.toJSON(message.values);
    }
    if (message.ignoreEmpty !== undefined) {
      obj.ignoreEmpty = message.ignoreEmpty;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MapRules>, I>>(base?: I): MapRules {
    return MapRules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MapRules>, I>>(object: I): MapRules {
    const message = createBaseMapRules();
    message.minPairs = object.minPairs ?? undefined;
    message.maxPairs = object.maxPairs ?? undefined;
    message.noSparse = object.noSparse ?? undefined;
    message.keys = (object.keys !== undefined && object.keys !== null)
      ? FieldRules.fromPartial(object.keys)
      : undefined;
    message.values = (object.values !== undefined && object.values !== null)
      ? FieldRules.fromPartial(object.values)
      : undefined;
    message.ignoreEmpty = object.ignoreEmpty ?? undefined;
    return message;
  },
};

function createBaseAnyRules(): AnyRules {
  return { required: undefined, in: [], notIn: [] };
}

export const AnyRules = {
  encode(message: AnyRules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.required !== undefined) {
      writer.uint32(8).bool(message.required);
    }
    for (const v of message.in) {
      writer.uint32(18).string(v!);
    }
    for (const v of message.notIn) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AnyRules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAnyRules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.required = reader.bool();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.in.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.notIn.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AnyRules {
    return {
      required: isSet(object.required) ? globalThis.Boolean(object.required) : undefined,
      in: globalThis.Array.isArray(object?.in) ? object.in.map((e: any) => globalThis.String(e)) : [],
      notIn: globalThis.Array.isArray(object?.notIn) ? object.notIn.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: AnyRules): unknown {
    const obj: any = {};
    if (message.required !== undefined) {
      obj.required = message.required;
    }
    if (message.in?.length) {
      obj.in = message.in;
    }
    if (message.notIn?.length) {
      obj.notIn = message.notIn;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AnyRules>, I>>(base?: I): AnyRules {
    return AnyRules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AnyRules>, I>>(object: I): AnyRules {
    const message = createBaseAnyRules();
    message.required = object.required ?? undefined;
    message.in = object.in?.map((e) => e) || [];
    message.notIn = object.notIn?.map((e) => e) || [];
    return message;
  },
};

function createBaseDurationRules(): DurationRules {
  return {
    required: undefined,
    const: undefined,
    lt: undefined,
    lte: undefined,
    gt: undefined,
    gte: undefined,
    in: [],
    notIn: [],
  };
}

export const DurationRules = {
  encode(message: DurationRules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.required !== undefined) {
      writer.uint32(8).bool(message.required);
    }
    if (message.const !== undefined) {
      Duration.encode(message.const, writer.uint32(18).fork()).ldelim();
    }
    if (message.lt !== undefined) {
      Duration.encode(message.lt, writer.uint32(26).fork()).ldelim();
    }
    if (message.lte !== undefined) {
      Duration.encode(message.lte, writer.uint32(34).fork()).ldelim();
    }
    if (message.gt !== undefined) {
      Duration.encode(message.gt, writer.uint32(42).fork()).ldelim();
    }
    if (message.gte !== undefined) {
      Duration.encode(message.gte, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.in) {
      Duration.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.notIn) {
      Duration.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DurationRules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDurationRules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.required = reader.bool();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.const = Duration.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.lt = Duration.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.lte = Duration.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.gt = Duration.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.gte = Duration.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.in.push(Duration.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.notIn.push(Duration.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DurationRules {
    return {
      required: isSet(object.required) ? globalThis.Boolean(object.required) : undefined,
      const: isSet(object.const) ? Duration.fromJSON(object.const) : undefined,
      lt: isSet(object.lt) ? Duration.fromJSON(object.lt) : undefined,
      lte: isSet(object.lte) ? Duration.fromJSON(object.lte) : undefined,
      gt: isSet(object.gt) ? Duration.fromJSON(object.gt) : undefined,
      gte: isSet(object.gte) ? Duration.fromJSON(object.gte) : undefined,
      in: globalThis.Array.isArray(object?.in) ? object.in.map((e: any) => Duration.fromJSON(e)) : [],
      notIn: globalThis.Array.isArray(object?.notIn) ? object.notIn.map((e: any) => Duration.fromJSON(e)) : [],
    };
  },

  toJSON(message: DurationRules): unknown {
    const obj: any = {};
    if (message.required !== undefined) {
      obj.required = message.required;
    }
    if (message.const !== undefined) {
      obj.const = Duration.toJSON(message.const);
    }
    if (message.lt !== undefined) {
      obj.lt = Duration.toJSON(message.lt);
    }
    if (message.lte !== undefined) {
      obj.lte = Duration.toJSON(message.lte);
    }
    if (message.gt !== undefined) {
      obj.gt = Duration.toJSON(message.gt);
    }
    if (message.gte !== undefined) {
      obj.gte = Duration.toJSON(message.gte);
    }
    if (message.in?.length) {
      obj.in = message.in.map((e) => Duration.toJSON(e));
    }
    if (message.notIn?.length) {
      obj.notIn = message.notIn.map((e) => Duration.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DurationRules>, I>>(base?: I): DurationRules {
    return DurationRules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DurationRules>, I>>(object: I): DurationRules {
    const message = createBaseDurationRules();
    message.required = object.required ?? undefined;
    message.const = (object.const !== undefined && object.const !== null)
      ? Duration.fromPartial(object.const)
      : undefined;
    message.lt = (object.lt !== undefined && object.lt !== null) ? Duration.fromPartial(object.lt) : undefined;
    message.lte = (object.lte !== undefined && object.lte !== null) ? Duration.fromPartial(object.lte) : undefined;
    message.gt = (object.gt !== undefined && object.gt !== null) ? Duration.fromPartial(object.gt) : undefined;
    message.gte = (object.gte !== undefined && object.gte !== null) ? Duration.fromPartial(object.gte) : undefined;
    message.in = object.in?.map((e) => Duration.fromPartial(e)) || [];
    message.notIn = object.notIn?.map((e) => Duration.fromPartial(e)) || [];
    return message;
  },
};

function createBaseTimestampRules(): TimestampRules {
  return {
    required: undefined,
    const: undefined,
    lt: undefined,
    lte: undefined,
    gt: undefined,
    gte: undefined,
    ltNow: undefined,
    gtNow: undefined,
    within: undefined,
  };
}

export const TimestampRules = {
  encode(message: TimestampRules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.required !== undefined) {
      writer.uint32(8).bool(message.required);
    }
    if (message.const !== undefined) {
      Timestamp.encode(toTimestamp(message.const), writer.uint32(18).fork()).ldelim();
    }
    if (message.lt !== undefined) {
      Timestamp.encode(toTimestamp(message.lt), writer.uint32(26).fork()).ldelim();
    }
    if (message.lte !== undefined) {
      Timestamp.encode(toTimestamp(message.lte), writer.uint32(34).fork()).ldelim();
    }
    if (message.gt !== undefined) {
      Timestamp.encode(toTimestamp(message.gt), writer.uint32(42).fork()).ldelim();
    }
    if (message.gte !== undefined) {
      Timestamp.encode(toTimestamp(message.gte), writer.uint32(50).fork()).ldelim();
    }
    if (message.ltNow !== undefined) {
      writer.uint32(56).bool(message.ltNow);
    }
    if (message.gtNow !== undefined) {
      writer.uint32(64).bool(message.gtNow);
    }
    if (message.within !== undefined) {
      Duration.encode(message.within, writer.uint32(74).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TimestampRules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTimestampRules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.required = reader.bool();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.const = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.lt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.lte = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.gt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.gte = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.ltNow = reader.bool();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.gtNow = reader.bool();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.within = Duration.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TimestampRules {
    return {
      required: isSet(object.required) ? globalThis.Boolean(object.required) : undefined,
      const: isSet(object.const) ? fromJsonTimestamp(object.const) : undefined,
      lt: isSet(object.lt) ? fromJsonTimestamp(object.lt) : undefined,
      lte: isSet(object.lte) ? fromJsonTimestamp(object.lte) : undefined,
      gt: isSet(object.gt) ? fromJsonTimestamp(object.gt) : undefined,
      gte: isSet(object.gte) ? fromJsonTimestamp(object.gte) : undefined,
      ltNow: isSet(object.ltNow) ? globalThis.Boolean(object.ltNow) : undefined,
      gtNow: isSet(object.gtNow) ? globalThis.Boolean(object.gtNow) : undefined,
      within: isSet(object.within) ? Duration.fromJSON(object.within) : undefined,
    };
  },

  toJSON(message: TimestampRules): unknown {
    const obj: any = {};
    if (message.required !== undefined) {
      obj.required = message.required;
    }
    if (message.const !== undefined) {
      obj.const = message.const.toISOString();
    }
    if (message.lt !== undefined) {
      obj.lt = message.lt.toISOString();
    }
    if (message.lte !== undefined) {
      obj.lte = message.lte.toISOString();
    }
    if (message.gt !== undefined) {
      obj.gt = message.gt.toISOString();
    }
    if (message.gte !== undefined) {
      obj.gte = message.gte.toISOString();
    }
    if (message.ltNow !== undefined) {
      obj.ltNow = message.ltNow;
    }
    if (message.gtNow !== undefined) {
      obj.gtNow = message.gtNow;
    }
    if (message.within !== undefined) {
      obj.within = Duration.toJSON(message.within);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TimestampRules>, I>>(base?: I): TimestampRules {
    return TimestampRules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TimestampRules>, I>>(object: I): TimestampRules {
    const message = createBaseTimestampRules();
    message.required = object.required ?? undefined;
    message.const = object.const ?? undefined;
    message.lt = object.lt ?? undefined;
    message.lte = object.lte ?? undefined;
    message.gt = object.gt ?? undefined;
    message.gte = object.gte ?? undefined;
    message.ltNow = object.ltNow ?? undefined;
    message.gtNow = object.gtNow ?? undefined;
    message.within = (object.within !== undefined && object.within !== null)
      ? Duration.fromPartial(object.within)
      : undefined;
    return message;
  },
};

function bytesFromBase64(b64: string): Uint8Array {
  if (globalThis.Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(globalThis.String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function toTimestamp(date: Date): Timestamp {
  const seconds = Math.trunc(date.getTime() / 1_000).toString();
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (globalThis.Number(t.seconds) || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new globalThis.Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof globalThis.Date) {
    return o;
  } else if (typeof o === "string") {
    return new globalThis.Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

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
