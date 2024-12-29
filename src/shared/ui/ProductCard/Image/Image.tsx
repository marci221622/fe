import { ComponentPropsWithoutRef } from 'react';

import { BREAKPOINTS } from '@/ui/breakpoints';

import { ProductCardPropsImage } from '../types';

type ProductCardImageProps = { photo: ProductCardPropsImage } & ComponentPropsWithoutRef<'img'>;

export function ProductCardImage({ photo, alt, loading, ...props }: ProductCardImageProps) {
  return (
    <picture>
      <source media={`(min-width: ${BREAKPOINTS.md}px)`} srcSet={`${photo.middle} 2x`} />
      <img {...props} src={photo.small} srcSet={photo.small} alt={alt} loading="lazy" />
    </picture>
  );
}
