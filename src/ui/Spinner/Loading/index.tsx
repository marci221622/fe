import cn from 'classnames';
import React from 'react';

import { Spinner } from '../Indicator';

import st from './style.module.scss';

type Props = {
  children: React.ReactNode;
  isLoading?: boolean;
  className?: string;
  spinner?: React.ReactNode;
};

type LoadingProps = {
  children: React.ReactNode;
  isLoading: boolean;
  center: boolean;
  spinner?: React.ReactNode;
  className?: string;
};

export const Loading = ({
  className = '',
  children,
  isLoading,
  center,
  spinner = <Spinner size="medium" />,
}: LoadingProps) => {
  return isLoading ? <div className={cn(className, { [st.center]: center })}>{spinner}</div> : <div>{children}</div>;
};

export const OverlayLoader = ({ children, isLoading, className = '', spinner = <Spinner size="medium" /> }: Props) => (
  <>
    {isLoading && <div className={cn(className, st.overlay)}>{spinner}</div>}
    {children}
  </>
);
