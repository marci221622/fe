import { useUnit } from 'effector-react';
import { Link } from 'react-router-dom';

import { $topBrands } from '@/shared/brands';
import { $mappedStrings } from '@/shared/configs';
import { useLinkBuilder } from '@/shared/pageRouting';
import { BrandLogo } from '@/shared/ui';

import { paths } from '@/constants/paths';

import { sortBrandsByAlphabet } from '@/lib/formatting';

import { Typography } from '@/ui/index';

import st from './styles.module.scss';

const MAX_BRANDS_LEN = 24;

export function BrandsContent() {
  const texts = useUnit($mappedStrings);
  const topBrands = useUnit($topBrands);
  const builder = useLinkBuilder();

  return (
    <div className={st.container}>
      <div className={st.wrapper}>
        <Typography.Title>{texts.web.topBrands}</Typography.Title>

        <ul className={st.brands}>
          {topBrands
            .slice(0, MAX_BRANDS_LEN)
            .sort(sortBrandsByAlphabet)
            .map(it => (
              <li key={it.id}>
                <Link
                  to={builder(
                    paths.catalog.withSlug.brand({
                      slug: it.slug,
                    }),
                  )}
                >
                  <BrandLogo className={st.brand} brand={it} />
                </Link>
              </li>
            ))}
        </ul>

        <Link className={st.seeAll} to={builder(paths.brandsList())}>
          {texts.web.revealAllBrands}
        </Link>
      </div>
    </div>
  );
}
