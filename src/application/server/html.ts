import { HelmetServerState } from 'react-helmet-async';

import { StaticAnalytics } from '@/shared/analytics';

import { connectGTMScripts, digineticaInitiator, mindboxSDK, noScriptTag } from '@/constants/analytics';
import { runtimeConfig } from '@/constants/runtimeConfig';

import { mediaStyle } from '@/ui/Responsive';

type Props = {
  isDev?: boolean;
  markup?: string;
  helmet?: HelmetServerState;
  scriptTags: string;
  styleTags: string;
  linkTags: string;
  state?: string;
  saticAnalytics: StaticAnalytics;
};

export function buildHtml({
  scriptTags,
  styleTags,
  linkTags,
  helmet,
  markup = '',
  state,
  saticAnalytics,
  isDev,
}: Props) {
  const html = `
    <!doctype html>
    <html ${helmet?.htmlAttributes?.toString() ?? ''}>
      <head>
        <meta charset='utf-8'>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

        <style type="text/css">${mediaStyle}</style>

        <link rel="manifest" href=${process.env.PUBLIC_PATH}manifest.json />

        ${helmet ? helmet?.title?.toString() : ''}
        ${helmet ? helmet?.meta.toString() : ''}
        ${linkTags}
        ${helmet ? helmet?.link?.toString() : ''}
        ${styleTags}
        ${helmet ? helmet?.style?.toString() : ''}
        ${helmet ? helmet?.script?.toString() : ''}

        <script data-app='true'>globalThis.dataLayer = ${JSON.stringify(saticAnalytics.gtm ?? [])}</script>
        <script data-app='true'>globalThis.mindboxLayer = ${JSON.stringify(saticAnalytics.mindbox ?? [])}</script>

        ${!isDev ? connectGTMScripts : ''}
        ${mindboxSDK}

        <script data-app='true'>
          window.SL = window.SL || {};
          window.SL.pageContext = ${JSON.stringify(saticAnalytics.slCtx ?? {})}
          window.SL.section = "${runtimeConfig.SL_SECTION}"
          window.SL.isSpa = true;
        </script>

        <link rel="preconnect" href="//cdn01.stellarlabs.ai">
        <link rel="preconnect" href="//ev.stellarlabs.ai">
        <link rel="dns-prefetch" href="//cdn01.stellarlabs.ai">
        <link rel="dns-prefetch" href="//ev.stellarlabs.ai">
        <script type="text/javascript" src="//cdn01.stellarlabs.ai/core/core.js"></script>
      </head>
      <body>
      ${!isDev ? noScriptTag : ''}

        <div id='app-root'>${markup}</div>
        ${
          state
            ? `
              <script>
                window.INITIAL_STATE = ${state}
              </script>
            `
            : ''
        }
        
        <script src="https://checkout.cloudpayments.ru/checkout.js"></script>
        <script data-app='true'>globalThis.env = ${JSON.stringify(runtimeConfig)}</script>
        ${digineticaInitiator}
        ${scriptTags}
      </body>
    </html>
  `;

  return html;
}
