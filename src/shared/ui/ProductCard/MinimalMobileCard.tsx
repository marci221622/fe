import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { Link } from 'react-router-dom';

import { paths } from '@/constants/paths';

import { ProductCardImage as Image } from './Image';
import { ProductCardPropsImage } from './types';

import st from './styles.module.scss';

type Props = {
  className?: string;
  code: string;
  imagePrimary: ProductCardPropsImage;
  imageSecondary?: ProductCardPropsImage;
  brandImage?: string;
  brandText?: string;
} & Omit<ComponentPropsWithoutRef<'a'>, 'id' | 'title'>;

// Для кейса в просмотренных товарах
// Только картинка и бренд
// TODO: думаю кт нужно взять в работу и поправить везде
export const MinimalProductCard = forwardRef<HTMLAnchorElement, Props>(
  ({ className, code, imagePrimary, imageSecondary, brandImage, brandText, ...props }, ref) => {
    const { i18n } = useLingui();

    return (
      <Link className={cn(st.container, className, st.minimalMobile)} to={paths.product(code)} {...props} ref={ref}>
        <div className={st.content}>
          <div className={cn(st.photoContainer, st.opacity, { [st.hasSecondImage]: imageSecondary })}>
            <div className={st.photoContent}>
              <Image photo={imagePrimary} className={st.photo} alt="" itemProp="image" />
              {imageSecondary && <Image photo={imageSecondary} className={st.photo} alt="" itemProp="image" />}
            </div>
          </div>
        </div>

        <div className={st.info}>
          <div className={st.shortInfo}>
            {brandImage ? (
              <img className={st.brandImage} src={brandImage} alt={brandText} />
            ) : (
              <p className={st.brandText}>{brandText}</p>
            )}
          </div>
        </div>
      </Link>
    );
  },
);
