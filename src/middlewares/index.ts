import { NextMiddleware, NextResponse } from 'next/server';
import type { MiddlewareFactory } from '@/middlewares/type';
import routeGuard from '@/middlewares/route-guard';

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
