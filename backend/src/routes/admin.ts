import { admin } from '@prisma/client';
import { compare } from 'bcrypt';
import { Request, Response, Router } from 'express';
import { SignJWT } from 'jose';
import { v4 as uuidv4 } from 'uuid';
import prisma from '../config/prisma';
import { verifyAdminAccess } from '../middleware/verifyAccess';
import { getAdminAccessSecret } from '../utils/constants';
const router = Router();

router.post('/signin', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) return res.status(422).json({ success: false, error: 'Please fill out all fields' });

        const admin: admin | null = await prisma.admin.findUnique({
            where: {
                username: username,
            },
        });

        if (admin && admin.password) {
            const passwordMatches = await compare(password, admin.password);
            if (passwordMatches) {
                console.log('password matches');

                const expires = 60 * 60 * 2;
                const accessToken = await new SignJWT({ username: admin.username, id: admin.id })
                    .setProtectedHeader({ alg: 'HS256' })
                    .setJti(uuidv4())
                    .setExpirationTime(Date.now() + expires)
                    .setIssuedAt()
                    .sign(new TextEncoder().encode(getAdminAccessSecret()));
                return res
                    .status(200)
                    .json({ admin: { username: username }, adminAccessToken: accessToken, accessTokenExpires: expires });
            }
        }

        return res.status(401).json({ error: 'Wrong username or password' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong please try again later' });
    }
});

router.get('/tweets', verifyAdminAccess, async (req: Request, res: Response) => {
    try {
        const admin = await prisma.admin.findUnique({
            where: {
                username: req.admin.username,
            },
        });
        if (!admin) return res.status(401).json({ success: false });

        const pageSize = 10;
        const currentPage = Number(req.query.page) * pageSize - pageSize;
        const tweets = await prisma.tweet.findMany({
            orderBy: [
                {
                    created_at: 'desc',
                },
            ],
            skip: currentPage,
            take: pageSize,
            include: {
                profile: {
                    include: {
                        avatar: true,
                    },
                },
                tweet_image: true,
            },
        });

        return res.status(200).json({ tweets: tweets });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong please try again later' });
    }
});

router.delete('/tweets/:tweet_id', verifyAdminAccess, async (req: Request, res: Response) => {
    try {
        const admin = await prisma.admin.findUnique({
            where: {
                username: req.admin.username,
            },
        });
        if (!admin) return res.status(401).json({ success: false });
        const deletedTweet = await prisma.tweet.delete({
            where: {
                id: Number(req.params.tweet_id),
            },
        });
        if (deletedTweet) {
            return res.status(200).json({ success: true });
        }
        return res.status(404).json({ success: false });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false });
    }
});

export default router;
