import { runtimeConfig } from '@/constants/runtimeConfig';

type Options = {
  expires?: number | Date;
  path?: string;
  domain?: string;
  httpOnly?: boolean;
  overwrite?: boolean;
};

export interface ICookieService {
  set: (key: string, value: string, options?: Options) => void;
  get: (key: string, options?: Options) => string | void;
}

function saveDecode(value: string) {
  try {
    return decodeURIComponent(value);
  } catch (err) {
    return undefined;
  }
}

function saveEncode(value: string) {
  try {
    return encodeURIComponent(value);
  } catch (err) {
    return undefined;
  }
}

export class CookieServiceFactory implements ICookieService {
  service: ICookieService;

  constructor(service: ICookieService) {
    this.service = service;
  }

  private get getHostName() {
    const url = new URL(runtimeConfig.HOSTNAME);

    return `.${url.hostname}`;
  }

  private getOptions = (options?: Options) => {
    const config = {
      ...(options ?? {}),
      domain: this.getHostName,
      overwrite: true,
    };

    if (typeof window === 'undefined') {
      config.httpOnly = false;
    }

    return config;
  };

  set = (key: string, value: string, options?: Options) => {
    const result = saveEncode(value);

    if (typeof result !== 'undefined') {
      this.service.set(key, result, this.getOptions(options));
    }
  };

  get = (key: string) => {
    const config = {
      domain: this.getHostName,
    };

    const value = this.service.get(key, config);

    return value ? saveDecode(value) : value;
  };

  remove = (key: string) => {
    this.set(key, '', { expires: -1 });
  };

  removeAll = (keys: string[]) => {
    keys.forEach(this.remove);
  };
}
