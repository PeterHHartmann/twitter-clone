import { describe, expect, it } from '@jest/globals';
import { uploadImage } from '../lib/imageUpload';
import { File } from 'formidable';
import { tmpdir } from 'os';
import path from 'path';

describe('imageUpload module', () => {
    it('should be defined', () => {
        expect(uploadImage).toBeDefined();
    });

    it('should throw error when no mimetype on file', async () => {
        const file = {};
        try {
            await uploadImage(file as File);
        } catch (e) {
            const err = e as Error;
            expect(err.toString()).toMatch('No MimeType detected');
        }
    });

    it('should throw TypeError when no path is supplied to fs/promises readFile function', async () => {
        const file = { mimetype: 'image/jpeg' };
        try {
            await uploadImage(file as File);
        } catch (e) {
            const err = e as Error;
            expect(err.toString()).toMatch(
                'TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string or an instance of Buffer or URL. Received undefined'
            );
        }
    });

    it('should throw error when trying to read a file in a dir where it does not have permissions', async () => {
        const file = { mimetype: 'image/jpeg', filepath: tmpdir() };
        try {
            await uploadImage(file as File);
        } catch (e) {
            const err = e as Error;
            expect(err.toString()).toMatch('Error: EISDIR: illegal operation on a directory, read');
        }
    });

    //TODO remove actual file created from this test
    it('should return a string', async () => {
        const actual = await uploadImage({
            size: 100,
            filepath: path.join(process.cwd(), '/src/tests/testimage.jpg'),
            originalFilename: 'testimage.jpg',
            newFilename: 'testimage.jpg',
            mimetype: 'image/jpeg',
        } as File);
        expect(typeof actual).toBe('string');
    });
});
