import express, { Request, Response } from 'express';
import prisma from '../config/prisma';
import { verifyAccess } from '../middleware/verifyAccess';
import AuthRouter from './auth';
import ProfileRouter from './profile';
import TweetRouter from './tweets';
import FollowRouter from './follow';
import AdminRouter from './admin';

const router = express.Router();
router.use('/auth', AuthRouter);
router.use('/profile', ProfileRouter);
router.use('/tweets', TweetRouter);
router.use('/follow', FollowRouter);
router.use('/admin', AdminRouter);

router.get('/ping', (req: Request, res: Response) => {
    return res.send('pong');
});

router.get('/whotofollow', verifyAccess, async (req: Request, res: Response) => {
    const currentUserProfile = await prisma.profile.findUnique({
        where: {
            username: req.user.username,
        },
    });
    if (!currentUserProfile) return res.status(404).json({ success: true });
    const following = await prisma.following.findMany({
        where: {
            follower: currentUserProfile.id,
        },
    });
    const follows = following.map((follow) => follow.recipient);

    const profiles = await prisma.profile.findMany({
        where: {
            id: { not: { in: [currentUserProfile.id, ...follows] } },
        },
        take: 5,
        include: {
            avatar: true,
        },
    });

    return res.status(200).json({ profiles: profiles });
});

export default router;
