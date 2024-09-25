import { getSession, setSessionCookie, verifyCsrfTokens } from '@lib/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { forwardFormdataRequest } from '@lib/multipart';

export const config = {
    api: {
        bodyParser: false,
    },
};

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') return res.status(405).json({ success: false });
    try {
        const session = await getSession(req);
        if (!session || req.query.username !== session.username) return res.status(401).json({ success: false });
        await verifyCsrfTokens(req);
        const editResponse = await forwardFormdataRequest(req, {
            method: 'post',
            pathname: `/profile/${session.username}`,
            accessToken: session.accessToken,
        });
        if (!editResponse.ok) return res.status(editResponse.status).json({ success: false });
        const { user, accessToken, accessTokenExpires } = await editResponse.json();
        res = await setSessionCookie(res, { ...user, accessToken }, accessTokenExpires);
        return res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);

        return res.status(500).json({ success: false });
    }
};

export default handler;
