import { Request, Response, Router } from 'express';
import prisma from '../config/prisma';
import { verifyAccess } from '../middleware/verifyAccess';
const router = Router();

router.get('/:profile_id', verifyAccess, async (req: Request, res: Response) => {
    try {
        const following = await prisma.following.findFirst({
            where: {
                follower: req.user.id,
                recipient: Number(req.params.profile_id),
            },
        });
        if (following) {
            return res.status(200).json({ following: true });
        } else {
            return res.status(200).json({ following: false });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false });
    }
});

router.post('/:profile_id', verifyAccess, async (req: Request, res: Response) => {
    try {
        const following = await prisma.following.create({
            data: {
                follower: req.user.id,
                recipient: Number(req.params.profile_id),
            },
        });
        console.log(following);

        if (following) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(404).json({ success: false });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: true });
    }
});

router.delete('/:profile_id', verifyAccess, async (req: Request, res: Response) => {
    try {
        const unfollowing = await prisma.following.deleteMany({
            where: {
                follower: req.user.id,
                recipient: Number(req.params.profile_id),
            },
        });
        console.log(unfollowing);

        if (unfollowing) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(404).json({ success: false });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: true });
    }
});

export default router;
