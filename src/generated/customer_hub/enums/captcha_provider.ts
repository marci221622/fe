/* eslint-disable */

export const protobufPackage = "utp.customer_hub_service.v1";

/** Сервис проверки captcha */
export enum CaptchaProvider {
  /** CAPTCHA_PROVIDER_UNSPECIFIED - Не указан */
  CAPTCHA_PROVIDER_UNSPECIFIED = 0,
  /** CAPTCHA_PROVIDER_GOOGLE - Google reCaptcha (https://www.google.com/recaptcha/about/) */
  CAPTCHA_PROVIDER_GOOGLE = 1,
  /** CAPTCHA_PROVIDER_HUAWEI - Huawei Safety Detect (https://developer.huawei.com/consumer/en/doc/Security-References/overview-0000001091090751) */
  CAPTCHA_PROVIDER_HUAWEI = 2,
  UNRECOGNIZED = -1,
}

export function captchaProviderFromJSON(object: any): CaptchaProvider {
  switch (object) {
    case 0:
    case "CAPTCHA_PROVIDER_UNSPECIFIED":
      return CaptchaProvider.CAPTCHA_PROVIDER_UNSPECIFIED;
    case 1:
    case "CAPTCHA_PROVIDER_GOOGLE":
      return CaptchaProvider.CAPTCHA_PROVIDER_GOOGLE;
    case 2:
    case "CAPTCHA_PROVIDER_HUAWEI":
      return CaptchaProvider.CAPTCHA_PROVIDER_HUAWEI;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CaptchaProvider.UNRECOGNIZED;
  }
}

export function captchaProviderToJSON(object: CaptchaProvider): string {
  switch (object) {
    case CaptchaProvider.CAPTCHA_PROVIDER_UNSPECIFIED:
      return "CAPTCHA_PROVIDER_UNSPECIFIED";
    case CaptchaProvider.CAPTCHA_PROVIDER_GOOGLE:
      return "CAPTCHA_PROVIDER_GOOGLE";
    case CaptchaProvider.CAPTCHA_PROVIDER_HUAWEI:
      return "CAPTCHA_PROVIDER_HUAWEI";
    case CaptchaProvider.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
