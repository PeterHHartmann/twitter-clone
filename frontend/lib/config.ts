export function getExternalApiUrl(): string {
    const protocol: string | undefined = process.env.NEXT_PUBLIC_EXT_API_PROTOCOL;
    const hostname: string | undefined = process.env.NEXT_PUBLIC_EXT_API_HOSTNAME;
    const port: string | undefined = process.env.NEXT_PUBLIC_EXT_API_PORT;

    if (!protocol) throw new Error('The environment variable NEXT_PUBLIC_EXT_API_PROTOCOL is not set.');
    if (!hostname) throw new Error('The environment variable NEXT_PUBLIC_EXT_API_HOSTNAME is not set.');
    if (!port) throw new Error('The environment variable NEXT_PUBLIC_EXT_API_PORT is not set.');

    const NEXT_PUBLIC_EXT_API_URL: string = `${protocol}://${hostname}:${port}`;
    return NEXT_PUBLIC_EXT_API_URL;
}
