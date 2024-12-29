import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useUnit } from 'effector-react';
import { Link, useParams } from 'react-router-dom';

import { headerSearchField } from '@/shared/animations';
import { useLinkBuilder } from '@/shared/pageRouting';

import { paths } from '@/constants/paths';

import { suggestField, useCategoryFromCatalog } from '@/features/header';

import { Button, Input, Responsive, Typography } from '@/ui/index';

import { SearchIcon } from '@/ui/assets/icons';

import st from './styles.module.scss';

export default function CollectionPage() {
  const { i18n } = useLingui();
  const { collection } = useParams();
  const searchOpened = useUnit(headerSearchField);
  const field = useUnit(suggestField);
  const catalog = useCategoryFromCatalog(collection);
  const builder = useLinkBuilder();

  return (
    <>
      <Typography.PageTitle className={st.pageTitle}>
        {catalog?.titleForNextLevelScreen || catalog?.title}
      </Typography.PageTitle>

      <Responsive.TabletAndBelow>
        <Input
          showStab
          onStubClick={() => searchOpened.onChange(true)}
          Prefix={<SearchIcon />}
          placeholder={t`Поиск по каталогу`}
          className={st.search}
          closable={!!field.value || searchOpened.value}
        />
      </Responsive.TabletAndBelow>

      <div className={st.wrapper}>
        {catalog?.categories
          ?.filter(it => it.categories.length > 0)
          ?.sort((x, y) => +x.position - +y.position)
          ?.map(category => (
            <div className={st.group} key={category.collectionCode}>
              <Typography.Paragraph className={st.title}>
                <Link
                  to={builder(
                    paths.catalog.withSlug.common({
                      slug: category.slug,
                    }),
                  )}
                >
                  {category.title}
                </Link>
              </Typography.Paragraph>

              <ul>
                {category.categories
                  .sort((x, y) => +x.position - +y.position)
                  .map(it => (
                    <li key={it.collectionCode}>
                      <Link
                        to={builder(
                          paths.catalog.withSlug.common({
                            slug: it.slug,
                          }),
                        )}
                      >
                        <img src={it.image?.src} alt="" />
                      </Link>

                      <Typography.Paragraph>
                        <Link to={builder(paths.catalog.withSlug.common({ slug: it.slug }))}>{it.title}</Link>
                      </Typography.Paragraph>
                    </li>
                  ))}

                {category.button && (
                  <li key="more" className={st.showMore}>
                    <Link
                      to={builder(
                        paths.catalog.withSlug.common({
                          slug: category.slug,
                        }),
                      )}
                    >
                      {category.button?.title}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          ))}
      </div>

      {catalog?.button && (
        <Link
          to={builder(
            paths.catalog.withSlug.common({
              slug: catalog?.slug,
            }),
          )}
        >
          <Button reverse size="L" bold className={st.seeAll}>
            {catalog?.button?.title}
          </Button>
        </Link>
      )}
    </>
  );
}
