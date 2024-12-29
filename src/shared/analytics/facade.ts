import { createEvent, sample } from 'effector';

import { sendSL } from './dy';
import { sendGtm } from './gtm';
import { prepareToGTM } from './helpers';
import { sendMindbox } from './mindbox';
import { sendMindboxJSON } from './mindboxJSON';
import { Analytics } from './types';

export const sendAnalytic = createEvent<Analytics>();

sample({
  clock: sendAnalytic,
  filter: it => !!it.gtm,
  fn: it => (it.gtm ?? []).map(prepareToGTM),
  target: sendGtm,
});

sample({
  clock: sendAnalytic,
  filter: it => !!it.mindbox,
  fn: it => it.mindbox ?? [],
  target: sendMindbox,
});

sample({
  clock: sendAnalytic,
  filter: it => !!it.mindboxJSON,
  fn: it => it.mindboxJSON ?? [],
  target: sendMindboxJSON,
});

sample({
  clock: sendAnalytic,
  filter: it => !!it.dy,
  fn: it => it.dy!,
  target: sendSL,
});
