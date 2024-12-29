import url from 'url';

import { NextFunction, Request, Response } from 'express';

import { resolveRedirects } from '@/shared/processRedirects';

// Не пускать на определенные урлы (редирект по схеме)
export const resolverController = async (req: Request, res: Response, next: NextFunction) => {
  const redirect = resolveRedirects({ pathname: req.path });

  if (redirect) {
    // TODO: deprecation
    // eslint-disable-next-line deprecation/deprecation
    const { query } = url.parse(req.url);
    const nextUrl = query ? `${redirect}?${query}` : redirect;

    return res.redirect(301, nextUrl);
  }

  if (req.path !== '/' && req.path.endsWith('/')) {
    return res.redirect(301, req.path.slice(0, -1));
  }

  return next();
};
