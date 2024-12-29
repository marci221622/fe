import path from 'path';

import { ChunkExtractor } from '@loadable/server';
import { Scope } from 'effector';
import { renderToString } from 'react-dom/server';
import { HelmetServerState } from 'react-helmet-async';
import { Location } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';

import { StaticAnalytics } from '@/shared/analytics';

import { Application } from '../Application';

import { buildHtml } from './html';
import { getTags } from './static';

export const renderApp = ({
  saticAnalytics,
  scope,
  location,
  routes,
  state,
}: {
  saticAnalytics: StaticAnalytics;
  scope: Scope;
  location: Location;
  routes: React.JSX.Element;
  state?: string;
}) => {
  const extractor = new ChunkExtractor({
    statsFile: path.resolve('build/loadable-stats.json'),
    entrypoints: ['client'],
  });

  const helmetCtx: { helmet?: HelmetServerState } = {};

  const markup = renderToString(
    extractor.collectChunks(
      <StaticRouter location={location}>
        <Application scope={scope} routes={routes} helmet={helmetCtx} />
      </StaticRouter>,
    ),
  );

  const { scriptTags, styleTags, linkTags } = getTags(extractor);
  const { helmet } = helmetCtx;

  return {
    html: buildHtml({
      saticAnalytics,
      scriptTags,
      styleTags,
      linkTags,
      helmet,
      markup,
      isDev: process?.env?.NODE_ENV === 'development',
      state,
    }),
  };
};
