import { loadableReady } from '@loadable/component';
// eslint-disable-next-line react/no-deprecated
import { hydrate } from 'react-dom';

import Error500 from '@/pages/Errors/error500';

import { MediaContextProvider } from '@/ui/Responsive';
import './init-root-styles';

loadableReady(() => {
  const node = window.document.getElementById('app-root')!;

  hydrate(
    <MediaContextProvider>
      <Error500 />
    </MediaContextProvider>,
    node,
  );
});
