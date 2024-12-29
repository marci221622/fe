/* eslint-disable import/no-import-module-exports */
import { getRoutes } from '@/pages/pages';
import { clearLS } from '@/shared/clearLS';

import { buildSSREntry } from './builders/ssr';

import './init-root-styles';

buildSSREntry({ routes: getRoutes() });

if (typeof window !== 'undefined') {
  clearLS();
}

// @ts-ignore TODO: hotreload types
if (module.hot) {
  // @ts-ignore
  module.hot.accept(() => {
    console.log('🔁  HMR Reloading `../Application`...');
  });
}
