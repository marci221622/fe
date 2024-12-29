import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { InputHTMLAttributes, useRef } from 'react';

import { Section } from '@/generated/customer_hub/enums/section';
import { useStickyClassnames } from '@/shared/animations';
import { $mappedStrings } from '@/shared/configs';
import { $currentGender, changedGender } from '@/shared/session';

import { paths } from '@/constants/paths';

import { Input, TabLinks } from '@/ui/index';

import { SearchIcon } from '@/ui/assets/icons';

import st from './styles.module.scss';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  wrapperClassname?: string;
  actionsClassname?: string;
  searchOpened?: boolean;
  onCloseClick?: () => void;
  withNavigate?: boolean;
  showStab?: boolean;
  onStubClick?: () => void;
  to?: (gender: Section) => string;
  largeBottomMargin?: boolean;
  placeholder?: string;
};

export function GenderActions({
  wrapperClassname,
  actionsClassname,
  children,
  searchOpened = false,
  withNavigate = false,
  showStab = false,
  onStubClick,
  to = gender => (gender === Section.SECTION_FEMALE ? paths.home.women() : paths.home.men()),
  largeBottomMargin = true,
  placeholder = 'Поиск',
  ...props
}: Props) {
  const texts = useUnit($mappedStrings);

  const { i18n } = useLingui();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onChangeGender = useUnit(changedGender);
  const gender = useUnit($currentGender);
  const classname = useStickyClassnames({});

  return (
    <div
      className={cn(st.header, wrapperClassname, classname, {
        [st.searchOpened]: searchOpened,
        [st.largeBottomMargin]: largeBottomMargin,
      })}
    >
      <Input
        showStab={showStab}
        onStubClick={onStubClick}
        Prefix={<SearchIcon />}
        placeholder={placeholder}
        className={st.search}
        closable={!!props.value || searchOpened}
        ref={inputRef}
        {...props}
      />

      <TabLinks
        classname={cn(st.actions, actionsClassname)}
        tabs={[
          {
            label: texts.genderPanel.female,
            to: to(Section.SECTION_FEMALE),
          },
          {
            label: texts.genderPanel.male,
            to: to(Section.SECTION_MALE),
          },
        ]}
        active={to(gender)}
        onClick={(path, event) => {
          if (!withNavigate) {
            event.preventDefault();
          }

          onChangeGender(path === paths.home.women() ? Section.SECTION_FEMALE : Section.SECTION_MALE);
        }}
      />

      {children}
    </div>
  );
}
