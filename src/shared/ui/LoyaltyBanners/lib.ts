import { Loyalty } from '@/generated/customer_hub/entities/loyalty.v1';

export const hasBodyLoyalty = (loyalty?: Loyalty | null): loyalty is Loyalty =>
  !!loyalty && loyalty.shortDescriptions.length > 0;

export const hasFullDescription = (loyalty?: Loyalty | null): loyalty is Loyalty =>
  !!loyalty && loyalty.fullDescriptions.length > 0;

export const hasStickyLoyalty = (loyalty?: Loyalty | null): loyalty is Loyalty =>
  !!loyalty && loyalty.stickyBanners.length > 0;
