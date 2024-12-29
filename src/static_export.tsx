import path from 'path';

import { ChunkExtractor } from '@loadable/server';
import { fork } from 'effector';
import { renderToString } from 'react-dom/server';
import { HelmetServerState } from 'react-helmet-async';

import { buildHtml } from './application/server/html';
import { getTags } from './application/server/static';
import Error500 from './pages/Errors/error500';
import { $staticAnalytics } from './shared/analytics';

export const render = (req: { url: string }, res: { json: (params: { html: string }) => void }) => {
  const scope = fork();

  const extractor = new ChunkExtractor({
    statsFile: path.resolve('build/loadable-stats.json'),
    entrypoints: [req.url.split('/')[0]],
  });

  const { scriptTags, styleTags, linkTags } = getTags(extractor);

  const helmetCtx: { helmet?: HelmetServerState } = {};

  const markup = renderToString(extractor.collectChunks(<Error500 helmet={helmetCtx} />));

  const { helmet } = helmetCtx;

  const html = buildHtml({
    saticAnalytics: scope.getState($staticAnalytics),
    scriptTags,
    styleTags,
    linkTags,
    helmet,
    markup,
    isDev: process?.env?.NODE_ENV === 'development',
    state: '{}',
  });

  res.json({
    html,
  });
};

// TODO: разные страницы
export const routes = () => {
  return ['error500'];
};
