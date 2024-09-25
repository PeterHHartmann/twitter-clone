import { getAdminSession, verifyCsrfTokens } from '@lib/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { getExternalApiUrl } from '@lib/config';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'DELETE') {
        try {
            const session = await getAdminSession(req);
            if (!session) return res.status(401).json({ success: false });
            await verifyCsrfTokens(req);
            const deleteResponse = await fetch(`${getExternalApiUrl()}/admin/tweets/${req.query.id}`, {
                method: 'delete',
                headers: {
                    Authorization: `Bearer ${session.adminAccessToken}`,
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
