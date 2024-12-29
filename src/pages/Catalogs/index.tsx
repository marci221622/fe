import { createRoutesByGender } from '@/shared/pageRouting';

import { paths } from '@/constants/paths';

import BrandCatalogPage from './Brand';
import CommonCatalogPage from './Common';
import SearchCatalogPage from './Search';
import SelCatalogPage from './Sel';

export const catalogRoutes = (
  <>
    {createRoutesByGender({
      path: paths.catalog.search({}),
      element: <SearchCatalogPage />,
    })}

    {createRoutesByGender({
      // Свой код поддерживаем
      // eslint-disable-next-line deprecation/deprecation
      path: paths.catalog.common.withCollAndMenu({}),
      element: <CommonCatalogPage />,
    })}

    {createRoutesByGender({
      path: paths.catalog.withSlug.common({}),
      element: <CommonCatalogPage />,
    })}

    {createRoutesByGender({
      // Свой код поддерживаем
      // eslint-disable-next-line deprecation/deprecation
      path: paths.catalog.common.collectionHARDCODE({}),
      element: <CommonCatalogPage />,
      needInitial: true,
    })}

    {createRoutesByGender({
      path: paths.catalog.withSlug.collection({}),
      element: <SelCatalogPage />,
    })}

    {createRoutesByGender({
      // Свой код поддерживаем
      // eslint-disable-next-line deprecation/deprecation
      path: paths.catalog.brand({}),
      element: <BrandCatalogPage />,
    })}

    {createRoutesByGender({
      path: paths.catalog.withSlug.brand({}),
      element: <BrandCatalogPage />,
    })}
  </>
);
