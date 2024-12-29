import cn from 'classnames';
import { useUnit } from 'effector-react';
import { ReactNode, useEffect, useRef } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';

import { useClickOutside } from '@/lib/hooks';

import { increment, decrement } from './model';

import st from './styles.module.scss';

export type Props = {
  opened?: boolean;
  className?: string;
  children: ReactNode;
  closePopup?: () => void;
  tag: React.JSX.Element;
  hasContent?: boolean;
};

const PADDING = 10;
const PADDING_WITH_CONTENT = 16;

export function Popup({ children, className, opened, closePopup, tag, hasContent }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const stackActions = useUnit({ increment, decrement });

  useClickOutside(ref, () => {
    if (opened) {
      closePopup?.();
    }
  });

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (opened) {
      stackActions.increment();

      return () => {
        stackActions.decrement();
      };
    }
  }, [opened, stackActions]);

  return (
    <div ref={ref} className={st.wrapper}>
      {tag}

      {opened && (
        <AutoSizer disableWidth>
          {({ height = 0 }) => {
            return (
              <div
                style={{ paddingTop: height + PADDING + (hasContent ? PADDING_WITH_CONTENT : 0) }}
                className={cn(st.popup, className, {
                  [st.opened]: opened,
                })}
              >
                {children}
              </div>
            );
          }}
        </AutoSizer>
      )}
    </div>
  );
}