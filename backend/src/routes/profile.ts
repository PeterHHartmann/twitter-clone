import prisma from '../config/prisma';
import { Request, Response, Router } from 'express';
import { getSessionPayload, verifyAccess } from '../middleware/verifyAccess';
import { banner, avatar, profile } from '@prisma/client';
import { parseForm } from '../lib/multipart';
import { uploadImage } from '../lib/imageUpload';
import { SignJWT } from 'jose';
import { v4 as uuidv4 } from 'uuid';
import { getAccessSecret } from '../utils/constants';
const router = Router();

router.get('/:username', async (req, res) => {
    try {
        const profile: profile | null = await prisma.profile.findUnique({
            where: { username: req.params.username },
        });
        if (!profile) return res.status(404).json({});
        const banner: banner | null = await prisma.banner.findUnique({
            where: { profile_id: profile.id },
        });
        const avatar: avatar | null = await prisma.avatar.findUnique({
            where: { profile_id: profile.id },
        });
        return res.status(200).json({ ...profile, banner: banner?.path, avatar: avatar?.path });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false });
    }
});

router.post('/:username', verifyAccess, async (req: Request, res: Response) => {
    try {
        if (req.user.username !== req.params.username) return res.status(401).json({});
        const profile: profile | null = await prisma.profile.findUnique({
            where: { username: req.user.username },
        });
        if (!profile) return res.status(404).json({});
        const sessionPayload = await getSessionPayload(req);

        const { fields, files } = await parseForm({
            request: req,
            maxFields: 3,
            maxFiles: 2,
            allowMimeTypes: ['image/jpeg', 'image/png'],
        });
        const updatedProfile = await prisma.profile.update({
            where: {
                username: req.user.username,
            },
            data: {
                displayname: fields.displayname ? fields.displayname[0] : undefined,
                bio: fields.bio ? fields.bio[0] : undefined,
                location: fields.location ? fields.location[0] : undefined,
            },
        });
        if (sessionPayload.displayname) {
            sessionPayload.displayname = updatedProfile.displayname;
        }
        const banner = files.banner ? files.banner[0] : undefined;
        if (banner) {
            const bannerPath = await uploadImage(banner);
            await prisma.banner.upsert({
                where: {
                    profile_id: profile.id,
                },
                update: {
                    path: bannerPath,
                },
                create: {
                    profile_id: profile.id,
                    path: bannerPath,
                },
            });
        }
        const avatar = files.avatar ? files.avatar[0] : undefined;
        if (avatar) {
            const avatarPath = await uploadImage(avatar);
            const newAvatar = await prisma.avatar.upsert({
                where: {
                    profile_id: profile.id,
                },
                update: {
                    path: avatarPath,
                },
                create: {
                    profile_id: profile.id,
                    path: avatarPath,
                },
            });
            sessionPayload.avatar = newAvatar.path;
        }

        const expires = 60 * 60 * 24 * 7;

        const accessToken = await new SignJWT(sessionPayload)
            .setProtectedHeader({ alg: 'HS256' })
            .setJti(uuidv4())
            .setExpirationTime(Date.now() + expires)
            .setIssuedAt()
            .sign(new TextEncoder().encode(getAccessSecret()));

        return res.status(200).json({ user: sessionPayload, accessToken: accessToken, accessTokenExpires: expires });
    } catch (err) {
        console.log(err);
        return res.status(500).json({});
    }
});

export default router;
