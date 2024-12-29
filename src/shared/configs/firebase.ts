import { combine, sample } from 'effector';

import { createQuery, FxParams } from '@/lib/createQuery';
import { createFx } from '@/lib/services';

import { appStartedOnClient } from '../start';

export type FooterLinks = {
  enabled: boolean;
  links: {
    link: string;
    target: string;
    title: string;
  }[];
};

type Orders = {
  cells: {
    id: number;
    name: string;
    position: number;
  }[];
};

export const configsQuery = createQuery({
  initialData: {},
  effect: createFx(async (_: FxParams<void>, { firebase }) => {
    if (!firebase) {
      throw new Error('[services]: firebase not exists');
    }

    return firebase.fetchConfig();
  }),
});

export const $options = configsQuery.$result.map(it => {
  const values = JSON.parse(it?.options?.asString() ?? '{}');

  return values;
});

export const $optionsList = configsQuery.$result.map(it => {
  const values = JSON.parse(it?.options_lists?.asString() ?? '{}');

  return values;
});

export const $strings = configsQuery.$result.map(it => {
  const values = JSON.parse(it?.strings?.asString() ?? '{}');

  return values as Record<string, string | void>;
});

export const $productInfo = configsQuery.$result.map(it => {
  const values = JSON.parse(it?.strings?.asString() ?? '{}');
  const htmlRgxp = /<[^>]>(.*)<[^>]*>/gi;

  return {
    returns: (values['itemDetails.infoBlock.return.available.description'] ?? '') as string,
    privateReturns: (values['itemDetails.infoBlock.return.unavailable.description'] ?? '') as string,
    watchesReturns: (values['itemDetails.infoBlock.returnWatch.available.description'] ?? '') as string,
    privateWatchesReturns: (values['itemDetails.infoBlock.returnWatch.unavailable.description'] ?? '') as string,
    delivery: (values['itemDetails.infoBlock.delivery.description'] ?? '') as string,
    garantie: (values['advantages.item1.description'] ?? '').replaceAll(htmlRgxp, '') as string,
    garantieTitle: (values['advantages.item1.title'] ?? '') as string,
  } as Record<string, string>;
});
export const $quickBySettings = $options.map(values => ({
  enabled: {
    onFullApp: (values?.oneClickPurchase?.enabled ?? false) as boolean,
    onShortApp: (values?.oneClickPurchaseShort?.enabled ?? false) as boolean,
  },
}));

export const $stateConditionalList = $strings.map(values => {
  return [
    {
      title: 'Новое',
      list: Array.from({ length: 3 })
        .map((_, idx) => values[`itemDetails.condition.newInfo${idx + 1}`])
        .filter(Boolean) as string[],
    },
    {
      title: 'Отличное',
      list: Array.from({ length: 5 })
        .map((_, idx) => values[`itemDetails.condition.excellentInfo${idx + 1}`])
        .filter(Boolean) as string[],
    },
    {
      title: 'Хорошее',
      list: Array.from({ length: 5 })
        .map((_, idx) => values[`itemDetails.condition.goodInfo${idx + 1}`])
        .filter(Boolean) as string[],
    },
  ];
});

export const $labels = $options.map(it => {
  return (it?.labels ?? []) as { id: number; text: string }[];
});

export const $stickyBannerSettings = $options.map(it => ({
  enabled: (it?.stickyNotices?.enabled ?? false) as boolean,
  notices: (it?.stickyNotices?.notices ?? []) as {
    closeForPeriodInHours: number;
    description: string;
    id: string;
    screenCodes: string[];
  }[],
}));

export const $sellItemsRequestEnabled = $options.map(it => (it?.sellItemsRequestWeb?.enabled ?? false) as boolean);

export const $promocodeSettings = $options.map(
  it =>
    (it?.cartPromocode ?? {
      disclaimer: '',
      enabled: false,
    }) as {
      disclaimer: string;
      enabled: boolean;
    },
);

const TOTAL_MODAL_DESCRIPTION_ITEMS = 5;

const getModalDescriptionItems = (values: Record<string, string | void> | undefined, type: 'delivery' | 'return') =>
  Array.from({ length: TOTAL_MODAL_DESCRIPTION_ITEMS })
    .map((_, idx) => ({
      icon: values?.[`orderHelp.${type}.icon${idx + 1}`] || '',
      text: values?.[`orderHelp.${type}.line${idx + 1}`] || '',
    }))
    .filter(it => !!it.text);

export const $ongoingModal = $strings.map(values => {
  const returnScheme = getModalDescriptionItems(values, 'return');

  const scheme = {
    delivery: getModalDescriptionItems(values, 'delivery'),
    payment: values?.['orderHelp.payment']?.split('\n').filter(Boolean) as string[],
    returns: returnScheme,
    privateReturns: returnScheme,
    watchesReturns: returnScheme,
    privateWatchesReturns: returnScheme,
  };

  return scheme;
});

/**
 * Информация на экране заказа
 * В личном кабинете для клик колекта
 */
export const $showroomAdditional = $strings.map(values => {
  const imagesCount = 10;

  return {
    images: Array.from({ length: imagesCount - 1 })
      .map((_, id) => values[`aboutShowroom.link${id + 1}`] as string)
      .filter(Boolean),
  };
});
export const $mainScreenCellsOptions = $options.map(values => {
  return ((values?.mainScreenCellsOptions ?? { cells: [] }) as Orders).cells.reduce((acc, item) => {
    return {
      ...acc,
      [item.name]: item,
    };
  }, {} as Record<string, Orders['cells'][0]>);
});

export const $footerAdditionalLinks = $optionsList.map(it => {
  const seller = (it.footerSellerLinks ?? { enabled: false, links: [] }) as FooterLinks;
  const customer = (it.footerCustomerLinks ?? { enabled: false, links: [] }) as FooterLinks;

  return {
    seller,
    customer,
  };
});

export const $filtersTopBrands = $options.map(options => {
  const topBrands = (options.filterTopBrands ?? []) as {
    categories3: string[];
    brands: { brandCode: string; filterCode: string }[];
  }[];

  const mappedBrands = topBrands.reduce(
    (acc, item) => ({
      ...acc,
      ...item.categories3.reduce((catAcc, cat) => ({ ...catAcc, [cat]: item.brands }), {}),
    }),
    {} as Record<string, { filterCode: string; brandCode: string }[]>,
  );

  return mappedBrands;
});

export const $favoriteBrandsSettins = $options.map(options => {
  const fb = (options.favoriteBrands ?? { enabled: true, onboardingLineCount: 3, onboardingInFiltersShowCount: 1 }) as {
    enabled: boolean;
    onboardingLineCount: number;
    onboardingInFiltersShowCount: number;
  };

  return fb;
});

// [viewedItems, favoriteBrandsNoveltyItems]
export const $profilePageWidgetsOptions = combine({ options: $options, string: $strings }).map(
  ({ options, string }) => {
    return {
      novetlyFavoriteBrandsTitle: (string['favoriteBrandsNoveltyItems.profile.title'] ?? '') as string,
      orders: ((options?.profileScreenCellsOptions ?? { cells: [] }) as Orders).cells.reduce((acc, item) => {
        return {
          ...acc,
          [item.name]: item,
        };
      }, {} as Record<string, Orders['cells'][0]>),
    };
  },
);

export const $advantagesDataList = $strings.map(values => {
  return Array.from({ length: 4 })
    .map((_, i) => ({
      label: (values[`advantages.item${i + 1}.title`] ?? '') as string,
      subtitle: (values[`advantages.item${i + 1}.description`] ?? '') as string,
      icon: (values[`advantages.item${i + 1}.icon`] ?? '') as string,
    }))
    .filter(it => !!it.label);
});

sample({
  clock: appStartedOnClient,
  fn: () => ({}),
  target: configsQuery.start,
});
