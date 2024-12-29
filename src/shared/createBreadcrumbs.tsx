import { Store, attach, combine, createEffect, createStore } from 'effector';
import { useUnit } from 'effector-react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

import { Section } from '@/generated/customer_hub/enums/section';
import { GetBreadCrumbsRequest } from '@/generated/customer_hub/methods/breadcrumbs/get_breadcrumbs.v1';
import { $pathAdditional } from '@/shared/pageRouting';
import { createBaseRequest } from '@/shared/request';
import { $currentGender } from '@/shared/session';

import { paths } from '@/constants/paths';
import { runtimeConfig } from '@/constants/runtimeConfig';

import { FxParams, createQuery } from '@/lib/createQuery';

import { Breadcrumbs } from '../ui/index';

type FactoryParams = FxParams<Omit<GetBreadCrumbsRequest, 'section' | 'sessionData'> & { section?: Section }>;
type Props = {
  // Бек дает или слаги или коды
  // Нужно привести к нормальной ссылке
  linkTransformer: (link: string) => string;
  // Для ссылок на пример на каталог нужно модифицировать пути
  // Добавля гентед
  injectGender?: boolean;
};

export const fetchBreadCrumbs = createBaseRequest('GetBreadCrumbs');

export function createBreadcrumbs({ linkTransformer, injectGender = true }: Props) {
  const query = createQuery({
    initialData: [],
    effect: attach({
      source: $currentGender,
      mapParams: (params: FactoryParams, gender) =>
        [
          { ...params[0], section: params[0].section ? params[0].section : gender },
          params[1],
        ] as FxParams<GetBreadCrumbsRequest>,
      effect: createEffect(async ([params, { signal }]: FxParams<Omit<GetBreadCrumbsRequest, 'sessionData'>>) => {
        const rs = await fetchBreadCrumbs({
          signal,
          body: params,
        });

        return [
          {
            link: params.section === Section.SECTION_MALE ? paths.home.men() : paths.home.women(),
            name: 'Главная',
            gender: '',
          },
          {
            link: paths.categories.root(),
            name: 'Каталог',
            gender: params.section === Section.SECTION_MALE ? 'male' : 'female',
          },
          ...rs.breadCrumbs,
        ];
      }),
    }),
  });

  const $breadcrumbs = query.$result.map(list => {
    return (list ?? [])?.map(it => {
      const isHomepage = it.link === paths.home.men() || it.link === paths.home.women();

      let to = it.link.startsWith('/') || isHomepage || !it.link ? it.link : linkTransformer(it.link);

      if (injectGender && !isHomepage && to) {
        to = `/${it.gender === 'female' ? 'women' : 'men'}${to}`;
      }

      return {
        to,
        title: it.name,
      };
    });
  });

  function Seo() {
    const breadcrumbs = useUnit($breadcrumbs);
    const { pathname } = useLocation();

    return (
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbs.map((bradcrumb, idx) => {
              return {
                '@type': 'ListItem',
                position: idx + 1,
                item: {
                  '@id': bradcrumb.to
                    ? `${runtimeConfig.HOSTNAME}${bradcrumb.to}`
                    : `${runtimeConfig.HOSTNAME}${pathname}`,
                  name: bradcrumb.title,
                },
              };
            }),
          })}
        </script>
      </Helmet>
    );
  }

  return {
    ui: {
      Seo,
    },
    query,
    $breadcrumbs,
  };
}

/*
 * Передвать главную ссылку не нужно (!)
 */
export function createStaticBreadcrumbs({
  injectGender = true,
  breadcrumbs,
}: Omit<Props, 'linkTransformer'> & { breadcrumbs: Store<Breadcrumbs> | Breadcrumbs }) {
  const $fixedBreadcrumbs = Array.isArray(breadcrumbs) ? createStore(breadcrumbs) : breadcrumbs;

  const $breadcrumbs = combine({
    pathAdditional: $pathAdditional,
    section: $currentGender,
    fixedBreadcrumbs: $fixedBreadcrumbs,
  }).map(({ pathAdditional, section, fixedBreadcrumbs }) => [
    {
      to: section === Section.SECTION_MALE ? paths.home.men() : paths.home.women(),
      title: 'Главная',
    },
    ...fixedBreadcrumbs.map(it => {
      let to = it.to;

      if (injectGender && to) {
        to = `/${pathAdditional}${to}`;
      }

      return {
        to,
        title: it.title,
      };
    }),
  ]);

  function Seo() {
    const breadcrumbs = useUnit($breadcrumbs);

    return (
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbs
              .filter(it => it.to)
              .map((bradcrumb, idx) => {
                return {
                  '@type': 'ListItem',
                  position: idx + 1,
                  item: {
                    '@id': `${runtimeConfig.HOSTNAME}${bradcrumb.to}`,
                    name: bradcrumb.title,
                  },
                };
              }),
          })}
        </script>
      </Helmet>
    );
  }

  return {
    ui: {
      Seo,
    },
    $breadcrumbs,
  };
}
