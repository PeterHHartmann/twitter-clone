import { NextApiResponse } from 'next';
import { nanoid } from 'nanoid';
import { SignJWT, jwtVerify, JWTPayload } from 'jose';
import { SESSION_TOKEN, getSessionSecret, NextServerRequest } from './constants';
import cookie from 'cookie';

export type SessionJwtPayload = JWTPayload & {
  userName: string;
  displayName: string;
  accessToken: string;
};

export const getSession = async (req: NextServerRequest) => {
  const token = req.cookies[SESSION_TOKEN];

  if (!token) return null;

  try {
    const verified = await jwtVerify(token, new TextEncoder().encode(getSessionSecret()));
    return verified.payload as SessionJwtPayload;
  } catch (err) {
    console.log(err);
    console.log('Session token could not be verified');
    return null;
  }
}

// Adds the user token cookie to a response.
export const setSessionCookie = async(res: NextApiResponse, payload: object, expires: number) => {
  //TODO set token expiration time to 1 week & refresh token every time user opens the web
  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setExpirationTime(Date.now() + expires)
    .setIssuedAt()
    .sign(new TextEncoder().encode(getSessionSecret()));

  res.setHeader(
    'Set-Cookie',
    cookie.serialize(SESSION_TOKEN, token, {
      sameSite: 'strict',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: expires,
      path: '/',
    })
  );

  return res;
}

export const expireSessionCookie = (res: NextApiResponse) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize(SESSION_TOKEN, '', {
      sameSite: 'strict',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 0,
      path: '/',
    })
  );
  return res;
};