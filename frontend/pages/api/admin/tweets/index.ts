import { getAdminSession } from '@lib/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { getExternalApiUrl } from '@lib/config';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const session = await getAdminSession(req);
            if (!session) return res.status(401).json({ success: false });
            const response = await fetch(`${getExternalApiUrl()}/admin/tweets?page=${req.query.page}`, {
                method: 'get',
                headers: {
                    Authorization: `Bearer ${session.adminAccessToken}`,
                },
            });
            if (!response.ok) return res.status(response.status).json({ success: false });
            const data = await response.json();
            return res.status(200).json({ success: true, tweets: data.tweets });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ success: false });
        }
    } else {
        return res.status(405).json({ success: false });
    }
};

export default handler;
