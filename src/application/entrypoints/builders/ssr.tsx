import { loadableReady } from '@loadable/component';
import { fork } from 'effector';
import cookies from 'js-cookie';
// eslint-disable-next-line react/no-deprecated
import { hydrate } from 'react-dom';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { BrowserRouter } from 'react-router-dom';

import { $isServer } from '@/shared/start';

import { runtimeConfig } from '@/constants/runtimeConfig';

import { GrpcPreownedClient } from '@/lib/grpc';
import { $baseServices, createBaseServices, Firebase } from '@/lib/services';

import { Application } from '../../Application';

type Props = {
  routes: React.JSX.Element;
};

export function buildSSREntry({ routes }: Props) {
  loadableReady(() => {
    const services = createBaseServices({
      cookies,
      grpc: new GrpcPreownedClient(`//${runtimeConfig.API_DOMAIN}`, {
        debug: process.env.NODE_ENV === 'development',
      }),
      firebase: new Firebase(),
    });

    const scope = fork({
      values: { ...(window.INITIAL_STATE ?? {}), [$baseServices.sid!]: services, [$isServer.sid!]: false },
    });

    const node = window.document.getElementById('app-root')!;

    hydrate(
      <GoogleReCaptchaProvider reCaptchaKey={runtimeConfig.GOOGLE_KEY}>
        <BrowserRouter>
          <Application scope={scope} routes={routes} />
        </BrowserRouter>
      </GoogleReCaptchaProvider>,
      node,
    );
  });
}
