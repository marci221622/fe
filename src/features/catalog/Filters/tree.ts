
import { CatalogFilter_Value } from '@/generated/customer_hub/entities/catalog_filter.v1';
import { Category } from '@/generated/customer_hub/entities/category.v1';
import { ClientCatalogFilter } from '@/shared/catalog';

import { getKeyFromCategory } from './helpers';

// нужно в стейт положить конкретно последние элементы выбранного дерева
// Тоже относится и к treeToAppliedArrayFromFilter
// Просто работают с разным набором данных, но суть одна
// Один Category и друго Filter_Value
export function treeToAppliedArray(tree: Category[] | Category) {
  const queue = Array.isArray(tree) ? [...tree] : [tree];
  const map: string[] = [];

  while (queue.length > 0) {
    const currentCategory = queue.shift()!;
    const someChildIsSelected = currentCategory?.categories?.some(it => it.selected);

    if (currentCategory.selected && !someChildIsSelected) {
      map.push(getKeyFromCategory(currentCategory));
    }

    if (someChildIsSelected) {
      queue.push(...currentCategory.categories);
    }
  }

  return map;
}

export function treeToAppliedArrayFromFilter(tree: ClientCatalogFilter) {
  const queue = [...tree.values];
  const map: CatalogFilter_Value[] = [];

  while (queue.length > 0) {
    const currentCategory = queue.shift()!;
    const someChildIsSelected = currentCategory?.children?.some(it => it.selected);

    if (currentCategory.selected && !someChildIsSelected) {
      map.push(currentCategory);
    }

    if (someChildIsSelected) {
      queue.push(...currentCategory.children);
    }
  }

  return map;
}

export function pickAllSelected(tree: Category[] | Category) {
  const queue = Array.isArray(tree) ? [...tree] : [tree];
  const map: Category[] = [];

  while (queue.length > 0) {
    const currentCategory = queue.shift()!;
    const hasChildren = currentCategory?.categories?.length > 0;

    if (currentCategory.selected) {
      map.push(currentCategory);

      if (hasChildren) {
        queue.push(...currentCategory.categories);
      }
    }
  }

  return map;
}

export function pickAllSelectedFromFilter(tree: CatalogFilter_Value[] | CatalogFilter_Value) {
  const queue = Array.isArray(tree) ? [...tree] : [tree];
  const map: CatalogFilter_Value[] = [];

  while (queue.length > 0) {
    const currentCategory = queue.shift()!;
    const hasChildren = currentCategory?.children?.length > 0;

    if (currentCategory.selected) {
      map.push(currentCategory);

      if (hasChildren) {
        queue.push(...currentCategory.children);
      }
    }
  }

  return map;
}

function restorePathFromMap({
  end,
  start,
  parent,
}: {
  end: string;
  start: string;
  parent: Map<string, Category>;
}): Category[] {
  const path = [];
  let goal = parent.get(end);

  while (goal && goal.collectionCode !== start) {
    path.unshift(goal);
    goal = parent.get(goal.collectionCode!);
  }

  return path;
}

function restorePathFromMapFoFilter({
  end,
  start,
  parent,
}: {
  end: string;
  start: string;
  parent: Map<string, CatalogFilter_Value>;
}): CatalogFilter_Value[] {
  const path = [];
  let goal = parent.get(end);

  while (goal && goal.code !== start) {
    path.unshift(goal);
    goal = parent.get(goal.code!);
  }

  return path;
}

export function restoreParent(category: Category, endCategory: Category) {
  const queue = [category];
  const parent = new Map<string, Category>();

  let isFinded = false;

  while (!isFinded && queue.length > 0) {
    const currentCategory = queue.shift()!;

    if (currentCategory.collectionCode === endCategory.collectionCode) {
      isFinded = true;
      break;
    }

    currentCategory.categories.forEach(it => parent.set(it.collectionCode!, currentCategory));

    queue.push(...currentCategory.categories);
  }

  return [
    category,
    ...restorePathFromMap({ end: endCategory.collectionCode!, start: category.collectionCode!, parent }),
    endCategory,
  ].map(it => it.title);
}

export function restoreParentFromFilter(category: CatalogFilter_Value, endCategory: CatalogFilter_Value) {
  const queue = [category];
  const parent = new Map<string, CatalogFilter_Value>();

  let isFinded = false;

  while (!isFinded && queue.length > 0) {
    const currentCategory = queue.shift()!;

    if (currentCategory.code === endCategory.code) {
      isFinded = true;
      break;
    }

    currentCategory.children.forEach(it => parent.set(it.code!, currentCategory));

    queue.push(...currentCategory.children);
  }

  return [
    category,
    ...restorePathFromMapFoFilter({ end: endCategory.code!, start: category.code!, parent }),
    endCategory,
  ].map(it => it.label);
}
