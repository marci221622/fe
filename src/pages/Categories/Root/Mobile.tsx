import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { Link } from 'react-router-dom';

import { headerSearchField } from '@/shared/animations';
import { $appIsShort, $mappedStrings } from '@/shared/configs';
import { useLinkBuilder } from '@/shared/pageRouting';
import { GenderActions } from '@/shared/ui';

import { paths } from '@/constants/paths';

import { suggestField, useRootCatalogByGender } from '@/features/header';

import { Space } from '@/ui/index';

import st from './styles.module.scss';

export function MobileCategories() {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();
  const catalog = useRootCatalogByGender();
  const searchOpened = useUnit(headerSearchField);
  const field = useUnit(suggestField);
  const builder = useLinkBuilder();
  const appIsShort = useUnit($appIsShort);

  return (
    <Space direction="vertical" stretch className={st.wrapper} size="large">
      <GenderActions
        placeholder={texts.searchBar.placeholder.catalog}
        wrapperClassname={cn(st.genderActions, {
          [st.appIsShort]: appIsShort,
        })}
        actionsClassname={st.actionsClassname}
        showStab
        searchOpened={searchOpened.value}
        onStubClick={() => searchOpened.onChange(true)}
        onCloseClick={() => searchOpened.onChange(false)}
        value={field.value}
        onChange={e => field.onChange(e.target.value)}
        largeBottomMargin={false}
      />

      <ul className={st.categories}>
        {catalog?.categories
          ?.sort((x, y) => +x.position - +y.position)
          ?.map(it => {
            const catalogLink = it.menuCode
              ? paths.catalog.withSlug.common({ slug: it.slug })
              : paths.catalog.withSlug.collection({ slug: it.slug });

            return (
              <li
                key={it.collectionCode ?? it.slug}
                style={{ aspectRatio: `${it.image?.width} / ${it.image?.height}` }}
              >
                <Link
                  to={builder(
                    it.categories.length > 0
                      ? paths.categories.collection({ collection: it.collectionCode })
                      : catalogLink,
                  )}
                >
                  <img src={it.image?.src} alt="" />
                  <p>{it.title}</p>
                </Link>
              </li>
            );
          })}
      </ul>
    </Space>
  );
}
