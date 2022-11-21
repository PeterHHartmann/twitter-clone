import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method?.toLowerCase() !== 'get') return res.status(405).json({ success: false });
  if (!req.cookies.session) return res.status(401).json({ success: false });
  return res.status(200).json({ token: req.cookies.session });
};