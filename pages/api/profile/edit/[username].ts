import { getSession, verifyCsrfTokens } from '@lib/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { ImageFile, parseForm, uploadImage } from "@lib/imageUpload";

export const config = {
  api: {
    bodyParser: false,
  },
};

type DataToAPI = {
  displayname?: string,
  bio?: string,
  location?: string,
  banner?: string,
  avatar?: string,
}

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).json({ success: false });
  try {
    await verifyCsrfTokens(req);
    const session = await getSession(req);
    const { username } = req.query;
    if (session && username !== session.username) return res.status(403).json({ success: false });
    const { fields, files } = await parseForm(req);
    
    const data: DataToAPI = {
      displayname: fields.displayname as string,
      bio: fields.bio as string,
      location: fields.location as string
    }

    const banner = files.banner as unknown as ImageFile;
    if (banner) {
      const bannerPath = await uploadImage(banner);
      data['banner'] = bannerPath
    }
    const avatar = files.avatar as unknown as ImageFile;
    if (avatar) {
      const avatarPath = await uploadImage(avatar);
      data['avatar'] = avatarPath;
    }
    
    const response = await fetch(`http://127.0.0.1:8000/profile/${username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session!.accessToken}`,
      },
      body: JSON.stringify({...data}),
    });
    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ success: true });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false });
  }
};

export default handler;
