import cn from 'classnames';
import { cloneElement, createContext, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useLocation } from 'react-router-dom';

import { OnlyFullVariant } from '../../configs';
import { InstallAppBanner } from '../../InstallAppBanner';
import { StickyBanner } from '../StickyBanner';
import { TopButton } from '../TopButton';

import st from './styles.module.scss';

type Props = {
  header: React.JSX.Element;
  footer: React.JSX.Element;
  outlet?: React.JSX.Element;
  mobileNav?: React.JSX.Element;
  chatBadge?: React.JSX.Element;
  needMobileNavGap?: boolean;
};

export const templateCtx = createContext<HTMLHeadElement | null>(null);

export function MainTemplate({ header, footer, outlet, mobileNav, chatBadge, needMobileNavGap }: Props) {
  const headerRef = useRef(null);
  const [_, setState] = useState(0);
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (headerRef.current) {
      setState(p => p + 1);
    }
  }, []);

  const { ref: footerMonitor, inView: footerIsVisible } = useInView({
    threshold: 0,
  });

  return (
    <>
      <section className={cn(st.container, { [st.mobileNavGap]: needMobileNavGap })}>
        <OnlyFullVariant>
          <InstallAppBanner className={st.installApp} />
        </OnlyFullVariant>
        <StickyBanner className={st.banner} />

        {cloneElement(header, {
          className: cn(st.header, header.props.className),
          key: `${pathname}/${search}`,
          ref: headerRef,
        })}
        <templateCtx.Provider value={headerRef.current}>
          <main className={st.content}>{outlet}</main>
          <footer ref={footerMonitor} className={st.footer}>
            {cloneElement(footer)}
          </footer>
          {mobileNav}
        </templateCtx.Provider>
      </section>

      <TopButton isAboveFooter={footerIsVisible} chatbtn={chatBadge} />
    </>
  );
}
