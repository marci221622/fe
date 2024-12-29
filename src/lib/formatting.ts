import { TimeOfDay } from '@/generated/common/timeofday.v1';
import { Brand } from '@/generated/customer_hub/entities/brand.v1';
import { Category } from '@/generated/customer_hub/entities/category.v1';
import { Delivery, DeliveryInterval } from '@/generated/customer_hub/entities/delivery.v1';

import { formatWithRULocale } from './format';
import { capitalizeFirstLetter } from './string';
import { readDateSafely } from './transformers';

export function timeToDate(time?: TimeOfDay) {
  const date = time ? new Date() : null;

  date?.setHours(time?.hours ?? 0);
  date?.setMinutes(time?.minutes ?? 0);

  return date;
}

export function formatInterval({
  start,
  end,
  format,
}: {
  start?: Date | null;
  end?: Date | null;
  format: 'time' | 'fromTo';
}) {
  if (format === 'fromTo') {
    return `c ${start ? formatWithRULocale({ date: +start, template: 'HH:mm' }) : ''} до ${
      end ? formatWithRULocale({ date: +end, template: 'HH:mm' }) : ''
    }`;
  }

  return `${start ? formatWithRULocale({ date: +start, template: 'HH:mm' }) : ''} - ${
    end ? formatWithRULocale({ date: +end, template: 'HH:mm' }) : ''
  }`;
}

export function formatDelivery({
  delivery,
  type,
  interval,
}: {
  delivery: Delivery;
  type: 'dayAndTime' | 'asList';
  interval: DeliveryInterval;
}) {
  const date = readDateSafely(delivery.deliveryDate);

  if (type === 'dayAndTime' && date) {
    return {
      day: capitalizeFirstLetter(formatWithRULocale({ date, template: 'iiiiii' })),
      time: formatWithRULocale({ date, template: 'dd LLL' }),
      interval: formatInterval({
        start: timeToDate(interval?.hours?.start),
        end: timeToDate(interval?.hours?.end),
        format: 'time',
      }),
    };
  }

  if (type === 'asList' && date) {
    return {
      day: capitalizeFirstLetter(formatWithRULocale({ date, template: 'iiiiii' })),
      time: formatWithRULocale({ date, template: 'dd LLL' }),
      interval: formatInterval({
        start: timeToDate(interval?.hours?.start),
        end: timeToDate(interval?.hours?.end),
        format: 'fromTo',
      }),
    };
  }

  return {};
}

export function sortBrandsByAlphabet(x: Brand, y: Brand) {
  if (x.title < y.title) {
    return -1;
  }

  if (x.title > y.title) {
    return 1;
  }

  return 0;
}

export function sorCategoriesByAlphabet(x: Category, y: Category) {
  if (x.title < y.title) {
    return -1;
  }

  if (x.title > y.title) {
    return 1;
  }

  return 0;
}

export function sortCategoriesByPosition(x: Category, y: Category) {
  return +x.position - +y.position;
}
