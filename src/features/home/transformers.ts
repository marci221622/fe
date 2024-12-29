import { StoreValue } from 'effector';
import { useUnit } from 'effector-react';

import { BannersBlock, FavoriteBrandsBannersBlock } from '@/generated/customer_hub/entities/banners_block.v1';
import { CategoriesBlock } from '@/generated/customer_hub/entities/categories_block.v1';
import { ItemsBlock } from '@/generated/customer_hub/entities/items_block.v1';
import { Payload } from '@/generated/customer_hub/entities/payload.v1';
import { SlugType } from '@/generated/customer_hub/entities/slug.v1';
import { Sort } from '@/generated/customer_hub/enums/sort';
import { Type } from '@/generated/customer_hub/enums/type';
import { HomeResponse } from '@/generated/customer_hub/methods/catalog/home.v1';
import { $favoriteBrandsPageLink } from '@/shared/brands';
import { $mainScreenCellsOptions } from '@/shared/configs';
import { useLinkBuilder } from '@/shared/pageRouting';

import { paths } from '@/constants/paths';
import { runtimeConfig } from '@/constants/runtimeConfig';

import { getPriceNumberAmount } from '@/lib/transformers';

export type HomeResponseAsList = Array<
  | {
      type: 'banner';
      position: number;
      payload: BannersBlock;
    }
  | {
      type: 'favoriteBrands';
      position: number;
      payload: FavoriteBrandsBannersBlock;
    }
  | {
      type: 'category';
      position: number;
      payload: CategoriesBlock;
    }
  | {
      type: 'product';
      position: number;
      payload: ItemsBlock;
      verticalPriceAlignment: boolean;
    }
  | {
      type: 'viewedItems';
      position: number;
    }
  | {
      // Тут подобрать тип для FB
      type: 'favoriteBrandsNoveltiesItems';
      position: number;
    }
  | {
      type: 'ourAdvantages';
      position: number;
    }
>;

const maxCentCount = 14;

export function transfrormHomeToList(home: HomeResponse, options: StoreValue<typeof $mainScreenCellsOptions>) {
  const rs: HomeResponseAsList = [
    {
      type: 'viewedItems',
      position: options.viewedItems?.position ?? 100,
    },
    {
      type: 'favoriteBrandsNoveltiesItems',
      position: options.favoriteBrandsNoveltiesItems?.position ?? 100,
    },
    {
      type: 'ourAdvantages',
      position: options.ourAdvantages?.position ?? 100,
    },
  ];

  home.bannersBlocks.forEach(banner => {
    if (banner.banners.length > 0) {
      rs.push({
        type: 'banner',
        position: Number(banner.position),
        payload: banner,
      });
    }
  });

  home.categoriesBlocks.forEach(category => {
    if (category.categories.length > 0) {
      rs.push({ type: 'category', position: Number(category.position), payload: category });
    }
  });

  home.itemsBlocks.forEach(product => {
    if (product.itemsList.length > 0) {
      const pricesNumberAmount = getPriceNumberAmount(product.itemsList);
      const verticalPriceAlignment = !!pricesNumberAmount.filter(priceLength => priceLength >= maxCentCount).length;

      rs.push({ type: 'product', position: Number(product.position), payload: product, verticalPriceAlignment });
    }
  });

  home.favoriteBrandsBlock.forEach(banner => {
    if (banner.brandsItems.length > 0) {
      rs.push({
        type: 'favoriteBrands',
        position: options.favoriteBrandsBanners?.position ?? 99,
        payload: banner,
      });
    }
  });

  return rs.sort((x, y) => x.position - y.position);
}

export function getLinkProps({
  payload,
  builder,
  overidedType,
}: {
  payload: (Omit<Payload, 'type'> & { type: Type | 'lastViewed' | 'favoritebrands' }) | null;
  builder: ReturnType<typeof useLinkBuilder>;
  overidedType?: Type;
}) {
  const props = {
    reloadDocument: false,
    to: '/',
  };

  if (!payload) {
    return props;
  }

  switch (overidedType ?? payload.type) {
    case Type.UNIVERSAL_LINK: {
      const isAnotherDomain = !payload.value.startsWith(runtimeConfig.HOSTNAME);

      props.reloadDocument = isAnotherDomain;
      props.to = payload.value;
      break;
    }

    case Type.ITEM: {
      props.to = paths.product(payload.value);
      break;
    }

    case Type.BRAND: {
      props.to = builder(
        paths.catalog.withSlug.brand({
          slug: payload.slug?.slug,
        }),
      );
      break;
    }

    case Type.CATEGORY: {
      props.to = builder(paths.catalog.withSlug.common({ slug: payload.slug?.slug }));
      break;
    }

    case Type.COLLECTION: {
      props.to = builder(applySlugType(payload));
      break;
    }

    case 'lastViewed': {
      props.to = paths.lastViewedProducts();
      break;
    }

    default:
      break;
  }

  return props;
}

function applySlugType(payload: Omit<Payload, 'type'> & { type: Type | 'lastViewed' | 'favoritebrands' }) {
  // То смотрим на тип слага для построения ссылок
  switch (payload.slug?.type) {
    case SlugType.SLUG_TYPE_MENU_ITEM:
      // Если тип слага menu_items - то catalog
      return paths.catalog.withSlug.common({ slug: payload.slug.slug });

    case SlugType.SLUG_TYPE_COLLECTION:
      // Если тип слага collection - то collection
      return paths.catalog.withSlug.collection({ slug: payload.slug.slug });

    default:
      return paths.catalog.withSlug.collection({ slug: payload.slug?.slug });
  }
}

export function useHomeBannersLink(type?: Type) {
  const builder = useLinkBuilder();
  const favoriteLink = useUnit($favoriteBrandsPageLink);

  return (payload: (Omit<Payload, 'type'> & { type: Type | 'lastViewed' | 'favoritebrands' }) | null) => {
    if (payload?.type === 'favoritebrands') {
      return {
        to: `${builder(favoriteLink)}&sort=${Sort.SORT_NOVELTY}`,
        reloadDocument: false,
      };
    }

    const link = getLinkProps({ payload, builder, overidedType: type });

    return {
      to: link.to,
      reloadDocument: link.reloadDocument,
    };
  };
}
