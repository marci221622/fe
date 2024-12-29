import { Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { CallBackProps } from 'react-joyride';
import { Link } from 'react-router-dom';

import { Section } from '@/generated/customer_hub/enums/section';
import { useStickyClassnames } from '@/shared/animations';
import {
  $topBrands,
  $brandsList,
  toggleFavoriteBrands,
  $enrichedFavoriteBrands,
  useInFavoriteBrand,
  favoriteBrandsAnalytics,
} from '@/shared/brands';
import { $mappedStrings } from '@/shared/configs';
import JoyrideComponent, { CustomTooltip } from '@/shared/joyride';
import { useLinkBuilder } from '@/shared/pageRouting';
import { baseSeo } from '@/shared/Seo';
import { $currentGender } from '@/shared/session';
import { GenderActions } from '@/shared/ui';

import { SECTION_TO_STRING } from '@/constants/hardcode';
import { ONBOARDING_BRAND_PAGE } from '@/constants/localStorageKeys';
import { paths } from '@/constants/paths';

import { AlphabetList, BrandsImagesList } from '@/features/brands';

import { useOnboarding, useViewport } from '@/lib/hooks';
import { filtersToAlphabetList, searchByWord, sortAlphabet } from '@/lib/string';

import { Input, Responsive, Typography } from '@/ui/index';

import { SearchIcon, StarIcon } from '@/ui/assets/icons';

import st from './styles.module.scss';

const onboardingBrandId = 'onboardingBrandPage';

export default function BrandsListPage() {
  const { i18n } = useLingui();
  const texts = useUnit($mappedStrings);

  const [search, setSearch] = useState('');
  const gender = useUnit($currentGender);
  const [openedSearch, setOpenedSearch] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const classnames = useStickyClassnames({});
  const sumbolCn = useStickyClassnames({ withBannerCn: st.withBanner, stuckedCn: st.stucked });
  const brandList = useUnit($brandsList);
  const topBrands = useUnit($topBrands);
  const favoriteBrandsByGender = useUnit($enrichedFavoriteBrands);
  const builder = useLinkBuilder();
  const favoriteHandler = useUnit(toggleFavoriteBrands);
  const getInFavorite = useInFavoriteBrand();
  const onboarding = useOnboarding({ key: ONBOARDING_BRAND_PAGE });
  const { isMobile } = useViewport();
  const onOndoarding = useUnit(favoriteBrandsAnalytics.favoriteBrandsOnboardingVisibled);

  const topBrandsExcludedFavorite = topBrands.filter(
    topBrand => !favoriteBrandsByGender.find(brand => brand.code === topBrand.code),
  );
  const alphabetList = useMemo(
    () =>
      brandList
        ? filtersToAlphabetList(
            searchByWord({
              list: brandList
                ?.filter(it => it.sections.includes(SECTION_TO_STRING[gender]))
                ?.map(it => ({ ...it, label: it.title })),
              textExtractor: brand => brand.title,
              search,
            }),
          )
        : {},
    [brandList, gender, search],
  );

  const alphabetGroup = useMemo(() => Object.keys(alphabetList).sort(sortAlphabet), [alphabetList]);
  const displayOnboarding = favoriteBrandsByGender.length > 0 && !!texts.brandTab.favoriteBrands.onboarding.description;

  const steps = [
    {
      target: `#${onboardingBrandId}`,
      content: texts.brandTab.favoriteBrands.onboarding.description,
      tooltipComponent: CustomTooltip,
      disableBeacon: true,
    },
  ];

  const joyrideCallback = (data: CallBackProps) => {
    if (data.action === 'close') onboarding.closePopup();
  };

  useEffect(() => {
    if (openedSearch) {
      searchInputRef.current?.focus();
    }
  }, [openedSearch]);

  useEffect(() => {
    if (displayOnboarding && onboarding.popup.isOpen) {
      const ids = favoriteBrandsByGender.map(brand => brand.id);

      onOndoarding({ ids });
    }
  }, [favoriteBrandsByGender, displayOnboarding, onOndoarding, onboarding.popup.isOpen]);

  return (
    <section className={st.BrandPageWrapper}>
      <baseSeo.Seo />
      <GenderActions
        value={search}
        onChange={e => setSearch(e.target.value)}
        className={st.tablet}
        withNavigate
        placeholder={texts.favorite.favoriteBrands.editor.searchBar.placeholder}
        to={gender => (gender === Section.SECTION_FEMALE ? `/women${paths.brandsList()}` : `/men${paths.brandsList()}`)}
      />

      {isMobile && displayOnboarding && (
        <JoyrideComponent callback={joyrideCallback} steps={steps} run={onboarding.popup.isOpen} />
      )}

      <div id={onboardingBrandId}>
        {!!favoriteBrandsByGender?.length && search.length < 1 && (
          <BrandsImagesList
            title={texts.brandsTab.favoriteBrands}
            brands={favoriteBrandsByGender}
            onboarding={onboarding}
          />
        )}
      </div>

      {!!topBrandsExcludedFavorite?.length && search.length < 1 && (
        <BrandsImagesList title={texts.brandsTab.topBrands} brands={topBrandsExcludedFavorite} />
      )}

      {search.length < 1 && (
        <p className={cn(st.title)} data-title>
          {texts.favorite.favoriteBrands.editor.title}
        </p>
      )}

      {search.length < 1 && (
        <Responsive.TabletAndBelow>
          <AlphabetList alphabetGroup={alphabetGroup} />
        </Responsive.TabletAndBelow>
      )}

      <Responsive.Desktop className={cn(st.alphabetWrapper, classnames)}>
        <Input
          ref={searchInputRef}
          value={search}
          onChange={e => setSearch(e.target.value)}
          closable={openedSearch}
          onCloseClick={() => setOpenedSearch(false)}
          Prefix={<SearchIcon onClick={() => setOpenedSearch(true)} />}
          className={cn(st.searchAlphabet, {
            [st.openedSearch]: openedSearch,
          })}
        />
        <AlphabetList alphabetGroup={alphabetGroup} />
      </Responsive.Desktop>

      {alphabetGroup.length > 0 ? (
        <ul className={st.brandsContainer}>
          {alphabetGroup.map(brandSymbol => {
            const list = alphabetList[brandSymbol];

            if (list.length === 0) return null;

            return (
              <li id={`brand-${brandSymbol}`} key={brandSymbol}>
                <b className={cn(st.symbol, sumbolCn)}>{brandSymbol}</b>

                <ul className={st.groupWrapper}>
                  {list.map(brand => {
                    const isActive = getInFavorite(brand.code);

                    return (
                      <li key={brand.code}>
                        <Link
                          to={builder(
                            paths.catalog.withSlug.brand({
                              slug: brand.slug,
                            }),
                          )}
                          className={st.row}
                        >
                          <Typography.Paragraph className={st.brandName}>{brand.title}</Typography.Paragraph>
                          <StarIcon
                            active={isActive}
                            onClick={e => {
                              e.preventDefault();
                              favoriteHandler({
                                brandCode: brand.code,
                                isActive,
                                section: gender,
                                brandId: brand.id,
                                brandName: brand.title,
                              });
                            }}
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      ) : (
        <Typography.Paragraph center className={st.emptyText}>
          <Trans>
            {texts.web.search.noResult}
            {texts.web.search.brandSearchNoResult}
          </Trans>
        </Typography.Paragraph>
      )}
    </section>
  );
}
