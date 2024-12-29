import { FavoriteListBrand } from '@/generated/customer_hub/entities/favorite_list_brand.v1';
import { Section } from '@/generated/customer_hub/enums/section';

export function mapBrandsByGender(brands: FavoriteListBrand[], size?: number) {
  const scheme = {
    [Section.SECTION_FEMALE]: [] as FavoriteListBrand[],
    [Section.SECTION_MALE]: [] as FavoriteListBrand[],
    [Section.UNRECOGNIZED]: [] as FavoriteListBrand[],
  };

  for (let i = 0; i < (size ?? brands.length); i++) {
    if (brands[i].sections.includes('female')) {
      scheme[Section.SECTION_FEMALE].push(brands[i]);
    }

    if (brands[i].sections.includes('male')) {
      scheme[Section.SECTION_MALE].push(brands[i]);
    }
  }

  return scheme;
}
