import express from 'express';
import Prometheus, { collectDefaultMetrics } from 'prom-client';

import { alchemerController } from './controllers/alchemer';
import { appController } from './controllers/app';
import { paymentController } from './controllers/payment';
import { resolverController } from './controllers/resolver';
import { attachMiddlewares } from './middlewares';

const server = express();

attachMiddlewares(server);

// Что то проц тормозить начал
// // Логи вне скоупа
// // Видно будет ошибки в apm
// inspect({
//   fn: m => {
//     // @ts-ignore
//     if (!m.derived) {
//       console.log('PANIC', m);
//     }
//   },
// });

if (process.env.NODE_ENV === 'production') {
  collectDefaultMetrics({
    gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5], // These are the default buckets.
  });
}

server
  .use(resolverController)
  .get('/test500', (_, res) => {
    res.status(500).send('Somthing whent wrong');
  })
  .get('/metrics', async (_, res) => {
    const metrics = await Prometheus.register.metrics();

    res.set('Content-Type', Prometheus.register.contentType);
    res.send(metrics);
  })
  .get('/health', async (_req, res) => {
    const healthcheck = { success: true };

    res.send(healthcheck);
  })
  .post('/payment-term', paymentController)
  .get('/api/alchemer', alchemerController)
  .get('/*', appController);

export default server;
