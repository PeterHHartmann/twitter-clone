import { NextApiRequest, NextApiResponse } from "next";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method?.toLowerCase() !== 'get') return res.status(405).json({ success: false });
  if (!req.cookies.session) return res.status(401).json({ success: false });
  const response = await fetch('http://127.0.0.1:8000/auth/session', {
    method: 'get',
    headers: {
      Authorization: `Bearer ${req.cookies.session}`,
    },
  });
  if (!response.ok) return res.status(response.status).json({ success: false });
  return res.status(200).json({ ...(await response.json()) });
};

export default handler;