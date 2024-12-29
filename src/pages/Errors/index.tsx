import { Route } from 'react-router-dom';

import { paths } from '@/constants/paths';

import Error404Page from './error404';

export const errorRoutes = <Route path={paths.errors.e404()} element={<Error404Page />} />;
