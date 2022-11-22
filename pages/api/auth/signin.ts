import { NextApiRequest, NextApiResponse } from 'next';
import { setSessionCookie } from '@/lib/auth';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).json({ success: false });
  try {
    const response = await fetch('http://127.0.0.1:8000/auth/signin', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: req.body.email,
        password: req.body.password,
      }),
    });
    if (!response.ok) res.status(response.status).json({ success: false, ...(await response.json()) });
    const { user, accessToken, accessTokenExpires } = await response.json();
    res = await setSessionCookie(res, { ...user, accessToken }, accessTokenExpires);
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: 'Something went wrong, please try again later' });
  }
};

export default handler;