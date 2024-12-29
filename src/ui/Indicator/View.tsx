import cn from 'classnames';
import { useEffect, useState } from 'react';

import st from './style.module.scss';

type LoaderStatus = 'start' | 'play' | 'complete';

type LoaderProps = {
  pending?: boolean;
};

export const ProgressIndicator = ({ pending }: LoaderProps) => {
  const [status, setStatus] = useState<LoaderStatus>('start');

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (pending) {
      setStatus('play');

      return () => {
        setStatus(status => (status === 'play' ? 'complete' : 'start'));
      };
    }
  }, [pending]);

  return <div className={cn(st.wrap, st[status])} />;
};
