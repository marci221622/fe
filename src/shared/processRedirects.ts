import { matchPath } from 'react-router-dom';

import { paths } from '@/constants/paths';

const pathsToRedirect = [
  {
    path: `/men${paths.product()}`,
    to: (code: string) => paths.product(code),
  },
  {
    path: `/women${paths.product()}`,
    to: (code: string) => paths.product(code),
  },
];

export function resolveRedirects({ pathname }: { pathname: string }) {
  for (let i = 0; i < pathsToRedirect.length; i++) {
    const { path, to } = pathsToRedirect[i];
    const rs = matchPath(path, pathname);

    if (rs?.params?.itemCode) {
      // @ts-ignore
      return to(rs?.params?.itemCode);
    }
  }

  return undefined;
}
