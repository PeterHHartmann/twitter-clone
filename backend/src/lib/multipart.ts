import { Fields, Files, IncomingForm } from 'formidable';

import { Request } from 'express';

type Params = {
    request: Request;
    maxFields: number;
    maxFiles: number;
    allowMimeTypes?: string[];
};

export class FormParseError extends Error {}

export const parseForm = ({ request, maxFields, maxFiles, allowMimeTypes }: Params) => {
    return new Promise<{ fields: Fields; files: Files; }>((resolve, reject) => {
        const form = new IncomingForm({
            maxFields: maxFields,
            maxFiles: maxFiles,
            filter: ({ mimetype }) => {
                if (mimetype && allowMimeTypes && allowMimeTypes.indexOf(mimetype) < 0) {
                    reject(new FormParseError(`MimeType not allowed: ${mimetype}`));
                }
                return true;
            },
        });
        form.parse(request, async (err: string, fields: Fields, files: Files) => {
            if (err) reject(err);
            resolve({ fields: fields, files: files });
        });
    });
};
