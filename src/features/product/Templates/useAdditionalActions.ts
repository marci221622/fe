import { useUnit } from 'effector-react';

import { Item } from '@/generated/customer_hub/entities/item.v1';
import { $mappedStrings } from '@/shared/configs';
import { useLinkBuilder } from '@/shared/pageRouting';
import { $currentGender } from '@/shared/session';

import { READDABLE_GENDER_TO_SECTION, URLS_BY_SECTION } from '@/constants/hardcode';
import { paths } from '@/constants/paths';

export function useAdditionalActions(product?: Item | null) {
  const texts = useUnit($mappedStrings);
  const builder = useLinkBuilder();
  const currentGender = useUnit($currentGender);

  if (product) {
    const collSection = product.collection?.gender
      ? READDABLE_GENDER_TO_SECTION[product.collection?.gender]
      : currentGender;

    return {
      brand: {
        title: texts.web.allItems,
        link: product.brand?.slug
          ? builder(
              paths.catalog.withSlug.brand({
                slug: product.brand?.slug,
              }),
            )
          : '',
      },
      collection: {
        title: texts.itemDetails.allItems.category.replace('%@', product.collection?.title ?? ''),
        link: product.collection?.slug
          ? `/${URLS_BY_SECTION[collSection]}${paths.catalog.withSlug.common({ slug: product.collection?.slug })}`
          : '',
      },
    };
  }

  return null;
}
