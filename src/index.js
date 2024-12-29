/* eslint-disable import/no-import-module-exports, @typescript-eslint/no-var-requires, no-console */
import express from 'express';

import { apmAgent } from 'application/server/apmAgent';

let app = require('./application/server').default;

if (module.hot) {
  module.hot.accept('./application/server', () => {
    console.log('🔁  HMR Reloading `./server`...');
    try {
      app = require('./application/server').default;
    } catch (error) {
      console.error(error);
    }
  });
  console.info('✅  Server-side HMR Enabled!');
}

const port = process.env.PORT || 3000;

export default express()
  .use((req, res) => {
    apmAgent.setTransactionName(req.path);

    return app.handle(req, res);
  })
  .listen(port, err => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`> Started on port ${port}`);
  });
