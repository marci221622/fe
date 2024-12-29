import cn from 'classnames';
import { useUnit } from 'effector-react';
import { CallBackProps } from 'react-joyride';

import { Brand } from '@/generated/customer_hub/entities/brand.v1';
import { toggleFavoriteBrands, useInFavoriteBrand } from '@/shared/brands';
import { $mappedStrings } from '@/shared/configs';
import JoyrideComponent from '@/shared/joyride';
import { $currentGender } from '@/shared/session';

import { ONBOARDING_CATALOG_PAGE } from '@/constants/localStorageKeys';

import { ECloseIconPositions } from '@/features/brands';

import { useOnboarding } from '@/lib/hooks';

import { StarIcon } from '@/ui/assets/icons';

import st from './styles.module.scss';

const onBoardingId = 'onboardingStar';

type Props = {
  brand: Brand;
};

const styles = {
  spotlight: {
    borderRadius: '50%',
  },
};

export function FavoriteStarMobile({ brand }: Props) {
  const texts = useUnit($mappedStrings);
  const gender = useUnit($currentGender);
  const getInFavorite = useInFavoriteBrand();
  const onboarding = useOnboarding({ key: ONBOARDING_CATALOG_PAGE });
  const toggle = useUnit(toggleFavoriteBrands);

  const displayOnboarding =
    !!texts.itemsList.favoriteBrand.onboarding.title && !!texts.itemsList.favoriteBrand.onboarding.description;
  const steps = [
    {
      target: `#${onBoardingId}`,
      title: texts.itemsList.favoriteBrand.onboarding.title,
      content: texts.itemsList.favoriteBrand.onboarding.description,
      disableBeacon: true,
      spotlightClicks: true,
    },
  ];
  const inFavorite = getInFavorite(brand.code);

  const onFavoriteToggle = () => {
    if (onboarding.popup.isOpen) {
      onboarding.closePopup();
    }

    toggle({ brandCode: brand.code, section: gender, isActive: inFavorite, brandName: brand.title, brandId: brand.id });
  };

  const joyrideCallback = (data: CallBackProps) => {
    if (data.action === 'close') onboarding.closePopup();
  };

  return (
    <>
      <StarIcon
        id={onBoardingId}
        className={cn(st.favoriteBrandStar, st.stub)}
        active={inFavorite}
        onClick={onFavoriteToggle}
      />
      {displayOnboarding && (
        <JoyrideComponent
          callback={joyrideCallback}
          styles={styles}
          steps={steps}
          run={onboarding.popup.isOpen}
          iconPosition={ECloseIconPositions.TOP}
        />
      )}
    </>
  );
}
