import { Section } from '@/generated/customer_hub/enums/section';

export type ToggleFavoriteBrandParams = {
  section: Section;
  brandCode: string;
  isActive: boolean;
  brandId: string;
  brandName: string;
};
