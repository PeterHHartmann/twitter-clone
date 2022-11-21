import { NextApiRequest, NextApiResponse } from "next";

export default async(req: NextApiRequest, res: NextApiResponse) => {
  if (req.method?.toLowerCase() !== 'get') return res.status(405).json({ success: false });
  const {profile} = req.query;
  if (!profile) return res.status(404).json({ success: false });
  try {
    const response = await fetch(`http://127.0.0.1:8000/profile/${profile}`, {
      method: 'get'
    })
    if (!response.ok) return res.status(404).json({ success: false });
    return res.status(200).json({ ...await response.json() });
  } catch (e) {
    console.log(e);
  }
};