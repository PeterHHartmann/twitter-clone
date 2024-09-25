import { getSession, verifyCsrfTokens } from '@lib/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { forwardFormdataRequest } from '@lib/multipart';
import { getExternalApiUrl } from '@lib/config';

export const config = {
    api: {
        bodyParser: false,
    },
};

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
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
    }
    if (req.method === 'PUT') {
        try {
            const session = await getSession(req);
            if (!session) return res.status(401).json({ success: false });
            await verifyCsrfTokens(req);
            const editResponse = await forwardFormdataRequest(req, {
                method: 'put',
                pathname: `/tweets/${session.username}/${req.query.id}`,
                accessToken: session.accessToken,
            });
            if (!editResponse.ok) return res.status(editResponse.status).json({ success: false });
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
            const deleteResponse = await fetch(`${getExternalApiUrl()}/tweets/${session.username}/${req.query.id}`, {
                method: 'delete',
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            });
            if (!deleteResponse.ok) return res.status(deleteResponse.status).json({ success: false });
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
