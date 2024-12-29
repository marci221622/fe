import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { useEffect, useRef } from 'react';

import { $mappedStrings } from '@/shared/configs';

import { Responsive, Spinner, Textarea } from '@/ui/index';

import { LocationIcon, LocationPoint } from '@/ui/assets/icons';

import { Popup } from '../../Popup';
import { suggestsField, suggestsQuery, draftSuggestField, location, suggestOpenedField } from '../models';

import { MobileSearch } from './Mobile';
import { Suggests } from './Suggests';

import st from './styles.module.scss';

type Props = {
  device: Device;
};

export function AddressStub({ device }: Props) {
  const { i18n } = useLingui();
  const field = useUnit(suggestsField);
  const texts = useUnit($mappedStrings);

  const isMobile = device === 'mobile';

  return (
    <Textarea
      oneLine
      showStab
      withShadow
      simple={isMobile}
      className={cn(st.area)}
      stubClassName={st.stub}
      placeholder={texts.searchAddress.input.placeholder}
      value={field.value}
      onChange={e => {
        field.onChange(e.target.value);
      }}
      Prefix={isMobile ? <LocationPoint /> : null}
    />
  );
}

export function AddressSuggests({
  device,
  isRelativePosition,
  shouldCloseOnOverlayClick,
}: Props & { isRelativePosition?: boolean; shouldCloseOnOverlayClick?: boolean }) {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();
  const ref = useRef(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const field = useUnit(suggestsField);
  const locationUnit = useUnit(location);
  const draftAddress = useUnit(draftSuggestField);
  const { reset, result } = useUnit(suggestsQuery);
  const suggestOpened = useUnit(suggestOpenedField);

  const isMobile = device === 'mobile';

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  useEffect(() => {
    if (suggestOpened.value && inputRef.current && !isMobile) {
      inputRef.current?.focus();
      inputRef.current.selectionStart = inputRef.current.value.length;
      inputRef.current.scrollTop = inputRef.current.scrollHeight;
    }
  }, [suggestOpened.value, isMobile]);

  const input = (
    <Textarea
      oneLine
      withShadow
      closable={field.value.length > 0 && !isMobile}
      simple={isMobile}
      showStab={isMobile || !suggestOpened.value}
      className={cn(st.area, {
        [st.dropdownOpened]: suggestOpened.value,
        [st.hasChanged]: draftAddress.value.length > 0 && isMobile,
      })}
      stubClassName={st.stub}
      ref={inputRef}
      suffix={
        !isMobile ? (
          locationUnit.pending ? (
            <Spinner />
          ) : (
            <LocationIcon onClick={locationUnit.detectLocation} />
          )
        ) : (
          <p
            role="presentation"
            onClick={() => suggestOpened.onChange(true)}
            className={cn(st.changeAddress, {
              [st.hasAddress]: draftAddress.value.length > 0,
            })}
          >
            {texts.checkout.user.address.change}
          </p>
        )
      }
      placeholder={texts.searchAddress.input.placeholder}
      value={field.value}
      onChange={e => {
        field.onChange(e.target.value);
      }}
      onFocus={() => suggestOpened.onChange(true)}
      onStubClick={() => suggestOpened.onChange(true)}
      Prefix={isMobile ? <LocationPoint /> : null}
    />
  );

  return (
    <div className={cn(st.suggestsWrapper, { [st.isRelative]: isRelativePosition })} ref={ref}>
      <Responsive.TabletAndBelow className={st.space}>
        {input}
        <MobileSearch shouldCloseOnOverlayClick={shouldCloseOnOverlayClick} />
      </Responsive.TabletAndBelow>

      <Responsive.Desktop className={cn(st.space, { [st.isRelative]: isRelativePosition })}>
        <Popup
          hasContent={(result?.length ?? 0) > 0}
          tag={input}
          opened={suggestOpened.value}
          closePopup={() => {
            suggestOpened.onChange(false);
            field.onChange(draftAddress.value);
          }}
        >
          <Suggests inputRef={inputRef} />
        </Popup>
      </Responsive.Desktop>
    </div>
  );
}
