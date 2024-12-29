import { combine, createStore } from 'effector';

import { $baseSeo, createSeo } from '@/shared/Seo';

import banner from './assets/banner/banner-1@2x.jpg';

export const landingSeo = createSeo(
  combine(
    $baseSeo,
    createStore({
      ogTitle: 'TSUM Collect — ресейл-платформа ЦУМ для покупки и продажи товаров класса люкс',
      ogDescription: 'TSUM Collect — платформа ЦУМа для покупки и продажи товаров класса люкс.',
      ogType: 'website',
      ogUrl: 'https://collect.tsum.ru',
      ogImage: banner,
    } as BaseMetaType),
    (baseSeo, additionalSeo) => ({ ...baseSeo, ...additionalSeo }),
  ),
);