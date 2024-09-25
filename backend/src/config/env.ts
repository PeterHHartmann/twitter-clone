export function getAccessSecret(): string {
    const ACCESS_TOKEN_SECRET: string | undefined = process.env.ACCESS_TOKEN_SECRET;
    if (!ACCESS_TOKEN_SECRET || ACCESS_TOKEN_SECRET.length === 0) {
        throw new Error('The environment variable ACCESS_TOKEN_SECRET is not set.');
    }

    return ACCESS_TOKEN_SECRET;
}
