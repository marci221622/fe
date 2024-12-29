/* eslint-disable */

export const protobufPackage = "utp.customer_hub_service.v1";

/** Платформа устройства */
export enum Platform {
  /** PLATFORM_UNSPECIFIED - Неопределена */
  PLATFORM_UNSPECIFIED = 0,
  /** PLATFORM_IOS - iOS */
  PLATFORM_IOS = 1,
  /** PLATFORM_ANDROID - Android */
  PLATFORM_ANDROID = 2,
  /** PLATFORM_WEB - Web-клиент */
  PLATFORM_WEB = 3,
  UNRECOGNIZED = -1,
}

export function platformFromJSON(object: any): Platform {
  switch (object) {
    case 0:
    case "PLATFORM_UNSPECIFIED":
      return Platform.PLATFORM_UNSPECIFIED;
    case 1:
    case "PLATFORM_IOS":
      return Platform.PLATFORM_IOS;
    case 2:
    case "PLATFORM_ANDROID":
      return Platform.PLATFORM_ANDROID;
    case 3:
    case "PLATFORM_WEB":
      return Platform.PLATFORM_WEB;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Platform.UNRECOGNIZED;
  }
}

export function platformToJSON(object: Platform): string {
  switch (object) {
    case Platform.PLATFORM_UNSPECIFIED:
      return "PLATFORM_UNSPECIFIED";
    case Platform.PLATFORM_IOS:
      return "PLATFORM_IOS";
    case Platform.PLATFORM_ANDROID:
      return "PLATFORM_ANDROID";
    case Platform.PLATFORM_WEB:
      return "PLATFORM_WEB";
    case Platform.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
