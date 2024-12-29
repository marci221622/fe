// eslint-disable-next-line import/no-duplicates
import { format, intervalToDuration } from 'date-fns';
// eslint-disable-next-line import/no-duplicates
import { ru } from 'date-fns/locale';

type Props = {
  date: number | Date,
  template: string
}

export function formatWithRULocale({ date, template = 'd MMMM' }: Props): string {
  return format(date, template, { locale: ru });
}

export function createDuraction(seconds: number) {
  return intervalToDuration({ start: 0, end: seconds * 1000, })
}
