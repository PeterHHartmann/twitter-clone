import { getSession, verifyCsrfTokens } from '@lib/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, File, Files } from 'formidable';
import { readFileSync } from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

type ImageFile = File & {
  filepath: string
  originalFilename: string
  mimetype: string
}

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).json({ success: false });
  try {
    await verifyCsrfTokens(req);
    const session = await getSession(req);
    const { username } = req.query;
    if (session && username !== session.username) return res.status(403).json({ success: false });

    const parseForm = new Promise<FormData>((resolve, reject) => {
      const form = new IncomingForm({ multiples: true });
      form.parse(req, (err, fields, files: Files) => {
        if (err) reject(err);
        const formData = new FormData();
        formData.append('displayname', fields.displayname as string);
        formData.append('bio', fields.bio as string);
        formData.append('location', fields.location as string);

        if (files.banner) {
          const bannerFile = files.banner as ImageFile;
          const bannerBlob = new Blob([readFileSync(bannerFile.filepath)], { type: bannerFile.mimetype });
          formData.append('banner', bannerBlob, bannerFile.originalFilename);
        }

        if (files.avatar) {
          const avatarFile = files.avatar as ImageFile;
          const avatarBlob = new Blob([readFileSync(avatarFile.filepath)], { type: avatarFile.mimetype });
          formData.append('avatar', avatarBlob, avatarFile.originalFilename);
        }
        resolve(formData);
      });
    });

    const formData = await parseForm;

    const response = await fetch(`http://127.0.0.1:8000/profile/${username}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${session!.accessToken}`,
      },
      body: formData,
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
