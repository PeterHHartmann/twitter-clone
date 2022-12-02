import { Fields, Files, IncomingForm } from 'formidable';
import { NextApiRequest } from 'next';
import path from 'path';
import { readFile, mkdir, writeFile } from 'fs/promises';
import { extension } from 'mime-types';
import { nanoid } from 'nanoid';

const allowedMimeTypes = ['image/jpeg', 'image/png'];

export type ImageFile = File & {
  filepath: string;
  originalFilename: string;
  mimetype: string;
};

export const parseForm = (req: NextApiRequest) => {
  return new Promise<{ fields: Fields; files: Files }>((resolve, reject) => {
    const form = new IncomingForm({ multiples: true });
    form.parse(req, async (err: any, fields: Fields, files: Files) => {
      if (err) reject(err);
      resolve({ fields: fields, files: files });
    });
  });
};

export const uploadImage = async (image: ImageFile) => {
  if (allowedMimeTypes.indexOf(image.mimetype) < 0) throw new Error('MimeType not allowed');  
  await mkdir(path.join(process.cwd(), '/public/twimg'), { recursive: true });
  const buffer = await readFile(image.filepath as string);
  const ext = extension(image.mimetype) || '';
  const imagePath = `/twimg/${nanoid()}.${ext}`;
  const saveTo = path.join(process.cwd(), 'public', imagePath);
  await writeFile(saveTo, buffer);
  return imagePath
};
