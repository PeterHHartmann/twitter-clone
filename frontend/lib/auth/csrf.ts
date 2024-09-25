import type { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { SignJWT, jwtVerify } from 'jose';
import { CSRF_TOKEN, getCsrfSecret, AuthError, COOKIE_CONSTANTS } from './constants';
import { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequest } from 'next';
import { ResponseCookie } from 'next/dist/server/web/spec-extension/cookies';

interface CsrfJwtPayload {
    jti: string;
    iat: number;
}

export const getCsrfToken = (
    req: IncomingMessage & { cookies: Partial<{ [key: string]: string; }>; },
    res: ServerResponse
) => {
    // Get token from cookies
    const cookieToken = req.cookies[CSRF_TOKEN];
    if (cookieToken) return cookieToken;

    // When the csrf_token cookie is set in middleware the browser has not yet received the response so the cookie will not be set
    // Therefore we instead get the token from the response set-cookie header so it can be used in a component on initial site visit
    const setCookieHeader = res.getHeader('set-cookie') as string[];
    if (setCookieHeader.length > 0) {
        const headerToken = setCookieHeader[0].split(';')[0].split('=')[1];
        return headerToken;
    }
    return null;
};

const verifyCsrfToken = async (token: string | undefined) => {
    if (!token) throw new AuthError('No csrfToken was supplied');
    try {
        const verified = await jwtVerify(token, new TextEncoder().encode(getCsrfSecret()));
        return verified.payload as CsrfJwtPayload;
    } catch (err) {
        throw new AuthError('One of the supplied csrfTokens could not be verified');
    }
};

export const verifyCsrfTokens = async (req: NextApiRequest) => {
    const verifiedBodyToken = await verifyCsrfToken(req.headers['x-csrf-token'] as string);
    const verifiedCookieToken = await verifyCsrfToken(req.cookies[CSRF_TOKEN]);

    if (verifiedBodyToken.jti !== verifiedCookieToken.jti) throw new AuthError('csrfToken mismatch');
};

export const setCsrfCookie = async (res: NextResponse) => {
    const jwt = await new SignJWT({})
        .setProtectedHeader({ alg: 'HS256' })
        .setJti(uuidv4())
        .setIssuedAt()
        .sign(new TextEncoder().encode(getCsrfSecret()));

    res.cookies.set(CSRF_TOKEN, jwt, {
        httpOnly: COOKIE_CONSTANTS.httpOnly,
        sameSite: COOKIE_CONSTANTS.sameSite,
        domain: COOKIE_CONSTANTS.domain,
    });

    res.cookies.set(CSRF_TOKEN, jwt, COOKIE_CONSTANTS as Partial<ResponseCookie>);

    return res;
};

export const expireCsrfCookie = (res: NextResponse) => {
    res.cookies.set(CSRF_TOKEN, '', {
        httpOnly: COOKIE_CONSTANTS.httpOnly,
        sameSite: COOKIE_CONSTANTS.sameSite,
        domain: COOKIE_CONSTANTS.domain,
        maxAge: 0,
    });
    return res;
};
