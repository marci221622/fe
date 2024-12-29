import cn from 'classnames';
import { useUnit } from 'effector-react';
import { Link } from 'react-router-dom';

import { Brand } from '@/generated/customer_hub/entities/brand.v1';
import { $mappedStrings } from '@/shared/configs';
import { useLinkBuilder } from '@/shared/pageRouting';

import { paths } from '@/constants/paths';

import { sortBrandsByAlphabet } from '@/lib/formatting';
import { useOnboarding, useViewport } from '@/lib/hooks';

import { Typography } from '@/ui/index';

import { ECloseIconPositions, FavoriteOnboarding, OnboardingContent } from '../Onboarding';

import st from './styles.module.scss';

type Props = {
  brands: Brand[];
  title: string;
  onboarding?: ReturnType<typeof useOnboarding>;
};

export function BrandsImagesList({ brands, title, onboarding }: Props) {
  const texts = useUnit($mappedStrings);
  const builder = useLinkBuilder();
  const { isDesktop } = useViewport();

  const displayOnboarding = brands.length > 0 && texts.brandTab.favoriteBrands.onboarding.description;

  return (
    <>
      {onboarding && displayOnboarding && isDesktop ? (
        <FavoriteOnboarding
          padding={25}
          isOpen={onboarding.popup.isOpen}
          positions={['right']}
          closePopup={onboarding.closePopup}
          icon={
            <p className={cn(st.title)} data-title>
              {title}
            </p>
          }
        >
          <OnboardingContent
            closePopup={onboarding.closePopup}
            text={texts.brandTab.favoriteBrands.onboarding.description}
            closeIconPosition={ECloseIconPositions.RIGHT}
          />
        </FavoriteOnboarding>
      ) : (
        <p className={cn(st.title)} data-title>
          {title}
        </p>
      )}
      <ul className={st.brands}>
        {brands.sort(sortBrandsByAlphabet).map(it => (
          <li key={it.code}>
            <Link
              to={builder(
                paths.catalog.withSlug.brand({
                  slug: it.slug,
                }),
              )}
            >
              {it.logoLink ? (
                <img src={it.logoLink?.src} alt="" />
              ) : (
                <Typography.Paragraph className={st.brandTitle}>{it.title}</Typography.Paragraph>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
