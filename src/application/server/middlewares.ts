import Cookies from 'cookies';
import express, { Express } from 'express';
// import helmet from 'helmet';

export function attachMiddlewares(server: Express) {
  // const isDev = process.env.NODE_ENV === 'development';

  server
    // @ts-ignore
    .use(Cookies.express())
    // .use(helmet.xXssProtection())
    // .use(
    //   helmet({
    //     crossOriginResourcePolicy: false,
    //     crossOriginOpenerPolicy: false,
    //     xFrameOptions: { action: 'sameorigin' },
    //     xPoweredBy: false,
    //     contentSecurityPolicy: false,
    //   }),
    // )
    .use(
      // @ts-ignore
      express.static(process.env.RAZZLE_PUBLIC_DIR, {
        cacheControl: 'no-store',
      }),
    )
    .use(express.urlencoded())
    .use((_, res, next) => {
      res.removeHeader('X-Powered-By');
      res.set('Cache-control', 'no-store');

      next();
    });
}
