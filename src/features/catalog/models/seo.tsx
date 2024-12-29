import { combine } from 'effector';

import { CatalogWithFiltersResponse, ClientCatalogFilter } from '@/shared/catalog';
import { createSeo } from '@/shared/Seo';
import { $readdableGender } from '@/shared/session';

import { filtersCodes, filterCodeToReaddableCode } from '@/constants/hardcode';

import { capitalizeFirstLetter } from '@/lib/string';

import { createBaseCatalog } from './createBaseCatalog';

function getFirstSelectedIfAlone(filter?: ClientCatalogFilter) {
  if (filter) {
    const selected = filter.values.sort((x, y) => +x.priority - +y.priority).filter(it => it.selected);

    if (selected.length === 1) {
      return selected[0].label;
    }
  }

  return '';
}

function createBaseSeoCatalog(catalog: CatalogWithFiltersResponse | null, gender: string) {
  if (catalog) {
    const aloneColorFilter = getFirstSelectedIfAlone(catalog.filters[filterCodeToReaddableCode[filtersCodes.color]]);
    const additionalColorTitle = aloneColorFilter ? `цвет ${aloneColorFilter},` : '';

    const aloneBrandFilter = getFirstSelectedIfAlone(catalog.filters[filterCodeToReaddableCode[filtersCodes.brands]]);
    const additionalBrandTitle = aloneBrandFilter ? `${aloneBrandFilter}` : '';

    return {
      title: `${capitalizeFirstLetter(
        catalog.header?.collection?.title ?? '',
      )} ${additionalBrandTitle} для ${gender} ${additionalColorTitle} купить на ресейл-платформе TSUM Collect с выгодой до 50%`,
      description: `${capitalizeFirstLetter(
        catalog.header?.collection?.title ?? '',
      )} ${additionalBrandTitle} для ${gender} купить на ресейл-платформе TSUM Collect с выгодой до 50%. Модные бренды. Гарантия подлинности. Быстрая доставка.`,
      keywords: catalog.header?.collection?.title ?? '',
    } as BaseMetaType;
  }

  return {};
}

function createBrandSeoCatalog(catalog: CatalogWithFiltersResponse | null) {
  return catalog
    ? ({
        title: `${capitalizeFirstLetter(
          catalog.header?.brand?.title ?? '',
        )} каталог бренда на ресейл-платформе TSUM Collect с выгодой до 50%`,
        description: `${capitalizeFirstLetter(
          catalog.header?.brand?.title ?? '',
        )} каталог бренда на ресейл-платформе TSUM Collect с выгодой до 50%. Модные бренды. Гарантия подлинности. Быстрая доставка. `,
        keywords: catalog.header?.brand?.title ?? '',
      } as BaseMetaType)
    : {};
}

export function createCatalogSeo(catalog: ReturnType<typeof createBaseCatalog>, type: 'brand' | 'common') {
  return createSeo(
    combine({ gender: $readdableGender, catalog: catalog.$result }).map(({ gender, catalog }) => {
      return type === 'common' ? createBaseSeoCatalog(catalog, gender) : createBrandSeoCatalog(catalog);
    }),
  );
}
