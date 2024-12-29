import cn from 'classnames';
import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { CatalogFilter_Value } from '@/generated/customer_hub/entities/catalog_filter.v1';
import { ClientCatalogFilter } from '@/shared/catalog';

import { filtersCodes } from '@/constants/hardcode';

import { Arrow } from './Arrow';
import { getCategoriesStartLvl, noSelectedItems, hasSelectedChildren } from './lib';
import { useItemToggler } from './useItemToggler';

import st from './styles.module.scss';

type Props = {
  categoryFilter: ClientCatalogFilter;
};

function DropDown({
  value,
  additionalParams,
  lvl,
  byTreeLvl,
}: {
  value: CatalogFilter_Value;
  additionalParams?: string;
  lvl: number;
  // Нужно что бы добавить стили не по порядку дерева (3,2,1)
  // А с нуля (0,1,2)
  byTreeLvl: number;
}) {
  const { openedScheme, toggleItem } = useItemToggler(value);

  const alwaySelectedParent = lvl === 2;

  return (
    <ul className={cn(st.sidebar, st.inner, st[`lvl${lvl}`], st[`byTreeLvl${byTreeLvl}`])}>
      {value.children
        .sort((x, y) => +x.priority - +y.priority)
        .map(it => {
          const noSelectedChildren = !hasSelectedChildren(it);
          const hasChildren = it.children?.length > 0;
          const itemSelected = alwaySelectedParent ? it.selected : it.selected && !hasSelectedChildren(it);
          const opened = openedScheme[it.code];
          const arrowDir = opened ? 'top' : 'bottom';

          return (
            <li
              className={cn(st.title, {
                [st.selected]: itemSelected || (opened && noSelectedChildren),
                [st.bold]: !hasChildren && it.selected,
                [st.active]: it.selected,
              })}
              key={`${it.code}-${it.priority}`}
            >
              <Link
                to={{
                  search: `${filtersCodes.categoryFilter}=${it.code}${additionalParams}`,
                }}
              >
                <span>{it.label}</span>

                {itemSelected && hasChildren && <Arrow direction={arrowDir} onClick={() => toggleItem(it.code)} />}
              </Link>

              {hasChildren && opened && (
                <DropDown
                  value={it}
                  additionalParams={additionalParams}
                  lvl={Math.max(1, lvl - 1)}
                  byTreeLvl={byTreeLvl + 1}
                />
              )}
            </li>
          );
        })}
    </ul>
  );
}

export function CategoryFilterSidebar({ categoryFilter }: Props) {
  const { values: rootCategories } = categoryFilter;
  const [search] = useSearchParams();
  const { openedScheme, toggleItem } = useItemToggler(rootCategories);

  const mergedSearch = getParamsFromSearch(search, filtersCodes.categoryFilter);

  const additionalParams = mergedSearch ? `&${mergedSearch}` : '';

  const startCategoriesLvl = useMemo(() => getCategoriesStartLvl(rootCategories), [rootCategories]);
  const allItemsNotSelected = noSelectedItems(rootCategories);
  const alwaySelectedParent = startCategoriesLvl === 2;

  if (rootCategories.length === 0) {
    return null;
  }

  return (
    <ul
      className={cn(st.sidebar, st[`lvl${startCategoriesLvl}`], st.byTreeLvl0, {
        [st.allItemsNotSelected]: allItemsNotSelected,
      })}
    >
      {rootCategories
        .sort((x, y) => +x.priority - +y.priority)
        .map(it => {
          const hasChildren = it.children?.length > 0;
          const opened = openedScheme[it.code];
          const arrowDir = opened ? 'top' : 'bottom';
          const itemSelected = alwaySelectedParent ? it.selected : it.selected && !hasSelectedChildren(it);

          return (
            <li
              className={cn(st.title, {
                [st.selected]: itemSelected,
                [st.active]: it.selected,
              })}
              key={`${it.code}-${it.priority}`}
            >
              <Link
                aria-label={it.label}
                to={{
                  search: `${filtersCodes.categoryFilter}=${it.code}${additionalParams}`,
                }}
              >
                <span>{it.label}</span>

                {itemSelected && hasChildren && <Arrow direction={arrowDir} onClick={() => toggleItem(it.code)} />}
              </Link>

              {hasChildren && opened && (
                <DropDown
                  value={it}
                  additionalParams={additionalParams}
                  lvl={Math.max(1, startCategoriesLvl - 1)}
                  byTreeLvl={1}
                />
              )}
            </li>
          );
        })}
    </ul>
  );
}

function getParamsFromSearch(search: URLSearchParams, expected: string) {
  return [...search.keys()]
    .reduce((acc, key) => {
      if (key !== expected) {
        return [...acc, `${key}=${search.get(key)}`];
      }

      return acc;
    }, [] as string[])
    .join('&');
}