import prisma from '../config/prisma';
import { Request, Response, Router } from 'express';
import { verifyAccess } from '../middleware/verifyAccess';
import { profile, tweet } from '@prisma/client';
import { parseForm } from '../lib/multipart';
import { uploadImage } from '../lib/imageUpload';
const router = Router();

router.get('/', verifyAccess, async (req: Request, res: Response) => {
    try {
        const profile = await prisma.profile.findUnique({
            where: {
                username: req.user.username,
            },
        });
        if (!profile) return res.status(404).json({ success: false });
        const following = await prisma.following.findMany({
            where: {
                follower: profile.id,
            },
        });
        const pageSize = 10;
        const currentPage = Number(req.query.page) * pageSize - pageSize;

        const follows = following.map((follow) => follow.recipient);
        const tweets = await prisma.tweet.findMany({
            where: {
                author: { in: [...follows, profile.id] },
                private: false,
            },
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
        return res.status(500).json({ success: false });
    }
});

router.post('/', verifyAccess, async (req: Request, res: Response) => {
    try {
        const profile: profile | null = await prisma.profile.findUnique({
            where: { username: req.user.username },
        });
        const { fields, files } = await parseForm({
            request: req,
            maxFields: 2,
            maxFiles: 4,
            allowMimeTypes: ['image/jpeg', 'image/png'],
        });
        if (!profile) return res.status(401).json({});

        const tweet: tweet = await prisma.tweet.create({
            data: {
                text: fields.text ? fields.text[0] : undefined,
                private: fields.private ? fields.private[0] === 'true' : false,
                author: profile.id,
            },
        });

        if (Object.keys(files).length > 0) {
            const tweetImages = [];
            for (const file of Object.values(files)) {
                if (file) {
                    const path = await uploadImage(file[0]);
                    tweetImages.push({ tweet_id: tweet.id, path: path });
                }
            }
            if (tweetImages.length > 0) {
                await prisma.tweet_image.createMany({
                    data: [...tweetImages],
                });
            }
        }

        return res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: true });
    }
});

router.get('/:username', verifyAccess, async (req: Request, res: Response) => {
    try {
        const profile = await prisma.profile.findUnique({
            where: { username: req.params.username },
        });
        if (!profile) return res.status(200).json({});

        const pageSize = 10;
        const currentPage = Number(req.query.page) * pageSize - pageSize;

        const ownProfile = req.user.username === req.params.username;
        const findManyCondition = ownProfile ? { author: profile.id } : { author: profile.id, private: false };
        const userTweets = await prisma.tweet.findMany({
            where: findManyCondition,
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
        return res.status(200).json({ tweets: userTweets });
    } catch (err) {
        console.log(err);
    }
});

router.delete('/:username/:tweet_id', verifyAccess, async (req: Request, res: Response) => {
    if (req.user.username !== req.params.username)
        return res.status(403).json({ success: false, msg: 'Can only delete own tweets' });
    try {
        const tweet = await prisma.tweet.findUnique({
            where: {
                id: Number(req.params.tweet_id),
            },
        });
        if (tweet && tweet.author === req.user.id) {
            await prisma.tweet.delete({
                where: {
                    id: Number(req.params.tweet_id),
                },
            });
            return res.status(200).json({ success: true });
        } else {
            return res.status(404).json({ success: false });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false });
    }
});

router.put('/:username/:tweet_id', verifyAccess, async (req: Request, res: Response) => {
    if (req.user.username !== req.params.username)
        return res.status(401).json({ success: false, msg: 'Can only delete own tweets' });
    try {
        const tweet = await prisma.tweet.findUnique({
            where: {
                id: Number(req.params.tweet_id),
            },
        });
        if (tweet && tweet.author === req.user.id) {
            const { fields } = await parseForm({
                request: req,
                maxFields: 2,
                maxFiles: 4,
                allowMimeTypes: ['image/jpeg', 'image/png'],
            });
            await prisma.tweet.update({
                where: {
                    id: Number(req.params.tweet_id),
                },
                data: {
                    text: fields.text ? fields.text[0] : undefined,
                    private: fields.private ? fields.private[0] === 'true' : false,
                    author: tweet.author,
                },
            });

            // const deletedImages = await prisma.tweet_image.deleteMany({
            //   where: {
            //     tweet_id: updatedTweet.id
            //   }
            // })

            // const tweetImages = [];
            // for (const value of Object.values([files][0])) {
            //   const file = value as File;
            //   const path = await uploadImage(file);
            //   tweetImages.push({ tweet_id: updatedTweet.id, path: path });
            // }
            // const tweet_image = await prisma.tweet_image.createMany({
            //   data: [...tweetImages],
            // });

            return res.status(200).json({ success: true });
        } else {
            return res.status(404).json({ success: false });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false });
    }
});

export default router;
