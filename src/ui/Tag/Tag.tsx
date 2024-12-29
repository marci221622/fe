import { MessageDescriptor } from '@lingui/core';
import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { forwardRef } from 'react';

import { CloseIcon, SortIcon } from '@/ui/assets/icons';

import st from './styles.module.scss';

type Props = {
  translate?: MessageDescriptor;
  title: string;
  active?: boolean;
  isToggle?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  isSortable?: boolean;
};

export const Tag = forwardRef<HTMLDivElement, Props>(
  ({ title, active, isToggle, onClick, isSortable, translate, ...rest }, ref) => {
    const { i18n } = useLingui();

    return (
      <div className={cn(st.TagWrapper, { [st.active]: active })} onClick={onClick} {...rest} ref={ref}>
        {isSortable && <SortIcon className={st.sortFilterIcon} />}

        <span
          className={cn(st.text, {
            [st.sortText]: isSortable,
            [st.isToggle]: isToggle && active,
          })}
        >
          {translate ? i18n._(translate) : title}
        </span>

        {isToggle && active && <CloseIcon color="#fff" />}
      </div>
    );
  },
);
