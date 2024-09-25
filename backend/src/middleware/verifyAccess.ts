import { NextFunction, Request, Response } from 'express';
import { JWTPayload, jwtVerify } from 'jose';
import { getAccessSecret, getAdminAccessSecret } from '../utils/constants';

export const verifyAccess = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);
    try {
        const verified = await jwtVerify(token, new TextEncoder().encode(getAccessSecret()));
        const user = {
            username: verified.payload.username as string,
            id: verified.payload.id as number,
        };
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ success: false });
    }
};

export const verifyAdminAccess = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);
    try {
        const verified = await jwtVerify(token, new TextEncoder().encode(getAdminAccessSecret()));
        const admin = {
            username: verified.payload.username as string,
            id: verified.payload.id as number,
        };
        req.admin = admin;
        next();
    } catch (err) {
        return res.status(401).json({ success: false });
    }
};

type SessionPayload = JWTPayload & {
    username: string;
    displayname: string;
    avatar: string;
};

export const getSessionPayload = async (req: Request) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) throw new Error('Could not read session token');
    const verified = await jwtVerify(token, new TextEncoder().encode(getAccessSecret()));
    return verified.payload as SessionPayload;
};
