import { createEvent, createStore, sample } from 'effector';

import { $footerAdditionalLinks } from '@/shared/configs';
import { appStarted } from '@/shared/start';

import { buildFooterInfo } from './info';

export const $info = $footerAdditionalLinks.map(({ customer, seller }) => buildFooterInfo({ customer, seller }));

export const $activePanels = createStore<string[]>([]);

export const panelsChanged = createEvent<string[]>();

$activePanels.on(panelsChanged, (_, next) => next);

sample({
  source: $info,
  clock: appStarted,
  fn: info => info.map(it => (typeof it.title === 'string' ? it.title : it.title.id!)),
  target: $activePanels,
});
