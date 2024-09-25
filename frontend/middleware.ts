import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { setCsrfCookie } from '@lib/auth';
import { jsonResponse } from './lib/utils';
import { CSRF_TOKEN } from './lib/auth/constants';

export const middleware = async (request: NextRequest) => {
  if (!request.cookies.has(CSRF_TOKEN)) {
    try {
      return await setCsrfCookie(NextResponse.next());
    } catch (err) {
      // console.log(err);
      return jsonResponse(500, { error: { message: 'Initializing csrf_token failed.' } });
    }
  }
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|favicon.ico).*)',
  ],
};
