import { Delivery } from '@/generated/customer_hub/entities/delivery.v1';

import { formatWithRULocale } from '@/lib/format';
import { formatInterval, timeToDate } from '@/lib/formatting';

export function buildReaddableDate({
  deliveries,
  actives,
}: {
  deliveries: Delivery[];
  actives: {
    date: number;
    time: number;
  };
}) {
  // TODO: grpc date ?
  // @ts-ignore
  const date = deliveries[actives.date]?.deliveryDate as string;
  const intervals = deliveries[actives.date]?.deliveryIntervals?.[actives.time];

  if (!date || !intervals?.hours) {
    return '';
  }

  const dateFromDelivery = new Date(date);
  const { start, end } = intervals.hours;
  const interval = formatInterval({ start: timeToDate(start), end: timeToDate(end), format: 'time' });

  // TODO: фикс форматирования по коротким названиям
  return `${formatWithRULocale({ date: dateFromDelivery, template: 'd MMM' }).replace('.', '')}, ${interval}`;
}
