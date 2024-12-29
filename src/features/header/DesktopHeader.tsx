import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import ContentLoader from 'react-content-loader';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Section } from '@/generated/customer_hub/enums/section';
import { headerSearchField, headerStuckedField } from '@/shared/animations';
import { $mappedStrings } from '@/shared/configs';
import { $currentGender, $isAuthorized, changedGender } from '@/shared/session';

import { paths } from '@/constants/paths';

import { modal } from '@/features/auth';
import { globalCart } from '@/features/basket';
import { $customer } from '@/features/customer';
import { $favoriteCounter, useLastFavoriteLink } from '@/features/favorites';
import { useHomeLink } from '@/features/home';

import { useNoScroll } from '@/lib/hooks';
import { useScrollEventListener } from '@/lib/useScrollEventListener';

import { BadgeCounter, BREAKPOINTS, Button, Space, Typography } from '@/ui/index';

import { BasketIcon, ProfileIcon, StarIcon } from '@/ui/assets/icons';
import { Logo } from '@/ui/assets/Logo';

import { AddedToCartModal } from './AddedToCartPopup';
import { additionalTitle, catalogQuery } from './models';
import { NavBarDesktop } from './Navbar';
import { ProfilePopup } from './ProfilePopup';
import { Suggests } from './Suggests';

import st from './header.module.scss';

export type DesktopHeaderProps = {
  className?: string;
  isCartPage?: boolean;
  isLoginPage?: boolean;
  disableDynamicTexts?: boolean;
};

const UserPending = () => (
  <ContentLoader
    uniqueKey="UserPending"
    speed={2}
    width={130}
    height={37}
    viewBox="0 0 130 20"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="0" ry="0" width="130" height="20" />
  </ContentLoader>
);

const state = {
  customer: $customer,
  isAuthorized: $isAuthorized,
  catalog: catalogQuery.$result,
  gender: $currentGender,
  cartCounter: globalCart.$cartCounter,
  favoriteCounter: $favoriteCounter,
  onChangeGender: changedGender,
};

export const DesktopHeader = ({ className, isCartPage, isLoginPage, disableDynamicTexts }: DesktopHeaderProps) => {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();
  const navigate = useNavigate();
  const modalField = useUnit(modal);
  const titleField = useUnit(additionalTitle);
  const headerStucked = useUnit(headerStuckedField);
  const search = useUnit(headerSearchField);
  const favoritePath = useLastFavoriteLink();
  const { cartCounter, catalog, customer, onChangeGender, favoriteCounter, gender, isAuthorized } = useUnit(state);

  const homeLink = useHomeLink();
  const { pathname } = useLocation();

  useScrollEventListener((e, { scrollDirection }) => {
    // Анимацию только для десктопа
    if (window.innerWidth >= BREAKPOINTS.md) {
      headerStucked.onChange(scrollDirection === 'down');
    }
  });

  useNoScroll(search.value);

  return (
    <>
      <div className={cn(st.children, className)}>
        <div className={st.compact}>
          {(!isCartPage || !isAuthorized) && <div className={st.mobileStub}>.</div>}

          <div className={cn(st.leftSide)}>
            <div className={st.gendersLink}>
              <Link
                to={paths.home.women()}
                onClick={() => {
                  onChangeGender(Section.SECTION_FEMALE);
                }}
                className={cn({
                  [st.active]: gender === Section.SECTION_FEMALE,
                })}
              >
                {texts.genderPanel.female}
              </Link>
              <Link
                to={paths.home.men()}
                onClick={() => {
                  onChangeGender(Section.SECTION_MALE);
                }}
                className={cn({
                  [st.active]: gender === Section.SECTION_MALE,
                })}
              >
                {texts.genderPanel.male}
              </Link>
            </div>

            {!disableDynamicTexts && (
              <>
                {titleField.value && titleField.value.type === 'text' && (
                  <div className={st.dynamicTitle}>
                    <p>{titleField.value.rows[0]}</p>
                  </div>
                )}

                {titleField.value && titleField.value.type === 'image' && (
                  <div className={st.dynamicTitle}>
                    <img src={titleField.value.src} loading="lazy" alt="" />
                  </div>
                )}
              </>
            )}
          </div>

          <div className={st.logo}>
            <Link to={homeLink}>
              <Logo />
            </Link>
          </div>

          <div className={st.cartLogo}>
            <BasketIcon />
          </div>

          <div className={st.user} data-test="user">
            <Link to={paths.landings.seller()}>
              <Button className={st.desktop} size="S">
                {texts.profile.sellItem}
              </Button>
            </Link>

            {!isLoginPage && (
              <div className={cn(st.profile, st.desktop)} data-test="profileBlock">
                {!isAuthorized ? (
                  <Button reverse onClick={() => modalField.onChange('any')} size="S">
                    {texts.navBar.login}
                  </Button>
                ) : customer ? (
                  <Space
                    align="center"
                    stretch
                    className={cn(st.username, st.userPopup)}
                    onClick={() => navigate(paths.profile.main())}
                  >
                    <ProfileIcon />

                    {(customer.firstName || customer.lastName) && (
                      <Typography.Paragraph className={st.userName}>
                        {customer.firstName || customer.lastName}
                      </Typography.Paragraph>
                    )}

                    <ProfilePopup className={st.inner} />
                  </Space>
                ) : (
                  <UserPending />
                )}
              </div>
            )}

            <Link to={favoritePath} className={st.desktop} data-test="favoriteCounter">
              {favoriteCounter && <BadgeCounter counter={favoriteCounter} className={cn(st.counter, st.favorite)} />}
              <StarIcon />
            </Link>

            {!isCartPage && (
              <AddedToCartModal>
                <Link to={paths.basket()} className={st.basketLink} data-test="cartCounter">
                  {cartCounter && <BadgeCounter counter={cartCounter} className={st.counter} />}
                  <BasketIcon />
                </Link>
              </AddedToCartModal>
            )}
          </div>

          {!isAuthorized && (
            <div className={st.shortLogin} onClick={() => modalField.onChange('any')} data-test="loginAction">
              {texts.navBar.login}
            </div>
          )}
        </div>

        <div className={st.additional}>
          <nav
            className={cn(st.nav, st.desktop, {
              [st.isStucked]: headerStucked.value,
            })}
          >
            {catalog && <NavBarDesktop catalogs={catalog.catalogs} />}
          </nav>

          <div className={st.search}>
            <Suggests key={pathname} popup={search} className={st.field} device="desktop" />
          </div>
        </div>
      </div>

      <div
        className={st.overlay}
        onClick={() => {
          search.onChange(false);
        }}
      />

      <div className={st.border} />
    </>
  );
};
