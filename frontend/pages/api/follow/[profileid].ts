import { getSession, verifyCsrfTokens } from '@lib/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { getExternalApiUrl } from '@lib/config';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const session = await getSession(req);
            if (!session) return res.status(401).json({ success: false });
            const response = await fetch(`${getExternalApiUrl()}/follow/${req.query.profileid}`, {
                method: 'get',
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            });
            if (!response.ok) return res.status(response.status).json({ success: false });
            const data = await response.json();
            return res.status(200).json({ success: true, following: data.following });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ success: false });
        }
    }
    if (req.method === 'POST') {
        try {
            const session = await getSession(req);
            if (!session) return res.status(401).json({ success: false });
            await verifyCsrfTokens(req);
            const response = await fetch(`${getExternalApiUrl()}/follow/${req.query.profileid}`, {
                method: 'post',
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            });
            if (!response.ok) return res.status(response.status).json({ success: false });
            return res.status(200).json({ success: true });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ success: false });
        }
    }
    if (req.method === 'DELETE') {
        try {
            const session = await getSession(req);
            if (!session) return res.status(401).json({ success: false });
            await verifyCsrfTokens(req);
            const response = await fetch(`${getExternalApiUrl()}/follow/${req.query.profileid}`, {
                method: 'delete',
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            });
            if (!response.ok) return res.status(response.status).json({ success: false });
            return res.status(200).json({ success: true });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ success: false });
        }
    } else {
        return res.status(405).json({ success: false });
    }
};

export default handler;
