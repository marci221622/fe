import { createEvent, sample } from 'effector';

import { Section } from '@/generated/customer_hub/enums/section';
import { sendAnalytic } from '@/shared/analytics';
import { $currentGender } from '@/shared/session';

const addBrandToFavoriteList = createEvent<{ brandId: string; brandName: string; brandCode: string }>();
const removeBrandFromFavoriteList = createEvent<{ brandId: string; brandName: string; brandCode: string }>();

const favoriteBrandsOnboardingVisibled = createEvent<{ ids: string[] }>();

export const favoriteBrandsAnalytics = {
  addBrandToFavoriteList,
  removeBrandFromFavoriteList,
  favoriteBrandsOnboardingVisibled,
};

sample({
  source: $currentGender,
  clock: favoriteBrandsOnboardingVisibled,
  fn: (gender, { ids }) => ({
    mindbox: [
      {
        operation: 'WebsiteCollect.SetFavoriteBrands',
        data: {
          productList: ids.map(id => ({
            product: {
              ids: {
                website: gender === Section.SECTION_FEMALE ? `women_${id}` : `men_${id}`,
              },
            },
          })),
        },
      },
    ],
  }),
  target: sendAnalytic,
});

sample({
  source: $currentGender,
  clock: addBrandToFavoriteList,
  fn: (gender, { brandCode, brandName, brandId }) => ({
    mindbox: [
      {
        operation: 'WebsiteCollect.AddToFavoriteBrands',
        data: {
          addProductToList: {
            product: {
              ids: {
                website: gender === Section.SECTION_FEMALE ? `women_${brandCode}` : `men_${brandCode}`,
              },
            },
          },
        },
      },
    ],
    gtm: [
      {
        event: 'OWOX',
        eventCategory: 'Interactions',
        eventAction: 'click',
        eventLabel: 'brandAddedToWishList',
        eventContent: brandId, // ID Бренда, который был добавлен
        eventContext: brandName, // название бренда, который был добавлен
        eventLocation: gender === Section.SECTION_MALE ? 'man' : 'woman', // корневая категория по которой было добавление
      },
    ],
  }),
  target: sendAnalytic,
});

sample({
  source: $currentGender,
  clock: removeBrandFromFavoriteList,
  fn: (gender, { brandId, brandName, brandCode }) => ({
    mindbox: [
      {
        operation: 'WebsiteCollect.RemoveFromFavoriteBrands',
        data: {
          addProductToList: {
            product: {
              ids: {
                website: gender === Section.SECTION_FEMALE ? `women_${brandCode}` : `men_${brandCode}`,
              },
            },
          },
        },
      },
    ],
    gtm: [
      {
        event: 'OWOX',
        eventCategory: 'Interactions',
        eventAction: 'click',
        eventLabel: 'brandRemovedFromWishList',
        eventContent: brandId, // ID Бренда, который был добавлен
        eventContext: brandName, // название бренда, который был добавлен
        eventLocation: gender === Section.SECTION_MALE ? 'man' : 'woman', // корневая категория по которой было добавление
      },
    ],
  }),
  target: sendAnalytic,
});
