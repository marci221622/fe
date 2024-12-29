import cn from 'classnames';
import { useState, useRef, useCallback, useEffect, ReactNode } from 'react';

import { BREAKPOINTS } from '@/ui/breakpoints';

import st from './style.module.scss';

/**
Флоу
1) Элемент активный сразу - ставим высоту авто и не нужна анимация
2) Элемент переходит в не активную стадию
    Ставим высоту текущую и через RAF ставим 0 (для валидно анимации)
 */

const HEADER_HEIGHT = 61;

type Props = {
  title: (params: { isActive: boolean }) => ReactNode | string;
  isActive?: boolean;
  onToggle?: () => void;
  children: ReactNode;
  activeClassName?: string;
  containerClassName?: string;
  titleClassName?: string;
  contentClassName?: string;
  activeTitleClassName?: string;
  className?: string;
  shouldScrollToTop?: boolean;
};

const render = (children: ReactNode | Props['title'], props: Parameters<Props['title']>[0]) => {
  return typeof children === 'function' ? children(props) : children;
};

export function Panel({
  title,
  isActive = false,
  onToggle,
  children,
  activeClassName = '',
  containerClassName = '',
  titleClassName = '',
  contentClassName = '',
  activeTitleClassName = '',
  className,
  shouldScrollToTop,
}: Props) {
  const titleRef = useRef<HTMLDivElement | null>(null);
  const content = useRef<HTMLDivElement | null>(null);

  const [height, setHeight] = useState(isActive ? 'auto' : 0);

  const onTransitionEnd = useCallback(
    ({ nativeEvent }: { nativeEvent: Event & { propertyName?: string } }) => {
      const isHeightEnded = nativeEvent.propertyName === 'height';
      const needAnimation = shouldScrollToTop && isActive;

      if (needAnimation && isHeightEnded && titleRef.current) {
        const isTabletAndBellow = document.body.offsetWidth > BREAKPOINTS.md;

        window.scrollTo({
          top: isTabletAndBellow ? titleRef.current.offsetTop : titleRef.current.offsetTop - HEADER_HEIGHT,
          behavior: 'smooth',
        });
      }

      if (isActive && isHeightEnded) {
        setHeight('auto');
      }
    },
    [isActive, shouldScrollToTop],
  );

  useEffect(() => {
    const panelContentElement = content.current;

    const id = requestAnimationFrame(() => {
      setHeight(prevHeight => {
        if (!isActive) {
          return 0;
        }

        if (prevHeight === 'auto') {
          return prevHeight;
        }

        return panelContentElement?.scrollHeight ?? 0;
      });
    });

    return () => {
      setHeight(prevHeight => (prevHeight === 'auto' ? panelContentElement?.scrollHeight ?? 0 : prevHeight));
      cancelAnimationFrame(id);
    };
  }, [isActive]);

  const onPanelClick = () => {
    if (children) {
      onToggle?.();
    }
  };

  return (
    <div
      className={cn(st.panel, className, containerClassName, {
        [st.disabled]: !children,
        [cn(activeClassName, st.opened)]: isActive,
      })}
    >
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        ref={titleRef}
        onClick={onPanelClick}
        className={cn(st.title, titleClassName, {
          [cn(st.boldTitle, activeTitleClassName)]: isActive,
        })}
      >
        {render(title, { isActive })}
      </div>

      <div
        style={{ height }}
        onTransitionEnd={onTransitionEnd}
        ref={content}
        className={cn(st.content, contentClassName)}
      >
        {children}
      </div>
    </div>
  );
}
