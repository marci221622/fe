import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';

import { $mappedStrings } from '@/shared/configs';

import { formatWithRULocale } from '@/lib/format';
import { formatInterval, timeToDate } from '@/lib/formatting';
import { usePopupState } from '@/lib/hooks';
import { capitalizeFirstLetter } from '@/lib/string';
import { readDateSafely } from '@/lib/transformers';

import { Button, Input, Space } from '@/ui/index';

import { Chevron } from '@/ui/assets/icons';

import { Popup } from '../../Popup';
import { $grouppedDeliveries, activeIntervalField } from '../models';
import { selectAvailableDelivery } from '../transformers';

import { buildReaddableDate } from './lib';

import st from './styles.module.scss';

type Props = {
  device: Device;
  deliveriesClassname?: string;
  className?: string;
};

export function Delivery({ device, deliveriesClassname, className }: Props) {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();
  const { groups: deliveries } = useUnit($grouppedDeliveries);
  const actives = useUnit(activeIntervalField);
  const popup = usePopupState(false);

  const availabledDeliveries = selectAvailableDelivery(deliveries[0] ?? []);

  const readdableDate = buildReaddableDate({ deliveries: availabledDeliveries, actives: actives.value });

  const hasDeliveries = availabledDeliveries.length > 0;

  const onDeliveryOpen = () => {
    if (hasDeliveries) {
      popup.togglePopup();
    }
  };

  const content = (type: string) => (
    <Space direction="vertical" className={cn(st.deliviries, deliveriesClassname, st[device])} stretch>
      <ul
        className={cn(st.dates, {
          [st.hasDates]: availabledDeliveries.length > 0,
        })}
        data-scroll="allow"
      >
        {availabledDeliveries.map((it, index) => {
          const date = readDateSafely(it.deliveryDate);

          if (!date) {
            return null;
          }

          return (
            <li
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              role="presentation"
              onClick={() => {
                actives.onChange({ time: 0, date: index, type, isDate: true });
              }}
              className={cn({
                [st.active]: actives.value.date === index,
              })}
            >
              <b>{capitalizeFirstLetter(formatWithRULocale({ date, template: 'iiiiii' }))}</b>
              {/* // TODO: фикс форматирования по коротким названиям */}
              <span>{formatWithRULocale({ date, template: 'd MMM' }).replace('.', '')}</span>
            </li>
          );
        })}
      </ul>

      <ul
        className={cn(st.dates, {
          [st.hasDates]: availabledDeliveries[actives.value.date]?.deliveryIntervals?.length > 1,
        })}
        data-scroll="allow"
      >
        {availabledDeliveries[actives.value.date]?.deliveryIntervals?.map((interval, index) => {
          return (
            <li
              key={interval.code}
              role="presentation"
              className={cn({
                [st.active]: actives.value.time === index,
              })}
              onClick={() => {
                actives.onChange({ ...actives.value, time: index, type, isDate: false });
              }}
            >
              {formatInterval({
                start: timeToDate(interval?.hours?.start),
                end: timeToDate(interval?.hours?.end),
                format: 'time',
              })}
            </li>
          );
        })}
      </ul>

      {type === 'dropdown' && (
        <Button stretch onClick={popup.closePopup} size="L">
          {texts.web.choose}
        </Button>
      )}
    </Space>
  );

  return (
    <div
      className={cn(st.wrapper, className, {
        [st.active]: popup.isOpen,
        [st.hasDates]: true,
      })}
    >
      {device === 'desktop' ? (
        <Popup
          hasContent
          tag={
            <Input
              disabled={!hasDeliveries}
              withShadow
              value={readdableDate}
              placeholder={texts.web.placeholders.enterDate}
              suffix={<Chevron onClick={onDeliveryOpen} direction="bottom" />}
              onStubClick={onDeliveryOpen}
              showStab={!popup.isOpen}
            />
          }
          opened={popup.isOpen && deliveries.length > 0}
          closePopup={popup.closePopup}
        >
          {content('dropdown')}
        </Popup>
      ) : (
        content('button')
      )}
    </div>
  );
}
