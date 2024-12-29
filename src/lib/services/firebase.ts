import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAll, getRemoteConfig, RemoteConfig, fetchAndActivate } from 'firebase/remote-config';

import { runtimeConfig } from '@/constants/runtimeConfig';

const oneHour = 3600000;
const oneMinute = 60000;

export class Firebase {
  app: FirebaseApp;

  config: RemoteConfig;

  constructor() {
    this.app = initializeApp({
      apiKey: runtimeConfig.FB_KEY,
      authDomain: runtimeConfig.FB_DOMAIN,
      projectId: runtimeConfig.FB_PID,
      storageBucket: runtimeConfig.FB_BUCKET,
      messagingSenderId: runtimeConfig.FB_SENDERID,
      appId: runtimeConfig.FB_APPID,
    });

    this.config = {
      ...getRemoteConfig(this.app),
      settings: { minimumFetchIntervalMillis: oneHour, fetchTimeoutMillis: oneMinute },
    };
  }

  fetchConfig = async () => {
    await fetchAndActivate(this.config);

    return getAll(this.config);
  };
}
