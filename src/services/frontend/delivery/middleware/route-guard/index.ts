import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from '../../lib/next';

import type { MiddlewareFactory } from '../type';

const dashboardRegex = new RegExp('/dashboard*');
const loginRegex = new RegExp('/login*');
const nextRegex = new RegExp('/_next*');
const authRegex = new RegExp('/auth*');

const routeGuard: MiddlewareFactory = (_) => {
  return async (request: NextRequest) => {
    const path = request.nextUrl.pathname;

    if (nextRegex.test(path) || authRegex.test(path) || loginRegex.test(path)) {
      return NextResponse.next();
    }

    const session = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!session || session === null) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (dashboardRegex.test(path)) {
      if (!session)
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (loginRegex.test(path)) {
      if (session && session !== null) {
        NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }

    return NextResponse.next();
  };
};

export default routeGuard;
