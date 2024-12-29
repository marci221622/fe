import cn from 'classnames';
import { useUnit } from 'effector-react';

import { Brand } from '@/generated/customer_hub/entities/brand.v1';
import { toggleFavoriteBrands, useInFavoriteBrand } from '@/shared/brands';
import { $mappedStrings } from '@/shared/configs';
import { $currentGender } from '@/shared/session';

import { ONBOARDING_CATALOG_PAGE } from '@/constants/localStorageKeys';

import { FavoriteOnboarding, OnboardingContent } from '@/features/brands';

import { useOnboarding } from '@/lib/hooks';

import { StarIcon } from '@/ui/assets/icons';

import st from './styles.module.scss';

type Props = {
  brand: Brand;
};

export function FavoriteStar({ brand }: Props) {
  const texts = useUnit($mappedStrings);
  const gender = useUnit($currentGender);
  const getInFavorite = useInFavoriteBrand();
  const onboarding = useOnboarding({ key: ONBOARDING_CATALOG_PAGE });
  const toggle = useUnit(toggleFavoriteBrands);

  const inFavorite = getInFavorite(brand.code);

  const onFavoriteToggle = () => {
    if (onboarding.popup.isOpen) {
      onboarding.closePopup();
    }

    toggle({ brandCode: brand.code, section: gender, isActive: inFavorite, brandName: brand.title, brandId: brand.id });
  };

  return (
    <>
      <StarIcon className={cn(st.favoriteBrandStar, st.stub)} active={inFavorite} onClick={onFavoriteToggle} />
      <FavoriteOnboarding
        isOpen={onboarding.popup.isOpen && !!texts.itemsList.favoriteBrand.onboarding.description}
        closePopup={onboarding.closePopup}
        icon={
          <div
            className={cn(st.startIconWrapper, {
              [st.opened]: onboarding.popup.isOpen,
            })}
          >
            <StarIcon className={st.favoriteBrandStar} active={inFavorite} onClick={onFavoriteToggle} />
          </div>
        }
      >
        <OnboardingContent
          closePopup={onboarding.closePopup}
          text={texts.itemsList.favoriteBrand.onboarding.description}
          title={texts.itemsList.favoriteBrand.onboarding.title}
        />
      </FavoriteOnboarding>
    </>
  );
}
