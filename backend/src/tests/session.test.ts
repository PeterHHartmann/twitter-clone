import { beforeAll, beforeEach, describe, expect, it } from '@jest/globals';
import { Request } from 'express';
import { SignJWT } from 'jose';
import { v4 as uuidv4 } from 'uuid';
import { getSessionPayload } from '../middleware/verifyAccess';

describe('verifyAccess module', () => {
    const request = {
        headers: {
            authorization: '',
        },
    };

    beforeAll(() => {
        process.env.ACCESS_TOKEN_SECRET = 'secret';
    });

    beforeEach(() => {
        request.headers = {
            authorization: '',
        };
    });

    it('should throw error when no token is present in request header', async () => {
        try {
            await getSessionPayload(request as unknown as Request);
        } catch (e) {
            const err = e as Error;
            expect(err.toString()).toMatch('Could not read session token');
        }
    });

    it('should throw error when no token is present in request header', async () => {
        const accessToken = await new SignJWT({ test: 'test' })
            .setProtectedHeader({ alg: 'HS256' })
            .setJti(uuidv4())
            .setExpirationTime(Date.now() + 1000)
            .setIssuedAt()
            .sign(new TextEncoder().encode('secret'));
        request.headers.authorization = `Bearer ${accessToken}`;
        const payload: object = await getSessionPayload(request as unknown as Request);
        expect(payload).toBeDefined();
    });
});
