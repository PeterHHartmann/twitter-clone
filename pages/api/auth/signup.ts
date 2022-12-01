import { verifyCsrfTokens } from '@lib/auth';
import { AuthError } from '@lib/auth/constants';
import { NextApiRequest, NextApiResponse } from 'next';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {  
  try {
    await verifyCsrfTokens(req);
    const response = await fetch('http://localhost:8000/auth/signup', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      }),
    });
    if (response.ok) {
      res.status(200).json({ success: true });
    } else {
      const { error } = await response.json();
      console.log(error);
      
      res.status(response.status).json({ success: false, error });
    }
  } catch (err) {
    console.log(err);
    if (err instanceof AuthError) {
      return res.status(403).json({ success: false });
    }
    return res.status(500).json({ success: false });
  }
};

export default handler;
