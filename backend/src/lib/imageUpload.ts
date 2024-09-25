import { File } from 'formidable';
import path from 'path';
import { readFile, mkdir, writeFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { extension } from 'mime-types';

export const uploadImage = async (image: File) => {
    if (!image.mimetype) throw new Error('No MimeType detected');
    await mkdir(path.join(process.cwd(), '/media'), { recursive: true });
    const buffer = await readFile(image.filepath as string);
    const ext = extension(image.mimetype);
    const imagePath = `/media/${uuidv4()}.${ext}`;
    const saveTo = path.join(process.cwd(), imagePath);
    await writeFile(saveTo, buffer);
    return imagePath;
};
