import { createMedia } from '@artsy/fresnel';
import React, { ReactNode } from 'react';

import { BREAKPOINTS } from '../breakpoints';

// FROM_TSUM_APP

type Props = {
  className?: string;
  children: ReactNode;
};

const AppMedia = createMedia({
  breakpoints: BREAKPOINTS,
});

// Generate CSS to be injected into the head
export const mediaStyle = AppMedia.createMediaStyle();
export const { Media, MediaContextProvider } = AppMedia;

const Mobile: React.FC<Props> = ({ children, className }) => (
  <Media className={className} lessThan="xs">
    {children}
  </Media>
);

const Tablet: React.FC<Props> = ({ children, className }) => (
  <Media className={className} between={['xs', 'md']}>
    {children}
  </Media>
);

const TabletAndBelow: React.FC<Props> = ({ children, className }) => (
  <Media className={className} between={['xxs', 'md']}>
    {children}
  </Media>
);

const TabletSmall: React.FC<Props> = ({ children, className }) => (
  <Media className={className} between={['xs', 'sm']}>
    {children}
  </Media>
);

const TabletSmallAndBellow: React.FC<Props> = ({ children, className }) => (
  <Media className={className} between={['xxs', 'sm']}>
    {children}
  </Media>
);

const Desktop: React.FC<Props> = ({ children, className }) => (
  <Media className={className} greaterThan="sm">
    {children}
  </Media>
);

const TabletSmallAndGreater = ({ children, className }: Props) => (
  <Media greaterThan="xs" className={className}>
    {children}
  </Media>
);

export const Responsive = {
  Desktop,
  Tablet,
  TabletAndBelow,
  Mobile,
  TabletSmallAndGreater,
  TabletSmall,
  TabletSmallAndBellow,
};
