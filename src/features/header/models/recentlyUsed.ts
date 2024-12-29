import { createRecentlyUsed } from '@/shared/recentlyUsed';

const PERSIST_KEY = '@collect/suggest';

export const recentlySuggests = createRecentlyUsed({
  key: PERSIST_KEY,
});
