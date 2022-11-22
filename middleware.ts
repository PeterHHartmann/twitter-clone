import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { setCsrfCookie, verifyCsrfToken } from '@/lib/auth';
import { jsonResponse } from './lib/utils';

export const middleware = async (req: NextRequest) => {
  const verifiedToken = await verifyCsrfToken(req).catch((err) => {
    console.error(err.message);
  });
  if (!verifiedToken) {
    try {
      return await setCsrfCookie(NextResponse.next());
    } catch (err) {
      console.log(err);
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
