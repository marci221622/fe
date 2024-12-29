import { Request, Response } from 'express';
import { noop } from 'lodash';

import { createBaseServices } from '@/lib/services';

import { grpcClient } from '../grpc';

export const alchemerController = async (req: Request, res: Response) => {
  const orderCode = req.query?.orderCode;

  if (typeof orderCode === 'string') {
    const services = createBaseServices({
      cookies: req.cookies,
      grpc: grpcClient,
    });

    services.grpc.hub.MarkOrderAsRated({ code: orderCode }).catch(noop);
  }

  res.send({ ok: true });
};
