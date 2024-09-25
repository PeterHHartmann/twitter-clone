import { NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { SignJWT, jwtVerify, JWTPayload } from 'jose';
import {
    SESSION_TOKEN,
    getSessionSecret,
    NextServerRequest,
    COOKIE_CONSTANTS,
    ADMIN_SESSION_TOKEN,
    getAdminSessionSecret,
} from './constants';
import cookie from 'cookie';

export type Session = JWTPayload & {
    id: number;
    username: string;
    displayname: string;
    avatar: string;
    accessToken: string;
};

export const getSession = async (req: NextServerRequest) => {
    const token = req.cookies[SESSION_TOKEN];
    if (!token) return null;
    try {
        const verified = await jwtVerify(token, new TextEncoder().encode(getSessionSecret()));
        return verified.payload as Session;
    } catch (err) {
        return null;
    }
};

export const setSessionCookie = async (res: NextApiResponse, payload: object, expires: number) => {
    const token = await new SignJWT({ ...payload })
        .setProtectedHeader({ alg: 'HS256' })
        .setJti(uuidv4())
        .setExpirationTime(Date.now() + expires)
        .setIssuedAt()
        .sign(new TextEncoder().encode(getSessionSecret()));

    res.setHeader(
        'Set-Cookie',
        cookie.serialize(SESSION_TOKEN, token, {
            httpOnly: COOKIE_CONSTANTS.httpOnly,
            sameSite: COOKIE_CONSTANTS.sameSite,
            domain: COOKIE_CONSTANTS.domain,
            maxAge: expires,
            path: '/',
        })
    );
    return res;
};

export const expireSessionCookie = (res: NextApiResponse) => {
    res.setHeader(
        'Set-Cookie',
        cookie.serialize(SESSION_TOKEN, '', {
            httpOnly: COOKIE_CONSTANTS.httpOnly,
            sameSite: COOKIE_CONSTANTS.sameSite,
            domain: COOKIE_CONSTANTS.domain,
            path: '/',
            maxAge: -1,
        })
    );
    return res;
};

export type AdminSession = {
    username: string;
    adminAccessToken: string;
};

export const getAdminSession = async (req: NextServerRequest) => {
    const token = req.cookies[ADMIN_SESSION_TOKEN];
    if (!token) return null;
    try {
        const verified = await jwtVerify(token, new TextEncoder().encode(getAdminSessionSecret()));
        return verified.payload as AdminSession;
    } catch (err) {
        return null;
    }
};

export const setAdminSessionCookie = async (res: NextApiResponse, payload: object, expires: number) => {
    //TODO refresh token every time user opens the web
    const token = await new SignJWT({ ...payload })
        .setProtectedHeader({ alg: 'HS256' })
        .setJti(uuidv4())
        .setExpirationTime(Date.now() + expires)
        .setIssuedAt()
        .sign(new TextEncoder().encode(getAdminSessionSecret()));

    res.setHeader(
        'Set-Cookie',
        cookie.serialize(ADMIN_SESSION_TOKEN, token, {
            httpOnly: COOKIE_CONSTANTS.httpOnly,
            sameSite: COOKIE_CONSTANTS.sameSite,
            domain: COOKIE_CONSTANTS.domain,
            maxAge: expires,
            path: '/',
        })
    );
    return res;
};

export const expireAdminSessionCookie = (res: NextApiResponse) => {
    res.setHeader(
        'Set-Cookie',
        cookie.serialize(ADMIN_SESSION_TOKEN, '', {
            httpOnly: COOKIE_CONSTANTS.httpOnly,
            sameSite: COOKIE_CONSTANTS.sameSite,
            domain: COOKIE_CONSTANTS.domain,
            path: '/',
            maxAge: -1,
        })
    );
    return res;
};
