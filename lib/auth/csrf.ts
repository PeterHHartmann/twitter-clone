import type { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { SignJWT, jwtVerify } from 'jose';
import { CSRF_TOKEN, getCsrfSecret, AuthError } from './constants';
import { IncomingMessage } from 'http';
import { NextApiRequest } from "next";

interface CsrfJwtPayload {
  jti: string;
  iat: number;
}

export const getCsrfToken = (req: IncomingMessage & { cookies: Partial<{ [key: string]: string }> }) => {
  const token = req.cookies[CSRF_TOKEN];
  return token ? token : null;
};

const verifyCsrfToken = async (token: string | undefined) => {
  if (!token) throw new AuthError('No csrfToken was supplied')
  try {
    const verified = await jwtVerify(token, new TextEncoder().encode(getCsrfSecret()));
    return verified.payload as CsrfJwtPayload;
  } catch (err) {
    throw new AuthError('One of the supplied csrfTokens could not be verified');
  }
}

export const verifyCsrfTokens = async (req: NextApiRequest) => {
  const verifiedBodyToken = await verifyCsrfToken(req.headers['x-csrf-token'] as string);
  const verifiedCookieToken = await verifyCsrfToken(req.cookies[CSRF_TOKEN]);
  if (verifiedBodyToken.jti !== verifiedCookieToken.jti) throw new AuthError('csrfToken mismatch');
};

export const setCsrfCookie = async (res: NextResponse) => {
  const jwt = await new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setIssuedAt()
    .sign(new TextEncoder().encode(getCsrfSecret()));

  res.cookies.set(CSRF_TOKEN, jwt, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });

  return res;
};

export const expireCsrfCookie = (res: NextResponse) => {
  res.cookies.set(CSRF_TOKEN, '', { httpOnly: true, maxAge: 0 });
  return res;
};
