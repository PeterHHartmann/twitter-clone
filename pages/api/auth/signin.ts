import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method?.toLowerCase() !== 'post') return res.status(405).json({ success: false });
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
    const { session, expires } = await response.json();
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('session', session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: expires,
        sameSite: 'lax',
        path: '/',
      })
    );
    res.status(200).json({success: true});
  } catch (e) {
    res.status(500).json({success: false, error: 'Something went wrong, please try again later' });
  }
};

// export default handler;
