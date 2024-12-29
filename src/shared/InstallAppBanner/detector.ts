export function detectChromeOrAndroid(): undefined | 'ios' | 'android' {
  if (typeof navigator === 'undefined') {
    return undefined;
  }

  const ios = isMobile.iOS();
  const android = isMobile.android();
  const isChrome = isBrowser.isChrome();

  if ((!ios && !android) || !isChrome) {
    return undefined;
  }

  return ios ? 'ios' : 'android';
}

// https://thewebdev.info/2022/07/04/how-to-detect-if-browser-is-running-on-an-android-or-ios-device-with-javascript/
const isMobile = {
  android() {
    return /Android/i.test(navigator.userAgent);
  },
  iOS() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
  },
};

const isBrowser = {
  isChrome() {
    // https://code911.top/howto/browser-version-check-for-chrome-or-firefox-typescript
    // please note,
    // that IE11 now returns undefined again for window.chrome
    // and new Opera 30 outputs true for window.chrome
    // but needs to check if window.opr is not undefined
    // and new IE Edge outputs to true now for window.chrome
    // and if not iOS Chrome check
    // so use the below updated condition
    const isChromium = (window as any).chrome;
    const winNav = window.navigator;
    // Библиотечный код
    // eslint-disable-next-line deprecation/deprecation
    const vendorName = winNav.vendor;
    const isOpera = typeof (window as any).opr !== 'undefined';
    const isIEedge = winNav.userAgent.indexOf('Edg') > -1;
    const isIOSChrome = winNav.userAgent.match('CriOS');

    if (isIOSChrome) {
      // is Google Chrome on IOS
      return true;
    }

    if (
      isChromium !== null &&
      typeof isChromium !== 'undefined' &&
      vendorName === 'Google Inc.' &&
      isOpera === false &&
      isIEedge === false
    ) {
      // is Google Chrome
      return true;
    }

    // not Google Chrome
    return false;
  },
};
