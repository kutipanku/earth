import { NextMiddleware, NextResponse } from '../lib/next';
import routeGuard from './route-guard';

import type { MiddlewareFactory } from './type';

const stackMiddlewares = (
  functions: MiddlewareFactory[] = [],
  index = 0
): NextMiddleware => {
  const current = functions[index];
  if (current) {
    const next = stackMiddlewares(functions, index + 1);
    return current(next);
  }
  return () => NextResponse.next();
};

const middlewares = [routeGuard];
export default stackMiddlewares(middlewares);
