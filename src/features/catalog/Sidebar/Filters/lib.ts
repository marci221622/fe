import { CatalogFilter_Value } from '@/generated/customer_hub/entities/catalog_filter.v1';

export function getCategoriesStartLvl(rootCategories: CatalogFilter_Value[]) {
  let startLvl = 0;

  for (let i = 0; i < rootCategories.length; i++) {
    let currentLvl = 1;
    let tmpCategory = rootCategories[i].children[0];

    while (tmpCategory) {
      currentLvl += 1;
      tmpCategory = tmpCategory.children[0];
    }

    startLvl = Math.max(startLvl, currentLvl);
  }

  return startLvl;
}

export function noSelectedItems(rootCategories: CatalogFilter_Value[]) {
  return rootCategories.every(category => !category.selected);
}

export function hasSelectedChildren(category: CatalogFilter_Value) {
  return category.children.some(it => it.selected);
}
