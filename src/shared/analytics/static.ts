import { createEvent, createStore } from 'effector';

import { MindboxType, DYCtx } from './types';

export type StaticAnalytics = { gtm: any[]; mindbox: MindboxType[]; slCtx: any };

export const $staticAnalytics = createStore<StaticAnalytics>({
  gtm: [],
  mindbox: [],
  slCtx: {},
});

export const addToStaticAnalytic = createEvent<
  { type: 'gtm'; payload: any[] } | { type: 'mindbox'; payload: MindboxType[] } | { type: 'slCtx'; payload: DYCtx }
>();

$staticAnalytics.on(addToStaticAnalytic, (prev, { type, payload }) => {
  return {
    ...prev,
    [type]: type !== 'slCtx' ? [...prev[type], ...payload] : payload,
  };
});
