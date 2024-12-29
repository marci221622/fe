import { createStore, Store } from 'effector';
import { useUnit } from 'effector-react';
import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';

type Props = {
  children?: ReactNode;
} & BaseMetaType;

export function Meta({
  title,
  description,
  keywords,
  ogDescription = description,
  ogTitle = title,
  ogType,
  ogImage,
  ogImageAlt,
  ogImageSecureUrl,
  twitterCard,
  twitterImage = ogImage,
  twitterTitle = title,
  twitterDescription = description,
  ogAvailability,
  canonicalUrl,
  robots,
  children,
}: Props) {
  return (
    <Helmet htmlAttributes={{ lang: 'ru' }}>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {ogDescription && <meta property="og:description" content={ogDescription} />}
      {ogTitle && <meta property="og:title" content={ogTitle} />}
      {ogType && <meta property="og:type" content={ogType} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogImageAlt && <meta name="og:image:alt" content={ogImageAlt} />}
      {ogAvailability && <meta property="og:availability" content={ogAvailability} />}
      {ogImageSecureUrl && <meta property="og:image:secure_url" content={ogImageSecureUrl} />}
      {twitterCard && <meta name="twitter:card" content={twitterCard} />}
      {twitterImage && <meta name="twitter:image" content={twitterImage} />}
      {twitterTitle && <meta name="twitter:title" content={twitterTitle} />}
      {twitterDescription && <meta name="twitter:description" content={twitterDescription} />}

      {robots && <meta name="robots" content={robots} />}

      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {children}
    </Helmet>
  );
}

export function createSeo($seo: Store<BaseMetaType>) {
  function Seo({ children }: { children?: React.ReactNode }) {
    const seo = useUnit($seo);

    return <Meta {...seo}>{children}</Meta>;
  }

  return {
    Seo,
  };
}

export const $baseSeo = createStore({
  title: 'TSUM Collect — ресейл-платформа ЦУМ для покупки и продажи товаров класса люкс',
  description:
    'TSUM Collect — платформа ЦУМа для покупки и продажи товаров класса люкс. Модные бренды. Гарантия подлинности. Быстрая доставка.',
} as BaseMetaType);

export const baseSeo = createSeo($baseSeo);
