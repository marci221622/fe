import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { Fragment } from 'react';

import { Item } from '@/generated/customer_hub/entities/item.v1';
import { $appIsShort, $mappedStrings } from '@/shared/configs';

import { usePopupState } from '@/lib/hooks';

import { StateConditionModal } from '../../StateConditionModal';
import { useWatches } from '../useWatches';

import { createFromScheme } from './transformers';

import st from './styles.module.scss';

type Props = {
  product: Item;
  short?: boolean;
  className?: string;
  title?: string;
  additionalItems?: { title: string; content: React.JSX.Element | null }[];
};

export function BaseInfoList({ product, short, className, title, additionalItems = [] }: Props) {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();
  const popup = usePopupState();
  const appIsShort = useUnit($appIsShort);
  const watches = useWatches(product);

  const scheme = createFromScheme(product, { shortVariant: short, appIsShort });
  const listFromScheme = watches.isClock && !short ? scheme.slice(0, -1) : scheme;

  return (
    <ul
      className={cn(st.list, className, {
        [st.appIsShort]: appIsShort,
      })}
    >
      <StateConditionModal popup={popup} key="modal" />

      {title && (
        <li key="title" className={st.title}>
          {title}
        </li>
      )}

      {listFromScheme.map(it => (
        <li key={i18n._(it.title)}>
          <span>{i18n._(it.title)}</span>
          <span>
            {it.children}
            {it.isConditionalState ? (
              <>
                {' '}
                <span className={st.moreInfo} onClick={popup.openPopup}>
                  {texts.itemDetails.infoBlock.condition.linkTitle}
                </span>
              </>
            ) : null}
          </span>
        </li>
      ))}

      {!short &&
        watches.groups.map(group => {
          if (group.attributesValues[0].isHidden) {
            return null;
          }

          if (group.attributesValues.length === 1) {
            const attributeValues = group.attributesValues[0];

            return (
              <li key={attributeValues.code}>
                <span>{attributeValues.title}</span>
                <span>{attributeValues.values.map(value => value.value).join(', ')}</span>
              </li>
            );
          }

          return (
            <li key={group.title}>
              <span>{group.title}</span>
              <span>
                {group.attributesValues.map(attr => {
                  return (
                    <Fragment key={attr.code}>
                      {attr.title} - {attr.values.map(it => it.value).join(', ')}
                      <br />
                    </Fragment>
                  );
                })}
              </span>
            </li>
          );
        })}

      {watches.isClock && !short && (
        <li>
          <span>{i18n._(scheme[scheme.length - 1].title)}</span>
          <span>{scheme[scheme.length - 1].children}</span>
        </li>
      )}

      {additionalItems.map(item => (
        <li key={item.title}>
          <span>{item.title}</span>
          <span>{item.content}</span>
        </li>
      ))}
    </ul>
  );
}
