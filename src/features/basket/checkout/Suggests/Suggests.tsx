import cn from 'classnames';
import { useUnit } from 'effector-react';
import { MutableRefObject, useCallback, useRef } from 'react';
import reactStringReplace from 'react-string-replace';

import { useKeyboardListIndex, useListScrollByIndex } from '@/lib/hooks';

import { addressSelected, isValidAddress, suggestOpenedField, suggestsField, suggestsQuery } from '../models';
import { getAddressFromAddressData } from '../transformers';

import st from './styles.module.scss';

export function Suggests({ inputRef }: { inputRef: MutableRefObject<HTMLElement | null> }) {
  const { result } = useUnit(suggestsQuery);
  const suggestOpened = useUnit(suggestOpenedField);
  const onAddressSelected = useUnit(addressSelected);
  const field = useUnit(suggestsField);

  const listRef = useRef<HTMLUListElement | null>(null);

  const onSelectAddressByIndex = useCallback(
    (index: number) => {
      const addressData = result?.[index];

      if (!addressData) {
        return;
      }

      const address = { id: 'test', data: addressData }; // TODO: better id

      if (isValidAddress(address)) {
        suggestOpened.onChange(false);
      }

      onAddressSelected(address);
    },
    [onAddressSelected, result, suggestOpened],
  );

  const { selectedIndex } = useKeyboardListIndex({
    onSelect: onSelectAddressByIndex,
    maxLength: result?.length || 0,
    inputRef,
  });

  useListScrollByIndex({
    listRef,
    selectedIndex,
  });

  if (result) {
    return (
      <ul ref={listRef} className={st.suggests} data-scroll="allow">
        {result.map((it, index) => {
          const description = getAddressFromAddressData(it);

          return (
            <li
              className={cn({
                [st.selected]: index === selectedIndex,
              })}
              key={`${it.latitude}/${it.longitude}_${description}`}
              role="presentation"
              onClick={() => onSelectAddressByIndex(index)}
            >
              <span>
                {reactStringReplace(description, field.value.trim(), (msg, key) => (
                  <b key={key}>{msg}</b>
                ))}
              </span>
            </li>
          );
        })}
      </ul>
    );
  }

  return null;
}
