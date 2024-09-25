import { getSession, verifyCsrfTokens } from '@lib/auth';
import { forwardFormdataRequest } from '@lib/multipart';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
    api: {
        bodyParser: false,
    },
};

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') return res.status(405).json({ success: false });
    try {
        const session = await getSession(req);
        if (!session) return res.status(401).json({ success: false });
        await verifyCsrfTokens(req);
        const tweetResponse = await forwardFormdataRequest(req, {
            method: 'post',
            pathname: '/tweets',
            accessToken: session.accessToken,
        });
        if (!tweetResponse.ok) return res.status(tweetResponse.status).json({ success: false });
        return res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false });
    }
};

export default handler;
