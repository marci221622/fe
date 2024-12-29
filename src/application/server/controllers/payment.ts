import { Request, Response } from 'express';

import { runtimeConfig } from '@/constants/runtimeConfig';

export const paymentController = async (req: Request, res: Response) => {
  const { PaRes, MD } = (req.body ?? {}) as { PaRes?: string; MD?: string };

  res.send(`
    <!DOCTYPE html>
      <html lang="en">
        <body>
          <script>
            window.parent.postMessage(
              {paRes: "${PaRes}", transactionId: "${MD}"},
              "${runtimeConfig.HOSTNAME}"
            );
          </script>
        </body>
      </html>
  `);
};
