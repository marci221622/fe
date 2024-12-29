import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import _ from 'lodash';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { Category } from '@/generated/customer_hub/entities/category.v1';
import { $mappedStrings } from '@/shared/configs';
import { useLinkBuilder } from '@/shared/pageRouting';
import { $currentGender } from '@/shared/session';
import { BrandLogo } from '@/shared/ui';

import { SECTION_TO_STRING, filtersCodes } from '@/constants/hardcode';
import { paths } from '@/constants/paths';

import { sortCategoriesByPosition, sortBrandsByAlphabet } from '@/lib/formatting';

import { Typography } from '@/ui/index';

import { pathScheme } from './scheme';

import st from './styles.module.scss';

const MAX_BRANDS_LEN = 18;
const MAX_CATEGORIES_LEN = 18;
const MAX_CATEGORIES_COL = 3;

export function CategoryContent({ category }: { category: Category }) {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();
  const builder = useLinkBuilder();
  const gender = useUnit($currentGender);
  const topBrands = useMemo(
    () =>
      category.topBrands
        .filter(it => it.sectionsTop.includes(SECTION_TO_STRING[gender]))
        .slice(0, MAX_BRANDS_LEN)
        .sort(sortBrandsByAlphabet),
    [category.topBrands, gender],
  );
  const hasTopBrands = topBrands.length > 0;
  const categoriesList = _.chunk(
    category.categories.slice(0, MAX_CATEGORIES_LEN).sort(sortCategoriesByPosition),
    MAX_CATEGORIES_LEN / MAX_CATEGORIES_COL,
  );

  return (
    <div
      className={cn(st.container, {
        [st.noTopBrands]: !hasTopBrands,
      })}
    >
      <div className={st.wrapper}>
        <div className={st.titles}>
          <Typography.Paragraph>{texts.web.categories}</Typography.Paragraph>
          {hasTopBrands && <Typography.Paragraph>{texts.web.topBrands}</Typography.Paragraph>}
        </div>

        <div className={st.categories}>
          {categoriesList.map((group, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <ul className={st.list} key={idx}>
              {group.map(category => (
                <li key={category.collectionCode ?? category.slug} className={st.category}>
                  <Link
                    to={builder(
                      paths.catalog.withSlug.common({
                        slug: category.slug,
                      }),
                    )}
                  >
                    <img src={category.image?.src} alt="" loading="lazy" />
                    <Typography.Paragraph>{category.title}</Typography.Paragraph>
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>

        {hasTopBrands && (
          <ul className={st.brands}>
            {topBrands.map(it => (
              <li key={it.id}>
                <Link
                  to={{
                    pathname: builder(
                      paths.catalog.withSlug.brand({
                        slug: it.slug,
                      }),
                    ),
                    search: pathScheme[category.collectionCode!]
                      ? `${filtersCodes.categoryFilter}=${pathScheme[category.collectionCode!]}`
                      : '',
                  }}
                >
                  <BrandLogo brand={it} />
                </Link>
              </li>
            ))}
          </ul>
        )}

        <Link
          className={st.seeAll}
          to={builder(
            paths.catalog.withSlug.common({
              slug: category.slug,
            }),
          )}
        >
          {category.button?.title}
        </Link>
      </div>
    </div>
  );
}
