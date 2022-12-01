import { getSession, verifyCsrfTokens } from "@lib/auth";
import { Fields, File, Files } from "formidable";
import { IncomingForm } from "formidable";
import { readFileSync } from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
    api: {
        bodyParser: false,
    },
};

type ImageFile = File & {
    filepath: string;
    originalFilename: string;
    mimetype: string;
  };

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') return res.status(405).json({ success: false });
    try {
        await verifyCsrfTokens(req);
        const session = await getSession(req);
        const parseForm = new Promise<FormData>((resolve, reject) => {
            const form = new IncomingForm({multiples: true})
            form.parse(req, (err, fields: Fields, files: Files) => {
                if (err) reject(err);
                const formData = new FormData();
                formData.append('text', fields.text as string);
                if (files) {
                    for (const [key, value] of Object.entries(files)) {
                        const file = value as ImageFile
                        const blob = new Blob([readFileSync(file.filepath)], {type: file.mimetype})
                        formData.append(key, blob)
                    }
                }
                resolve(formData)
            });
        })
        const response = await fetch('http://localhost:8000/tweet', {
            method: 'post',
            headers: {
                'Authorization': `Bearer ${session!.accessToken}`
            },
            body: await parseForm,
        })
        if (response.ok) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(401).json({ success: true });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false });
    }
}

export default handler;