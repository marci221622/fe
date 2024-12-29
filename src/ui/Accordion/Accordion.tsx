
import cn from 'classnames';
import React, { ReactNode } from 'react';

import { Panel } from './Panel';

import st from './style.module.scss';

// FROM_TSUM_APP
interface Props {
  containerClassName?: string;
  onChange: (key: string) => void;
  activePanels: string[];
  shouldScrollToTop?: boolean;
  children: ReactNode;
}

const Accordion = ({
  children,
  activePanels = [],
  onChange,
  containerClassName = '',
  shouldScrollToTop = false,
}: Props) => {
  return (
    <div className={cn(st.container, containerClassName)}>
      {React.Children.map(children, panel => {
        if (React.isValidElement(panel) && Panel === panel.type) {
          return React.cloneElement(panel, {
            // @ts-ignore
            isActive: activePanels.includes(panel.key ?? 'te'),
            // @ts-ignore
            onToggle: () => onChange(panel.key),
            key: panel.key,
            shouldScrollToTop,
          });
        }

        return null;
      })}
    </div>
  );
};

Accordion.Panel = Panel;

export { Accordion };
