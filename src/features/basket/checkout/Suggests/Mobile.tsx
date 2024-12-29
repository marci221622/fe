import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { useRef } from 'react';

import { $mappedStrings } from '@/shared/configs';
import { ModalSwipeable } from '@/shared/ui';

import { Textarea } from '@/ui/index';

import { LocationIcon } from '@/ui/assets/icons';

import { draftSuggestField, suggestsField, location, suggestOpenedField } from '../models';

import { Suggests } from './Suggests';

import st from './styles.module.scss';

export function MobileSearch({ shouldCloseOnOverlayClick }: { shouldCloseOnOverlayClick?: boolean }) {
  const { i18n } = useLingui();
  const field = useUnit(suggestsField);
  const draftAddress = useUnit(draftSuggestField);
  const suggestOpened = useUnit(suggestOpenedField);
  const detectLocation = useUnit(location.detectLocation);
  const texts = useUnit($mappedStrings);

  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const closeModal = () => {
    suggestOpened.onChange(false);
    field.onChange(draftAddress.value);
  };

  return (
    <ModalSwipeable
      fullScreen
      fullScreenHeight={93}
      onChange={closeModal}
      open={suggestOpened.value}
      header={texts.searchAddress.title}
      bodyClassName={st.mobileSearch}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
    >
      <div>
        <Textarea
          simple
          className={cn(st.area, st.search)}
          stubClassName={cn(st.stub)}
          closable={field.value.length > 0}
          suffix={field.value.length === 0 ? <LocationIcon onClick={detectLocation} /> : null}
          placeholder={texts.searchAddress.input.placeholder}
          value={field.value}
          onChange={e => field.onChange(e.target.value)}
          ref={inputRef}
        />
      </div>
      <Suggests inputRef={inputRef} />
    </ModalSwipeable>
  );
}
