import { RouteObject } from 'react-router-dom';

export function routesTraverse(routes: RouteObject[], cb: (arg: RouteObject) => void) {
  const queue = [...routes];

  while (queue.length > 0) {
    const route = queue.pop()!;

    cb(route);

    if (route.children && route.children.length > 0) {
      queue.push(...route.children);
    }
  }
}
