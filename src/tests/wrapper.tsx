import { Scope } from 'effector';
import { Provider } from 'effector-react';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { ViewportProvider } from '@/lib/hooks';

import { LocaleProvider } from '../i18n';

export function TestsWrapper({ children, scope }: { children?: ReactNode; scope?: Scope }) {
  return (
    <MemoryRouter>
      <LocaleProvider>
        {/* @ts-ignore */}
        <Provider value={scope ?? { getState: () => ({}) }}>
          <ViewportProvider>{children}</ViewportProvider>
        </Provider>
      </LocaleProvider>
    </MemoryRouter>
  );
}
