import { NextApiRequest, NextApiResponse } from 'next';
import { expireSessionCookie } from '@lib/auth';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') return res.status(405).json({ success: false });
    try {
        res = expireSessionCookie(res);
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Something went wrong, please try again later' });
    }
};

export default handler;
