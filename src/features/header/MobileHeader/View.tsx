import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { Link, useNavigate } from 'react-router-dom';

import { headerSearchField } from '@/shared/animations';

import { paths } from '@/constants/paths';

import { globalCart } from '@/features/basket';
import { useHomeLink } from '@/features/home';

import { BadgeCounter, Typography } from '@/ui/index';

import { ArrowRightIcon, BasketIcon, SearchIcon } from '@/ui/assets/icons';
import { Logo } from '@/ui/assets/Logo';

import { additionalTitle } from '../models';

import st from './mobileHeader.module.scss';

export type MobileHeaderProps = {
  className?: string;
  logoOnly?: boolean;
  searchable?: boolean;
};

const state = {
  cartCounter: globalCart.$cartCounter,
};

export const MobileHeader = ({ className, logoOnly, searchable }: MobileHeaderProps) => {
  const { i18n } = useLingui();
  const navigate = useNavigate();
  const { cartCounter } = useUnit(state);
  const { value } = useUnit(additionalTitle);
  const search = useUnit(headerSearchField);

  const homeLink = useHomeLink();

  const headerTexts = value?.type === 'text' ? [value.rows[0], value.rows[1]] : [];

  return (
    <div className={cn(st.children, className)}>
      <div className={cn(st.leftSide, { [st.searchable]: searchable })}>
        <ArrowRightIcon className={st.backArrow} onClick={() => navigate(-1)} />
      </div>

      <div className={st.logo}>
        {logoOnly || !value ? (
          <Link to={homeLink}>
            <Logo className={st.appLogo} />
          </Link>
        ) : value.type === 'text' ? (
          <>
            {headerTexts[0] && (
              <Typography.Paragraph className={st.mainTitle} bold>
                {headerTexts[0]}
              </Typography.Paragraph>
            )}

            {headerTexts[1] && <Typography.Paragraph className={st.subTitle}>{headerTexts[1]}</Typography.Paragraph>}
          </>
        ) : (
          <img src={value.src} loading="lazy" alt="" />
        )}
      </div>

      <div className={cn(st.rightSide, { [st.searchable]: searchable })}>
        {searchable && <SearchIcon onClick={() => search.onChange(true)} className={st.searchBox} />}

        <Link to={paths.basket()} className={st.basketLink} data-test="cartCounter">
          {cartCounter && <BadgeCounter counter={cartCounter} className={st.counter} />}
          <BasketIcon />
        </Link>
      </div>
    </div>
  );
};
