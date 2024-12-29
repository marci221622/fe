import { Request } from 'express';

export function createAbort(req: Request) {
  const ctrl = new AbortController();

  const handler = () => {
    ctrl.abort('cancellation from createAbort');

    if (process?.env?.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('cancellation from createAbort');
    }

    req.off('close', handler);
  };

  req.on('close', handler);

  return ctrl;
}
