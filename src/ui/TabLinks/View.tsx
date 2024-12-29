import cn from 'classnames';
import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import st from './styles.module.scss';

type Props = {
  tabs: { label: string; to: string }[];
  active: string;
  classname?: string;
  onClick?: (to: string, evt: MouseEvent<HTMLAnchorElement>) => void;
};

export function TabLinks({ tabs, active, classname, onClick: onClickHandler }: Props) {
  return (
    <div className={cn(st.tabs, classname)}>
      {tabs.map(tab => (
        <Link
          key={tab.to}
          to={tab.to}
          className={cn({
            [st.active]: active === tab.to,
          })}
          onClick={evt => onClickHandler?.(tab.to, evt)}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
