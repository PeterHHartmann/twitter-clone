import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method?.toLowerCase() !== 'post') return res.status(405).json({ success: false });
  try {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('session', '', {
        maxAge: -1,
        path: '/',
      })
    );
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false, error: 'Something went wrong, please try again later' });
  }
};
