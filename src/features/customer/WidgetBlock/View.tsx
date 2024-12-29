import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { ArrowRightIcon } from '@/ui/assets/icons';

import { useClickedLinkAnalytics } from '../useClickedAnalytics';

import st from './styles.module.scss';

type Props = {
  headerTitle: string;
  navLink: string;
  icon: React.JSX.Element;
  children: ReactNode;
};

export function WidgetBlock({ headerTitle, navLink, icon, children }: Props) {
  const clickHandler = useClickedLinkAnalytics({ place: 'profile' });

  return (
    <div className={st.block}>
      <Link
        to={navLink}
        className={st.header}
        onClick={() => {
          clickHandler(navLink);
        }}
      >
        {icon} <p>{headerTitle}</p> <ArrowRightIcon />
      </Link>

      <div className={st.content}>{children}</div>
    </div>
  );
}
