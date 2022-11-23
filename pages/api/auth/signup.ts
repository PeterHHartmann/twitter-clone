import { verifyRequest } from "@/lib/auth";
import { AuthError } from "@/lib/auth/constants";
import { NextApiRequest, NextApiResponse } from 'next';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await verifyRequest(req)
    const response = await fetch('http://127.0.0.1:8000/auth/signup', {
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
      res.status(200).json({success: true})
    } else {
      const { error } = await response.json();
      res.status(response.status).json({success: false, error})
    }
  } catch (err) {
    if(err instanceof AuthError) {
      return res.status(403).json({ success: false });
    }
    return res.status(500).json({ success: false });
  }
};

export default handler;