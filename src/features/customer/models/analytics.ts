import { createEvent, sample } from 'effector';

import { ContactType } from '@/generated/customer_hub/enums/contact_type';
import { UserResponse } from '@/generated/customer_hub/methods/user/update_user.v1';
import { sendAnalytic } from '@/shared/analytics';

import { $customer } from './customer';

const profileChanged = createEvent<UserResponse>();
const customerOrdersClicked = createEvent<{ place: 'popup' | 'profile' }>();
const customerDataClicked = createEvent<{ place: 'popup' | 'profile' }>();
const customerStuffClicked = createEvent<{ place: 'popup' | 'profile' }>();
const profilePageLoaded = createEvent();

export const cutomerAnalytics = {
  profileChanged,
  customerOrdersClicked,
  customerDataClicked,
  customerStuffClicked,
  profilePageLoaded,
};

sample({
  source: $customer,
  clock: profileChanged,
  fn: (customer, userResponse) => {
    if (customer) {
      return {
        mindboxJSON: [
          {
            operation: 'WebsiteCollect.EditCustomer',
            data: {
              customer: {
                email: userResponse.contacts.find(it => it.type === ContactType.CONTACT_TYPE_EMAIL)?.value ?? '',
                firstName: userResponse.userData?.firstName ?? '',
                ids: {
                  webappId: userResponse.id,
                  tsumcollectId: customer.customerId,
                },
              },
            },
          },
        ],
      };
    }

    return {};
  },
  target: sendAnalytic,
});

sample({
  clock: customerOrdersClicked,
  fn: ({ place }) => ({
    gtm: [
      {
        event: 'OWOX',
        eventCategory: 'Interactions',
        eventAction: 'click',
        eventLabel: 'orders',
        eventLocation: place === 'popup' ? 'profilePopup' : 'profile', // клик из ЛК или попапа ЛК
      },
    ],
  }),
  target: sendAnalytic,
});

sample({
  clock: customerDataClicked,
  fn: ({ place }) => ({
    gtm: [
      {
        event: 'OWOX',
        eventCategory: 'Interactions',
        eventAction: 'click',
        eventLabel: 'personal_data',
        eventLocation: place === 'popup' ? 'profilePopup' : 'profile', // клик из ЛК или попапа ЛК
      },
    ],
  }),
  target: sendAnalytic,
});

sample({
  clock: customerStuffClicked,
  fn: ({ place }) => ({
    gtm: [
      {
        event: 'OWOX',
        eventCategory: 'Interactions',
        eventAction: 'click',
        eventLabel: 'seller',
        eventLocation: place === 'popup' ? 'profilePopup' : 'profile', // клик из ЛК или попапа ЛК
      },
    ],
  }),
  target: sendAnalytic,
});

sample({
  clock: profilePageLoaded,
  fn: () => ({
    gtm: [
      {
        event: 'Spa_pageview',
        pageType: 'Profile',
      },
    ],
  }),
  target: sendAnalytic,
});
