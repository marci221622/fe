import cn from 'classnames';

import { Image } from '@/generated/common/image.v1';
import { Brand } from '@/generated/customer_hub/entities/brand.v1';

import { ImageWithPlaceholder } from '@/ui/index';

import st from './styles.module.scss';

export function BrandLogo({ brand, className }: { brand?: Brand; className?: string }) {
  return brand?.logoLink?.src ? (
    <ImageWithPlaceholder
      src={brand.logoLink.src}
      alt={brand.title}
      className={cn(st.logo, className)}
      loading="lazy"
      data-brandlogo
    />
  ) : (
    <p className={cn(st.logoText, className)} data-text>
      {brand?.title}
    </p>
  );
}

export function BrandImage({
  image,
  className,
  title,
  onClick,
}: {
  image?: Image;
  className?: string;
  title: string;
  onClick?: () => void;
}) {
  return image ? (
    <ImageWithPlaceholder
      src={image.src}
      alt="brandLogo"
      className={cn(st.logo, className)}
      loading="lazy"
      onClick={onClick}
      role="presentation"
    />
  ) : (
    <p className={cn(st.logoText, className)} onClick={onClick} role="presentation">
      {title}
    </p>
  );
}
