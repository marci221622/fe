import cn from 'classnames';
import { useUnit } from 'effector-react';
import { useRef } from 'react';

import { headerStuckedField } from '@/shared/animations';
import { $appIsShort } from '@/shared/configs';

import { ArrowRightIcon } from '@/ui/assets/icons';

import st from './styles.module.scss';

type Props = {
  className?: string;
  hardVisible?: boolean;
  isAboveFooter?: boolean;
  chatbtn?: React.JSX.Element;
};

export function TopButton({ className, hardVisible, isAboveFooter = false, chatbtn }: Props) {
  const isStucked = useUnit(headerStuckedField.$value);
  const btnRef = useRef<HTMLDivElement | null>(null);
  const appIsShort = useUnit($appIsShort);

  if (appIsShort) {
    return null;
  }

  return (
    <div className={cn({ [st.aboveFooterWrapper]: isAboveFooter })}>
      <div
        ref={btnRef}
        onClick={event => {
          if (event.target === btnRef.current) {
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          }
        }}
        className={cn(st.btn, className, {
          [st.stucked]: isStucked || hardVisible,
          [st.aboveFooterContent]: isAboveFooter,
        })}
      >
        {chatbtn}
        <ArrowRightIcon className={st.arrowIcon} />
      </div>
    </div>
  );
}
