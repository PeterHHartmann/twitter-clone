import { getSession } from '@lib/auth';
import { getExternalApiUrl } from '@lib/config';
import { NextApiRequest, NextApiResponse } from 'next';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') return res.status(405).json({ success: false });
    try {
        const session = await getSession(req);
        if (!session) return res.status(401).json({ success: false });
        const response = await fetch(`${getExternalApiUrl()}/tweets/${req.query.username}?page=${req.query.page}`, {
            method: 'get',
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
            },
        });
        if (!response.ok) return res.status(response.status).json({ success: false });
        const data = await response.json();
        return res.status(200).json({ success: true, tweets: data.tweets });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false });
    }
};

export default handler;
