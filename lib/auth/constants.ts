import { IncomingMessage } from "http";

export const CSRF_TOKEN = 'csrf_token';
export const SESSION_TOKEN = 'session_token'
export class AuthError extends Error {}
export type NextServerRequest = IncomingMessage & { cookies: Partial<{ [key: string]: string }> };

const CSRF_TOKEN_SECRET: string | undefined = process.env.CSRF_TOKEN_SECRET!;
const SESSION_TOKEN_SECRET: string | undefined = process.env.SESSION_TOKEN_SECRET!;

export function getCsrfSecret(): string {
  if (!CSRF_TOKEN_SECRET || CSRF_TOKEN_SECRET.length === 0) {
    throw new Error('The environment variable JWT_SECRET_KEY is not set.');
  }

  return CSRF_TOKEN_SECRET;
}

export function getSessionSecret(): string {
  if (!SESSION_TOKEN_SECRET || SESSION_TOKEN_SECRET.length === 0) {
    throw new Error('The environment variable JWT_SECRET_KEY is not set.');
  }

  return SESSION_TOKEN_SECRET;
}