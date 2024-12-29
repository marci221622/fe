import cn from 'classnames';
import { ComponentPropsWithoutRef } from 'react';

import st from './Image.module.scss';

export function ImageWithPlaceholder({ alt = '', ...props }: ComponentPropsWithoutRef<'img'>) {
  return <img {...props} className={cn(st.Image, props.className)} loading="lazy" alt={alt} />;
}
