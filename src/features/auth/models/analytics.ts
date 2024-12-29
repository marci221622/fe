import { createEvent, sample } from 'effector';

import { ContactType } from '@/generated/customer_hub/enums/contact_type';
import { TokenResponse } from '@/generated/customer_hub/methods/auth/auth_by_code.v1';
import { DYEvent, sendAnalytic } from '@/shared/analytics';

import { fingerprintCookieName } from '@/constants/cookies';

import { $baseServices } from '@/lib/services';

type AuthPlace = 'any' | 'favorites' | 'brands' | null;

const logged = createEvent<{ place: AuthPlace; data: TokenResponse }>();
const loginPopupOpened = createEvent<void>();
const confirmPhone = createEvent<{ place: AuthPlace }>();
const coeResended = createEvent<{ place: AuthPlace }>();
const logouted = createEvent<string>();

export const authAnalytics = {
  logged,
  loginPopupOpened,
  confirmPhone,
  coeResended,
  logouted,
};

sample({
  source: $baseServices,
  clock: logged,
  fn: (services, { data: { isNewUser, customerProfile } }) => {
    const fingerprint = services?.cookies?.get(fingerprintCookieName);
    const mail = customerProfile?.contacts?.find(contact => contact.type === ContactType.CONTACT_TYPE_EMAIL);

    return {
      dy: {
        type: 'event',
        payload: {
          name: isNewUser ? 'Signup' : 'Login',
          properties: {
            eventType: isNewUser ? 'signup-v1' : 'loginh-v1',
            cuidType: 'fingerprint',
            cuid: fingerprint,
          },
        },
      } as DYEvent,

      gtm: [
        {
          event: 'OWOX',
          eventCategory: 'Interactions',
          eventAction: 'click',
          eventLabel: 'loginSuccessful',
          userAuth: '1', // признак авторизации пользователя
          userId: customerProfile?.userId, // Id пользователя в БД сайта
        },
      ],

      mindbox: [
        {
          operation: isNewUser ? 'WebsiteCollect.RegisterCustomer' : 'WebsiteCollect.AuthorizeCustomer',
          data: {
            customer: {
              ...(isNewUser ? { firstName: customerProfile?.firstName } : {}),
              email: mail,
              ids: {
                webappId: customerProfile?.userId,
                tsumcollectId: customerProfile?.customerId,
              },
            },
          },
        },
      ],
    };
  },
  target: sendAnalytic,
});

sample({
  clock: loginPopupOpened,
  fn: () => ({
    gtm: [
      {
        event: 'OWOX',
        eventCategory: 'Interactions',
        eventAction: 'click',
        eventLabel: 'login',
        eventLocation: 'userAuthPopup', // попап с формой входа
      },
    ],
  }),
  target: sendAnalytic,
});

sample({
  clock: confirmPhone,
  fn: ({ place }) => ({
    gtm: [
      {
        event: 'OWOX',
        eventCategory: 'Interactions',
        eventAction: 'click',
        eventLabel: 'mob_phone_confirm',
        eventLocation: place ? 'userAuthPopup' : 'userAuthPage', // клик в попапе или на странице входа
      },
    ],
  }),
  target: sendAnalytic,
});

sample({
  clock: coeResended,
  fn: ({ place }) => ({
    gtm: [
      {
        event: 'OWOX',
        eventCategory: 'Interactions',
        eventAction: 'click',
        eventLabel: 'new_confirm_code',
        eventLocation: place ? 'userAuthPopup' : 'userAuthPage', // клик в попапе или на странице входа
      },
    ],
  }),
  target: sendAnalytic,
});

sample({
  clock: logouted,
  fn: userId => ({
    gtm: [
      {
        event: 'OWOX',
        eventCategory: 'Interactions',
        eventAction: 'click',
        eventLabel: 'logout',
        eventLocation: 'profile', // клик на выход на странице ЛК или в попапе
        userId, // Id пользователя в БД сайта
      },
    ],
  }),
  target: sendAnalytic,
});
