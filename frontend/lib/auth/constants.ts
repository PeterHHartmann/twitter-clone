import { IncomingMessage } from 'http';

export const CSRF_TOKEN = 'csrf_token';
export const SESSION_TOKEN = 'session_token';
export const ADMIN_SESSION_TOKEN = 'admin_session_token';
export class AuthError extends Error {}
export type NextServerRequest = IncomingMessage & { cookies: Partial<{ [key: string]: string }> };

export function getCsrfSecret(): string {
  const CSRF_TOKEN_SECRET: string | undefined = process.env.CSRF_TOKEN_SECRET!;
  if (!CSRF_TOKEN_SECRET || CSRF_TOKEN_SECRET.length === 0) {
    throw new Error('The environment variable CSRF_SECRET is not set.');
  }

  return CSRF_TOKEN_SECRET;
}

export function getSessionSecret(): string {
  const SESSION_TOKEN_SECRET: string | undefined = process.env.SESSION_TOKEN_SECRET!;
  if (!SESSION_TOKEN_SECRET || SESSION_TOKEN_SECRET.length === 0) {
    throw new Error('The environment variable SESSION_SECRET is not set.');
  }

  return SESSION_TOKEN_SECRET;
}

export function getAdminSessionSecret(): string {
  const ADMIN_SESSION_TOKEN_SECRET: string | undefined = process.env.ADMIN_SESSION_TOKEN_SECRET!;
  if (!ADMIN_SESSION_TOKEN_SECRET || ADMIN_SESSION_TOKEN_SECRET.length === 0) {
    throw new Error('The environment variable ADMIN_SESSION_TOKEN_SECRET is not set.');
  }

  return ADMIN_SESSION_TOKEN_SECRET;
}

export function getProductionDomain(): string {
  const PRODUCTION_DOMAIN: string | undefined = process.env.PRODUCTION_DOMAIN;
  if (!PRODUCTION_DOMAIN || PRODUCTION_DOMAIN.length === 0) {
    console.log('Warning: Environment variable PRODUCTION_DOMAIN is not set. Defaulting to localhost');
    return 'localhost';
  }

  return PRODUCTION_DOMAIN;
}

export const COOKIE_CONSTANTS: {
  httpOnly: boolean;
  sameSite: boolean | 'strict' | 'lax' | 'none' | undefined;
  domain: string;
} = {
  httpOnly: true,
  sameSite: 'strict',
  domain: process.env.NODE_ENV === 'production' ? getProductionDomain() : 'localhost',
};
