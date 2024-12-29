import cn from 'classnames';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Category } from '@/generated/customer_hub/entities/category.v1';
import { useLinkBuilder } from '@/shared/pageRouting';

import { paths } from '@/constants/paths';

import { catalogCtx } from '../../Template';

import st from './styles.module.scss';

type Props = {
  categories: Category[];
};

function createPathname({
  slug,
  pageType,
  menuCode,
  builder,
}: {
  menuCode?: string;
  pageType?: string;
  slug?: string;
  builder: ReturnType<typeof useLinkBuilder>;
}) {
  return pageType === 'brands'
    ? builder(
        paths.catalog.withSlug.brand({
          slug,
        }),
      )
    : builder(
        menuCode
          ? paths.catalog.withSlug.common({
              slug,
            })
          : paths.catalog.withSlug.collection({
              slug,
            }),
      );
}

function DropDown({ categories }: { categories: Category }) {
  const { pageType } = useContext(catalogCtx);
  const builder = useLinkBuilder();
  const { search } = useLocation();

  const rootpathname = createPathname({
    menuCode: categories.menuCode,
    slug: categories.slug,
    pageType,
    builder,
  });

  const children = categories.categories.filter(it => +it.itemsCount > 0);

  return (
    <ul className={cn(st.sidebar, st.dropdown)}>
      <li className={cn(st.title, st.selected)}>
        <div className={st.header}>
          <Link
            className={cn(st.mainTitle)}
            to={{
              pathname: rootpathname,
              search,
            }}
          >
            <span>{categories.title}</span>
          </Link>
        </div>

        {children.length > 0 && (
          <ul className={cn(st.sidebar, st.inner)}>
            {children
              .sort((x, y) => +x.position - +y.position)
              .map(it => {
                const pathname = createPathname({
                  menuCode: it.menuCode,
                  slug: it.slug,
                  pageType,
                  builder,
                });

                return (
                  <li
                    className={cn(st.title, { [st.selected]: it.selected })}
                    key={`${it.collectionCode ?? it.slug}-${it.position}`}
                  >
                    <Link to={{ pathname, search }}>{it.title}</Link>
                  </li>
                );
              })}
          </ul>
        )}
      </li>
    </ul>
  );
}

export function MenuitemsSidebar({ categories }: Props) {
  const rootCategories = categories.length === 1 ? categories[0].categories : categories;

  const { pageType } = useContext(catalogCtx);
  const builder = useLinkBuilder();
  const { search } = useLocation();

  if (categories.length === 0) {
    return null;
  }

  return (
    <ul className={st.sidebar}>
      {rootCategories
        .sort((x, y) => +x.position - +y.position)
        .map(it => {
          const hasChildrenAndSelected = it.categories && it.selected;
          const pathname = createPathname({
            menuCode: it.menuCode,
            slug: it.slug,
            pageType,
            builder,
          });

          return (
            <li
              className={cn(st.title, {
                [st.selected]: hasChildrenAndSelected,
              })}
              key={`${it.collectionCode ?? it.slug}-${it.position}`}
            >
              {!hasChildrenAndSelected && (
                <Link
                  to={{
                    pathname,
                    search,
                  }}
                >
                  <span>{it.title}</span>
                </Link>
              )}

              {hasChildrenAndSelected && <DropDown categories={it} />}
            </li>
          );
        })}
    </ul>
  );
}
