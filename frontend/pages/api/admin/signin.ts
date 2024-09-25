import { NextApiRequest, NextApiResponse } from 'next';
import { setAdminSessionCookie, verifyCsrfTokens } from '@lib/auth';
import { AuthError } from '@lib/auth/constants';
import { getExternalApiUrl } from '@lib/config';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') return res.status(405).json({ success: false });
    try {
        await verifyCsrfTokens(req);
        const response = await fetch(`${getExternalApiUrl()}/admin/signin`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: req.body.username,
                password: req.body.password,
            }),
        });
        if (!response.ok) {
            const { error } = await response.json();
            return res.status(response.status).json({ success: false, error: error });
        }
        const { admin, adminAccessToken, accessTokenExpires } = await response.json();

        res = await setAdminSessionCookie(res, { ...admin, adminAccessToken }, accessTokenExpires);
        return res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        if (err instanceof AuthError) {
            return res.status(403).json({ success: false, error: 'Something went wrong, please try again later' });
        }
        return res.status(500).json({ success: false, error: 'Something went wrong, please try again later' });
    }
};

export default handler;
