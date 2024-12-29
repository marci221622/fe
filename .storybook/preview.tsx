import React from 'react';
import { withRouter } from 'storybook-addon-react-router-v6';
import { makeDecorator } from '@storybook/addons';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { fork } from 'effector';
import { Provider } from 'effector-react';
import type { Preview } from '@storybook/react';
import { ViewportProvider } from '../src/lib/hooks';
import { $baseServices } from '../src/lib/services';
import { checkout } from '../src/features/basket';
import { DescriptionModalsProvider } from '../src/shared/description-modals';
import { MediaContextProvider } from '../src/ui/index';
import { createTestBaseServices } from '../src/tests/baseServices';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '@/ui/themes/reset.scss';
import '@/ui/themes/fonts.scss';

const scope = fork({
  values: new Map().set($baseServices, createTestBaseServices()),
});

// .set(checkout.$cartPrice, {
//   currency: 'RUB',
//   withDiscount: 100000,
//   original: 100000,
// })

const withI18 = makeDecorator({
  parameterName: 'i18n',
  name: 'withI18',
  wrapper: (story: (...args: any[]) => unknown, context: any, { parameters = {} }: any) => {
    return (
      <Provider value={scope}>
        {/* @ts-ignore */}
        <MediaContextProvider>
          <I18nProvider i18n={i18n} forceRenderOnLocaleChange={false}>
            <ViewportProvider>
              <DescriptionModalsProvider>
                {/* @ts-ignore */}
                {story(context)}
              </DescriptionModalsProvider>
            </ViewportProvider>
          </I18nProvider>
        </MediaContextProvider>
      </Provider>
    );
  },
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export const decorators = [withRouter, withI18];

export const parameters = {
  reactRouter: {},
};

export default preview;
