import { createStore, createEvent, sample } from 'effector';
import { not } from 'patronum/macro';

export const $isServer = createStore(typeof window === 'undefined');
export const $isClient = not($isServer);

export const appStarted = createEvent<{ ctrl?: AbortController }>();

export const appStartedOnServer = sample({ clock: appStarted, filter: $isServer });
export const appStartedOnClient = sample({ clock: appStarted, filter: $isClient });
