import prisma from '../config/prisma';
import { Request, Response, Router } from 'express';
import { SignJWT } from 'jose';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { validateSignup } from '../middleware/validateSignup';
import { account, avatar, profile } from '@prisma/client';
import { getAccessSecret } from '../utils/constants';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
const saltRounds = 10;
const router = Router();

router.post('/signin', async (req: Request, res: Response) => {
    try {
        const body = req.body;

        if (!body || !body.email || !body.password) return res.status(422).json({ error: 'Please fill out all fields' });
        const email = body.email.toLowerCase();
        const password = body.password;

        if (email && password) {
            const account: account | null = await prisma.account.findUnique({
                where: { email: email },
            });
            if (account && account.email && account.password) {
                const passwordMatches = await bcrypt.compare(password, account.password);
                if (passwordMatches) {
                    const profile: profile | null = await prisma.profile.findUnique({
                        where: { username: account.username },
                    });
                    const avatar: avatar | null = await prisma.avatar.findUnique({
                        where: { profile_id: profile?.id },
                    });
                    const expires = 60 * 60 * 24 * 7;
                    const user = {
                        id: account.id,
                        username: account.username,
                        displayname: profile?.displayname,
                        avatar: avatar?.path,
                    };
                    const accessToken = await new SignJWT(user)
                        .setProtectedHeader({ alg: 'HS256' })
                        .setJti(uuidv4())
                        .setExpirationTime(Date.now() + expires)
                        .setIssuedAt()
                        .sign(new TextEncoder().encode(getAccessSecret()));
                    return res.status(200).json({ user: user, accessToken: accessToken, accessTokenExpires: expires });
                }
            }
        }
        return res.status(401).json({ error: 'Wrong email or password' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong please try again later' });
    }
});

router.post('/signup', validateSignup, async (req: Request, res: Response) => {
    try {
        const body = req.body;
        if (!body || !body.email || !body.username || !body.password) return res.sendStatus(422);
        const email: string = req.body.email.toLowerCase();
        const username: string = req.body.username;
        const password: string = req.body.password;

        const hash = await bcrypt.hash(password, saltRounds);
        try {
            const account = await prisma.account.create({
                data: {
                    email: email,
                    username: username,
                    password: hash,
                },
            });
            await prisma.profile.create({
                data: {
                    username: account.username,
                    displayname: account.username,
                },
            });
            return res.status(200).json({ success: true });
        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError && err.meta && err.meta.target) {
                const target = err.meta.target as Array<string>;
                if (target[0].includes('email')) {
                    return res.status(409).json({ error: { target: 'email', msg: 'This email is already in use' } });
                }
                if (target[0].includes('username')) {
                    return res.status(409).json({ error: { target: 'username', msg: 'This username is already in use' } });
                }
            }
            return res.status(500).json({ error: { target: 'all', msg: 'Something went wrong. Please try again later' } });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: { target: 'all', msg: 'Something went wrong. Please try again later' } });
    }
});

export default router;
