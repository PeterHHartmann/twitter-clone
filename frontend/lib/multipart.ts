import { NextApiRequest } from 'next';
import { getExternalApiUrl } from './config';

type ForwardFormdataParams = {
    method: 'put' | 'post';
    pathname: string;
    accessToken: string;
};

export async function forwardFormdataRequest(
    req: NextApiRequest,
    { method, pathname, accessToken }: ForwardFormdataParams
) {
    const response = await fetch(`${getExternalApiUrl() + pathname}`, {
        method: method,
        headers: {
            'Content-Type': req.headers['content-type'] as string,
            Authorization: `Bearer ${accessToken}`,
        },
        body: req as unknown as ReadableStream<NextApiRequest>,
        // @ts-ignore
        duplex: "half"
    });
    return response;
}
