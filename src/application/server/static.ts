import { ChunkExtractor } from '@loadable/server';
import { cloneElement } from 'react';
import { renderToString } from 'react-dom/server';

const dataAttribute = 'data-app';

type ReactElementWithDataAttribute = React.ReactElement<{ [dataAttribute]: boolean }>;

export function getTags(extractor: ChunkExtractor) {
  const extraProps = {
    crossOrigin: 'includes',
  };

  const scriptElements = extractor.getScriptElements(extraProps);
  const styleElements = extractor.getStyleElements(extraProps);
  const linkElements = extractor.getLinkElements(extraProps);

  // КОСТЫЛЬ! Аккуратно, при обновах библиотеки @loadable/server
  // Немного черной магии TS, фиксим типы у ChunkExtractor,
  // т.к. на самом деле он реализован как return <ChunkExtractorManager extractor={this}>{app}</ChunkExtractorManager>
  // что позволяет ему спокойно принимать массивы jsx элементов, но официальная типизация нас искуственно ограничила by design.
  // https://github.com/gregberge/loadable-components/blob/v5.15.2/packages/server/src/ChunkExtractor.js#L379
  const collectChunks = extractor.collectChunks.bind(extractor) as unknown as (
    elements: Array<React.JSX.Element>,
  ) => React.JSX.Element;

  const scriptTags = renderToString(
    collectChunks(
      scriptElements.map(scriptElement =>
        cloneElement(scriptElement as ReactElementWithDataAttribute, { [dataAttribute]: true }),
      ),
    ),
  );

  const styleTags = renderToString(
    collectChunks(
      styleElements.map(styleElement =>
        cloneElement(styleElement as ReactElementWithDataAttribute, { [dataAttribute]: true }),
      ),
    ),
  );

  const linkTags = renderToString(
    collectChunks(
      linkElements.map(element => cloneElement(element as ReactElementWithDataAttribute, { [dataAttribute]: true })),
    ),
  );

  return { scriptTags, linkTags, styleTags, extractor };
}
