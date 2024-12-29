// @ts-nocheck

export const runtimeConfig =
  typeof window !== 'undefined'
    ? {
        API_DOMAIN: globalThis.env?.API_DOMAIN,
        FB_KEY: globalThis.env?.FB_KEY,
        FB_DOMAIN: globalThis.env?.FB_DOMAIN,
        FB_PID: globalThis.env?.FB_PID,
        FB_BUCKET: globalThis.env?.FB_BUCKET,
        FB_SENDERID: globalThis.env?.FB_SENDERID,
        FB_APPID: globalThis.env?.FB_APPID,
        CLOUD_PAYMENT_ID: globalThis.env?.CLOUD_PAYMENT_ID,
        HOSTNAME: globalThis.env?.HOSTNAME,
        APP_VERSION: globalThis.env?.APP_VERSION,
        MINDBOXID: globalThis.env?.MINDBOXID,
        MINDBOX_API_KEY: globalThis.env?.MINDBOX_API_KEY,
        BRANCH: globalThis.env?.BRANCH,
        GOOGLE_KEY: globalThis.env?.GOOGLE_KEY ?? "",
        SL_SECTION: globalThis.env?.SL_SECTION ?? ""
      }
    : {
        API_DOMAIN: process.env.RAZZLE_API_DOMAIN,
        FB_KEY: process.env.RAZZLE_FB_KEY,
        FB_DOMAIN: process.env.RAZZLE_FB_DOMAIN,
        FB_PID: process.env.RAZZLE_FB_PID,
        FB_BUCKET: process.env.RAZZLE_FB_BUCKET,
        FB_SENDERID: process.env.RAZZLE_FB_SENDERID,
        FB_APPID: process.env.RAZZLE_FB_APPID,
        CLOUD_PAYMENT_ID: process.env.RAZZLE_CLOUD_PAYMENT_ID,
        HOSTNAME: process.env.RAZZLE_HOSTNAME,
        APP_VERSION: process.env.RAZZLE_APP_VERSION,
        MINDBOXID: process.env.RAZZLE_MINDBOX,
        MINDBOX_API_KEY: process.env.RAZZLE_MINDBOX_KEY,
        // Для отображения текущей ветки
        BRANCH: process.env.RAZZLE_BRANCH,
        // ключ капчи
        GOOGLE_KEY: process.env.RAZZLE_RECAPTCHA_KEY,
        SL_SECTION: process.env.RAZZLE_SL_SECTION
      };

export const FRAME_PAYMEN_NAME = '@payment/name';

export const prodLoggerEnabled = () =>
  process?.env?.NODE_ENV === 'development' || (typeof window !== 'undefined' ? window.loggerEnabled : false);
