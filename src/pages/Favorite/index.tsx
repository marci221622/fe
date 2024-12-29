import { Route } from 'react-router-dom';

import { paths } from '@/constants/paths';

import Brands from './Brands';
import Products from './Products';

export const favoriteRoutes = (
  <>
    <Route path={paths.favorites.main()} element={<Products />} />
    <Route path={paths.favorites.brands()} element={<Brands />} />
  </>
);
