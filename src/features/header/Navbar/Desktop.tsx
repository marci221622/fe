import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { Catalog } from '@/generated/customer_hub/entities/catalog.v1';
import { headerStuckedField } from '@/shared/animations';
import { $mappedStrings } from '@/shared/configs';
import { useLinkBuilder } from '@/shared/pageRouting';
import { $currentGender } from '@/shared/session';
import { visibleField } from '@/shared/ui/StickyBanner';

import { TITLE_TO_REMOVALE } from '@/constants/hardcode';
import { paths } from '@/constants/paths';

import { BrandsContent } from './BrandsContent';
import { CategoryContent } from './CategoryContent';

import st from './styles.module.scss';

type Props = {
  catalogs: Catalog[];
};

export function NavBarDesktop({ catalogs }: Props) {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();
  const currentGender = useUnit($currentGender);
  const hasBanner = useUnit(visibleField.$value);
  const headerStucked = useUnit(headerStuckedField.$value);
  const builder = useLinkBuilder();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const idRef = useRef<NodeJS.Timeout | null>(null);

  const links = useMemo(() => {
    const root = catalogs.find(it => it.gender === currentGender);

    return root
      ? [...root.categories].sort((x, y) => +x.position - +y.position).filter(it => it.title !== TITLE_TO_REMOVALE)
      : [];
  }, [catalogs, currentGender]);

  const leaveHandler = () => {
    setHoveredItem(null);
    clearTimeout(idRef.current!);
  };

  const onMouseEnter = (key: string) => {
    clearTimeout(idRef.current!);

    idRef.current = setTimeout(() => {
      setHoveredItem(key);
    }, 300);
  };

  return (
    <ul className={cn(st.desktopNav, 'menu')} onMouseLeave={leaveHandler}>
      <li key="brands" className={st.parentElement} onMouseEnter={() => onMouseEnter('brands')}>
        <Link to={builder(paths.brandsList())} className={st.mainLink}>
          {texts.tabs.brands}
        </Link>

        {hoveredItem === 'brands' && (
          <div
            className={cn(st.inner, {
              [st.withBanner]: hasBanner,
              [st.isStucked]: headerStucked,
            })}
          >
            <BrandsContent />
            <div className={st.overlay} onMouseEnter={leaveHandler} />
          </div>
        )}
      </li>

      {links.map(it => (
        <li
          key={it.collectionCode ?? it.slug}
          className={st.parentElement}
          aria-label={it.title}
          onMouseEnter={() => onMouseEnter(it.collectionCode ?? it.slug)}
        >
          <Link className={st.mainLink} to={builder(paths.catalog.withSlug.common({ slug: it.slug }))}>
            {it.title}
          </Link>

          {it.categories.length > 0 && hoveredItem === (it.collectionCode ?? it.slug) && (
            <div
              className={cn(st.inner, {
                [st.withBanner]: hasBanner,
                [st.isStucked]: headerStucked,
              })}
            >
              <CategoryContent category={it} />
              <div className={st.overlay} onMouseEnter={leaveHandler} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
