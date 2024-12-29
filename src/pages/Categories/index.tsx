import { createRoutesByGender } from '@/shared/pageRouting';

import { paths } from '@/constants/paths';

import CollectionsPage from './Collection';
import RootCategoriesPage from './Root';

export const categoriesRoutes = (
  <>
    {createRoutesByGender({
      needInitial: true,
      path: paths.categories.root(),
      element: <RootCategoriesPage />,
    })}
    {createRoutesByGender({
      path: paths.categories.collection({}),
      element: <CollectionsPage />,
    })}
  </>
);
