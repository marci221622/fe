import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import { $appIsShort, $mappedStrings } from '@/shared/configs';
import { useLinkBuilder } from '@/shared/pageRouting';

import { paths } from '@/constants/paths';

import { $favoriteCounter, useLastFavoriteLink } from '@/features/favorites';
import { useHomeLink } from '@/features/home';

import { BadgeCounter } from '@/ui/index';

import {
  BrandsIcon,
  CatalogIcon,
  HomeIcon,
  HomeIconFilled,
  BrandsIconFilled,
  CatalogIconFilled,
  SellNavbarFilledIcon,
  SellNavbarIcon,
  ProfileIcon,
  ProfileIconFilled,
  StarIcon,
} from '@/ui/assets/icons';

import st from './styles.module.scss';

type ItemProps = {
  text: string;
  to: string;
  icon: React.JSX.Element;
  filled: React.JSX.Element;
  onClick?: () => void;
  end?: boolean;
  counter?: ReactNode;
};

function Item({ text, to, icon, onClick, filled, end, counter }: ItemProps) {
  return (
    <NavLink
      to={to}
      end={end}
      className={st.navLink}
      onClick={e => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {({ isActive }) => (
        <>
          <div className={st.navItem}>
            {isActive ? filled : icon} {counter}
          </div>
          <p>{text}</p>
        </>
      )}
    </NavLink>
  );
}

export function MobileNav() {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();
  const homeLink = useHomeLink();
  const builder = useLinkBuilder();
  const appIsShort = useUnit($appIsShort);
  const favoriteCounter = useUnit($favoriteCounter);
  const favoritePath = useLastFavoriteLink();

  if (appIsShort) {
    return null;
  }

  return (
    <nav className={cn(st.mobileNav, st.sticky)}>
      <ul>
        <li>
          <Item to={homeLink} text={texts.tabs.main} icon={<HomeIcon />} filled={<HomeIconFilled />} end />
        </li>
        <li>
          <Item
            to={builder(paths.brandsList())}
            text={texts.tabs.brands}
            icon={<BrandsIcon />}
            filled={<BrandsIconFilled />}
          />
        </li>
        <li>
          <Item
            to={builder(paths.categories.root())}
            text={texts.tabs.catalog}
            icon={<CatalogIcon />}
            filled={<CatalogIconFilled />}
          />
        </li>
        <li>
          <Item
            to={favoritePath}
            text={texts.tabs.favorites}
            icon={<StarIcon />}
            filled={<StarIcon active />}
            counter={favoriteCounter && <BadgeCounter counter={favoriteCounter} className={st.counter} />}
          />
        </li>
        <li>
          <Item
            to={paths.landings.seller()}
            text={texts.tabs.seller}
            icon={<SellNavbarIcon />}
            filled={<SellNavbarFilledIcon />}
          />
        </li>
        <li>
          <Item
            to={paths.profile.main()}
            text={texts.tabs.profile}
            icon={<ProfileIcon />}
            filled={<ProfileIconFilled />}
          />
        </li>
      </ul>
    </nav>
  );
}
